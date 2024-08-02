export interface MembersData {
  name: string;
  image: Image;
  isLive: boolean;
  info: Info;
}

export interface Image {
  profile: string;
  character: string;
}

export interface Info {
  languages: string[];
  flag: Flag;
  socialLinks: SocialLink[];
  channelLink: ChannelLink[];
}

export interface Flag {
  url: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface ChannelLink {
  label: string;
  url: string;
}
