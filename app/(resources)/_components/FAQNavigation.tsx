/************************************************************************************************
 ** FAQ Navigation Component:

 ** This client-side component renders a sticky navigation sidebar for the FAQ page.
 ** It lists all FAQ sections and highlights the currently active section based on scroll position.
 ** Clicking a section title in the navigation will smoothly scroll the page to that section.

 ** Features:
 ** - Sticky positioning: The navigation stays visible as the user scrolls (on larger screens).
 ** - Active section highlighting: Clearly indicates which section the user is currently viewing.
 ** - Smooth scrolling: Provides a better user experience when navigating between sections.
 ** - Accessibility: Uses `aria-label` for the navigation and `aria-current` for the active item.
 ** - Responsive: Hidden on smaller screens where a sticky sidebar might obstruct content.

 ** Props:
 ** - sections: An array of objects, each containing an `id` and `sectionTitle` for an FAQ section.
 ** - activeSection: A string representing the title of the currently active FAQ section.
 ** - onSectionClick: A callback function that is triggered when a section title is clicked.
 **   It receives the `sectionTitle` as an argument and should handle the scroll logic.
 ************************************************************************************************/

'use client';

import {cl} from '@/components/utils/cl';

import type {ReactNode} from 'react';

type TFAQNavigationProps = {
	sections: {
		id: number;
		sectionTitle: string;
	}[];
	activeSection: string;
	onSectionClick: (sectionTitle: string) => void;
};

export function FAQNavigation({sections, activeSection, onSectionClick}: TFAQNavigationProps): ReactNode {
	if (!sections || sections.length === 0) {
		return null;
	}

	return (
		<nav
			className={'sticky top-[360px] ml-20 hidden h-full lg:block'}
			aria-label={'FAQ sections navigation'}>
			<ul className={'flex flex-col gap-4'}>
				{sections.map(section => (
					<li key={section.id}>
						<button
							type={'button'}
							onClick={() => onSectionClick(section.sectionTitle)}
							className={cl(
								'text-left text-lg transition-all hover:text-blue',
								activeSection === section.sectionTitle ? 'text-white' : 'text-gray-500'
							)}
							aria-current={activeSection === section.sectionTitle ? 'true' : 'false'}>
							{section.sectionTitle}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
}
