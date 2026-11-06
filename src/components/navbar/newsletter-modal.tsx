'use client'

import { useState } from 'react'
import { useLocale, useTranslations, type Locale } from 'next-intl'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { toast } from 'sonner'

import CloseIcon from '@/assets/icons/close'
import { routing } from '@/i18n/routing'
import { flags } from '@/i18n/flags'
import { Modal } from '../ui/modal'
import { Heading } from '../ui/heading'
import { ExternalLinkButton } from '../ui/button'

type NewsletterModalProps = {
  isOpen: boolean
  onClose: () => void
}

export function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [email, setEmail] = useState('')
  const [language, setLanguage] = useState(locale)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    toast(t('newsletter-modal.demo'))
    setEmail('')
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      aria-labelledby='newsletter-title'
      className='dialog-pop md:max-w-4xl bg-white shadow-lg w-10/12'
    >
      <div className='relative p-8 md:px-16 md:py-14'>
        <div className='flex flex-col gap-6'>
          <div className='flex justify-between items-start'>
            <Heading id='newsletter-title' className='text-2xl'>
              {t('newsletter-modal.title')}
            </Heading>

            <button
              type='button'
              onClick={onClose}
              aria-label={t('close')}
              className='md:absolute md:right-8 md:top-8 pl-2 ml-1'
            >
              <CloseIcon className='size-6' aria-hidden='true' />
            </button>
          </div>

          <p className='mb-6 text-pretty'>
            {t('newsletter-modal.paragraph.first')}

            <span className='inline-block mt-2'>
              {t('newsletter-modal.paragraph.second')}
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className='flex flex-col'>
          <div className='flex flex-col md:flex-row gap-6 w-full'>
            <LanguageSelect value={language} onValueChange={setLanguage} />

            <label htmlFor='newsletter-email' className='sr-only'>
              {t('newsletter-modal.placeholder')}
            </label>
            <input
              id='newsletter-email'
              name='email'
              type='email'
              autoComplete='email'
              required
              className='border w-full p-4'
              placeholder={t('newsletter-modal.placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <ExternalLinkButton
            colors='blue'
            className='mt-6 self-end'
            as='button'
            type='submit'
          >
            {t('newsletter-modal.button')}
          </ExternalLinkButton>
        </form>
      </div>
    </Modal>
  )
}

type LanguageSelectProps = {
  value: Locale
  onValueChange: (value: Locale) => void
}

function LanguageSelect({ value, onValueChange }: LanguageSelectProps) {
  const t = useTranslations('nav.newsletter-modal.dropdown')
  const locale = useLocale()

  // CLDR lowercases most language names ("inglés")
  const languageNames = new Intl.DisplayNames([locale], { type: 'language' })
  const languages = routing.locales.map((tag) => {
    const Flag = flags[tag]
    const name = languageNames.of(new Intl.Locale(tag).language) ?? tag

    return {
      tag,
      label: name.charAt(0).toLocaleUpperCase(locale) + name.slice(1),
      icon: <Flag className='min-w-fit' aria-hidden='true' />,
    }
  })
  const selected = languages.find((language) => language.tag === value)

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger className='inline-flex items-center w-full md:max-w-56 p-4 border bg-white text-sm font-medium text-gray-700 justify-between md:justify-center'>
        <span className='inline-flex items-center gap-2 w-full'>
          {selected?.icon}
          <span className='whitespace-nowrap overflow-hidden text-ellipsis'>
            <span className='sr-only'>{t('title')}: </span>
            {selected?.label}
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
          value={value}
          onValueChange={(tag) => onValueChange(tag as Locale)}
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
