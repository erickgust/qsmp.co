import { useFormatter, useTranslations } from "next-intl";
import { BroadcastIcon } from "@/assets/icons/broadcast";
import { useEvent } from "@/context/use-is-event";

type TotalViewersProps = {
  loading: boolean;
  totalViewers: number;
};

export function TotalCurrentViewers({
  loading,
  totalViewers,
}: TotalViewersProps) {
  const t = useTranslations("nav");
  const { isEvent } = useEvent();

  const totalViewersFormatted = useFormatter().number(totalViewers);

  return (
    <p className="text-xs flex gap-2 text-[#1F1E33] uppercase items-center">
      <BroadcastIcon className="-mt-1" />

      <span className="whitespace-nowrap">{totalViewersFormatted}</span>
      <span className="whitespace-nowrap">
        {isEvent ? "Purgatory 2 \nTotal Viewers" : t("counter")}
      </span>
    </p>
  );
}
