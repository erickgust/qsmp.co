import { ArrowToDownIcon } from '@/assets/icons/arrow-to-down'

type NavbarLinkMobileProps = {
  label: string
  href: string
  onClick: () => void
}

export function NavbarLinkMobile({
  label,
  href,
  onClick,
}: NavbarLinkMobileProps) {
  return (
    <a
      onClick={onClick}
      className='text-xl uppercase text-[#1F1E33] group flex gap-2 items-center justify-end px-3 py-[22px] lg:px-[26px] w-full border-b '
      href={href}
    >
      {label}

      <ArrowToDownIcon color='#1F1E33' className='size-6' />
    </a>
  )
}
