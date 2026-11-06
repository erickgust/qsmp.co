'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { Heading } from '../ui/heading'
import { MemberCard } from './member-card'
import { FilterDropdown } from './filter-dropdown'
import type { Language, MemberResponse } from '@/utils/schemas/member-schema'

type MembersSectionProps = {
  membersData: MemberResponse
}

export function MembersSection({ membersData }: MembersSectionProps) {
  const t = useTranslations('members')
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([])

  const languages = [
    ...new Set(membersData.data.flatMap((member) => member.languages)),
  ]

  const toggleLanguage = (language: Language) => {
    setSelectedLanguages((selected) =>
      selected.includes(language)
        ? selected.filter((lang) => lang !== language)
        : [...selected, language],
    )
  }

  const visibleMembers = membersData.data
    .toSorted((a, b) => Number(b.isLive) - Number(a.isLive))
    .filter(
      (member) =>
        selectedLanguages.length === 0 ||
        member.languages.some((language) =>
          selectedLanguages.includes(language),
        ),
    )

  return (
    <section
      className='bg-[#F0F6FF] px-8 py-14 sm:py-16 flex flex-col justify-center'
      id='members'
    >
      <div className='max-w-5.5xl mx-auto'>
        <div className='w-full gap-10 flex flex-col sm:flex-row md:justify-between items-center my-10 md:mb-10'>
          <Heading>{t('title')}</Heading>

          <FilterDropdown
            languages={languages}
            selectedLanguages={selectedLanguages}
            toggleLanguage={toggleLanguage}
          />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4 md:gap-6 gap-8'>
          {visibleMembers.map((member) => (
            <MemberCard key={member.id} {...member} />
          ))}
        </div>
      </div>
    </section>
  )
}
