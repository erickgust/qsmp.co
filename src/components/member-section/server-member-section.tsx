import { membersResponseSchema } from "@/utils/schemas/member-schema";
import { MembersSection } from "./members-section";
import { members } from "./members";

async function getMembersData() {
  const parsedData = membersResponseSchema.parse({ data: members });

  return parsedData;
}

type MemberSectionProps = {
  dictionary: Dictionary["members"];
};

export async function ServerMemberSection({ dictionary }: MemberSectionProps) {
  const membersData = await getMembersData();

  return <MembersSection membersData={membersData} dictionary={dictionary} />;
}
