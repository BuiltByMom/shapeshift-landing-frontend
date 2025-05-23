import Image from 'next/image';
import {Fragment} from 'react';

import {Button} from '@/components/common/Button';
import {IconCheck} from '@/components/common/icons/IconCheck';

import type {ReactNode} from 'react';

/************************************************************************************************
 * ProtocolHeader Component & THeaderData Type:

 * This file defines the `ProtocolHeader` component and its associated `THeaderData` type.
 * The component is responsible for rendering the header section of a protocol page.

 * `THeaderData` Type:
 * - Defines the structure for the data prop of the `ProtocolHeader` component.
 * - Fields:
 *   - description: A string describing the protocol (currently unused but part of the type).
 *   - items: An array of strings, each representing a feature/benefit badge.
 *   - url: The URL string for the protocol's logo image.
 *   - width: The width of the protocol's logo image.
 *   - height: The height of the protocol's logo image.
 *   - name: The name of the protocol.

 * `ProtocolHeader` Function:
 * - Renders the header section for a protocol page.
 * - Displays feature badges (desktop only), the protocol name with a tagline, a general
 *   description about ShapeShift's integration, a "Get Started" CTA button, and a hero image
 *   with the protocol's logo overlaid.
 * - Uses `IconCheck` for feature badges.
 * - Uses Next.js `Image` component for optimized image loading.
 ************************************************************************************************/

/************************************************************************************************
 * THeaderData Type:

 * Defines the structure for the data prop of the `ProtocolHeader` component.

 * Fields:
 * - description: A string describing the protocol (though currently unused in the component,
 *   it's part of the type, perhaps for future use or consistency).
 * - items: An array of strings, where each string is a feature/benefit to be displayed as a badge.
 * - url: The URL string for the protocol's logo image.
 * - width: The width of the protocol's logo image.
 * - height: The height of the protocol's logo image.
 * - name: The name of the protocol.
 ************************************************************************************************/
type THeaderData = {
	description: string;
	items: string[];
	url: string;
	width: number;
	height: number;
	name: string;
};

/************************************************************************************************
 * ProtocolHeader Function:

 * Renders the header section for a protocol page, including its name, features,
 * a call-to-action, and a hero image with the protocol logo.

 * Args:
 * - data (THeaderData): An object containing the necessary data to populate the header.

 * Returns:
 * - ReactNode: The JSX element representing the protocol header.
 ************************************************************************************************/
export function ProtocolHeader(data: THeaderData): ReactNode {
	return (
		<Fragment>
			<section className={'flex flex-col items-center'}>
				<div className={'mb-10 hidden gap-2 lg:flex'}>
					{data.items.map(item => (
						<div
							className={'flex items-center gap-1 rounded-[24px] bg-secondBg px-4 py-[10px]'}
							key={item}>
							<IconCheck className={'text-blue'} />
							<span className={'text-blue'}>{item}</span>
						</div>
					))}
				</div>
				<div className={'mb-10 flex flex-col items-center gap-2'}>
					<h1 className={'mb-6 text-center text-[40px] leading-10 lg:text-7xl'}>
						{`Shift into ${data.name}`}
					</h1>
					<p className={'mx-auto max-w-screen-md text-center text-base text-gray-500 lg:text-xl'}>
						{
							'Say goodbye to having to do multiple complex transactions, going to multiple interfaces, and hello to Shifts with ShapeShift.'
						}
					</p>
				</div>
				<Button
					variant={'blue'}
					href={'https://app.shapeshift.com/'}
					title={'Get Started'}
				/>
			</section>
			<section className={'relative mt-12 flex w-full overflow-hidden rounded-2xl'}>
				<Image
					src={'/supported-wallets/hero.jpg'}
					alt={''} // Decorative image, alt text handled by protocol logo
					width={2800}
					height={720}
				/>
				<div className={'absolute inset-0 flex items-center justify-end py-6 pr-16'}>
					<Image
						src={data.url}
						alt={`${data.name} logo`}
						width={data.width}
						height={data.height}
						className={'my-auto h-full max-h-[256px] w-auto max-w-[256px]'}
					/>
				</div>
			</section>
		</Fragment>
	);
}
