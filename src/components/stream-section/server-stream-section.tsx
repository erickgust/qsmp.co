import { getLiveStreams, twitchLogin } from '@/lib/twitch'
import { streamResponseSchema } from '@/utils/schemas/stream-schema'
import { StreamSection } from '.'
import { defaultVideos } from './defaultVideos'
import { members } from '../member-section/members'

export async function ServerStreamSection() {
  const live = await getLiveStreams()

  const liveStreams = live.flatMap((stream, i) => {
    const member = members.find(
      (member) =>
        member.channel.platform === 'twitch' &&
        twitchLogin(member.channel.url) === stream.login,
    )
    if (!member) return []

    return {
      id: i,
      name: member.name,
      avatar: stream.avatar ?? member.characterImage,
      userName: stream.login,
      viewerCount: stream.viewerCount,
      language: stream.language,
      description: stream.title,
      platform: 'twitch' as const,
    }
  })

  const streamData = streamResponseSchema.parse(
    liveStreams.length > 0
      ? { type: 'live', data: liveStreams }
      : { type: 'youtube', data: defaultVideos },
  )

  return <StreamSection streamData={streamData} />
}
