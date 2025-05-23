/************************************************************************************************
 * AnimatedHeight Component & Associated Types:

 * This client-side component provides a smooth animated transition for changes in the height
 * of its children. It uses `motion` from `framer-motion` to achieve the animation.

 * Features:
 * - Smooth Height Animation: Animates changes in height with a configurable duration and ease.
 * - Dynamic Content: Adapts to the height of its children dynamically.
 * - Customizable Animation: Allows specifying animation duration and easing function.

 * Usage:
 * Wrap content that may change height (e.g., collapsible sections, accordions) with this
 * component to provide a visually appealing transition.
 ************************************************************************************************/
'use client';

import {motion} from 'framer-motion';
import {useEffect, useRef, useState} from 'react';

import {cl} from '@/components/utils/cl';

import type React from 'react';
import type {ReactElement} from 'react';

/************************************************************************************************
 * TAnimateChangeInHeightProps Type:

 * Defines the props for the `AnimateChangeInHeight` component. Extends `HTMLMotionProps`
 * from `framer-motion` to allow passthrough of standard HTML and motion props.

 * Fields:
 * - children: ReactNode - The content whose height changes will be animated.
 * - duration: Optional number - The duration of the animation in seconds (default: 0.5).
 * - ease: Optional string or array - The easing function for the animation (default: 'ease').
 * - className: Optional string - Additional CSS classes for the motion div.
 ************************************************************************************************/
export type TAnimateChangeInHeightProps = {
	children: React.ReactNode;
	className?: string;
};

/************************************************************************************************
 * AnimateChangeInHeight Component Export:

 * A functional component that wraps its children in a `motion.div` to animate height changes.
 * It uses `AnimatePresence` to handle the enter and exit animations correctly.

 * Props are defined by `TAnimateChangeInHeightProps`.
 ************************************************************************************************/
export function AnimateChangeInHeight({children, className}: TAnimateChangeInHeightProps): ReactElement {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [height, setHeight] = useState<number | 'auto'>('auto');

	/********************************************************************************************
	 * Effect: Sets up ResizeObserver to track content height changes
	 * Deps: None - Observer is set up once on mount
	 ********************************************************************************************/
	useEffect(() => {
		if (containerRef.current) {
			const resizeObserver = new ResizeObserver(entries => {
				// We only have one entry, so we can use entries[0].
				const observedHeight = entries[0].contentRect.height;
				setHeight(observedHeight);
			});

			resizeObserver.observe(containerRef.current);

			return () => {
				// Cleanup the observer when the component is unmounted
				resizeObserver.disconnect();
			};
		}
	}, []);

	return (
		<motion.div
			className={cl(className, 'overflow-hidden')}
			style={{height}}
			animate={{height}}
			transition={{duration: 0.1}}>
			<div ref={containerRef}>{children}</div>
		</motion.div>
	);
}
