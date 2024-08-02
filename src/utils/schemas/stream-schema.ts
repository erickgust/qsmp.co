import { z } from "zod";

const streamSchema = z.object({
  id: z.number(),
  name: z.string(),
  avatar: z.string(),
  userName: z.string(),
  viewerCount: z
    .number()
    .or(z.string())
    .transform((val) => {
      return typeof val === "string" ? 0 : val;
    }),
  language: z.string(),
  description: z.string(),
  platform: z.union([
    z.literal("twitch"),
    z.literal("afreeca"),
    z.literal("chzzk")
  ]).optional(),
});

const videoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  channel: z.object({
    name: z.string(),
    avatar: z.string(),
  }),
});

export type Video = z.infer<typeof videoSchema>;

const videoDataSchema = z.object({
  type: z.literal("youtube"),
  data: z.array(videoSchema),
});

const memberDataSchema = z.object({
  type: z.literal("live"),
  data: z.array(streamSchema),
});

export const streamResponseSchema = z.discriminatedUnion("type", [
  videoDataSchema,
  memberDataSchema,
]);
