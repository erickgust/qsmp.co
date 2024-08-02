import { z } from "zod";
import { ExternalLinkButton } from "./ui/button/external-button";
import { Heading } from "./ui/heading";
import { Paragraph } from "./ui/paragraph";
import { YoutubeEmbed } from "./youtube-embed";
import { defaultVideos } from "./stream-section/defaultVideos";

interface YoutubeButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  dictionary: Dictionary["youtube"];
}

function YoutubeButton({
  dictionary,
  className = "",
  ...props
}: YoutubeButtonProps) {
  return (
    <ExternalLinkButton
      colors="dark"
      className={className}
      href="https://www.youtube.com/@QSMPInfo/?sub_confirmation=1"
    >
      {dictionary.button}
    </ExternalLinkButton>
  );
}

type YoutubeSectionProps = {
  dictionary: Dictionary["youtube"];
};

async function getYoutubeData() {
  try {
    const youtubeSchema = z.object({
      latestYouTubeVideo: z.object({
        id: z.string(),
        title: z.string(),
      }),
    });

    const parsedData = youtubeSchema.parse({
      latestYouTubeVideo: {
        id: "qR-GBSpbpR4",
        title: "QSMP 2024 - Restarting Isla Quesadilla",
      },
    });

    return parsedData.latestYouTubeVideo;
  } catch {
    console.error("An error occurred while fetching the youtube data.");
    return {
      id: defaultVideos[0].id,
      title: defaultVideos[0].title,
    };
  }
}

export async function YoutubeSection({ dictionary }: YoutubeSectionProps) {
  const video = await getYoutubeData();

  return (
    <section
      className="px-8 py-14 sm:py-16 bg-[#604DD8] bg-purple-pattern scroll-mt-10"
      id="updates"
    >
      <div className="flex max-w-5.5xl mx-auto flex-col md:flex-row">
        <div className="flex-1 md:pr-8">
          <Heading className="text-white mb-6 md:max-w-sm">
            {dictionary.title}
          </Heading>

          <div className="flex flex-col gap-2 md:max-w-md">
            <Paragraph>{dictionary.paragraph.first}</Paragraph>
            <Paragraph>{dictionary.paragraph.second}</Paragraph>
          </div>

          <YoutubeButton
            dictionary={dictionary}
            className="max-md:hidden mt-8"
          />
        </div>

        <div className="flex flex-1 flex-col md:flex-row items-stretch xs:items-center md:justify-end md:items-center">
          <div className="w-full my-10 md:my-0">
            <YoutubeEmbed id={video.id} title={video.title} />
          </div>

          <YoutubeButton
            dictionary={dictionary}
            className="block md:hidden xs:max-md:px-8"
          />
        </div>
      </div>
    </section>
  );
}
