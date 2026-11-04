'use client'

import React from 'react'
import { useTranslations, type Locale } from 'next-intl'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

export type Language = {
  label: string
  icon: React.ReactNode
  tag: Locale
}

type NewsletterDropdownProps = {
  className?: string

  languages: readonly Language[]
  selectedLanguage: Language
  handleLanguageSelect: (language: Language) => void
}

export function NewsletterDropdown({
  className,
  languages,
  handleLanguageSelect,
  selectedLanguage,
}: NewsletterDropdownProps) {
  const t = useTranslations('nav.newsletter-modal.dropdown')

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger
        className={`inline-flex items-center w-full md:max-w-56 p-4 border bg-white text-sm font-medium text-gray-700 ${className}`}
      >
        <span className='inline-flex items-center gap-2 w-full'>
          {selectedLanguage.icon}
          <span className='whitespace-nowrap overflow-hidden text-ellipsis'>
            <span className='sr-only'>{t('title')}: </span>
            {selectedLanguage.label}
          </span>
        </span>
        <span className='-mr-1 ml-2 mt-1'>
          <svg
            className='size-5 min-w-fit'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M10 9.293l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414L10 9.293z'
            />
          </svg>
        </span>
      </DropdownMenu.Trigger>

      {/* No Portal: this sits in a top-layer <dialog>, and content portaled to <body> would render beneath it */}
      <DropdownMenu.Content
        align='start'
        collisionPadding={8}
        aria-label={t('title')}
        className='w-[var(--radix-dropdown-menu-trigger-width)] max-h-[var(--radix-dropdown-menu-content-available-height)] overflow-y-auto origin-[var(--radix-dropdown-menu-content-transform-origin)] border bg-white data-[state=open]:motion-safe:animate-dropdown-in data-[state=closed]:motion-safe:animate-dropdown-out motion-reduce:animate-fade-in'
      >
        <DropdownMenu.RadioGroup
          value={selectedLanguage.tag}
          onValueChange={(tag) => {
            const language = languages.find((language) => language.tag === tag)
            if (language) handleLanguageSelect(language)
          }}
        >
          {languages.map((language) => (
            <DropdownMenu.RadioItem
              key={language.tag}
              value={language.tag}
              className='flex items-center gap-2 py-[22px] px-6 text-sm border-b text-gray-700 w-full cursor-pointer outline-none data-[highlighted]:bg-[#F0F6FF] data-[highlighted]:text-gray-900 data-[state=checked]:bg-[#F0F6FF]'
            >
              {language.icon}
              <span className='whitespace-nowrap overflow-hidden text-ellipsis text-start'>
                {language.label}
              </span>
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
