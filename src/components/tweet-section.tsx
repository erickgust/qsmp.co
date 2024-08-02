import { Inter } from "next/font/google";
import { EmbeddedTweet, type TwitterComponents } from "react-tweet";
// import { getTweet, type Tweet } from "react-tweet/api";
import clsx from "clsx";

import { Heading } from "./ui/heading";
import { ExternalLinkButton } from "./ui/button";
import { Paragraph } from "./ui/paragraph";
import { tweets } from "@/tweetData";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-inter",
});

interface TwitterButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  dictionary: Dictionary["tweets"];
}

function TwitterButton({ dictionary, ...props }: TwitterButtonProps) {
  return (
    <ExternalLinkButton
      colors="blue"
      className={clsx("self-start", props.className)}
      href="https://twitter.com/QuackityStudios"
    >
      {dictionary.button}
    </ExternalLinkButton>
  );
}

async function getTweets(ids: string[]) {
  // const promises = ids.map(async (id) => {
  //   const tweet = await getTweet(id);
  //   return tweet;
  // }) as Promise<Tweet>[];

  // const res = await Promise.all(promises);
  // console.log(JSON.stringify(res, null, 2));

  return tweets;
}

type TweetSectionProps = {
  tweetIds: string[];
  dictionary: Dictionary["tweets"];
};

export const components: TwitterComponents = {
  AvatarImg: (props) => <Image {...props} alt="" />,
  MediaImg: (props) => <Image {...props} alt="" fill unoptimized />,
};

export async function TweetSection({ dictionary }: TweetSectionProps) {
  const tweets = await getTweets([
    "1755318541778075702",
    "1749962949291081766",
    "1743678987983835566",
    "1732570074412646520",
  ]);

  return (
    <section className="py-14 sm:py-16 lg:pb-0 bg-white px-8 scroll-mt-36">
      <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-0 lg:justify-between max-w-5.5xl mx-auto overflow-y-hidden lg:max-h-[37.5rem] ">
        <TwitterButton dictionary={dictionary} className="sm:hidden mt-0" />

        <div
          data-theme="light"
          className={clsx(
            inter.variable,
            "columns-1 md:columns-2 gap-7 tweets max-md:flex justify-center max-w-2xl md:max-lg:mx-auto",
            "h-full"
          )}
        >
          <EmbeddedTweet components={components} tweet={tweets[0]} />

          <span className="hidden lg:block">
            <EmbeddedTweet components={components} tweet={tweets[2]} />
          </span>

          <span className="hidden md:block">
            <EmbeddedTweet components={components} tweet={tweets[1]} />
          </span>

          <span className="hidden lg:block">
            <EmbeddedTweet components={components} tweet={tweets[3]} />
          </span>
        </div>

        <div className="w-fit flex flex-col lg:my-24 lg:max-w-[40ch]">
          <Heading className="mb-6">{dictionary.title}</Heading>

          <div className="flex flex-col gap-2">
            <Paragraph className="!text-[#535170]">
              {dictionary.paragraph.first}
            </Paragraph>

            <Paragraph className="!text-[#535170]">
              {dictionary.paragraph.second}
            </Paragraph>
          </div>

          <TwitterButton
            dictionary={dictionary}
            className="max-sm:hidden mt-8"
          />
        </div>
      </div>
    </section>
  );
}
