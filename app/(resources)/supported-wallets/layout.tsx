/************************************************************************************************
 * Supported Wallets Layout Component & Metadata:

 * This file defines the layout component and metadata generation function for the
 * "Supported Wallets" section of the application. The layout is a simple pass-through for
 * its children, while `generateMetadata` provides default SEO and social sharing information
 * for all pages under `/supported-wallets`.
 ************************************************************************************************/
import type {Metadata} from 'next';
import type {ReactNode} from 'react';

/************************************************************************************************
 * generateMetadata Function:

 * Asynchronously generates default metadata for all pages within the "Supported Wallets"
 * section. This metadata includes a general title, description, keywords, and Open Graph/
 * Twitter card information, promoting the discoverability of ShapeShift's supported wallets.

 * Returns:
 * - A Promise resolving to a `Metadata` object containing default SEO and social sharing
 *   information for the supported wallets section.
 ************************************************************************************************/
export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'ShapeShift Supported Wallets',
		description: 'Discover all the wallets Shapeshift supports. Buy, sell, and swap crypto with ease.',
		keywords: 'Shapeshift, Supported Wallets',
		openGraph: {
			title: 'ShapeShift Supported Wallets',
			description: 'Discover all the wallets Shapeshift supports. Buy, sell, and swap crypto with ease.',
			type: 'website',
			images: [
				{
					url: `${process.env.STRAPI_URL}/og.png`
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title: 'ShapeShift Supported Wallets',
			description: 'Discover all the wallets Shapeshift supports. Buy, sell, and swap crypto with ease.',
			images: [
				{
					url: `${process.env.STRAPI_URL}/og.png`
				}
			]
		}
	};
}

/************************************************************************************************
 * Layout Default Export:

 * Defines the main layout structure for pages within the "Supported Wallets" section. This
 * component is a simple pass-through, rendering its `children` directly. It serves as the
 * root layout for routes like `/supported-wallets` and `/supported-wallets/[slug]`.

 * Args:
 * - children (ReactNode): The specific content of the page to be rendered within this layout.

 * Returns:
 * - A ReactNode, which is the direct rendering of the `children` prop.
 ************************************************************************************************/
export default function Layout({children}: {children: ReactNode}): ReactNode {
	return children;
}
