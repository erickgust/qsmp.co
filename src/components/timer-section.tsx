import { useTranslations } from 'next-intl'
import { ExternalLinkButton } from './ui/button'
import { Paragraph } from './ui/paragraph'

export function TimerSection() {
  const t = useTranslations('timer')
  return (
    <section className='bg-[#1F1E33] px-6 sm:px-8 py-14 sm:py-11 bg-darkblue-pattern'>
      <div className='mx-auto flex flex-col-reverse md:items-center md:flex-row max-w-5.5xl md:justify-center'>
        <div className='max-w-prose md:max-w-[42ch] flex flex-col items-center'>
          <Paragraph className='mb-6 !text-base text-center'>
            {t('paragraph')}
          </Paragraph>

          <div className='text-center md:text-start max-sm:w-full'>
            <ExternalLinkButton
              colors='yellow'
              href='https://www.twitch.tv/qsmp'
            >
              {t('button')}
            </ExternalLinkButton>
          </div>
        </div>
      </div>
    </section>
  )
}
