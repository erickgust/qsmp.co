import { getTranslations } from 'next-intl/server'
import { z } from 'zod'
import { ExternalLinkButton } from './ui/button/external-button'
import { Heading } from './ui/heading'
import { Paragraph } from './ui/paragraph'
import { YoutubeEmbed } from './youtube-embed'
import { defaultVideos } from './stream-section/defaultVideos'

function YoutubeButton({
  className = '',
  children,
}: React.ComponentPropsWithoutRef<'button'>) {
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

async function getYoutubeData() {
  try {
    const youtubeSchema = z.object({
      latestYouTubeVideo: z.object({
        id: z.string(),
        title: z.string(),
      }),
    })

    const parsedData = youtubeSchema.parse({
      latestYouTubeVideo: {
        id: 'qR-GBSpbpR4',
        title: 'QSMP 2024 - Restarting Isla Quesadilla',
      },
    })

    return parsedData.latestYouTubeVideo
  } catch {
    console.error('An error occurred while fetching the youtube data.')
    return {
      id: defaultVideos[0].id,
      title: defaultVideos[0].title,
    }
  }
}

export async function YoutubeSection() {
  const t = await getTranslations('youtube')
  const video = await getYoutubeData()

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
            <YoutubeEmbed id={video.id} title={video.title} />
          </div>

          <YoutubeButton className='block md:hidden xs:max-md:px-8'>
            {t('button')}
          </YoutubeButton>
        </div>
      </div>
    </section>
  )
}
