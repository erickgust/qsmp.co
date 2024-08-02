import { VariantProps } from "cva"
import { button } from "./button"
import { ExternalLinkIcon } from "@/assets/icons/external-link"

type SocialButtonProps = {
  icon: React.ReactNode
  isExternal?: boolean
} & React.AnchorHTMLAttributes<HTMLAnchorElement>
  & VariantProps<typeof button>

export function SocialButton ({
  className,
  colors,
  children,
  icon,
  isExternal,
  ...props
}: SocialButtonProps) {
  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      className={button({ colors, intent: 'social', size: 'large', className })}
      {...props}
    >
      {icon}
      <span>
        {children}
      </span>

      {isExternal && (
        <ExternalLinkIcon
          className="!ml-auto sm:hidden"
          aria-hidden="true"
          focusable="false"
        />
      )}
    </a>
  )
}
