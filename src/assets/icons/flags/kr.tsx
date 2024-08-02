import { SVGProps } from "react";

export function KoreanFlag(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1.34em"
			height="1em"
			viewBox="0 0 32 24"
			{...props}
		>
			<title>Korean Flag</title>
			<defs>
				<path id="flagpackKr0" fill="#fff" d="M0 0h32v24H0z" />
			</defs>
			<g fill="none">
				<g clipPath="url(#flagpackKr3)">
					<use href="#flagpackKr0" />
					<path
						fill="#F7FCFF"
						fillRule="evenodd"
						d="M0 0v24h32V0z"
						clipRule="evenodd"
					/>
					<mask
						id="flagpackKr1"
						width="32"
						height="24"
						x="0"
						y="0"
						maskUnits="userSpaceOnUse"
						style={{
							maskType: "luminance",
						}}
					>
						<path
							fill="#fff"
							fillRule="evenodd"
							d="M0 0v24h32V0z"
							clipRule="evenodd"
						/>
					</mask>
					<g mask="url(#flagpackKr1)">
						<path
							fill="#3D58DB"
							fillRule="evenodd"
							d="M16 18.22c3.203 0 5.799-2.758 5.799-6.159S19.203 5.902 16 5.902c-3.203 0-5.8 2.758-5.8 6.159s2.597 6.159 5.8 6.159"
							clipRule="evenodd"
						/>
						<mask
							id="flagpackKr2"
							width="12"
							height="14"
							x="10"
							y="5"
							maskUnits="userSpaceOnUse"
							style={{
								maskType: "luminance",
							}}
						>
							<path
								fill="#fff"
								fillRule="evenodd"
								d="M16 18.22c3.203 0 5.799-2.758 5.799-6.159S19.203 5.902 16 5.902c-3.203 0-5.8 2.758-5.8 6.159s2.597 6.159 5.8 6.159"
								clipRule="evenodd"
							/>
						</mask>
						<g mask="url(#flagpackKr2)">
							<path
								fill="#E31D1C"
								fillRule="evenodd"
								d="M22.002 12.533s-.326-2.904-2.736-3.062c-2.41-.158-3.06 2.13-3.2 2.736c-.14.606-.491 2.222-3.03 2.222c-2.537 0-2.766-4.11-2.766-4.11V5.472h11.732z"
								clipRule="evenodd"
							/>
						</g>
						<path
							fill="#272727"
							fillRule="evenodd"
							d="m7.3 2.052l.914.828l-4.24 4.952l-.915-.828zm1.508 1.34l.915.827l-4.088 4.88l-.915-.828zm2.417 2.183l-.915-.828l-4.1 4.917l.916.828zm14.139-3.87l-.916.825l1.588 1.862l.915-.824zm2.821 3.427l-.915.824l1.588 1.863l.915-.824zm-6.757.08l.915-.824l1.587 1.863l-.915.825zm3.737 2.603l-.915.824l1.587 1.863l.915-.824zm-2.17-3.984l.916-.824l4.418 5.38l-.915.825zm3.06 10.412l-.923-.828l-1.6 1.87l.922.828zm-2.691 3.291l-.923-.828l-1.601 1.87l.923.828zm4.683-1.501l.922.827l-1.6 1.87l-.923-.827zm-1.637 4.195l-.923-.828l-1.601 1.87l.923.828zm-2.443-2.25l.922.828l-1.67 1.997l-.923-.828zm3.664-2.5l-.923-.827l-1.671 1.997l.923.827zM6.407 14.89l.915-.825l4.084 4.68l-.915.825zm.952 4.093l.916-.825L10 20.054l-.915.825zm-3.05-2.292l-.915.825L7.5 22.26l.915-.826zm.652-.539l.915-.825L7.37 17.08l-.915.825z"
							clipRule="evenodd"
						/>
					</g>
				</g>
				<defs>
					<clipPath id="flagpackKr3">
						<use href="#flagpackKr0" />
					</clipPath>
				</defs>
			</g>
		</svg>
	);
}
