/************************************************************************************************
 * Supported Wallet Detail Page Component:

 * This server component renders a detailed page for a specific supported cryptocurrency
 * wallet, identified by a `slug` from the URL parameters. It fetches the wallet's specific
 * data from an API (likely Strapi) and displays various sections like a hero image, header,
 * an "Accelerate with ShapeShift" section, and an FAQ section.

 * Features:
 * - Dynamic Data Fetching: Retrieves data for the specific wallet using `getSupportedWallet`.
 * - Metadata Generation: The `generateMetadata` function dynamically creates SEO-friendly
 *   metadata (title, description, keywords, Open Graph, Twitter cards) based on the wallet's
 *   details.
 * - Modular Content Display: Utilizes several sub-components (`SupportedWalletHero`,
 *   `SupportedWalletHeader`, `SupportedWalletAccelerate`, `StrapiFAQ`) to render different
 *   parts of the page.
 * - Error Handling: If the wallet data cannot be fetched or the slug is invalid, it triggers
 *   a `notFound()` response.
 ************************************************************************************************/
import {notFound} from 'next/navigation';

import {SupportedWalletAccelerate} from '@/app/(resources)/_components/SupportedWalletAccelerate';
import {SupportedWalletHeader} from '@/app/(resources)/_components/SupportedWalletHeader';
import {SupportedWalletHero} from '@/app/(resources)/_components/SupportedWalletHero';
import {Banner} from '@/components/common/Banner';
import {StrapiFAQ} from '@/components/StrapiFAQ';
import {getSupportedWallet} from '@/components/utils/query';

import type {TSupportedWalletData} from '@/components/strapi/types';
import type {Metadata} from 'next';
import type {ReactNode} from 'react';

/************************************************************************************************
 * generateMetadata Function:

 * Asynchronously generates metadata for a specific supported wallet page. It fetches the
 * wallet data based on the provided `slug` from the URL parameters. If the wallet is found,
 * it constructs a `Metadata` object including the wallet's name in the title, a descriptive
 * meta description, relevant keywords, and Open Graph/Twitter card information with the
 * wallet's featured image.

 * Args:
 * - params: An object containing a Promise that resolves to `{ slug: string }`, where `slug`
 *   is the identifier for the wallet.

 * Returns:
 * - A Promise resolving to a `Metadata` object for the wallet page. If the slug is missing or
 *   the wallet is not found, it calls `notFound()`.
 ************************************************************************************************/
export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
	const {slug} = await params;
	if (!slug) {
		return notFound();
	}

	const response = await fetch(
		`${process.env.STRAPI_URL}/api/supported-wallets?filters[slug][$eq]=${slug}&populate=*`,
		{
			headers: {
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
			}
		}
	);
	const data = await response.json();
	const wallet = data.data[0] as TSupportedWalletData;
	if (!wallet) {
		return notFound();
	}

	const imageUrl = wallet.featuredImg.formats.thumbnail.url;
	return {
		title: `${wallet.name} | ShapeShift Wallets`,
		description: `Shapeshift supports ${wallet.name}! Use it now to buy, sell, and swap crypto.`,
		keywords: `${wallet.name}, Shapeshift`,
		openGraph: {
			title: wallet.name,
			description: `Shapeshift supports ${wallet.name}! Use it now to buy, sell, and swap crypto.`,
			type: 'website',
			images: [
				{
					url: `${process.env.STRAPI_URL}${imageUrl}`
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title: wallet.name,
			description: `Shapeshift supports ${wallet.name}! Use it now to buy, sell, and swap crypto.`,
			images: [
				{
					url: `${process.env.STRAPI_URL}${imageUrl}`
				}
			]
		}
	};
}

/************************************************************************************************
 * WalletPage Default Export:

 * Asynchronously renders the detailed page for a specific supported wallet. It first
 * extracts the `slug` from the URL parameters, then fetches the corresponding wallet data
 * using `getSupportedWallet`. If the wallet is not found, it triggers a 404 page. Otherwise,
 * it renders the wallet's information using various specialized components and a general `Banner`.

 * Args:
 * - params: An object containing a Promise that resolves to `{ slug: string }`, where `slug`
 *   is the identifier for the wallet whose page is to be rendered.

 * Returns:
 * - A Promise resolving to a ReactNode representing the full page for the specified wallet,
 *   or calls `notFound()` if the wallet data cannot be retrieved.
 ************************************************************************************************/
export default async function WalletPage({params}: {params: Promise<{slug: string}>}): Promise<ReactNode> {
	const {slug} = await params;
	const wallet = await getSupportedWallet(slug);

	if (!wallet) {
		return notFound();
	}

	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container mt-[60px] flex flex-col justify-center'}>
				<div className={'mb-12'}>
					<SupportedWalletHero
						url={`${process.env.STRAPI_URL}${wallet?.featuredImg?.url}`}
						name={wallet?.name}
						width={wallet?.featuredImg?.width}
						height={wallet?.featuredImg?.height}
					/>
				</div>
				<SupportedWalletHeader
					title={wallet?.name}
					description={wallet?.description}
					items={['Self-custodial', 'Private', 'Multichain trading']}
				/>

				<SupportedWalletAccelerate />

				<StrapiFAQ />

				<div className={'my-16'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
