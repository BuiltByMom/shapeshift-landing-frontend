/************************************************************************************************
 * ResourceHero Component & TResourceHeroProps Type:

 * This file defines the `ResourceHero` component and its `TResourceHeroProps` type.
 * It is used to display a prominent hero banner, typically at the top of resource detail
 * pages, featuring a main image and an optional overlay logo.

 * `TResourceHeroProps` Type:

 * Defines the properties accepted by the `ResourceHero` component.

 * Fields:
 * - imageSrc: URL of the main hero background image.
 * - imageAlt: Alt text for the main hero image.
 * - className: Optional. Additional CSS classes for the section container.
 * - logoSrc: Optional. URL for an overlay logo image.
 * - logoAlt: Optional. Alt text for the overlay logo.
 * - logoWidth: Optional. Width of the logo (defaults to 256).
 * - logoHeight: Optional. Height of the logo (defaults to 256).
 * - logoPosition: Optional. Alignment for the logo ('left', 'center', 'right', defaults to 'right').
 * - priority: Optional. Boolean for Next.js Image `priority` prop (defaults to `true`).

 * `ResourceHero` Function:

 * Renders a prominent hero banner, typically at the top of resource detail pages. It features
 * a main background image and an optional overlay logo, both optimized using Next.js Image.

 * Args:
 * - props (TResourceHeroProps): An object containing properties to configure the hero banner,
 *   such as image sources, alt texts, dimensions, logo positioning, and image priority.

 * Returns:
 * - ReactNode: The JSX element representing the resource hero banner section.
 ************************************************************************************************/

import Image from 'next/image';

import {cl} from '@/components/utils/cl';

import type {ReactNode} from 'react';

type TResourceHeroProps = {
	imageSrc: string;
	imageAlt: string;
	className?: string;
	logoSrc?: string;
	logoAlt?: string;
	logoWidth?: number;
	logoHeight?: number;
	logoPosition?: 'left' | 'center' | 'right';
	priority?: boolean;
};

export function ResourceHero({
	imageSrc,
	imageAlt,
	className,
	logoSrc,
	logoAlt,
	logoWidth = 256,
	logoHeight = 256,
	logoPosition = 'right',
	priority = true
}: TResourceHeroProps): ReactNode {
	// Calculate position classes for logo
	const logoPositionClasses = {
		left: 'justify-start pl-16',
		center: 'justify-center',
		right: 'justify-end pr-16'
	};

	return (
		<section className={cl('relative mt-12 flex w-full overflow-hidden rounded-2xl', className)}>
			{/* Hero background image */}
			<Image
				src={imageSrc}
				alt={imageAlt}
				width={2800}
				height={720}
				priority={priority}
				quality={90}
			/>

			{/* Optional logo overlay */}
			{logoSrc && (
				<div className={cl('absolute inset-0 flex items-center py-6', logoPositionClasses[logoPosition])}>
					<Image
						src={logoSrc}
						alt={logoAlt || 'Logo'}
						width={logoWidth}
						height={logoHeight}
						className={'my-auto size-auto max-h-[256px] max-w-[256px]'}
					/>
				</div>
			)}
		</section>
	);
}
