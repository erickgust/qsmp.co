import { z } from "zod";

export const viewersSchema = z.object({
  total_viewers: z.number(),
  streamers_online: z.number(),
  // stream_data: z.array(
  //   z.object({
  //     stream_id: z.number(),
  //     player: z.string(),
  //     username: z.string(),
  //     broadcaster_id: z.string(),
  //     community: z.string(),
  //     viewers: z.number(),
  //     followers: z.number()
  //   })
  // )
})
