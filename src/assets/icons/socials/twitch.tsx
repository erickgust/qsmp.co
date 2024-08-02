import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 22 22"
    width={18}
    height={18}
    color="#fff"
    {...props}
  >
    <path
      fill="currentColor"
      d="M10.67 5.436h1.31v3.923h-1.31m3.602-3.923h1.311v3.923h-1.31M6.416 1.833 3.144 5.106v11.788h3.923v3.273l3.282-3.273h2.612L18.856 11V1.833m-1.311 8.516-2.613 2.613h-2.621l-2.292 2.291v-2.291H7.067V3.144h10.478v7.205Z"
    />
  </svg>
);

export { SvgComponent as TwitchIcon };
