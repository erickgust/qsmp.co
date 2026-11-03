import { SVGProps, useId } from "react";

export function GermanyFlag(props: SVGProps<SVGSVGElement>) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.34em"
      height="1em"
      viewBox="0 0 32 24"
      {...props}
    >
      <defs>
        <path id={`${uid}-0`} fill="#fff" d="M0 0h32v24H0z"></path>
      </defs>
      <g fill="none">
        <g clipPath={`url(#${uid}-1)`}>
          <use href={`#${uid}-0`}></use>
          <path
            fill="#FFD018"
            fillRule="evenodd"
            d="M0 16h32v8H0v-8Z"
            clipRule="evenodd"
          ></path>
          <path
            fill="#E31D1C"
            fillRule="evenodd"
            d="M0 8h32v8H0V8Z"
            clipRule="evenodd"
          ></path>
          <path
            fill="#272727"
            fillRule="evenodd"
            d="M0 0h32v8H0V0Z"
            clipRule="evenodd"
          ></path>
        </g>
        <defs>
          <clipPath id={`${uid}-1`}>
            <use href={`#${uid}-0`}></use>
          </clipPath>
        </defs>
      </g>
    </svg>
  );
}
