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
      d="M15 8.25H5.872l4.193-4.192L9 3 3 9l6 6 1.057-1.057L5.872 9.75H15v-1.5Z"
    />
  </svg>
)
export { SvgComponent as ArrowBack }
