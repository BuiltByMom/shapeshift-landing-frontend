/************************************************************************************************
 ** ResourceHeader Component & TResourceHeaderProps Type:

 ** This file defines the `ResourceHeader` component and its `TResourceHeaderProps` type.
 ** It serves as a versatile and reusable header for various resource pages, displaying a title,
 ** description, feature badges, and an optional Call-to-Action (CTA) button. It can also
 ** display a logo.

 ** `TResourceHeaderProps` Type:

 ** Defines the properties accepted by the `ResourceHeader` component.

 ** Fields:
 ** - title: The main title for the header.
 ** - description: A descriptive text displayed below the title.
 ** - items: An array of strings, each rendered as a feature badge with a check icon
 **   (visible on desktop).
 ** - ctaButton: Optional. An object with `text` and `url` for a Call-to-Action button.
 ** - className: Optional. Additional CSS classes for the section container.
 ** - titlePrefix: Optional. A string to prepend to the main title.
 ** - hasLogo: Optional. Boolean to indicate if a logo should be displayed. Defaults to false.
 ** - logoUrl: Optional. URL of the logo image if `hasLogo` is true.
 ** - logoWidth: Optional. Width of the logo image.
 ** - logoHeight: Optional. Height of the logo image.
 ** - logoAlt: Optional. Alt text for the logo image.

 ** `ResourceHeader` Function:

 ** Renders a versatile and reusable header for various resource pages. It displays a title,
 ** description, feature badges, an optional Call-to-Action (CTA) button, and an optional logo.

 ** Args:
 ** - props (TResourceHeaderProps): An object containing the properties to configure the header,
 **   such as title, description, items for badges, CTA button details, and logo information.

 ** Returns:
 ** - ReactNode: The JSX element representing the resource header section.
 ************************************************************************************************/

import Image from 'next/image';

import {Button} from '@/components/common/Button';
import {IconCheck} from '@/components/common/icons/IconCheck';
import {cl} from '@/components/utils/cl';

import type {ReactNode} from 'react';

type TResourceHeaderProps = {
	title: string;
	description: string;
	items: string[];
	ctaButton?: {
		text: string;
		url: string;
	};
	className?: string;
	titlePrefix?: string;
	hasLogo?: boolean;
	logoUrl?: string;
	logoWidth?: number;
	logoHeight?: number;
	logoAlt?: string;
};

export function ResourceHeader({
	title,
	description,
	items,
	ctaButton,
	className,
	titlePrefix,
	hasLogo = false,
	logoUrl,
	logoWidth,
	logoHeight,
	logoAlt
}: TResourceHeaderProps): ReactNode {
	return (
		<section className={cl('flex flex-col items-center', className)}>
			{/* Feature badges - desktop only */}
			<div className={'mb-10 hidden gap-2 lg:flex'}>
				{items.map(item => (
					<div
						className={'flex items-center gap-1 rounded-[24px] bg-secondBg px-4 py-[10px]'}
						key={item}
						aria-label={`Feature: ${item}`}>
						<IconCheck className={'text-blue'} />
						<span className={'text-blue'}>{item}</span>
					</div>
				))}
			</div>

			{/* Title and description */}
			<div className={'mb-10 flex flex-col items-center gap-2'}>
				<h1 className={'mb-6 text-center text-[40px] leading-10 lg:text-7xl'}>
					{titlePrefix ? `${titlePrefix} ${title}` : title}
				</h1>
				<p className={'mx-auto max-w-screen-md text-center text-base text-gray-500 lg:text-xl'}>
					{description}
				</p>
			</div>

			{/* Optional CTA Button */}
			{ctaButton && (
				<Button
					variant={'blue'}
					href={ctaButton.url}
					title={ctaButton.text}
					aria-label={`${ctaButton.text} for ${title}`}
				/>
			)}

			{/* Optional Logo display */}
			{hasLogo && logoUrl && (
				<div className={'mt-8 flex justify-center'}>
					<Image
						src={logoUrl}
						alt={logoAlt || title}
						width={logoWidth || 120}
						height={logoHeight || 120}
						className={'size-auto max-w-[180px]'}
					/>
				</div>
			)}
		</section>
	);
}
