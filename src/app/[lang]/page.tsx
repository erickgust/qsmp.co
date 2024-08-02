import { Footer } from "@/components/footer";
import { Header } from "@/components/header/header";
import { SocialsSection } from "@/components/socials-section/socials-section";
import { TimerSection } from "@/components/timer-section";
import { TweetSection } from "@/components/tweet-section";
import { YoutubeSection } from "@/components/youtube-section";
import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "@/i18n-config";
import { z } from "zod";
import { streamResponseSchema } from "@/utils/schemas/stream-schema";
import { ServerMemberSection } from "@/components/member-section/server-member-section";
import { ServerStreamSection } from "@/components/stream-section/server-stream-section";
import { cookies } from "next/headers";
import { Widget } from "@/components/widget";

type HomeProps = {
  params: {
    lang: Locale;
  };
};

export type Members = z.infer<typeof streamResponseSchema>;

export default async function Home({ params: { lang } }: HomeProps) {
  const dictionary = await getDictionary(lang);
  const token = cookies().get("token")?.value;

  return (
    <>
      <Header dictionary={dictionary.nav} />

      {/* padding top 80 on mobile, 0 on desktop because of viewers component */}
      <main className="pt-20 xl:pt-0">
        <ServerStreamSection dictionary={dictionary.stream} />
        <TimerSection dictionary={dictionary.timer} />
        <ServerMemberSection dictionary={dictionary.members} />
        <YoutubeSection dictionary={dictionary.youtube} />
        <TweetSection dictionary={dictionary.tweets} tweetIds={[]} />
        <SocialsSection dictionary={dictionary.socials} />
      </main>

      <Footer dictionary={dictionary.footer} />

      <Widget dictionary={dictionary.widget} />
    </>
  );
}
