import { SVGProps } from "react";

export function FranceFlag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.34em"
      height="1em"
      viewBox="0 0 32 24"
      {...props}
    >
      <defs>
        <path id="flagpackFr0" fill="#fff" d="M0 0h32v24H0z"></path>
      </defs>
      <g fill="none">
        <g clipPath="url(#flagpackFr1)">
          <use href="#flagpackFr0"></use>
          <path
            fill="#F50100"
            fillRule="evenodd"
            d="M22 0h10v24H22V0Z"
            clipRule="evenodd"
          ></path>
          <path
            fill="#2E42A5"
            fillRule="evenodd"
            d="M0 0h12v24H0V0Z"
            clipRule="evenodd"
          ></path>
          <path
            fill="#F7FCFF"
            fillRule="evenodd"
            d="M10 0h12v24H10V0Z"
            clipRule="evenodd"
          ></path>
        </g>
        <defs>
          <clipPath id="flagpackFr1">
            <use href="#flagpackFr0"></use>
          </clipPath>
        </defs>
      </g>
    </svg>
  );
}
