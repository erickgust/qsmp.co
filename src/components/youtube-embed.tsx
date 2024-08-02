'use client'

import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

type YoutubeEmbedProps = {
  id: string;
  title: string;
}

export function YoutubeEmbed ({ id, title }: YoutubeEmbedProps) {
  return (
    <LiteYouTubeEmbed
      id={id}
      title={title}
    />
  )
}
