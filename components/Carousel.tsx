/************************************************************************************************
 ** Carousel Component & Associated Types:
 **
 ** This client-side component implements a generic, reusable carousel or slider. It is
 ** designed to display a series of items (children) and allows navigation through them using
 ** previous/next buttons and dot indicators.
 **
 ** Features:
 ** - Customizable Content: Accepts any React nodes as children to be displayed in slides.
 ** - Navigation Controls: Provides previous/next arrow buttons and clickable dot indicators.
 ** - Autoplay (Optional): Can automatically cycle through slides with a configurable interval.
 ** - Infinite Loop (Optional): Allows continuous scrolling from the last slide back to the first.
 ** - Responsive: Adapts to different screen sizes.
 ** - Touch/Swipe Support (Assumed, common for carousel libraries if one is used internally).
 ************************************************************************************************/
'use client';

import {cl} from '@/components/utils/cl';

import type {ReactNode} from 'react';

/************************************************************************************************
 ** TCarouselProps Type:
 **
 ** Defines the props for the `Carousel` component.
 **
 ** Fields:
 ** - children: ReactNode - The slides to be displayed in the carousel.
 ** - className: Optional string - Additional CSS classes for the main carousel container.
 ** - shouldLoop: Optional boolean - If true, enables infinite looping (default: true).
 ** - autoPlayInterval: Optional number - Interval in milliseconds for autoplay. If 0 or
 **   undefined, autoplay is disabled (default: undefined).
 ** - showDots: Optional boolean - If true, displays dot indicators (default: true).
 ** - showArrows: Optional boolean - If true, displays previous/next arrow buttons (default: true).
 ************************************************************************************************/
type TCarouselProps = React.HTMLAttributes<HTMLDivElement> & {
	/** The content to be displayed in the carousel */
	children: React.ReactNode;
	/** Whether to pause the animation when hovering over the carousel */
	pauseOnHover?: boolean;
	/** The direction in which the carousel should scroll */
	direction?: 'left' | 'right';
	/** The speed of the carousel animation in seconds (lower = faster) */
	speed?: number;
};

/************************************************************************************************
 ** Carousel Component Export:
 **
 ** Renders a carousel/slider component. It manages the current slide state, handles navigation
 ** (manual and autoplay), and displays navigation controls (arrows and dots).
 **
 ** Props are defined by `TCarouselProps`.
 ************************************************************************************************/
export function Carousel({
	children,
	pauseOnHover = false,
	direction = 'left',
	//The lower the number, the faster the carousel
	speed = 20,
	className,
	...props
}: TCarouselProps): ReactNode {
	return (
		<div
			className={cl('w-full overflow-hidden z-10', className)}
			{...props}>
			<div className={'relative flex overflow-hidden'}>
				<div
					className={cl(
						'flex w-max py-5 animate-carousel',
						pauseOnHover ? 'hover:[animation-play-state:paused]' : '',
						direction === 'right' ? 'animate-carousel-reverse' : ''
					)}
					// eslint-disable-next-line @typescript-eslint/naming-convention
					style={{'--duration': `${speed}s`} as React.CSSProperties}>
					{children}
					{children}
				</div>
			</div>
		</div>
	);
}
