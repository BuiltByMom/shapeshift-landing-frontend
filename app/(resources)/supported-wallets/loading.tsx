/************************************************************************************************
 * Supported Wallets Page:

 * Main landing page for all compatible wallets that work with ShapeShift
 * Displays a visual grid of supported wallet options

 * Features:
 * - Reusable ResourceHeader component for consistent UI
 * - Server-side data fetching with error handling
 * - Visual wallet grid with logos and descriptions
 * - Responsive layout for all screen sizes

 * Technical Implementation:
 * - Uses Next.js server components for data fetching
 * - Leverages WalletList component for wallet display
 * - Implements descriptive section headings for better accessibility
 ************************************************************************************************/

import {Banner} from '@/components/common/Banner';

import {ResourceHeader} from '../_components/ResourceHeader';
import {WalletList} from '../_components/WalletList';

import type {ReactNode} from 'react';

/************************************************************************************************
 * Supported Wallets Loading State Component:

 * This component provides a visual loading indicator for pages within the "Supported Wallets"
 * section. It displays a skeleton UI that mimics the structure of the content being loaded,
 * enhancing the user experience by showing that data is actively being fetched.

 * Features:
 * - Skeleton UI: Renders placeholder elements for a resource header, search bar, and a grid
 *   of resource cards, simulating the layout of the actual content.
 * - Animation: Uses `animate-pulse` Tailwind CSS class for a subtle pulsing effect, visually
 *   indicating activity.
 * - Structure Mimicry: The arrangement and sizing of skeleton elements are designed to
 *   resemble the final loaded state of the supported wallets page.
 ************************************************************************************************/

// Static content for the page
const pageContent = {
	title: 'Bring your own wallet',
	description:
		'Connect your favorite self-custody wallet to access the full ShapeShift platform and all supported chains.',
	features: ['Non-Custodial', 'Multi-Provider Support', 'Enhanced Privacy'],
	ctaButton: {
		text: 'Get Started',
		url: 'https://app.shapeshift.com/'
	}
};

/************************************************************************************************
 * Loading Default Export:

 * Asynchronously renders the loading state UI for the supported wallets section. This includes
 * a skeleton version of the resource header, a placeholder for a search bar, and a grid of
 * skeleton resource cards to represent the wallets being loaded.

 * Returns:
 * - A Promise resolving to a ReactNode containing the complete loading skeleton UI for the
 *   supported wallets page.
 ************************************************************************************************/
export default async function Loading(): Promise<ReactNode> {
	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container mt-[120px] flex flex-col justify-center lg:mt-60'}>
				{/* Reusable header component */}
				<ResourceHeader
					title={pageContent.title}
					description={pageContent.description}
					items={pageContent.features}
					ctaButton={pageContent.ctaButton}
					className={'mb-12'}
				/>

				{/* Wallets grid section */}
				<section
					className={'mt-8'}
					aria-label={'Supported Wallets'}>
					<h2 className={'mb-6 text-2xl font-medium'}>{'Choose your preferred wallet'}</h2>
					<WalletList
						isLoading
						wallets={null}
					/>
				</section>

				{/* Footer banner */}
				<div className={'my-16'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
