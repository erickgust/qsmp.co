import clsx from "clsx";

type ButtonProps = {
  icon?: React.ReactNode;
  position?: "left" | "right";
  size?: "small" | "normal" | "large";
  variant?: "white" | "dark" | "blue" | "light" | "red" | "yellow" | "purple" | "light-purple" | "youtube-red";
  className?: string;
} & JSX.IntrinsicElements["button"];

export function DefaultButton({
  icon,
  size = "normal",
  position = "left",
  variant = "white",
  ...props
}: ButtonProps) {
  const iconPosition = position === "left" ? "flex-row" : "flex-row-reverse";

  const paddingX = {
    small: "px-4 xs:px-2",
    normal: "px-6 xs:px-4",
    large: "px-6 xs:px-4",
  }[size];

  const gap = {
    small: "gap-1",
    normal: "gap-1",
    large: "gap-2",
  }[size];

  const color = {
    white: "text-[#1F1E33] bg-[#F0F6FF] xs:bg-white hover:bg-[#D7DFEC] border-[#D7DFEC]",
    dark: "text-white bg-[#1F1E33] xs:bg-[#35334C] hover:bg-[#1F1E33] border-[#1F1E33]",
    blue: "text-white bg-[#00ADFF] xs:bg-[#47C4FF] hover:bg-[#00ADFF] border-[#00ADFF]",
    light: "text-[#1F1E33] bg-[#F0F6FF] xs:bg-[#F0F6FF] hover:bg-[#D7DFEC] border-[#D7DFEC]",
    red: "text-white bg-[#FF3D3D] xs:bg-[#FF4B4B] hover:bg-[#EB3939] border-[#EB3939]",
    yellow: "text-[#1F1E33] bg-[#FFDB43] xs:bg-[#FFE058] hover:bg-[#EBC832] border-[#EBC832]",
    purple: "text-white bg-[#604DD8] xs:bg-[#725EF4] hover:bg-[#604DD8] border-[#604DD8]",
    "light-purple": "text-white bg-[#9146FF] xs:bg-[#A05FFF] hover:bg-[#9146FF] border-[#9146FF]",
    "youtube-red": "text-white bg-[#FF0000] xs:bg-[#FF4343] hover:bg-[#FF0000] border-[#FF0000]",
  }[variant];

  return (
    <button
      {...props}
      className={clsx(
        props.className,
        "max-xs:h-12 max-xs:text-base max-xs:border-hidden max-xs:hover:translate-y-0",
        "h-10 font-pixel font-bold flex leading-none items-center text-xs",
        "border-b-[6px] transition-all duration-150 justify-between",
        "hover:translate-y-0.5 hover:border-b-4",
        paddingX,
        gap,
        color,
        iconPosition
      )}
    >
      {icon && (
        <div className="w-[1.125rem] h-[1.125rem] fill-current flex items-center justify-center">
          {icon}
        </div>
      )}

      {props.children}
    </button>
  );
}
