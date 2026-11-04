import { useTranslations } from 'next-intl'
import { ArrowUp } from '@/assets/icons/arrow-up'
import { useFilter } from '@/context/use-filter-context'
import { useDisclosure } from '@/lib/hooks/useDisclosure'

export function FilterDropdown() {
  const t = useTranslations('members')
  const { isOpen, rootRef, buttonProps, panelProps } = useDisclosure()

  const { languages, selectedLanguages, toggleLanguage } = useFilter()

  return (
    <div
      ref={rootRef}
      className='relative inline-block text-left w-full md:w-auto min-w-[250px]'
    >
      <div>
        <button
          {...buttonProps}
          className='inline-flex items-center justify-between gap-7 w-full px-6 py-4 bg-[#F0F6FF] border border-[#D7DFEC] font-medium text-[#1F1E33] text-lg'
        >
          <span className='flex items-center justify-between w-full gap-2'>
            {selectedLanguages.length > 0 ? (
              selectedLanguages.join(', ')
            ) : (
              <span className='text-lg'>{t('filter')}</span>
            )}

            <ArrowUp
              aria-hidden='true'
              data-open={isOpen}
              className='size-6 rotate-180 data-[open=true]:rotate-0 transition-transform duration-150 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none'
            />
          </span>
        </button>
      </div>

      <fieldset
        {...panelProps}
        className='origin-top absolute z-10 right-0 w-full bg-[#F0F6FF] ring-1 ring-black ring-opacity-5 motion-safe:animate-dropdown-in motion-reduce:animate-fade-in'
      >
        <legend className='sr-only'>{t('filter')}</legend>
        {languages.map((language, index) => (
          <label
            key={index}
            className='flex items-center gap-3 px-4 py-4 border border-[#D7DFEC] w-full cursor-pointer'
          >
            <input
              type='checkbox'
              checked={selectedLanguages.includes(language.label)}
              onChange={() => toggleLanguage(language.label)}
              className='form-checkbox size-5 text-blue-600 cursor-pointer css-checkbox'
            />

            <span>{language.label}</span>
          </label>
        ))}
      </fieldset>
    </div>
  )
}
