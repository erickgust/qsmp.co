'use client'

import { useTranslations } from 'next-intl'
import { useQuery } from '@tanstack/react-query'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useRef, useState } from 'react'
import clsx from 'clsx'

import { Heading } from '../ui/heading'
import EmblaCarousel, { CarouselRef } from './carousel'
import { CarouselNav } from './carousel-nav'

import './carousel-styles.css'
import { IconButton } from '../ui/button'
import { ArrowBack } from '@/assets/icons/arrow-back'
import { ArrowNext } from '@/assets/icons/arrow-next'
import { Members } from '@/app/[lang]/page'
import { streamResponseSchema } from '@/utils/schemas/stream-schema'
import { defaultVideos } from './defaultVideos'

export type ThumbsRef = <ViewportElement extends HTMLElement>(
  instance: ViewportElement | null,
) => void

type StreamSectionProps = {
  members: Members
}

export function StreamSection({ members }: StreamSectionProps) {
  const t = useTranslations('stream')

  const { data: streamData } = useQuery({
    queryKey: ['stream'],
    queryFn: async () =>
      streamResponseSchema.parse({ type: 'youtube', data: defaultVideos }),
    initialData: members,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const [isLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const [mobileThumbsRef, thumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    align: 'center',
    dragFree: true,
  })
  const [desktopThumbsRef, desktopThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    align: 'start',
    dragFree: true,
  })
  const carouselRef = useRef<CarouselRef>(null)

  const handleSelectIndex = useCallback((index: number) => {
    setSelectedIndex(index)

    if (!carouselRef.current) return

    carouselRef.current.scrollTo(index)
  }, [])

  return (
    <section className='scroll-mt-8 py-12 md:py-16' id='streams'>
      <div className='px-8 mb-8'>
        <div className='max-w-5.5xl mx-auto space-y-6'>
          <Heading className='sm:w-4/5 md:w-3/4'>{t('title')}</Heading>

          {!isLoading && streamData.type === 'youtube' && (
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
                onSelectedIndex={handleSelectIndex}
                selectedIndex={selectedIndex}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='relative'>
        <EmblaCarousel
          thumbsApi={thumbsApi}
          desktopThumbsApi={desktopThumbsApi}
          slides={streamData}
          options={{ loop: true, align: 'center' }}
          ref={carouselRef}
          selectedIndex={selectedIndex}
          onSelectIndex={handleSelectIndex}
          isLoading={isLoading}
          setPrevBtnDisabled={setPrevBtnDisabled}
          setNextBtnDisabled={setNextBtnDisabled}
        />

        <div className='max-md:relative'>
          <div className='absolute top-1/2 -translate-y-1/2 left-8 md:left-20 h-min'>
            <IconButton
              icon={<ArrowBack />}
              label={t('previous')}
              colors='dark'
              type='button'
              onClick={() => carouselRef.current?.scrollPrev()}
              disabled={prevBtnDisabled}
              className={clsx(
                'touch-manipulation z-10 disabled:opacity-50',
                streamData.data.length === 1 ? 'hidden' : '',
              )}
            />
          </div>

          <div className='absolute top-1/2 -translate-y-1/2 right-8 md:right-20 h-min'>
            <IconButton
              icon={<ArrowNext />}
              label={t('next')}
              colors='dark'
              type='button'
              onClick={() => carouselRef.current?.scrollNext()}
              disabled={nextBtnDisabled}
              className={clsx(
                'touch-manipulation z-10 disabled:opacity-50',
                streamData.data.length === 1 ? 'hidden' : '',
              )}
            />
          </div>

          <div className='flex md:hidden px-9 mx-12 sm:mx-8 justify-center items-center'>
            <div ref={mobileThumbsRef} className='overflow-hidden min-w-0'>
              <CarouselNav
                items={streamData}
                onSelectedIndex={handleSelectIndex}
                selectedIndex={selectedIndex}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
