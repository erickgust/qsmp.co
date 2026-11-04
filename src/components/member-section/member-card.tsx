'use client'

import type { SVGProps } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { TwitterIcon } from '@/assets/icons/socials/twitter'
import { TwitchIcon } from '@/assets/icons/socials/twitch'
import { YoutubeIcon } from '@/assets/icons/socials/youtube'
import { AfreecaIcon } from '@/assets/icons/socials/afreeca'
import { NaverIcon } from '@/assets/icons/socials/naver'
import { BroadcastIcon } from '@/assets/icons/broadcast'

import type { Member, Platform } from '@/utils/schemas/member-schema'
import { IconButton, SocialButton } from '../ui/button'

type PlatformConfig = {
  label: string
  Icon: (props: SVGProps<SVGSVGElement>) => React.JSX.Element
  iconClassName?: string
}

const platforms: Record<Platform, PlatformConfig> = {
  twitch: { label: 'Twitch', Icon: TwitchIcon },
  chzzk: { label: 'Chzzk', Icon: NaverIcon, iconClassName: 'sm:-mt-0.5' },
  afreeca: { label: 'Afreeca', Icon: AfreecaIcon, iconClassName: 'sm:-mt-0.5' },
}

export function MemberCard({
  name,
  characterImage,
  flag,
  languages,
  channel,
  twitter,
  youtube,
  isLive,
}: Member) {
  const t = useTranslations('members')
  const platform = platforms[channel.platform]

  return (
    <article className='bg-white relative min-w-fit'>
      <div className='relative h-[236px]'>
        <Image
          src={characterImage}
          alt={t('characterAlt', { name })}
          loading='lazy'
          quality={85}
          className='size-full object-cover'
          width={412}
          height={236}
        />

        {isLive && (
          <p className='absolute top-6 left-4 xxs:left-6 sm:left-4 sm:top-4 text-sm sm:text-xs py-1 px-3 sm:px-2 text-white uppercase bg-[#FF3D3D]'>
            {t('live')}
          </p>
        )}

        <div className='absolute h-7 sm:h-6 bottom-6 left-4 xxs:left-6 sm:left-4 sm:bottom-4 flex items-center'>
          <Image
            src={`https://api.iconify.design/flagpack/${flag}.svg`}
            alt={t('flagAlt', { name })}
            loading='lazy'
            width={43}
            height={32}
            className='min-h-full w-max h-full'
          />

          {languages.map((language) => (
            <span
              key={language}
              className='text-sm sm:text-xs ml-2 text-[#F0F6FF] bg-[#1F1E33] py-1 px-3 sm:px-2 whitespace-nowrap'
            >
              {language}
            </span>
          ))}
        </div>
      </div>

      <div className='p-6 px-4 xxs:px-6 sm:p-4'>
        <div className='flex gap-2 items-center justify-start pb-5'>
          {isLive && <BroadcastIcon />}

          <strong className='font-normal text-[22px] font-dm-sans leading-none'>
            {name}
          </strong>
        </div>

        <div className='flex items-center gap-2 w-full'>
          <div className='flex items-center gap-2'>
            {twitter && (
              <IconButton
                colors='blue'
                size='large'
                icon={<TwitterIcon color='white' />}
                label='Twitter'
                as='a'
                href={twitter}
                target='_blank'
                rel='noreferrer'
              />
            )}

            <IconButton
              colors='youtube'
              size='large'
              icon={<YoutubeIcon color='white' />}
              label='Youtube'
              as='a'
              href={youtube}
              target='_blank'
              rel='noreferrer'
            />
          </div>

          <SocialButton
            icon={
              <platform.Icon color='white' className={platform.iconClassName} />
            }
            className='uppercase flex-1 !justify-center'
            size='large'
            href={channel.url}
            colors={channel.platform}
          >
            {platform.label}
          </SocialButton>
        </div>
      </div>
    </article>
  )
}
