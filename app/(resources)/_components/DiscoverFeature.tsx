/* eslint-disable @typescript-eslint/naming-convention */
/************************************************************************************************
 ** DiscoverFeature Component & Associated Types:

 ** This component is designed to display a section highlighting various features, typically
 ** for a product, protocol, or service. It renders a grid of feature items, each potentially
 ** including an image, title, and description.

 ** Purpose & Features:
 ** - Renders a responsive grid of features (configurable columns: 2, 3, or 4).
 ** - Allows for an optional main title and description for the entire feature section.
 ** - Each feature item can have an image (fetched from Strapi or an absolute URL),
 **   a title, and a description.
 ** - Handles cases where no features are provided by returning null.
 ** - Uses `cl` utility for conditional class names.

 ** `TFeatureItem` Type:
 ** - Defines the structure for a single feature item, including an optional `id`, a mandatory
 **   `title` and `description`, and an optional `image` object (with URL, width, height, alt).

 ** Props:
 ** - features: An array of `TFeatureItem` objects to be displayed.
 ** - title: Optional main title for the feature section.
 ** - description: Optional main description for the feature section.
 ** - columns: Optional number of columns for the grid (defaults to 3). Can be 2, 3, or 4.
 ** - className: Optional string for additional CSS classes on the section container.
 ************************************************************************************************/

import Image from 'next/image';

import {cl} from '@/components/utils/cl';

import type {ReactNode} from 'react';

type TFeatureItem = {
	id?: number;
	title: string;
	description: string;
	image?: {
		url: string;
		width: number;
		height: number;
		alt?: string;
	};
};

type TDiscoverFeatureProps = {
	features: TFeatureItem[];
	title?: string;
	description?: string;
	columns?: 2 | 3 | 4;
	className?: string;
};

export function DiscoverFeature({
	features,
	title,
	description,
	columns = 3,
	className
}: TDiscoverFeatureProps): ReactNode {
	if (!features || features.length === 0) {
		return null;
	}

	// Get the grid columns class based on the columns prop
	const gridColumnsClass = {
		2: 'md:grid-cols-2',
		3: 'md:grid-cols-2 lg:grid-cols-3',
		4: 'md:grid-cols-2 lg:grid-cols-4'
	}[columns];

	return (
		<section
			className={cl('mb-20 mt-32', className)}
			aria-labelledby={'features-title'}>
			{/* Optional title and description */}
			{title && (
				<div className={'mb-16 text-center'}>
					<h2
						id={'features-title'}
						className={'mb-4 text-4xl'}>
						{title}
					</h2>
					{description && <p className={'mx-auto max-w-3xl text-lg text-gray-500'}>{description}</p>}
				</div>
			)}

			{/* Features grid */}
			<div className={cl('grid gap-8', gridColumnsClass)}>
				{features.map((feature, index) => (
					<div
						key={feature.id || index}
						className={'flex flex-col items-start rounded-2xl bg-secondBg p-6'}>
						{/* Feature image if provided */}
						{feature.image?.url && (
							<div className={'mb-6'}>
								<Image
									src={
										feature.image.url.startsWith('http')
											? feature.image.url
											: `${process.env.STRAPI_URL}${feature.image.url}`
									}
									alt={feature.image.alt || feature.title}
									width={feature.image.width || 64}
									height={feature.image.height || 64}
									className={'size-16 object-contain'}
								/>
							</div>
						)}

						{/* Feature title and description */}
						<h3 className={'mb-2 text-xl font-medium'}>{feature.title}</h3>
						<p className={'whitespace-break-spaces break-keep text-gray-500'}>{feature.description}</p>
					</div>
				))}
			</div>
		</section>
	);
}
