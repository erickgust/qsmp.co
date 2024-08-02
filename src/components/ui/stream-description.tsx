import Image from "next/image";
import { GroupIcon } from "@/assets/icons/group";
import { LangIcon } from "@/assets/icons/lang";
import { ExternalLinkButton } from "./button/external-button";

type StreamDescriptionProps = {
  channel: {
    name: string;
    image: string;
  };
  url: string;
  viewerCount?: number;
  language?: string;
  description: string;
  isLive?: boolean;

  dictionary: Dictionary["stream"];
};

export function StreamDescription({
  language,
  description,
  viewerCount,
  url,
  channel,
  isLive,
  dictionary,
}: StreamDescriptionProps) {
  const formatter = new Intl.NumberFormat("en-US");
  const viewerCountFormatted = formatter
    .format(viewerCount || 0)
    .split(",")
    .join(" ");

  return (
    <div
      className="
      p-8 w-full min-w-[19rem] max-w-full md:max-w-[19rem] h-[28.125rem] md:h-[26.25rem] flex bg-[#F0F6FF]
      bg-lightblue-pattern bg-cover bg-no-repeat
    "
    >
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 h-10 pointer-events-none select-none">
            <Image
              src={channel.image}
              alt={channel.name}
              width={40}
              height={40}
              quality={60}
              className="object-cover h-full"
              priority
            />
            <strong
              className="
              text-[#0B0640] font-normal text-xl
            "
            >
              {channel.name}
            </strong>
          </div>

          {Boolean(isLive) && (
            <div className="group flex gap-2 text-sm md:text-xs font-medium flex-wrap">
              <span className="py-2 md:py-1 px-3.5 md:px-3 bg-red-500 text-white uppercase">
                {dictionary.live}
              </span>

              <span className="py-2 md:py-1 px-3.5 md:px-3 bg-[#0B0640] flex text-white gap-2 md:gap-1 items-center">
                <GroupIcon />
                {viewerCountFormatted}
              </span>

              {Boolean(language) && (
                <span className="py-2 md:py-1 px-3.5 md:px-3 bg-[#0B0640] text-white flex gap-2 md:gap-1 items-center">
                  <LangIcon />
                  {language}
                </span>
              )}
            </div>
          )}

          <p className="text-[#535170] text-base md:text-sm leading-7 line-clamp-[8] break-all">
            {description}
          </p>
        </div>

        <div className="sm:ml-auto">
          <ExternalLinkButton colors={isLive ? "red" : "purple"} href={url}>
            {isLive ? `${dictionary.button.twitch}` : `${dictionary.button.youtube}`}
          </ExternalLinkButton>
        </div>
      </div>
    </div>
  );
}
