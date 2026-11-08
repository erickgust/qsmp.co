'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import clsx from 'clsx'

import { Heading } from '../ui/heading'
import { IconButton } from '../ui/button'
import { ArrowBack } from '@/assets/icons/arrow-back'
import { ArrowNext } from '@/assets/icons/arrow-next'
import type { StreamResponse } from '@/utils/schemas/stream-schema'
import { Carousel } from './carousel'
import { CarouselNav } from './carousel-nav'

type StreamSectionProps = {
  streamData: StreamResponse
}

export function StreamSection({ streamData }: StreamSectionProps) {
  const t = useTranslations('stream')

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [
      Autoplay({
        delay: 6000,
        stopOnInteraction: true,
        playOnInit: false,
        stopOnMouseEnter: true,
      }),
    ],
  )
  const [mobileThumbsRef, mobileThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    align: 'center',
    dragFree: true,
  })
  const [desktopThumbsRef, desktopThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    align: 'start',
    dragFree: true,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap()
      setSelectedIndex(index)
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
      mobileThumbsApi?.scrollTo(index)
      desktopThumbsApi?.scrollTo(index)
    }

    onSelect()
    emblaApi.on('select', onSelect).on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect).off('reInit', onSelect)
    }
  }, [emblaApi, mobileThumbsApi, desktopThumbsApi])

  const previousStreamData = useRef(streamData)
  useEffect(() => {
    const previous = previousStreamData.current
    previousStreamData.current = streamData
    if (!emblaApi || previous.type !== 'live' || streamData.type !== 'live')
      return

    const selectedLogin = previous.data[selectedIndex]?.userName
    const newIndex = streamData.data.findIndex(
      (stream) => stream.userName === selectedLogin,
    )
    if (newIndex !== -1 && newIndex !== emblaApi.selectedScrollSnap()) {
      emblaApi.scrollTo(newIndex, true)
    }
  }, [streamData, emblaApi, selectedIndex])

  const stopAutoplay = () => emblaApi?.plugins().autoplay?.stop()

  const scrollTo = (index: number) => {
    stopAutoplay()
    emblaApi?.scrollTo(index)
  }

  const arrowClassName = clsx(
    'touch-manipulation z-10 disabled:opacity-50',
    streamData.data.length === 1 && 'hidden',
  )

  return (
    <section className='scroll-mt-8 py-12 md:py-16' id='streams'>
      <div className='px-8 mb-8'>
        <div className='max-w-5.5xl mx-auto space-y-6'>
          <Heading className='sm:w-4/5 md:w-3/4'>{t('title')}</Heading>

          {streamData.type === 'youtube' && (
            <p className='text-[#535170] hidden md:inline-block'>
              {t('paragraph.first')}
            </p>
          )}

          <div
            data-visible={streamData.type === 'live'}
            className='hidden md:data-[visible=true]:block'
          >
            <div ref={desktopThumbsRef} className='overflow-hidden'>
              <CarouselNav
                items={streamData}
                onSelectedIndex={scrollTo}
                selectedIndex={selectedIndex}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='relative'>
        <Carousel
          emblaRef={emblaRef}
          emblaApi={emblaApi}
          slides={streamData}
          selectedIndex={selectedIndex}
        />

        <div className='max-md:relative'>
          <div className='absolute top-1/2 -translate-y-1/2 left-8 md:left-20 h-min'>
            <IconButton
              icon={<ArrowBack />}
              label={t('previous')}
              colors='dark'
              type='button'
              onClick={() => {
                stopAutoplay()
                emblaApi?.scrollPrev()
              }}
              disabled={!canScrollPrev}
              className={arrowClassName}
            />
          </div>

          <div className='absolute top-1/2 -translate-y-1/2 right-8 md:right-20 h-min'>
            <IconButton
              icon={<ArrowNext />}
              label={t('next')}
              colors='dark'
              type='button'
              onClick={() => {
                stopAutoplay()
                emblaApi?.scrollNext()
              }}
              disabled={!canScrollNext}
              className={arrowClassName}
            />
          </div>

          <div className='flex md:hidden px-9 mx-12 sm:mx-8 justify-center items-center'>
            <div ref={mobileThumbsRef} className='overflow-hidden min-w-0'>
              <CarouselNav
                items={streamData}
                onSelectedIndex={scrollTo}
                selectedIndex={selectedIndex}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
