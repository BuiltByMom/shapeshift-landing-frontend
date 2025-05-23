/************************************************************************************************
 * ResourceCard Component:

 * A reusable card component for displaying resource items with image, title, and description
 * Optimized for protocols, chains, wallets, and other resource types

 * Features:
 * - Animated hover effects with framer-motion
 * - Consistent image display with configurable position
 * - Truncated description with proper line clamps
 * - Fully responsive design

 * Usage:
 * - Import for any resource item that needs card-style display
 * - Configure with title, description, image, and URL
 * - Set imagePosition for different image alignments
 ************************************************************************************************/

'use client';

import {motion} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import {cl} from '@/components/utils/cl';

import type {ReactNode} from 'react';

/************************************************************************************************
 * MotionLink Constant:

 * A Framer Motion component that wraps Next.js's `Link` component.
 * This allows for applying animations (like `initial`, `animate`, `transition`) directly to
 * a navigational link, enhancing user experience with smooth visual transitions.
 ************************************************************************************************/
const MotionLink = motion(Link);

/************************************************************************************************
 * TResourceCardProps Type:

 * Defines the props for the `ResourceCard` component.

 * Fields:
 * - slug: The URL slug for the resource, used to construct the link.
 * - title: The title of the resource card.
 * - description: A short description of the resource.
 * - imageUrl: The URL of the image to display on the card.
 * - imageWidth: Optional width of the resource image.
 * - imageHeight: Optional height of the resource image.
 * - baseURL: The base path for the resource's link (e.g., '/supported-chains').
 * - imagePosition: Optional alignment for the image within its container ('center' or 'bottom').
 *   Defaults to 'center'.
 * - altText: Optional alt text for the resource image. Defaults to the card's title.
 * - className: Optional additional CSS classes for the card's container.
 ************************************************************************************************/
type TResourceCardProps = {
	slug: string;
	title: string;
	description: string;
	imageUrl: string;
	imageWidth?: number;
	imageHeight?: number;
	baseURL: string;
	imagePosition?: 'center' | 'bottom';
	altText?: string;
	className?: string;
};

/************************************************************************************************
 * ResourceCard Function:

 * Renders an animated, clickable card for displaying a resource item. It includes an image,
 * title, and description, and links to the resource's detail page.

 * Args:
 * - slug (string): The resource's URL slug.
 * - title (string): The title of the resource.
 * - description (string): A brief description of the resource.
 * - imageUrl (string): URL for the resource's image.
 * - imageWidth (number, optional): Width of the image.
 * - imageHeight (number, optional): Height of the image.
 * - baseURL (string): The base URL path for the link (e.g., "/supported-wallets").
 * - imagePosition ('center' | 'bottom', optional): Alignment of the image.
 * - altText (string, optional): Alt text for the image.
 * - className (string, optional): Additional CSS classes for the card.

 * Returns:
 * - ReactNode: The JSX element representing the resource card.
 ************************************************************************************************/
export function ResourceCard({
	slug,
	title,
	description,
	imageUrl,
	imageWidth = 0,
	imageHeight = 0,
	baseURL,
	imagePosition = 'center',
	altText,
	className
}: TResourceCardProps): ReactNode {
	return (
		<MotionLink
			key={slug}
			initial={{opacity: 0, scale: 0.8}}
			animate={{opacity: 1, scale: 1}}
			transition={{duration: 0.3, ease: 'easeInOut'}}
			href={`${baseURL}/${slug}`}
			className={cl('group rounded-2xl bg-secondBg p-6 transition-colors hover:bg-secondHoverBg', className)}>
			{/* Card Image */}
			<div
				className={cl(
					'relative h-[204px] max-w-[408px] overflow-hidden rounded-2xl',
					imagePosition === 'center' ? 'p-10' : 'px-10 pt-10'
				)}>
				{/* Background Image */}
				<Image
					src={'/supported-wallets/cover.png'}
					alt={'background'}
					width={408}
					height={204}
					priority
					className={'pointer-events-none absolute inset-0 z-0 aspect-video size-full object-cover'}
				/>

				{/* Resource Image */}
				{imageUrl ? (
					<motion.div
						initial={{opacity: 0, scale: 0.9}}
						animate={{opacity: 1, scale: 1}}
						transition={{duration: 0.5}}
						className={'relative z-10 size-full object-contain'}>
						<Image
							src={imageUrl.startsWith('http') ? imageUrl : `${process.env.STRAPI_URL}${imageUrl}`}
							alt={altText || title}
							width={imageWidth || 100}
							height={imageHeight || 100}
							className={cl(
								'size-full items-end object-contain transition-all group-hover:scale-105',
								imagePosition === 'center' ? '' : 'object-bottom'
							)}
						/>
					</motion.div>
				) : (
					<div className={'h-[204px] w-auto rounded-2xl bg-gray-500'} />
				)}
			</div>

			{/* Card Content */}
			<div className={'mt-6 flex flex-col gap-2'}>
				<div>
					<h3 className={'text-2xl text-white'}>{title}</h3>
					<p className={'line-clamp-6 whitespace-break-spaces break-keep text-sm text-gray-500'}>
						{description}
					</p>
				</div>
			</div>
		</MotionLink>
	);
}
