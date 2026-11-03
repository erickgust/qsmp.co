import { useTranslations } from "next-intl";
import quackityIcon from "@/assets/icons/quackity-square.png";
import Image from "next/image";

export function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="bg-[#1F1E33] py-8 flex gap-4 justify-center items-center text-sm xs:text-base">
      <Image
        src={quackityIcon}
        alt="Quackity Studios Logo"
        width={28}
        height={28}
        className="sm:size-6 size-7"
      />

      <p className="font-pixel sm:text-sm text-white">
        {t("paragraph")}{" "}
        <a
          className="font-bold"
          rel="noreferrer"
          target="_blank"
          href="https://twitter.com/QuackityStudios"
        >
          Quackity Studios
        </a>
      </p>
    </footer>
  );
}
