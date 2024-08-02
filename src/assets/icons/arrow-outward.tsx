import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.5em"
    height="1.5em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#fff"
      d="m16 8.4-8.9 8.9a.948.948 0 0 1-.7.275.948.948 0 0 1-.7-.275.948.948 0 0 1-.275-.7c0-.283.092-.517.275-.7L14.6 7H7a.965.965 0 0 1-.712-.288A.972.972 0 0 1 6 6c0-.283.096-.52.288-.712A.972.972 0 0 1 7 5h10c.283 0 .521.096.713.288.192.192.288.43.287.712v10a.968.968 0 0 1-.288.713A.964.964 0 0 1 17 17a.965.965 0 0 1-.712-.288A.973.973 0 0 1 16 16V8.4Z"
    />
  </svg>
)
export { SvgComponent as ArrowOutwardRounded }
