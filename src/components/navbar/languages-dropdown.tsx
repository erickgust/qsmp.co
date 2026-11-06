'use client'

import React from 'react'
import { useLocale, useTranslations } from 'next-intl'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { ArrowUp } from '@/assets/icons/arrow-up'
import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { flags } from '@/i18n/flags'

const nativeName = (locale: string) =>
  new Intl.DisplayNames([locale], { type: 'language' }).of(locale)

export function LanguagesDropdown() {
  const t = useTranslations('nav')
  const selectedLanguage = useLocale()

  const pathname = usePathname()
  const SelectedFlag = flags[selectedLanguage]

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger
        className='
          group inline-flex items-center justify-between px-8 min-[900px]:px-6 h-20
          bg-white hover:bg-[#F0F6FF] text-[#1F1E33]
          w-full min-[900px]:w-36 2xl:w-40
        '
      >
        <span className='flex items-center gap-2'>
          <SelectedFlag width={24} height={18} aria-hidden='true' />

          <span className='text-xl min-[900px]:text-xs uppercase'>
            <span className='sr-only'>{t('language')}: </span>
            {selectedLanguage}
          </span>
        </span>

        <ArrowUp
          aria-hidden='true'
          className='group-data-[state=open]:rotate-180 min-[900px]:rotate-180 min-[900px]:group-data-[state=open]:rotate-0 size-6 min-[900px]:size-[1.125rem] 2xl:size-5 transition-transform duration-150 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none'
        />
      </DropdownMenu.Trigger>

      {/* No Portal: the mobile menu is a top-layer <dialog>, and content portaled to <body> would render beneath it */}
      <DropdownMenu.Content
        align='start'
        collisionPadding={{ top: 8, bottom: 8 }}
        className='w-[var(--radix-dropdown-menu-trigger-width)] origin-[var(--radix-dropdown-menu-content-transform-origin)] border bg-white z-30 text-xl min-[900px]:text-xs data-[state=open]:motion-safe:animate-dropdown-in data-[state=closed]:motion-safe:animate-dropdown-out motion-reduce:animate-fade-in'
      >
        {routing.locales.map((locale) => {
          const Flag = flags[locale]

          return (
            <DropdownMenu.Item key={locale} asChild>
              <Link
                href={pathname}
                locale={locale}
                hrefLang={locale}
                aria-current={locale === selectedLanguage ? 'true' : undefined}
                className='flex items-center gap-2 py-8 px-7 text-xl min-[900px]:text-xs border-b text-gray-700 outline-none data-[highlighted]:bg-[#F0F6FF] data-[highlighted]:text-gray-900 w-full'
              >
                <Flag width={24} height={18} aria-hidden='true' />

                <span className='uppercase'>{locale}</span>
                <span className='sr-only' lang={locale}>
                  {nativeName(locale)}
                </span>
              </Link>
            </DropdownMenu.Item>
          )
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
