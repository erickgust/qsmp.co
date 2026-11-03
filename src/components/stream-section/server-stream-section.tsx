import { streamResponseSchema } from "@/utils/schemas/stream-schema";
import { StreamSection } from ".";
import { defaultVideos } from "./defaultVideos";

async function getStreamData() {
  const data = {
    type: "youtube",
    data: defaultVideos,
  };
  return streamResponseSchema.parse(data);
}

export async function ServerStreamSection() {
  const streamData = await getStreamData();

  return <StreamSection members={streamData} />;
}
