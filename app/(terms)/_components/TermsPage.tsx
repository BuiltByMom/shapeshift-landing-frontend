/************************************************************************************************
 ** Terms Page Structure & Components:

 ** This file defines the main structure and components for rendering legal documents like
 ** the Privacy Policy and Terms of Service. It includes functions for generating metadata,
 ** displaying the content within accordions, and providing a loading skeleton.

 ** Components & Functions:
 ** - `generateMetadata`: Dynamically creates page metadata (title, description, OpenGraph)
 **   based on the provided page title.
 ** - `TermsContent`: Renders a list of `TTermsItemData` objects using the `TermsAccordion`
 **   component for each item. Applies specific styling via `terms.module.css`.
 ** - `TermsLoadingSkeleton`: A simple skeleton UI displayed as a fallback during content loading,
 **   mimicking the accordion structure.
 ** - `TermsPage`: The main exported component that orchestrates the display. It includes a header
 **   with the page title and a "Get Started" button, and then uses `Suspense` to show
 **   `TermsLoadingSkeleton` while the `TermsContent` is being prepared/rendered.
 ************************************************************************************************/

import {Suspense} from 'react';

import styles from '@/app/(terms)/_components/terms.module.css';
import TermsAccordion from '@/app/(terms)/_components/TermsAccordion';
import {Button} from '@/components/common/Button';

import type {TTermsItemData} from '@/app/(terms)/_components/TermsAccordion';
import type {Metadata} from 'next';
import type {ReactNode} from 'react';

type TTermsPageProps = {
	title: string;
	items: TTermsItemData[];
};

/************************************************************************************************
 ** generateMetadata Function:

 ** Creates dynamic `Metadata` object for a terms page (e.g., Privacy Policy, Terms of Service).
 ** This metadata is used by Next.js for SEO and social sharing purposes.

 ** Args:
 ** - title: The title of the specific terms page (e.g., "Privacy Policy").

 ** Returns:
 ** - A `Metadata` object containing the page title, description, and OpenGraph tags.
 ************************************************************************************************/
export function generateMetadata({title}: {title: string}): Metadata {
	return {
		title: `${title} | ShapeShift`,
		description: `ShapeShift ${title.toLowerCase()} - legal information for users.`,
		openGraph: {
			title: `ShapeShift ${title}`,
			description: `View ShapeShift's ${title.toLowerCase()} and legal information.`
		}
	};
}

/************************************************************************************************
 ** TermsContent Function Component:

 ** Renders the main content of a terms page, which consists of a list of accordion items.
 ** It maps over an array of `TTermsItemData` and renders a `TermsAccordion` for each.

 ** Props:
 ** - title: The title of the terms page (passed but not directly used in this component's rendering).
 ** - items: An array of `TTermsItemData` objects, each representing a section of the terms document.
 ************************************************************************************************/
function TermsContent({items}: TTermsPageProps): ReactNode {
	return (
		<div className={styles.blogContent}>
			<div className={'flex flex-col gap-2'}>
				{items.map(item => (
					<TermsAccordion
						key={item.id}
						item={item}
					/>
				))}
			</div>
		</div>
	);
}

/************************************************************************************************
 ** TermsLoadingSkeleton Function Component:

 ** Provides a loading state UI (skeleton screen) that mimics the appearance of the
 ** `TermsContent` component. This is shown as a fallback via `Suspense` while the actual
 ** terms content is loading or being prepared.
 ************************************************************************************************/
function TermsLoadingSkeleton(): ReactNode {
	return (
		<div className={'animate-pulse space-y-4'}>
			{Array.from({length: 3}).map((_, index) => (
				<div
					key={index}
					className={'h-24 rounded-2xl bg-secondBg/50'}
				/>
			))}
		</div>
	);
}

/************************************************************************************************
 ** TermsPage Function Component:

 ** The primary component for rendering a complete terms page (e.g., Privacy Policy).
 ** It includes a header section with the page title and a call-to-action button.
 ** The main content, consisting of accordion items, is rendered via the `TermsContent`
 ** component, wrapped in a `Suspense` boundary with `TermsLoadingSkeleton` as the fallback.

 ** Props:
 ** - title: The title of the terms page (e.g., "Terms of Service").
 ** - items: An array of `TTermsItemData` objects to be displayed in accordions.
 ************************************************************************************************/
export function TermsPage({title, items}: TTermsPageProps): ReactNode {
	return (
		<main className={'container mx-auto mt-40 px-4 py-8'}>
			<div className={'mb-20 flex w-full flex-col md:flex-row md:justify-between'}>
				<section className={'flex flex-col'}>
					<h1 className={'mb-6 text-4xl md:text-7xl'}>{title}</h1>
					<Button
						variant={'blue'}
						href={'https://app.shapeshift.com/'}
						title={'Get Started'}
					/>
				</section>
			</div>

			<Suspense fallback={<TermsLoadingSkeleton />}>
				<TermsContent
					title={title}
					items={items}
				/>
			</Suspense>
		</main>
	);
}
