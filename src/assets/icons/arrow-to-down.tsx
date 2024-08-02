import React from "react";

type ArrowToDownIconProps = {
  className?: string;
  color?: string;
};

export function ArrowToDownIcon({
  className,
  color = "#604DD8",
}: ArrowToDownIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 18 18"
      className={`${className}`}
    >
      <path
        fill={color}
        d="M4.8 4.5L3.75 5.55l7.2 7.2H4.5v1.5h9v-9H12v6.45L4.8 4.5z"
      ></path>
    </svg>
  );
}
