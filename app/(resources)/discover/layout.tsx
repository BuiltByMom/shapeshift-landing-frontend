import type {Metadata} from 'next';
import type {ReactNode} from 'react';

/************************************************************************************************
 * Discover Pages Layout Component:

 * This server component defines the overall layout for all pages within the "Discover"
 * section of the application. It typically includes common structural elements, metadata
 * generation, and ensures a consistent look and feel across these pages.

 * Features:
 * - Metadata Generation: Provides a `generateMetadata` function to set default SEO and
 *   social sharing metadata (title, description, Open Graph tags) for the Discover section.
 * - Consistent Structure: Wraps the `children` (specific page content) within a `main`
 *   HTML5 element, often styled with common padding and responsive classes.
 * - Root Layout for Discover Section: Acts as the primary layout for routes like
 *   `/discover` and `/discover/[slug]`.

 * Props:
 * - `children`: ReactNode, representing the specific content of the page that will be
 *   rendered within this layout (e.g., the Discover landing page content or a specific
 *   Discover item's details).
 ************************************************************************************************/

/************************************************************************************************
 * generateMetadata Function:

 * Asynchronously generates default metadata for the "Discover" section pages. This metadata
 * includes a general title and description for the Discover section, along with Open Graph
 * tags for social media sharing. This function is typically called by Next.js during the
 * build or request time to populate the `<head>` of the HTML document.

 * Returns:
 * - A Promise resolving to a `Metadata` object containing default SEO and social sharing
 *   information for the Discover section.
 ************************************************************************************************/
export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Explore Web3 with ShapeShift',
		description: 'Discover the world of Web3 with ShapeShift.',
		keywords: 'Shapeshift, Explore Web3',
		openGraph: {
			title: 'Explore Web3 with ShapeShift',
			description: 'Discover the world of Web3 with ShapeShift.',
			type: 'website',
			images: [
				{
					url: `${process.env.STRAPI_URL}/og.png`
				}
			]
		},
		twitter: {
			card: 'summary_large_image',
			title: 'Explore Web3 with ShapeShift',
			description: 'Discover the world of Web3 with ShapeShift.',
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

 * Defines the main layout structure for pages within the "Discover" section. This component
 * simply renders its `children` within a `main` HTML5 element, which is styled to provide
 * consistent padding and responsive behavior across all Discover pages.

 * Args:
 * - children (ReactNode): The specific content of the page to be rendered within this layout.

 * Returns:
 * - A ReactNode, specifically a `main` element wrapping the page content.
 ************************************************************************************************/
export default function Layout({children}: {children: ReactNode}): ReactNode {
	return children;
}
