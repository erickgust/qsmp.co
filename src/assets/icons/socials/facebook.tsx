import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 32 32"
    width="1.5em"
    height="1.5em"
    {...props}
  >
    <path
      fill="#1877F2"
      d="M16 2.72c-7.334 0-13.334 5.987-13.334 13.36 0 6.667 4.88 12.2 11.254 13.2v-9.333h-3.387V16.08h3.387v-2.947c0-3.346 1.986-5.186 5.04-5.186 1.453 0 2.973.253 2.973.253v3.293h-1.68c-1.653 0-2.173 1.027-2.173 2.08v2.507h3.707l-.6 3.867H18.08v9.333a13.333 13.333 0 0 0 11.253-13.2c0-7.373-6-13.36-13.333-13.36Z"
    />
  </svg>
)
export { SvgComponent as FacebookIcon }
