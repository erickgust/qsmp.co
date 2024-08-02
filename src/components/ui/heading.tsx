import clsx from "clsx";

type HeadingProps = {
  children: React.ReactNode;
  className?: string;
} & JSX.IntrinsicElements["h1"];

export function Heading({ children, className }: HeadingProps) {
  const classes = clsx("text-2.5xl font-pixel font-bold uppercase text-[#1F1E33] text-balance", className);

  return (
    <h1 className={classes}>
      {children}
    </h1>
  );
}
