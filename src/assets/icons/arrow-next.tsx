import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M9 3 7.942 4.058l4.185 4.192H3v1.5h9.127l-4.185 4.193L9 15l6-6-6-6Z"
    />
  </svg>
)
export { SvgComponent as ArrowNext }
