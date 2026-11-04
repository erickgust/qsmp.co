import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import type { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

import { StreamDescription } from '../ui/stream-description'
import TwitchPlayer from '@/lib/TwitchPlayer'
import LazyLoad from 'react-lazy-load'
import { Members } from '@/app/[lang]/page'

const slideDescriptionMotion =
  'opacity-0 group-data-[selected=true]:opacity-100 transition-opacity duration-300 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)]'

export type CarouselRef = {
  scrollTo: (index: number) => void
  scrollPrev: () => void
  scrollNext: () => void
}

type PropType = {
  thumbsApi?: EmblaCarouselType
  desktopThumbsApi?: EmblaCarouselType

  slides: Members
  selectedIndex: number
  isLoading?: boolean
  options?: EmblaOptionsType
  onSelectIndex: (index: number) => void
  setPrevBtnDisabled: (disabled: boolean) => void
  setNextBtnDisabled: (disabled: boolean) => void
}

const EmblaCarousel = forwardRef<CarouselRef, PropType>((props, ref) => {
  const {
    thumbsApi,
    desktopThumbsApi,
    slides,
    options,
    onSelectIndex,
    selectedIndex,
    isLoading,
    setPrevBtnDisabled,
    setNextBtnDisabled,
  } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({
      delay: 6000,
      stopOnInteraction: true,
      playOnInit: false,
      stopOnMouseEnter: true,
    }),
  ])

  const firstLoad = useRef(true)
  const { type, data } = slides
  const hasData = data.length > 0 && !isLoading

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.plugins().autoplay?.stop()
      emblaApi.scrollPrev()
    }
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.plugins().autoplay?.stop()
      emblaApi.scrollNext()
    }
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi && thumbsApi && desktopThumbsApi) {
        const embla = emblaApi as EmblaCarouselType

        embla.plugins().autoplay?.stop()
        embla.scrollTo(index)
      }
    },
    [desktopThumbsApi, emblaApi, thumbsApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaApi || !thumbsApi || !desktopThumbsApi) return

    thumbsApi.scrollTo(emblaApi.selectedScrollSnap())
    desktopThumbsApi.scrollTo(emblaApi.selectedScrollSnap())

    onSelectIndex(emblaApi.selectedScrollSnap())
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [
    emblaApi,
    thumbsApi,
    desktopThumbsApi,
    onSelectIndex,
    setPrevBtnDisabled,
    setNextBtnDisabled,
  ])

  useImperativeHandle(
    ref,
    () => ({
      scrollTo,
      scrollPrev,
      scrollNext,
    }),
    [scrollNext, scrollPrev, scrollTo],
  )

  useEffect(() => {
    if (!emblaApi) return

    onSelect()

    emblaApi.on('init', onSelect)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!emblaApi) return
    const desktop = window.matchMedia('(min-width: 768px)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')

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

          // the video wrapper is the slide's first child (LazyLoad div / youtube div)
          const video = slides[slideIndex]
            .firstElementChild as HTMLElement | null
          if (!video) return
          if (!desktop.matches) {
            video.style.transform = ''
            return
          }

          let t = Math.min(Math.abs(diff) * snaps.length, 1)
          if (reduce.matches) t = Math.round(t)
          const x = (diff > 0 ? -40 : 368) * t
          video.style.transform = `translateX(${x}px) scale(${1 - 0.134 * t})`
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
        <div className='flex touch-pan-y mx-auto max-w-5.5xl'>
          {hasData &&
            type === 'live' &&
            data.map((member, i) => (
              <div
                className='embla__slide group px-8 md:px-0 flex flex-col md:flex-row gap-6 md:mx-12 md:justify-center'
                key={i}
                data-index={i}
                data-selected={i === selectedIndex}
              >
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
                        const playCarousel = emblaApi?.plugins().autoplay?.play

                        if (i === selectedIndex) {
                          player.play()
                        }

                        if (
                          firstLoad.current &&
                          playCarousel &&
                          !window.matchMedia('(prefers-reduced-motion: reduce)')
                            .matches
                        ) {
                          playCarousel()
                        }

                        firstLoad.current = false
                      }}
                    />
                  )}
                </LazyLoad>

                <div
                  className={`relative inline-block ${slideDescriptionMotion}`}
                  inert={i !== selectedIndex}
                >
                  <StreamDescription
                    description={member.description}
                    language={member.language}
                    url={`https://twitch.tv/${member.userName}`}
                    channel={{
                      image: member.avatar,
                      name: member.name,
                    }}
                    viewerCount={member.viewerCount}
                    isLive={true}
                  />
                </div>
              </div>
            ))}

          {hasData &&
            type === 'youtube' &&
            data.map((video, i) => (
              <div
                className='embla__slide group px-8 md:px-0 flex flex-col md:flex-row gap-6 md:mx-12 md:justify-center'
                key={i}
                data-index={i}
                data-selected={i === selectedIndex}
              >
                <div className='relative z-10 max-w-3xl !w-full h-auto md:min-h-full md:max-h-0'>
                  <LiteYouTubeEmbed id={video.id} title={video.title} />
                </div>

                <div
                  className={`relative inline-block ${slideDescriptionMotion}`}
                  inert={i !== selectedIndex}
                >
                  <StreamDescription
                    description={video.description}
                    url={`https://www.youtube.com/watch?v=${video.id}`}
                    channel={{
                      image: video.channel.avatar,
                      name: video.channel.name,
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
})

EmblaCarousel.displayName = 'EmblaCarousel'

export default EmblaCarousel
