import { cache } from 'react'
import { z } from 'zod'

import { members } from '@/components/member-section/members'

const tokenSchema = z.object({ access_token: z.string() })
const streamsSchema = z.object({
  data: z.array(
    z.object({
      user_login: z.string(),
      title: z.string(),
      viewer_count: z.number(),
      language: z.string(),
    }),
  ),
})
const usersSchema = z.object({
  data: z.array(z.object({ login: z.string(), profile_image_url: z.string() })),
})

export type LiveStream = {
  login: string
  title: string
  viewerCount: number
  language: string
  avatar?: string
}

export function twitchLogin(channelUrl: string) {
  return new URL(channelUrl).pathname.split('/')[1].toLowerCase()
}

const logins = members
  .filter((member) => member.channel.platform === 'twitch')
  .map((member) => twitchLogin(member.channel.url))

export const getLiveStreams = cache(async (): Promise<LiveStream[]> => {
  const clientId = process.env.TWITCH_CLIENT_ID
  const clientSecret = process.env.TWITCH_CLIENT_SECRET
  if (!clientId || !clientSecret) return []

  try {
    const tokenRes = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
      }),
    })
    if (!tokenRes.ok) throw new Error(`Twitch token: ${tokenRes.status}`)
    const { access_token } = tokenSchema.parse(await tokenRes.json())

    const helix = async (path: string, param: string, values: string[]) => {
      const query = new URLSearchParams(values.map((value) => [param, value]))
      const res = await fetch(`https://api.twitch.tv/helix/${path}?${query}`, {
        headers: {
          'Client-Id': clientId,
          Authorization: `Bearer ${access_token}`,
        },
      })
      if (!res.ok) throw new Error(`Twitch ${path}: ${res.status}`)
      return res.json()
    }

    const streams = streamsSchema.parse(
      await helix('streams', 'user_login', logins),
    ).data
    if (streams.length === 0) return []

    const users = usersSchema.parse(
      await helix(
        'users',
        'login',
        streams.map((stream) => stream.user_login),
      ),
    ).data
    const avatars = new Map(
      users.map((user) => [user.login, user.profile_image_url]),
    )

    return streams.map((stream) => ({
      login: stream.user_login,
      title: stream.title,
      viewerCount: stream.viewer_count,
      language: stream.language.toUpperCase(),
      avatar: avatars.get(stream.user_login),
    }))
  } catch (error) {
    console.error(error)
    return []
  }
})
