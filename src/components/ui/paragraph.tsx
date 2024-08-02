import clsx from 'clsx';

type ParagraphProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLParagraphElement>;

export function Paragraph({ children, className, ...props }: ParagraphProps) {
  return (
    <p
      className={clsx('sm:text-sm leading-6 font-normal text-white text-pretty', className)}
      {...props}
    >
      {children}
    </p>
  );
}
