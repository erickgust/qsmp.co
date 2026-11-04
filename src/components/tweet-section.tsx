import { getTranslations } from 'next-intl/server'
import { Inter } from 'next/font/google'
import clsx from 'clsx'

import { Heading } from './ui/heading'
import { ExternalLinkButton } from './ui/button'
import { Paragraph } from './ui/paragraph'
import { Tweet } from '@/lib/tweet'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
})

function TwitterButton(props: React.ComponentPropsWithoutRef<'button'>) {
  return (
    <ExternalLinkButton
      colors='blue'
      className={clsx('self-start', props.className)}
      href='https://twitter.com/QuackityStudios'
    >
      {props.children}
    </ExternalLinkButton>
  )
}

export async function TweetSection() {
  const t = await getTranslations('tweets')

  return (
    <section className='py-14 sm:py-16 lg:pb-0 bg-white px-8 scroll-mt-36'>
      <div className='flex flex-col-reverse lg:flex-row gap-10 lg:gap-0 lg:justify-between max-w-5.5xl mx-auto overflow-y-hidden lg:max-h-[37.5rem] '>
        <TwitterButton className='sm:hidden mt-0'>{t('button')}</TwitterButton>

        <div
          data-theme='light'
          className={clsx(
            inter.variable,
            'columns-1 md:columns-2 gap-7 tweets max-md:flex justify-center max-w-2xl md:max-lg:mx-auto',
            'h-full',
          )}
        >
          <Tweet id='1755318541778075702' />

          <span className='hidden lg:block'>
            <Tweet id='1749962949291081766' />
          </span>

          <span className='hidden md:block'>
            <Tweet id='1743678987983835566' />
          </span>

          <span className='hidden lg:block'>
            <Tweet id='1732570074412646520' />
          </span>
        </div>

        <div className='w-fit flex flex-col lg:my-24 lg:max-w-[40ch]'>
          <Heading className='mb-6'>{t('title')}</Heading>

          <div className='flex flex-col gap-2'>
            <Paragraph className='!text-[#535170]'>
              {t('paragraph.first')}
            </Paragraph>

            <Paragraph className='!text-[#535170]'>
              {t('paragraph.second')}
            </Paragraph>
          </div>

          <TwitterButton className='max-sm:hidden mt-8'>
            {t('button')}
          </TwitterButton>
        </div>
      </div>
    </section>
  )
}
