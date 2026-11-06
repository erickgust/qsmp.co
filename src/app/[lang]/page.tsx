import { Footer } from '@/components/footer'
import { Header } from '@/components/header/header'
import { SocialsSection } from '@/components/socials-section/socials-section'
import { TimerSection } from '@/components/timer-section'
import { TweetSection } from '@/components/tweet-section'
import { YoutubeSection } from '@/components/youtube-section'
import { ServerMemberSection } from '@/components/member-section/server-member-section'
import { ServerStreamSection } from '@/components/stream-section/server-stream-section'

export default function Home() {
  return (
    <>
      <Header />

      {/* padding top 80 on mobile, 0 on desktop because of viewers component */}
      <main id='main' className='pt-20 xl:pt-0'>
        <ServerStreamSection />
        <TimerSection />
        <ServerMemberSection />
        <YoutubeSection />
        <TweetSection />
        <SocialsSection />
      </main>

      <Footer />
    </>
  )
}
