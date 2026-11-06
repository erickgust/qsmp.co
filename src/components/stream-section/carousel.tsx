import { useEffect, useRef } from 'react'
import type { UseEmblaCarouselType } from 'embla-carousel-react'
import LazyLoad from 'react-lazy-load'

import { StreamDescription } from './stream-description'
import { YoutubeEmbed } from '../ui/youtube-embed'
import TwitchPlayer from '@/lib/TwitchPlayer'
import type { StreamResponse } from '@/utils/schemas/stream-schema'

const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

type CarouselProps = {
  emblaRef: UseEmblaCarouselType[0]
  emblaApi: UseEmblaCarouselType[1]
  slides: StreamResponse
  selectedIndex: number
}

export function Carousel({
  emblaRef,
  emblaApi,
  slides,
  selectedIndex,
}: CarouselProps) {
  const firstLoad = useRef(true)

  useEffect(() => {
    if (!emblaApi) return
    const desktop = window.matchMedia('(min-width: 768px)')
    const reduce = window.matchMedia(reducedMotionQuery)

    const tween = () => {
      const engine = emblaApi.internalEngine()
      const progress = emblaApi.scrollProgress()
      const snaps = emblaApi.scrollSnapList()
      const slides = emblaApi.slideNodes()

      snaps.forEach((snap, snapIndex) => {
        engine.slideRegistry[snapIndex].forEach((slideIndex) => {
          let diff = snap - progress
          // looped slides are drawn one lap away from their snap
          engine.slideLooper.loopPoints.forEach((point) => {
            const target = point.target()
            if (point.index === slideIndex && target !== 0) {
              diff = target < 0 ? snap - (1 + progress) : snap + (1 - progress)
            }
          })

          const media = slides[slideIndex]
            .firstElementChild as HTMLElement | null
          if (!media) return
          if (!desktop.matches) {
            media.style.transform = ''
            return
          }

          let t = Math.min(Math.abs(diff) * snaps.length, 1)
          if (reduce.matches) t = Math.round(t)
          const x = (diff > 0 ? -40 : 368) * t
          media.style.transform = `translateX(${x}px) scale(${1 - 0.134 * t})`
        })
      })
    }

    tween()
    emblaApi.on('scroll', tween).on('reInit', tween)
    desktop.addEventListener('change', tween)
    return () => {
      emblaApi.off('scroll', tween).off('reInit', tween)
      desktop.removeEventListener('change', tween)
    }
  }, [emblaApi])

  return (
    <div className='relative my-10'>
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex touch-pan-y'>
          {slides.type === 'live' &&
            slides.data.map((member, i) => (
              <Slide
                key={i}
                isSelected={i === selectedIndex}
                media={
                  <LazyLoad
                    height='420px'
                    className='relative z-10 max-w-3xl aspect-video !w-full max-md:!h-auto'
                  >
                    {member.platform == 'afreeca' ? (
                      <iframe
                        src={`https://play.afreecatv.com/${member.userName}/embed`}
                        title={member.name}
                        frameBorder='0'
                        allowFullScreen
                        className='w-full h-full'
                      />
                    ) : (
                      <TwitchPlayer
                        channel={member.userName}
                        height='420px'
                        width='750px'
                        id={`twitch-player-${member.userName}`}
                        className='max-w-3xl aspect-video !w-full max-md:!h-auto'
                        autoplay={false}
                        play={i === selectedIndex}
                        onReady={(player) => {
                          const playCarousel =
                            emblaApi?.plugins().autoplay?.play

                          if (i === selectedIndex) {
                            player.play()
                          }

                          if (
                            firstLoad.current &&
                            playCarousel &&
                            !window.matchMedia(reducedMotionQuery).matches
                          ) {
                            playCarousel()
                          }

                          firstLoad.current = false
                        }}
                      />
                    )}
                  </LazyLoad>
                }
                description={
                  <StreamDescription
                    description={member.description}
                    language={member.language}
                    url={`https://twitch.tv/${member.userName}`}
                    channel={{ image: member.avatar, name: member.name }}
                    viewerCount={member.viewerCount}
                    isLive
                  />
                }
              />
            ))}

          {slides.type === 'youtube' &&
            slides.data.map((video, i) => (
              <Slide
                key={i}
                isSelected={i === selectedIndex}
                media={
                  <div className='relative z-10 max-w-3xl !w-full h-auto md:min-h-full md:max-h-0'>
                    <YoutubeEmbed id={video.id} title={video.title} />
                  </div>
                }
                description={
                  <StreamDescription
                    description={video.description}
                    url={`https://www.youtube.com/watch?v=${video.id}`}
                    channel={{
                      image: video.channel.avatar,
                      name: video.channel.name,
                    }}
                  />
                }
              />
            ))}
        </div>
      </div>
    </div>
  )
}

type SlideProps = {
  isSelected: boolean
  // must render a single element: the tween above moves the slide's first child
  media: React.ReactNode
  description: React.ReactNode
}

function Slide({ isSelected, media, description }: SlideProps) {
  return (
    <div
      data-selected={isSelected}
      className='group flex-[0_0_100%] md:flex-[0_0_67.5rem] px-8 md:px-0 flex flex-col md:flex-row gap-6 md:mx-12 md:justify-center'
    >
      {media}

      <div
        className='relative inline-block opacity-0 group-data-[selected=true]:opacity-100 transition-opacity duration-300 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)]'
        inert={!isSelected}
      >
        {description}
      </div>
    </div>
  )
}
