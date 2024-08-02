"use client";

import { useQuery } from "@tanstack/react-query";

import { Heading } from "../ui/heading";
import { MemberCard } from "./member-card";
import { MembersData } from "@/interfaces/members-data";
import { FilterDropdown } from "../ui/filter-dropdown";
import { useFilter } from "@/context/use-filter-context";

import {
  MemberResponse,
  membersResponseSchema,
} from "@/utils/schemas/member-schema";
import { members } from "./members";

type MembersSectionProps = {
  membersData: MemberResponse;
  dictionary: Dictionary["members"];
};

export function MembersSection({
  membersData,
  dictionary,
}: MembersSectionProps) {
  const {
    data: { data },
  } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const parsedData = membersResponseSchema.parse({ data: members });

      return parsedData;
    },
    initialData: membersData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { selectedLanguages } = useFilter();
  const isLoading = false;

  const sortByIsLive = (memberA: MembersData, memberB: MembersData) => {
    if (memberA.isLive && !memberB.isLive) {
      return -1;
    }

    if (!memberA.isLive && memberB.isLive) {
      return 1;
    }

    return 0;
  };

  data.sort(sortByIsLive);

  const filteredData = data.filter((member) => {
    if (selectedLanguages.length === 0) {
      return true;
    }

    const hasSelectedLanguage = selectedLanguages.some((language) =>
      member.info.languages.includes(language)
    );

    return hasSelectedLanguage;
  });

  return (
    <section
      className="bg-[#F0F6FF] px-8 py-14 sm:py-16 flex flex-col justify-center"
      id="members"
    >
      <div className="max-w-5.5xl mx-auto">
        <div className="w-full gap-10 flex flex-col sm:flex-row md:justify-between items-center my-10 md:mb-10">
          <Heading>{dictionary.title}</Heading>

          <FilterDropdown dictionary={dictionary} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4 md:gap-6 gap-8">
          {!isLoading &&
            filteredData.map((member) => (
              <MemberCard key={member.id} dictionary={dictionary} {...member} />
            ))}
        </div>
      </div>
    </section>
  );
}
