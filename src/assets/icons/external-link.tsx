import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 18 18"
    width={18}
    height={18}
    {...props}
  >
    <path
      fill="currentColor"
      d="m4.8 13.5-1.05-1.05 7.2-7.2H4.5v-1.5h9v9H12V6.3l-7.2 7.2Z"
    />
  </svg>
)
export { SvgComponent as ExternalLinkIcon }
