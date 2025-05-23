/************************************************************************************************
 * Supported Wallets Page Component:

 * This server component serves as the main page for the "Supported Wallets" section. It
 * fetches a list of all supported wallets from an API (likely Strapi) and displays them.
 * The page includes a header, a search/filter wrapper, and a banner.

 * Features:
 * - Data Fetching: Asynchronously fetches all supported wallet data using `fetchAllWallets`.
 * - Content Display: Uses `ResourceHeader` to display a title and description for the page.
 * - Search and Filtering: Integrates the `WalletSearchWrapper` component, which allows users
 *   to search for wallets by name and potentially filter them (though filtering logic is
 *   encapsulated within `WalletSearchWrapper`).
 * - Fallback/Error Handling: If wallet data cannot be fetched, it gracefully returns null,
 *   which might be handled by a parent error boundary or a `notFound()` call depending on
 *   the broader application structure (though not explicitly shown here for `fetchAllWallets`).
 * - Banner: Includes a `Banner` component, likely for general calls-to-action or information.
 ************************************************************************************************/

import {ResourceHeader} from '@/app/(resources)/_components/ResourceHeader';
import {fetchAllWallets} from '@/app/(resources)/_utils/fetchUtils';
import {Banner} from '@/components/common/Banner';
import {requestWalletUrl} from '@/components/constants';
import {WalletRequestCard} from '@/components/WalletRequestCard';

import {WalletSearchWrapper} from './_components/WalletSearchWrapper';

import type {ReactNode} from 'react';

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
 * WalletPage Default Export:

 * Asynchronously renders the main page for listing supported wallets. It fetches all wallet
 * data and then passes this data to the `WalletSearchWrapper` for display, which includes
 * search and potentially filter capabilities. The page also includes a `ResourceHeader` and a
 * `Banner`.

 * Returns:
 * - A Promise resolving to a ReactNode representing the supported wallets page. Returns
 *   `null` if the initial fetch of all wallets fails, which should ideally be handled by a
 *   higher-level error component or a `notFound` mechanism if appropriate.
 ************************************************************************************************/
export default async function WalletPage(): Promise<ReactNode> {
	// Fetch wallets data
	const wallets = await fetchAllWallets();

	// Handle case where wallets data is not found or empty
	if (!wallets) {
		return (
			<div className={'mt-[120px] flex w-full justify-center text-center lg:mt-60'}>
				<p className={'text-red-400'}>{'Unable to load wallet data. Please try again later.'}</p>
			</div>
		);
	}

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

				<WalletSearchWrapper wallets={wallets} />

				<div className={'flex w-full justify-center'}>
					<div className={'my-16 grid h-[1000px] grid-cols-1 gap-4 lg:h-[480px] lg:grid-cols-2'}>
						<WalletRequestCard
							title={"Don't see your wallet? Request it here"}
							buttonTitle={'Request wallet'}
							buttonHref={requestWalletUrl}
							bgImage={'/request-card-bg.png'}
						/>

						<WalletRequestCard
							title={'Or create a new ShapeShift wallet'}
							buttonTitle={'Create wallet'}
							buttonHref={'/defi-wallet'}
							bgImage={'/create-wallet-bg.png'}
							buttonVariant={'blue'}
						/>
					</div>
				</div>

				{/* Footer banner */}
				<div className={'my-16'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
