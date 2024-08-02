"use client";

import Image from "next/image";

import { TwitterIcon } from "@/assets/icons/socials/twitter";
import { TwitchIcon } from "@/assets/icons/socials/twitch";
import { YoutubeIcon } from "@/assets/icons/socials/youtube";
import { BroadcastIcon } from "@/assets/icons/broadcast";

import { MembersData } from "@/interfaces/members-data";
import { IconButton, SocialButton } from "../ui/button";
import { AfreecaIcon } from "@/assets/icons/socials/afreeca";
import { NaverIcon } from "@/assets/icons/socials/naver";

interface MemberCardProps extends MembersData {
  dictionary: Dictionary["members"];
}

export function MemberCard({
  name,
  dictionary,
  image,
  info,
  isLive,
}: MemberCardProps) {
  const languages = info.languages.flat();

  const twitter = info.socialLinks.flat().map((social) => social)[0];
  const youtube = info.socialLinks.flat().map((social) => social)[1];
  const channel = info.channelLink.flat().map((link) => link)[0];

  const hasTwitchChannel = () => {
    const platformLinks = info.channelLink.flat().map((link) => link);

    return platformLinks[0].label === "twitch";
  };

  const hasAfreecaChannel = () => {
    const platformLinks = info.channelLink.flat().map((link) => link);

    return platformLinks[0].label === "afreeca";
  };

  const hasNaverChannel = () => {
    const platformLinks = info.channelLink.flat().map((link) => link);

    return platformLinks[0].label === "chzzk";
  };

  return (
    <article className="bg-white relative group min-w-fit">
      <div className="relative h-[236px]">
        <Image
          src={image.profile}
          alt={`Profile picture of ${name}`}
          loading="lazy"
          quality={100}
          className={`size-full object-cover absolute top-0 group-hover:opacity-0 transition-opacity duration-500 bg-white  `}
          width={412}
          height={236}
        />

        <Image
          src={image.character}
          alt={`Character picture of ${name}`}
          quality={100}
          loading="lazy"
          className={`size-full object-cover group-hover:opacity-100 transition-opacity`}
          width={412}
          height={236}
        />

        {isLive && (
          <p className="absolute top-6 left-4 xxs:left-6 sm:left-4 sm:top-4 text-sm sm:text-xs py-1 px-3 sm:px-2 text-white uppercase bg-[#FF3D3D]">
            {dictionary.live}
          </p>
        )}

        <div className="absolute h-7 sm:h-6 bottom-6 left-4 xxs:left-6 sm:left-4 sm:bottom-4 flex items-center">
          <Image
            src={info.flag.url}
            alt={`${name} flag`}
            loading="lazy"
            width={43}
            height={32}
            className="min-h-full w-max h-full"
          />

          {languages.map((language, index) => (
            <span
              key={index}
              className="text-sm sm:text-xs ml-2 text-[#F0F6FF] bg-[#1F1E33] py-1 px-3 sm:px-2 whitespace-nowrap"
            >
              {language}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6 px-4 xxs:px-6 sm:p-4">
        <div className="flex gap-2 items-center justify-start pb-5">
          {isLive && <BroadcastIcon />}

          <h1 className="font-normal text-[22px] font-dm-sans leading-none">
            {name}
          </h1>
        </div>

        <div className="flex justify-between">
          {hasTwitchChannel() ? (
            <div className="flex items-center gap-2 w-full">
              <div className="flex items-center gap-2">
                {twitter.url && (
                  <IconButton
                    colors="blue"
                    size="large"
                    icon={<TwitterIcon color="white" />}
                    label="Twitter"
                    as="a"
                    href={twitter.url}
                    target="_blank"
                    rel="noreferrer"
                  />
                )}
                <IconButton
                  colors="youtube"
                  size="large"
                  icon={<YoutubeIcon color="white" />}
                  label="Youtube"
                  as="a"
                  href={youtube.url}
                  target="_blank"
                  rel="noreferrer"
                />
              </div>
              <SocialButton
                icon={<TwitchIcon color="white" />}
                className="uppercase flex-1 !justify-center"
                size="large"
                href={channel.url}
                colors={"twitch"}
              >
                Twitch
              </SocialButton>
            </div>
          ) : hasNaverChannel() ? (
            <div className="flex items-center gap-2 w-full">
              <div className="flex items-center gap-2">
                {twitter.url && (
                  <IconButton
                    colors="blue"
                    size="large"
                    icon={<TwitterIcon color="white" />}
                    label="Twitter"
                    as="a"
                    href={twitter.url}
                    target="_blank"
                    rel="noreferrer"
                  />
                )}

                <IconButton
                  colors="youtube"
                  icon={<YoutubeIcon color="white" />}
                  label="Youtube"
                  size="large"
                  as="a"
                  href={youtube.url}
                  target="_blank"
                  rel="noreferrer"
                />
              </div>

              <SocialButton
                icon={<NaverIcon color="white" className="sm:-mt-0.5" />}
                className="uppercase flex-1 !justify-center"
                size="large"
                href={channel.url}
                colors={"naver"}
              >
                Chzzk
              </SocialButton>
            </div>
          ) : hasAfreecaChannel() ? (
            <div className="flex items-center gap-2 w-full">
              <div className="flex items-center gap-2">
                <IconButton
                  colors="youtube"
                  icon={<YoutubeIcon color="white" />}
                  label="Youtube"
                  size="large"
                  as="a"
                  href={youtube.url}
                  target="_blank"
                  rel="noreferrer"
                />
              </div>

              <SocialButton
                icon={<AfreecaIcon color="white" className="sm:-mt-0.5" />}
                className="uppercase flex-1 !justify-center"
                size="large"
                href={channel.url}
                colors={"afreeca"}
              >
                Afreeca
              </SocialButton>
            </div>
          ) : (
            <div className="flex items-center gap-2 w-full">
              <div className="flex items-center gap-2">
                <IconButton
                  colors="light"
                  icon={<TwitterIcon />}
                  label="Twitter"
                  as="a"
                  href={twitter.url}
                  target="_blank"
                  rel="noreferrer"
                />
              </div>

              <SocialButton
                icon={<YoutubeIcon color="white" />}
                className="uppercase flex-1 !justify-center"
                size="large"
                href={youtube.url}
                colors={"youtube"}
              >
                {isLive ? "See live" : "See channel"}
              </SocialButton>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
