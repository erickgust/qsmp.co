import { streamResponseSchema } from "@/utils/schemas/stream-schema";
import { StreamSection } from ".";
import { defaultVideos } from "./defaultVideos";

async function getStreamData(isEvent?: boolean) {
  const data = {
    type: "youtube",
    data: defaultVideos,
  };
  return streamResponseSchema.parse(data);
}

type StreamSectionProps = {
  isEvent?: boolean;
};

export async function ServerStreamSection({
  isEvent,
}: StreamSectionProps) {
  const streamData = await getStreamData(isEvent);

  return <StreamSection members={streamData} />;
}
