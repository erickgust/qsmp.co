import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.5em"
    height="1.5em"
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      fill="#fff"
      d="M6.75 7.5v6l5.25-3-5.25-3Zm9-3h-5.685l2.468-2.467L12 1.5l-3 3h-.023l-3-3-.517.533L7.92 4.5H2.25c-.825 0-1.5.675-1.5 1.5v9c0 .825.675 1.5 1.5 1.5h13.5c.825 0 1.5-.675 1.5-1.5V6c0-.825-.675-1.5-1.5-1.5Zm0 10.5H2.25V6h13.5v9Z"
    />
  </svg>
)
export { SvgComponent as AfreecaIcon }
