import { useTranslations } from 'next-intl'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { ArrowUp } from '@/assets/icons/arrow-up'
import { useFilter } from '@/context/use-filter-context'

export function FilterDropdown() {
  const t = useTranslations('members')

  const { languages, selectedLanguages, toggleLanguage } = useFilter()

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger className='group inline-flex items-center justify-between gap-7 w-full md:w-auto min-w-[250px] px-6 py-4 bg-[#F0F6FF] border border-[#D7DFEC] font-medium text-[#1F1E33] text-lg text-left'>
        <span className='flex items-center justify-between w-full gap-2'>
          {selectedLanguages.length > 0 ? (
            selectedLanguages.join(', ')
          ) : (
            <span className='text-lg'>{t('filter')}</span>
          )}

          <ArrowUp
            aria-hidden='true'
            className='size-6 rotate-180 group-data-[state=open]:rotate-0 transition-transform duration-150 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none'
          />
        </span>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        align='end'
        collisionPadding={8}
        className='w-[var(--radix-dropdown-menu-trigger-width)] origin-[var(--radix-dropdown-menu-content-transform-origin)] z-10 bg-[#F0F6FF] ring-1 ring-black ring-opacity-5 data-[state=open]:motion-safe:animate-dropdown-in data-[state=closed]:motion-safe:animate-dropdown-out motion-reduce:animate-fade-in'
      >
        <DropdownMenu.Label className='sr-only'>
          {t('filter')}
        </DropdownMenu.Label>
        {languages.map((language) => (
          <DropdownMenu.CheckboxItem
            key={language.label}
            checked={selectedLanguages.includes(language.label)}
            onCheckedChange={() => toggleLanguage(language.label)}
            // Keep the menu open so several languages can be picked in a row
            onSelect={(event) => event.preventDefault()}
            className='flex items-center gap-3 px-4 py-4 border border-[#D7DFEC] w-full cursor-pointer outline-none data-[highlighted]:bg-white'
          >
            <span
              aria-hidden='true'
              className='grid place-items-center size-5 shrink-0 border border-gray-500 bg-white text-blue-600'
            >
              <DropdownMenu.ItemIndicator>
                <svg viewBox='0 0 16 16' className='size-4' fill='none'>
                  <path
                    d='M3 8.5l3 3 7-7'
                    stroke='currentColor'
                    strokeWidth='2'
                  />
                </svg>
              </DropdownMenu.ItemIndicator>
            </span>

            <span>{language.label}</span>
          </DropdownMenu.CheckboxItem>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
