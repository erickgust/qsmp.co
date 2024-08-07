import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      fill="#E1306C"
      d="M10.4 2.667h11.2a7.739 7.739 0 0 1 7.733 7.733v11.2a7.733 7.733 0 0 1-7.733 7.733H10.4A7.739 7.739 0 0 1 2.666 21.6V10.4A7.733 7.733 0 0 1 10.4 2.667Zm-.267 2.666a4.8 4.8 0 0 0-4.8 4.8v11.734c0 2.653 2.147 4.8 4.8 4.8h11.733a4.8 4.8 0 0 0 4.8-4.8V10.133c0-2.653-2.146-4.8-4.8-4.8H10.133Zm12.867 2a1.667 1.667 0 1 1 0 3.334 1.667 1.667 0 0 1 0-3.334Zm-7 2a6.667 6.667 0 1 1 0 13.335 6.667 6.667 0 0 1 0-13.335ZM16 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
    />
  </svg>
)
export { SvgComponent as InstagramIcon }
