import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill="#000"
      d="M21.333 10.994v9.673a8.667 8.667 0 1 1-17.333 0 8.667 8.667 0 0 1 10.667-8.435v4.217a4.667 4.667 0 1 0 2.667 4.218v-18h4A6.667 6.667 0 0 0 28 9.333v4c-2.523 0-4.84-.875-6.667-2.34Z"
    />
  </svg>
)
export { SvgComponent as TikTokIcon }
