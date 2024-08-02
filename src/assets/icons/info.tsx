import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.5em"
    height="1.5em"
    fill="none"
    viewBox="0 0 25 24"
    {...props}
  >
    <path
      fill="#1F1E33"
      d="M11.23 7h2v2h-2V7Zm0 4h2v6h-2v-6Zm1-9c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Z"
    />
  </svg>
)
export { SvgComponent as InfoIcon }
