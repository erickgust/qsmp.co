'use client'

import { Members } from '@/app/[lang]/page'
import Image from 'next/image'

type CarouselNavProps = {
  isLoading?: boolean
  items: Members
  selectedIndex: number
  onSelectedIndex: (index: number) => void
}

export function CarouselNav({
  items,
  onSelectedIndex,
  selectedIndex,
  isLoading = false,
}: CarouselNavProps) {
  const { type, data } = items
  const hasData = data.length > 0 && !isLoading

  return (
    <div className='flex md:gap-2.5 items-center py-1.5 leading-none'>
      {type === 'youtube' &&
        hasData &&
        data.map((video, index) => (
          <button
            key={video.id}
            type='button'
            onClick={() => onSelectedIndex(index)}
            aria-label={video.title}
            aria-current={index === selectedIndex ? 'true' : undefined}
            data-selected={index === selectedIndex}
            className='group shrink-0 flex items-center justify-center size-6 max-md:mx-px'
          >
            <span className='size-2.5 bg-[#F0F6FF] group-data-[selected=true]:size-3.5 group-data-[selected=true]:bg-[#1F1E33]' />
          </button>
        ))}

      {type === 'live' &&
        hasData &&
        data.map((member, index) => (
          <button
            key={member.id}
            type='button'
            onClick={() => onSelectedIndex(index)}
            aria-current={index === selectedIndex ? 'true' : undefined}
            data-selected={index === selectedIndex}
            className='
              overflow-hidden min-w-fit size-10 data-[selected=true]:ring-[#FF3D3D]
              data-[selected=true]:ring-4 max-md:data-[selected=true]:size-12
              max-md:data-[selected=true]:ring-[6px] max-md:mx-[0.625rem]
              max-w-10 max-h-10 max-md:data-[selected=true]:max-w-12
              max-md:data-[selected=true]:max-h-12
              data-[selected=true]:mx-1 max-md:data-[selected=true]:mx-1.5
            '
          >
            <Image
              src={member.avatar}
              alt={member.name}
              width={50}
              height={50}
              className='object-cover object-center w-max h-full'
              quality={60}
              priority
            />
          </button>
        ))}
    </div>
  )
}
