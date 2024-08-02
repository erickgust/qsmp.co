import { ArrowToDownIcon } from "@/assets/icons/arrow-to-down";

export type NavbarProps = {
  label: string;
  href: string;
  target?: string;
  opacity?: number;
};

export function NavbarLink({ label, href, target }: NavbarProps) {
  return (
    <a
      target={target}
      className="text-xs 2xl:text-sm uppercase text-[#1F1E33] hover:text-[#604DD8] group flex gap-2 items-center transition-colors py-[22px] pl-6"
      href={href}
    >
      <span>{label}</span>

      <ArrowToDownIcon
        className="
          -mt-px opacity-0 group-hover:opacity-100 transition-all
          transform -translate-x-3 group-hover:translate-x-0 min-w-fit
        "
      />
    </a>
  );
}
