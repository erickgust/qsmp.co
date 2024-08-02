import { VariantProps, cva } from "cva";

export const button = cva([
  "sm:h-[2.125rem]", "text-base sm:text-xs", "font-pixel", "font-bold", "relative",
  "uppercase", "sm:leading-none", "inline-flex", "items-center", "no-underline",
  "text-center", "sm:before:content-['']", "sm:before:absolute", "before:hidden",
  "sm:before:bottom-px", "sm:before:w-full", "sm:mb-1.5", "sm:before:inline-block",
  "sm:before:translate-y-1.5", "sm:hover:translate-y-0.5", "sm:before:h-1.5",
  "sm:hover:before:translate-y-1", "transition-transform", "duration-150",
  "before:transition-transform", "before:duration-150", "max-sm:py-4",
], {
  variants: {
    intent: {
      primary: [
        'px-6',
        'justify-between',
        'space-x-1',
        'min-w-fit',
        'w-full',
        'sm:px-4',
        'sm:w-auto',
        'sm:justify-center',
      ],
      icon: [
        'w-12.5',
        'sm:w-fit',
        'sm:px-2',
        'justify-center',
        '[&>svg]:size-[1.125rem]',
      ],
      social: [
        'px-6',
        'sm:px-4',
        'justify-center',
      ]
    },
    colors: {
      white: [
        'text-[#1F1E33]',
        'bg-[#F0F6FF]',
        'sm:bg-white',
        'hover:bg-[#D7DFEC]',
        'before:bg-[#D7DFEC]'
      ],
      light: [
        'text-[#1F1E33]',
        'bg-[#F0F6FF]',
        'sm:bg-[#F0F6FF]',
        'hover:bg-[#D7DFEC]',
        'before:bg-[#D7DFEC]'
      ],
      red: [
        'text-white',
        'bg-[#FF3D3D]',
        'sm:bg-[#FF4B4B]',
        'hover:bg-[#EB3939]',
        'before:bg-[#EB3939]'
      ],
      purple: [
        'text-white',
        'bg-[#604DD8]',
        'sm:bg-[#725EF4]',
        'hover:bg-[#604DD8]',
        'before:bg-[#604DD8]'
      ],
      yellow: [
        'text-[#1F1E33]',
        'bg-[#FFDB43]',
        'sm:bg-[#FFE058]',
        'hover:bg-[#EBC832]',
        'before:bg-[#EBC832]'
      ],
      blue: [
        'text-white',
        'bg-[#00ADFF]',
        'sm:bg-[#47C4FF]',
        'hover:bg-[#00ADFF]',
        'before:bg-[#00ADFF]'
      ],
      dark: [
        'text-white',
        'bg-[#1F1E33]',
        'sm:bg-[#35334C]',
        'hover:bg-[#1F1E33]',
        'before:bg-[#1F1E33]'
      ],
      twitter: [
        'text-white',
        'bg-[##1DA1F2]',
        'sm:bg-[#48BAFF]',
        'hover:bg-[##1DA1F2]',
        'before:bg-[##1DA1F2]'
      ],
      twitch: [
        'text-white',
        'bg-[#9146FF]',
        'sm:bg-[#A05FFF]',
        'hover:bg-[#9146FF]',
        'before:bg-[#9146FF]'
      ],
      youtube: [
        'text-white',
        'bg-[#FF0000]',
        'sm:bg-[#FF4343]',
        'hover:bg-[#FF0000]',
        'before:bg-[#FF0000]'
      ],
      afreeca: [
        'text-white',
        'bg-[#399BFF]',
        'sm:bg-[#5BACFF]',
        'hover:bg-[#399BFF]',
        'before:bg-[#399BFF]'
      ],
      naver: [
        'text-white',
        'bg-[#00BF74]',
        'sm:bg-[#00E289]',
        'hover:bg-[#00BF74]',
        'before:bg-[#00BF74]'
      ],
    },
    size: {
      large: [
        '[&>svg]:min-w-[1.375rem] sm:[&>svg]:min-w-[1.125rem]',
        '[&>svg]:min-h-[1.375rem] sm:[&>svg]:min-h-[1.125rem]',
        '[&>svg]:size-[1.375rem] sm:[&>svg]:size-[1.125rem]',
        'gap-x-3 sm:gap-x-2',
      ]
    }
  },
  defaultVariants: {
    intent: "primary",
    colors: "white"
  },
  compoundVariants: [
    { intent: 'social', colors: 'white', size: 'large', className: 'gap-x-4 sm:gap-x-2' }
  ]
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof button> { }

export function Button({ className, intent = "primary", colors, ...props }: ButtonProps) {
  return <button className={button({ intent, colors, className })} {...props} />
}

