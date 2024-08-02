import { VariantProps } from "cva";
import { button } from "./button";

type BaseProps<E extends React.ElementType> = {
  icon: React.ReactNode;
  label: string;
  as?: E;
};

type ButtonProps<E extends React.ElementType> = BaseProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof BaseProps<E>> &
  VariantProps<typeof button>;

export function IconButton<E extends React.ElementType = "button">({
  className,
  colors,
  icon,
  label,
  size,
  as,
  ...props
}: ButtonProps<E>) {
  const Component = as || "button";

  return (
    <Component
      aria-label={label}
      className={button({ colors, intent: "icon", size, className })}
      {...props}
    >
      {icon}
    </Component>
  );
}
