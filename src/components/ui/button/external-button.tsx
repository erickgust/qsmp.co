import { VariantProps } from "cva";
import { button } from "./button";
import { ExternalLinkIcon } from "@/assets/icons/external-link";

type BaseProps<E extends React.ElementType> = {
  as?: E;
}

type ExternalLinkProps<E extends React.ElementType> = BaseProps<E>
  & Omit<React.ComponentPropsWithoutRef<E>, keyof BaseProps<E>>
  & VariantProps<typeof button>

export function ExternalLinkButton<E extends React.ElementType = 'a'> ({
  className,
  as,
  colors,
  children,
  intent = "primary",
  ...props
}: ExternalLinkProps<E>) {
  const Component = as || 'a'
  const anchorProps = as ? {} : { rel: 'noopener noreferrer', target: '_blank' }

  return (
    <Component
      className={button({ colors, intent, className })}
      {...anchorProps}
      {...props}
    >
      <span className="text-left">{children}</span>
      <ExternalLinkIcon
        aria-hidden='true'
        focusable='false'
        className="min-w-[1.125rem] min-h-[1.125rem]"
      />
    </Component>
  )
}
