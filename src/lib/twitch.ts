import { cache } from 'react'
import { connection } from 'next/server'
import { z } from 'zod'

import { members } from '@/components/member-section/members'

const tokenSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
})
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

let cachedToken: { value: string; expiresAt: number } | undefined
let lastStreams: LiveStream[] = []

async function getAccessToken(clientId: string, clientSecret: string) {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.value
  }

  const res = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    }),
  })
  if (!res.ok) throw new Error(`Twitch token: ${res.status}`)
  const { access_token, expires_in } = tokenSchema.parse(await res.json())

  cachedToken = {
    value: access_token,
    expiresAt: Date.now() + (expires_in - 60) * 1000,
  }
  return access_token
}

export const getLiveStreams = cache(async (): Promise<LiveStream[]> => {
  await connection()

  const clientId = process.env.TWITCH_CLIENT_ID
  const clientSecret = process.env.TWITCH_CLIENT_SECRET
  if (!clientId || !clientSecret) return []

  try {
    const access_token = await getAccessToken(clientId, clientSecret)

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
    if (streams.length === 0) {
      lastStreams = []
      return lastStreams
    }

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

    lastStreams = streams.map((stream) => ({
      login: stream.user_login,
      title: stream.title,
      viewerCount: stream.viewer_count,
      language: stream.language.toUpperCase(),
      avatar: avatars.get(stream.user_login),
    }))
    return lastStreams
  } catch (error) {
    console.error(error)
    cachedToken = undefined
    return lastStreams
  }
})
