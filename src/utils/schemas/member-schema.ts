import { z } from 'zod'

export const platformSchema = z.enum(['twitch', 'chzzk', 'afreeca'])
const languageSchema = z.enum(['EN', 'ES', 'PT-BR', 'FR', 'DE', 'KO'])

const memberSchema = z.object({
  id: z.number(),
  name: z.string(),
  characterImage: z.string(),
  // flagpack icon name, e.g. "us" or "gb-ukm"
  flag: z.string().regex(/^[a-z]{2}(-[a-z]+)?$/),
  languages: z.array(languageSchema).nonempty(),
  channel: z.object({ platform: platformSchema, url: z.string().url() }),
  twitter: z.string().url().optional(),
  youtube: z.string().url(),
  isLive: z.boolean().default(false),
})

export const membersResponseSchema = z.object({
  data: z.array(memberSchema),
})

export type Member = z.infer<typeof memberSchema>
export type MemberInput = z.input<typeof memberSchema>
export type Platform = z.infer<typeof platformSchema>
export type Language = z.infer<typeof languageSchema>

export type MemberResponse = z.infer<typeof membersResponseSchema>
