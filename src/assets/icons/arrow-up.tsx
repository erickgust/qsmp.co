import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1.5em"
    height="1.5em"
    fill="none"
    {...props}
  >
    <path fill="#1F1E33" d="m12 8.6 6 6-1.4 1.4-4.6-4.6L7.4 16 6 14.6l6-6Z" />
  </svg>
)
export { SvgComponent as ArrowUp }
