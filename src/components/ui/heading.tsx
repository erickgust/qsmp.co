import clsx from 'clsx'

type HeadingProps = {
  children: React.ReactNode
  className?: string
} & React.JSX.IntrinsicElements['h2']

export function Heading({ children, className, ...props }: HeadingProps) {
  const classes = clsx(
    'text-2.5xl font-pixel font-bold uppercase text-[#1F1E33] text-balance',
    className,
  )

  return (
    <h2 className={classes} {...props}>
      {children}
    </h2>
  )
}
