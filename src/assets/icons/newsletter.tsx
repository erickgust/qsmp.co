import { SVGProps } from "react";

export function NewsletterIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			fill="none"
			viewBox="0 0 18 18"
			{...props}
		>
			<title>Newsletter</title>
			<path
				fill="#1F1E33"
				d="M1.5 15.75V2.25h15v13.5h-15zm1.5-1.5h12V3.75H3v10.5zm1.5-1.5h9v-1.5h-9v1.5zm0-3h3v-4.5h-3v4.5zm4.5 0h4.5v-1.5H9v1.5zm0-3h4.5v-1.5H9v1.5z"
			/>
		</svg>
	);
}
