/************************************************************************************************
 ** Terms Section Layout Component:

 ** This component defines the shared layout for all pages within the `(terms)` route group,
 ** such as the Terms of Service and Privacy Policy pages.
 ** It ensures a consistent structure, styling, and includes a common footer banner.

 ** It also exports `metadata` for this group of pages, providing default SEO and
 ** OpenGraph information.
 ************************************************************************************************/

import {Banner} from '@/components/common/Banner';

import type {Metadata} from 'next';
import type {ReactNode} from 'react';

/************************************************************************************************
 ** metadata Constant:

 ** Default metadata for pages within the (terms) route group.
 ** Provides title, description, and OpenGraph tags for SEO and social sharing.
 ************************************************************************************************/
export const metadata: Metadata = {
	title: 'Legal Documents | ShapeShift',
	description: 'ShapeShift privacy policy and terms of service documents.',
	openGraph: {
		title: 'ShapeShift Legal Documents',
		description: 'Privacy Policy and Terms of Service for ShapeShift',
		type: 'website',
		locale: 'en_US',
		url: 'https://shapeshift.com/terms',
		siteName: 'ShapeShift'
	}
};

type TTermsLayoutProps = {
	children: ReactNode;
};

/************************************************************************************************
 ** TermsLayout Component:

 ** The main layout component for the terms pages.
 ** Wraps the page content and adds a standard `Banner` component at the bottom.

 ** Props:
 ** - children: The React nodes representing the content of the specific terms page.
 ************************************************************************************************/
export default function TermsLayout({children}: TTermsLayoutProps): ReactNode {
	return (
		<>
			{children}
			<div className={'container mx-auto mt-20 px-4'}>
				<Banner />
			</div>
		</>
	);
}
