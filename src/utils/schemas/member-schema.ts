import { z } from "zod";

const memberSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.object({ profile: z.string(), character: z.string() }),
  isLive: z.boolean(),
  info: z.object({
    languages: z.array(z.string()),
    flag: z.object({ url: z.string() }),
    socialLinks: z.array(z.object({ label: z.string(), url: z.string() })),
    channelLink: z.array(z.object({ label: z.string(), url: z.string() })),
  }),
});

export const membersResponseSchema = z.object({
  data: z.array(memberSchema),
});

export type Member = z.infer<typeof memberSchema>;

export type MemberResponse = z.infer<typeof membersResponseSchema>;
