import { ArrowToDownIcon } from "@/assets/icons/arrow-to-down";

export type NavbarLinkMobileProps = {
  label: string;
  href: string;
  arrowColor?: string;
  toggleMenuMobileModal: () => void;
};

export function NavbarLinkMobile({
  label,
  href,
  arrowColor,
  toggleMenuMobileModal,
}: NavbarLinkMobileProps) {
  return (
    <a
      onClick={toggleMenuMobileModal}
      className="text-xl uppercase text-[#1F1E33] group flex gap-2 items-center justify-end transition-colors px-3 py-[22px] lg:px-[26px] w-full border-b "
      href={href}
    >
      {label}

      <ArrowToDownIcon color={arrowColor} className="transition-all size-6" />
    </a>
  );
}
