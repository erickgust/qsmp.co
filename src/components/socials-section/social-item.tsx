import { InstagramIcon } from "@/assets/icons/socials/instagram";
import { FacebookIcon } from "@/assets/icons/socials/facebook";
import { RedditIcon } from "@/assets/icons/socials/reddit";
import { TikTokIcon } from "@/assets/icons/socials/tiktok";
import { TwitterIcon } from "@/assets/icons/socials/twitter";
import { TwitchIcon } from "@/assets/icons/socials/twitch";
import { YoutubeIcon } from "@/assets/icons/socials/youtube";

import { links } from "./social-data";
import { SVGProps } from "react";
import { SocialButton } from "../ui/button";

type SocialMediaItemProps = {
  name: string;
  icon: keyof IconType;
  url: string;
};

type IconType = Record<
  (typeof links)[number]["icon"],
  (props: SVGProps<SVGSVGElement>) => React.JSX.Element
>;

export function SocialMediaItem({ name, icon, url }: SocialMediaItemProps) {
  const Icons: IconType = {
    instagram: InstagramIcon,
    facebook: FacebookIcon,
    reddit: RedditIcon,
    tiktok: TikTokIcon,
    twitter: TwitterIcon,
    twitch: (props) => <TwitchIcon {...props} color="#9146FF" />,
    youtube: YoutubeIcon,
  };

  const Icon = Icons[icon];

  return (
    <li key={url} className="inline-block">
      <SocialButton
        icon={<Icon aria-hidden="true" />}
        isExternal
        href={url}
        className="normal-case w-full"
      >
        {name}
      </SocialButton>
    </li>
  );
}
