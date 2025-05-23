import Image from 'next/image';
import {notFound} from 'next/navigation';

import {Banner} from '@/components/common/Banner';
import {ChainActions} from '@/components/strapi/templates/ChainActions';
import {ChainDescription} from '@/components/strapi/templates/ChainDescription';
import {ChainFeatures} from '@/components/strapi/templates/ChainFeatures';
import {ChainHeader} from '@/components/strapi/templates/ChainHeader';
import {ChainHero} from '@/components/strapi/templates/ChainHero';
import {getSupportedChain} from '@/components/utils/query';

import type {TSupportedChainData} from '@/components/strapi/types';
import type {Metadata} from 'next';
import type {ReactNode} from 'react';

/************************************************************************************************
 ** Supported Chain Detail Page Component:
 **
 ** This server component renders a detailed page for a specific supported blockchain (chain),
 ** identified by a `slug` from the URL parameters. It fetches the chain's specific data from
 ** an API (likely Strapi) and displays various sections like a header, hero image, description,
 ** actions, and features related to that chain.
 **
 ** Features:
 ** - Dynamic Data Fetching: Retrieves data for the specific chain using `getSupportedChain`.
 ** - Metadata Generation: The `generateMetadata` function dynamically creates SEO-friendly
 **   metadata (title, description, keywords, Open Graph, Twitter cards) based on the chain's
 **   details.
 ** - Modular Content Display: Utilizes several sub-components (`ChainHeader`, `ChainHero`,
 **   `ChainDescription`, `ChainActions`, `ChainFeatures`) to render different parts of the
 **   page, promoting reusability and separation of concerns.
 ** - Background Image: Includes a decorative background image for visual appeal (desktop only).
 ** - Error Handling: If the chain data cannot be fetched or the slug is invalid, it triggers a
 **   `notFound()` response.
 ************************************************************************************************/
export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
	const {slug} = await params;
	if (!slug) {
		return notFound();
	}

	const response = await fetch(
		`${process.env.STRAPI_URL}/api/supported-chains?filters[slug][$eq]=${slug}&populate=*`,
		{
			headers: {
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
			}
		}
	);
	const data = await response.json();
	const chain = data.data[0] as TSupportedChainData;
	if (!chain) {
		return notFound();
	}

	const imageUrl = chain.featuredImg.formats.thumbnail.url;
	return {
		title: `${chain.name} | ShapeShift Chains`,
		description: `Shapeshift supports ${chain.name}! Use it now to buy, sell, and swap crypto.`,
		keywords: `${chain.name}, Shapeshift`,
		openGraph: {
			title: chain.name,
			description: `Shapeshift supports ${chain.name}! Use it now to buy, sell, and swap crypto.`,
			type: 'website',
			images: [
				{
					url: `${process.env.STRAPI_URL}${imageUrl}`
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title: chain.name,
			description: `Shapeshift supports ${chain.name}! Use it now to buy, sell, and swap crypto.`,
			images: [
				{
					url: `${process.env.STRAPI_URL}${imageUrl}`
				}
			]
		}
	};
}

/************************************************************************************************
 ** ChainPage Default Export:
 **
 ** Asynchronously renders the detailed page for a specific supported blockchain. It first
 ** extracts the `slug` from the URL parameters, then fetches the corresponding chain data
 ** using `getSupportedChain`. If the chain is not found, it triggers a 404 page. Otherwise,
 ** it renders the chain's information using various specialized components (`ChainHeader`,
 ** `ChainHero`, `ChainDescription`, etc.) and includes a general `Banner`.
 **
 ** Args:
 ** - params: An object containing a Promise that resolves to `{ slug: string }`, where `slug`
 **   is the identifier for the chain whose page is to be rendered.
 **
 ** Returns:
 ** - A Promise resolving to a ReactNode representing the full page for the specified chain, or
 **   calls `notFound()` if the chain data cannot be retrieved.
 ************************************************************************************************/
export default async function ChainPage({params}: {params: Promise<{slug: string}>}): Promise<ReactNode> {
	const {slug} = await params;
	const chain = await getSupportedChain(slug);

	if (!chain) {
		return notFound();
	}

	return (
		<div className={'flex w-full justify-center'}>
			<div className={'absolute inset-0 -z-10 hidden lg:block'}>
				<Image
					src={'/heroBg.png'}
					alt={'hero-bg'}
					height={'2256'}
					width={'3840'}
					className={'object-cover'}
				/>
			</div>
			<div className={'container mt-[60px] flex flex-col justify-center'}>
				<ChainHeader chainName={chain.name} />

				<div className={'mb-20 mt-16 lg:mb-60'}>
					<ChainHero
						url={`${process.env.STRAPI_URL}${chain?.featuredImg?.url}`}
						name={chain?.name}
						width={chain?.featuredImg?.width}
						height={chain?.featuredImg?.height}
					/>
				</div>
				<ChainDescription
					chainName={chain.name}
					description={chain.description}
				/>

				<div className={'mt-[120px] lg:mt-60'}>
					<ChainActions
						features={chain.actions}
						chainName={chain.name}
					/>
				</div>

				<div className={'mt-[120px] lg:mt-60'}>
					<ChainFeatures
						features={chain.features}
						chainName={chain.name}
						foxImg={chain.foxImg}
					/>
				</div>

				<div className={'mt-[120px] lg:mt-60'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
