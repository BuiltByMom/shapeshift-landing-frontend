import {Button} from '@/components/common/Button';
import {IconCheck} from '@/components/common/icons/IconCheck';

import type {ReactNode} from 'react';

/************************************************************************************************
 * SupportedWalletHeader Component & THeaderData Type:

 * This file defines the `SupportedWalletHeader` component, designed to render a header
 * section specifically for pages detailing supported wallets. It also defines the
 * `THeaderData` type, which specifies the props accepted by this component.
 ************************************************************************************************/

/************************************************************************************************
 * THeaderData Type:

 * Defines the props for the `SupportedWalletHeader` component.

 * Fields:
 * - title: The name of the supported wallet (e.g., "MetaMask").
 * - description: A descriptive text about the wallet and its integration with ShapeShift.
 * - items: An array of strings, each representing a key feature or benefit of using this
 *   wallet with ShapeShift (e.g., "Self-custodial", "Easy to connect"). These are displayed
 *   as badges with a check icon on desktop.
 ************************************************************************************************/
type THeaderData = {
	title: string;
	description: string;
	items: string[];
};
/************************************************************************************************
 * SupportedWalletHeader Function:

 * Renders a header section tailored for individual supported wallet pages. It displays
 * feature badges (desktop only), a prominent title indicating ShapeShift support for the
 * specified wallet, a description of the wallet and its integration, and a "Get Started"
 * button linking to the ShapeShift application.

 * Args:
 * - data (THeaderData): An object containing the `title` of the wallet, its `description`,
 *   and an array of `items` (features/benefits) to be displayed.

 * Returns:
 * - ReactNode: The JSX element representing the header for a supported wallet page.
 ************************************************************************************************/
export function SupportedWalletHeader(data: THeaderData): ReactNode {
	return (
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
					{`ShapeShift supports ${data.title}`}
				</h1>
				<p
					className={
						'mx-auto max-w-screen-lg whitespace-break-spaces break-keep text-center text-base text-gray-500 lg:text-xl'
					}>
					{data.description}
				</p>
			</div>
			<Button
				variant={'blue'}
				href={'https://app.shapeshift.com/'}
				title={'Get Started'}
			/>
		</section>
	);
}
