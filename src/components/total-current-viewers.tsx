import { BroadcastIcon } from "@/assets/icons/broadcast";
import { useEvent } from "@/context/use-is-event";

type TotalViewersProps = {
  loading: boolean;
  totalViewers: number;
  dictionary: Dictionary["nav"];
};

export function TotalCurrentViewers({
  loading,
  totalViewers,
  dictionary,
}: TotalViewersProps) {
  const { isEvent } = useEvent();

  const totalViewersFormatted = totalViewers
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <p className="text-xs 2xl:text-sm flex gap-2 text-[#1F1E33] uppercase items-center font-bold">
      <BroadcastIcon className="-mt-1" />

      <span className="whitespace-nowrap">{totalViewersFormatted}</span>
      <span className="whitespace-nowrap">
        {isEvent ? "Purgatory 2 \nTotal Viewers" : dictionary.counter}
      </span>
    </p>
  );
}
