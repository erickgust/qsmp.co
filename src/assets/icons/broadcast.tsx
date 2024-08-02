import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 18 18"
    width="18"
    height="18"
    {...props}
  >
    <path
      fill="#FF3D3D"
      className="broadcast"
      d="M9 9.66c-.773 0-1.4-.658-1.4-1.47 0-.81.627-1.467 1.4-1.467.773 0 1.4.657 1.4 1.468 0 .81-.627 1.468-1.4 1.468Zm0 1.467c.406 0 .754.303.829.722L10.75 17h-3.5l.921-5.151A.855.855 0 0 1 9 11.127Z"
    />
    <path
      fill="#FF3D3D"
      fillRule="evenodd"
      className="signal-1"
      d="m6.03 5.08.99 1.038a3 3 0 0 0-.82 2.077 3 3 0 0 0 .82 2.076l-.99 1.038A4.5 4.5 0 0 1 4.8 8.195 4.5 4.5 0 0 1 6.03 5.08Zm5.94 0a4.5 4.5 0 0 1 1.23 3.115 4.5 4.5 0 0 1-1.23 3.114l-.99-1.038a3 3 0 0 0 .82-2.076 3 3 0 0 0-.82-2.077l.99-1.038Z"
      clipRule="evenodd"
    />
    <path
      fill="#FF3D3D"
      className="signal-2"
      d="m4.05 3 .99 1.038A6 6 0 0 0 3.4 8.191a6 6 0 0 0 1.64 4.152l-.99 1.039A7.5 7.5 0 0 1 2 8.19C2 6.164 2.784 4.328 4.05 3Zm9.9 0A7.501 7.501 0 0 1 16 8.19a7.5 7.5 0 0 1-2.05 5.192l-.99-1.038A6 6 0 0 0 14.6 8.19a6 6 0 0 0-1.64-4.153L13.95 3Z"
    />
  </svg>
)
export { SvgComponent as BroadcastIcon }
