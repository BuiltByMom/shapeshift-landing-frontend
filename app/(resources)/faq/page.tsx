/************************************************************************************************
 * FAQ Page:

 * Displays a comprehensive FAQ page with categorized questions and answers
 * Features smooth scrolling navigation and responsive layout

 * Features:
 * - Dynamic content from Strapi CMS
 * - Automatic section highlighting based on scroll position
 * - Optimized loading with proper caching strategy
 * - SEO-friendly metadata and structure

 * Data Flow:
 * - Fetches FAQ data from the API
 * - Passes data to FAQContent component for rendering
 * - Handles data loading errors gracefully
 ************************************************************************************************/

import {notFound} from 'next/navigation';

import {FAQContent} from '@/app/(resources)/_components/FAQContent';
import {fetchFaqData} from '@/app/(resources)/_utils/fetchUtils';
import {RESOURCES_DICT} from '@/components/dictionary/resources';

import type {Metadata} from 'next';
import type {ReactNode} from 'react';

/************************************************************************************************
 * metadata Constant:

 * Defines the static metadata for the FAQ page. This includes the page title, description,
 * and Open Graph/Twitter card information for SEO and social sharing. This metadata is
 * constant as the FAQ page content is generally static.
 ************************************************************************************************/
export const metadata: Metadata = {
	title: RESOURCES_DICT.faq.metadata.title,
	description: RESOURCES_DICT.faq.metadata.description,
	keywords: RESOURCES_DICT.faq.metadata.keywords
};

/************************************************************************************************
 * FAQPage Default Export:

 * Asynchronously renders the main FAQ page. It fetches FAQ data using `fetchFaqData` and
 * then passes this data to the `FAQContent` component for display. If the FAQ data cannot be
 * fetched (e.g., API error or no data available), it triggers a 404 "Not Found" page. The
 * page also includes a JSON-LD script for `WebPage` schema to improve SEO.

 * Returns:
 * - A Promise resolving to a ReactNode representing the FAQ page, or calls `notFound()` if
 *   data fetching fails.
 ************************************************************************************************/
export default async function FAQPage(): Promise<ReactNode> {
	// Fetch FAQ data using centralized utility
	const faqData = await fetchFaqData();

	// Handle missing data case
	if (!faqData) {
		console.error('Failed to load FAQ data');
		return notFound();
	}

	return (
		<>
			{/* FAQ content with navigation */}
			<FAQContent faqData={faqData} />
		</>
	);
}
