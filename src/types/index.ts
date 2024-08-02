export enum WidgetColors {
	BLUE = "#00ADFF",
	ORANGE = "#FDAA3E",
	BLACK = "#000120",
}

export interface WidgetData {
	color: WidgetColors;
	animationRef: React.RefObject<HTMLAnchorElement> | null;
	name: string;
	image: {
		src: string;
		alt: string;
	};
	anchor: {
		href: string;
	};
}
