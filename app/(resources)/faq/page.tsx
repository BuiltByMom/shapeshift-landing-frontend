/************************************************************************************************
 ** FAQ Page:
 **
 ** Displays a comprehensive FAQ page with categorized questions and answers
 ** Features smooth scrolling navigation and responsive layout
 **
 ** Features:
 ** - Dynamic content from Strapi CMS
 ** - Automatic section highlighting based on scroll position
 ** - Optimized loading with proper caching strategy
 ** - SEO-friendly metadata and structure
 **
 ** Data Flow:
 ** - Fetches FAQ data from the API
 ** - Passes data to FAQContent component for rendering
 ** - Handles data loading errors gracefully
 ************************************************************************************************/

import {notFound} from 'next/navigation';

import {FAQContent} from '@/app/(resources)/_components/FAQContent';
import {fetchFaqData} from '@/app/(resources)/_utils/fetchUtils';

import type {Metadata} from 'next';
import type {ReactNode} from 'react';

export const metadata: Metadata = {
	title: 'Frequently Asked Questions | ShapeShift',
	description: 'Find answers to common questions about ShapeShift, cryptocurrency, and decentralized finance.',
	keywords: 'ShapeShift, FAQ, cryptocurrency, questions, help, support, DeFi'
};

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
