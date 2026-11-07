import { getLiveStreams, twitchLogin } from '@/lib/twitch'
import { membersResponseSchema } from '@/utils/schemas/member-schema'
import { MembersSection } from './members-section'
import { members } from './members'

export async function ServerMemberSection() {
  const liveLogins = new Set((await getLiveStreams()).map((s) => s.login))

  const membersData = membersResponseSchema.parse({
    data: members.map((member) => ({
      ...member,
      isLive:
        member.channel.platform === 'twitch' &&
        liveLogins.has(twitchLogin(member.channel.url)),
    })),
  })

  return <MembersSection membersData={membersData} />
}
