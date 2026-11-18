import { streamResponseSchema } from '@/utils/schemas/stream-schema'
import { StreamSection } from '.'
import { defaultVideos } from './defaultVideos'

export async function ServerStreamSection() {
  const streamData = streamResponseSchema.parse({
    type: 'youtube',
    data: defaultVideos,
  })

  return <StreamSection streamData={streamData} />
}
