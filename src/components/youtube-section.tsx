import { getTranslations } from 'next-intl/server'
import { ExternalLinkButton } from './ui/button'
import { Heading } from './ui/heading'
import { Paragraph } from './ui/paragraph'
import { YoutubeEmbed } from './ui/youtube-embed'
import { defaultVideos } from './stream-section/defaultVideos'

type YoutubeButtonProps = { className?: string; children: React.ReactNode }

function YoutubeButton({ className, children }: YoutubeButtonProps) {
  return (
    <ExternalLinkButton
      colors='dark'
      className={className}
      href='https://www.youtube.com/@QSMPInfo/?sub_confirmation=1'
    >
      {children}
    </ExternalLinkButton>
  )
}

export async function YoutubeSection() {
  const t = await getTranslations('youtube')
  const [latestVideo] = defaultVideos

  return (
    <section
      className='px-8 py-14 sm:py-16 bg-[#604DD8] bg-purple-pattern scroll-mt-10'
      id='updates'
    >
      <div className='flex max-w-5.5xl mx-auto flex-col md:flex-row'>
        <div className='flex-1 md:pr-8'>
          <Heading className='text-white mb-6 md:max-w-sm'>
            {t('title')}
          </Heading>

          <div className='flex flex-col gap-2 md:max-w-md'>
            <Paragraph>{t('paragraph.first')}</Paragraph>
            <Paragraph>{t('paragraph.second')}</Paragraph>
          </div>

          <YoutubeButton className='max-md:hidden mt-8'>
            {t('button')}
          </YoutubeButton>
        </div>

        <div className='flex flex-1 flex-col md:flex-row items-stretch xs:items-center md:justify-end md:items-center'>
          <div className='w-full my-10 md:my-0'>
            <YoutubeEmbed id={latestVideo.id} title={latestVideo.title} />
          </div>

          <YoutubeButton className='block md:hidden xs:max-md:px-8'>
            {t('button')}
          </YoutubeButton>
        </div>
      </div>
    </section>
  )
}
