import { membersResponseSchema } from '@/utils/schemas/member-schema'
import { MembersSection } from './members-section'
import { members } from './members'

export async function ServerMemberSection() {
  const membersData = membersResponseSchema.parse({ data: members })

  return <MembersSection membersData={membersData} />
}
