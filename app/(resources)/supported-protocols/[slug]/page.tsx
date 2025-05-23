import Image from 'next/image';
import {notFound} from 'next/navigation';

import {ProtocolAbout} from '@/app/(resources)/_components/ProtocolAbout';
import {ProtocolEasier} from '@/app/(resources)/_components/ProtocolEasier';
import {ProtocolFeatures} from '@/app/(resources)/_components/ProtocolFeatures';
import {ProtocolHeader} from '@/app/(resources)/_components/ProtocolHeader';
import {Banner} from '@/components/common/Banner';
import {getSupportedProtocol} from '@/components/utils/query';

import type {TSupportedProtocolData} from '@/components/strapi/types';
import type {Metadata} from 'next';
import type {ReactNode} from 'react';

/************************************************************************************************
 * Supported Protocol Detail Page Component:

 * This server component renders a detailed page for a specific supported DeFi protocol,
 * identified by a `slug` from the URL parameters. It fetches the protocol's specific data
 * from an API (likely Strapi) and displays various sections like a header, an "About"
 * section, an "Easier With ShapeShift" section, and key features.

 * Features:
 * - Dynamic Data Fetching: Retrieves data for the specific protocol using `getSupportedProtocol`.
 * - Metadata Generation: The `generateMetadata` function dynamically creates SEO-friendly
 *   metadata (title, description, keywords, Open Graph, Twitter cards) based on the protocol's
 *   details.
 * - Modular Content Display: Utilizes several sub-components (`ProtocolHeader`,
 *   `ProtocolAbout`, `ProtocolEasier`, `ProtocolFeatures`) to render different parts of the
 *   page, promoting reusability and separation of concerns.
 * - Background Image: Includes a decorative background image for visual appeal (desktop only).
 * - Error Handling: If the protocol data cannot be fetched or the slug is invalid, it triggers
 *   a `notFound()` response.
 ************************************************************************************************/

/************************************************************************************************
 * generateMetadata Function:

 * Asynchronously generates metadata for a specific supported protocol page. It fetches the
 * protocol data based on the provided `slug` from the URL parameters. If the protocol is
 * found, it constructs a `Metadata` object including the protocol's name in the title, a
 * descriptive meta description, relevant keywords, and Open Graph/Twitter card information
 * with the protocol's featured image.

 * Args:
 * - params: An object containing a Promise that resolves to `{ slug: string }`, where `slug`
 *   is the identifier for the protocol.

 * Returns:
 * - A Promise resolving to a `Metadata` object for the protocol page. If the slug is missing
 *   or the protocol is not found, it calls `notFound()`.
 ************************************************************************************************/
export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
	const {slug} = await params;
	if (!slug) {
		return notFound();
	}

	const response = await fetch(
		`${process.env.STRAPI_URL}/api/supported-protocols?filters[slug][$eq]=${slug}&populate=*`,
		{
			headers: {
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
			}
		}
	);
	const data = await response.json();
	const protocol = data.data[0] as TSupportedProtocolData;
	if (!protocol) {
		return notFound();
	}

	const imageUrl = protocol.featuredImg.formats.thumbnail.url;
	return {
		title: `${protocol.name} | Shapeshift`,
		description: `Shift into ${protocol.name} with ShapeShift!`,
		keywords: `${protocol.name}, Shapeshift`,
		openGraph: {
			title: protocol.name,
			description: `Shift into ${protocol.name} with ShapeShift!`,
			type: 'website',
			images: [
				{
					url: `${process.env.STRAPI_URL}${imageUrl}`
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title: protocol.name,
			description: `Shift into ${protocol.name} with ShapeShift!`,
			images: [
				{
					url: `${process.env.STRAPI_URL}${imageUrl}`
				}
			]
		}
	};
}

/************************************************************************************************
 * ProtocolPage Default Export:

 * Asynchronously renders the detailed page for a specific supported protocol. It first
 * extracts the `slug` from the URL parameters, then fetches the corresponding protocol data
 * using `getSupportedProtocol`. If the protocol is not found, it triggers a 404 page.
 * Otherwise, it renders the protocol's information using various specialized components
 * (`ProtocolHeader`, `ProtocolAbout`, etc.) and includes a general `Banner`.

 * Args:
 * - params: An object containing a Promise that resolves to `{ slug: string }`, where `slug`
 *   is the identifier for the protocol whose page is to be rendered.

 * Returns:
 * - A Promise resolving to a ReactNode representing the full page for the specified protocol,
 *   or calls `notFound()` if the protocol data cannot be retrieved.
 ************************************************************************************************/
export default async function ProtocolPage({params}: {params: Promise<{slug: string}>}): Promise<ReactNode> {
	const {slug} = await params;
	const protocol = await getSupportedProtocol(slug);

	if (!protocol) {
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
				<ProtocolHeader
					name={protocol?.name}
					description={protocol?.description}
					items={['Self-custodial', 'Private', 'Multichain trading']}
					url={`${process.env.STRAPI_URL}${protocol?.featuredImg?.url}`}
					width={protocol?.featuredImg?.width}
					height={protocol?.featuredImg?.height}
				/>
				<ProtocolAbout
					description={protocol?.description}
					name={protocol?.name}
				/>
				<ProtocolEasier protocolName={protocol?.name} />
				<ProtocolFeatures description={protocol?.collabDescription} />

				<div className={'mb-16 mt-80'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
