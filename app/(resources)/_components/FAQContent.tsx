/************************************************************************************************
 ** FAQ Content Component:

 ** This client component renders the main content for the FAQ page. It displays FAQ sections,
 ** each containing a list of questions and answers (using `QuestionSection`). It also features
 ** a sticky navigation sidebar (`FAQNavigation`) that highlights the currently viewed section
 ** and allows for smooth scrolling to other sections.

 ** State & Refs:
 ** - `activeSection`: String, stores the title of the FAQ section currently in or nearest to view.
 ** - `sectionRefs`: A ref object mapping section titles to their corresponding HTMLElement.
 **   Used to calculate section positions for scroll-spy functionality.
 ** - `isManualScrolling`: A ref boolean, true when a user clicks a nav link to scroll.
 **   This temporarily disables automatic scroll-spy to prevent jitter.
 ** - `rafId`: A ref for storing the ID of `requestAnimationFrame`, used for optimizing scroll events.

 ** Effects & Logic:
 ** - Scroll Handling (`useEffect`):
 **   - Listens to window scroll events.
 **   - Uses `requestAnimationFrame` to efficiently determine which FAQ section is closest to the
 **     top of the viewport (with an offset for the header).
 **   - Updates `activeSection` state to highlight the corresponding item in `FAQNavigation`.
 **   - Skips updates if `isManualScrolling` is true.
 ** - Section Navigation (`scrollToSection` function):
 **   - Called when a user clicks a link in `FAQNavigation`.
 **   - Sets `isManualScrolling` to true.
 **   - Immediately updates `activeSection` for responsiveness.
 **   - Calculates the target scroll position (accounting for header offset) and scrolls smoothly.
 **   - Resets `isManualScrolling` after a timeout (allowing scroll animation to finish).

 ** Props:
 ** - `faqData`: An object of type `TFaqData` containing the title and an array of FAQ sections,
 **   each with its own title and list of question-answer items.
 ************************************************************************************************/

'use client';

import {useEffect, useRef, useState} from 'react';

import {Banner} from '@/components/common/Banner';
import {RESOURCES_DICT} from '@/components/dictionary/resources';
import {QuestionSection} from '@/components/QuestionSection';

import {FAQNavigation} from './FAQNavigation';

import type {TFaqData, TFaqSection} from '@/components/strapi/types';
import type {ReactNode} from 'react';

type TFAQContentProps = {
	faqData: TFaqData;
};

export function FAQContent({faqData}: TFAQContentProps): ReactNode {
	const [activeSection, setActiveSection] = useState<string>('');
	const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
	const isManualScrolling = useRef(false);
	const rafId = useRef<number>();

	/************************************************************************************************
	 ** Scroll Handling
	 **
	 ** Detects which section is currently in view during scrolling
	 ** Uses requestAnimationFrame for performance and prevents interference during manual scrolling
	 ************************************************************************************************/
	useEffect(() => {
		const handleScroll = (): void => {
			// Skip scroll handling when user has manually clicked a section
			if (isManualScrolling.current) {
				return;
			}

			// Cancel any pending animation frame to avoid rapid updates
			if (rafId.current) {
				cancelAnimationFrame(rafId.current);
			}

			// Use requestAnimationFrame for better performance
			rafId.current = requestAnimationFrame(() => {
				// Calculate positions of all sections
				const sectionPositions = Object.entries(sectionRefs.current).map(([title, element]) => ({
					title,
					top: element?.getBoundingClientRect().top ?? 0
				}));

				// Find which section is closest to our target position (160px from top)
				// This accounts for the header height and provides a good UX
				const closestSection = sectionPositions.reduce(
					(closest, current) => {
						const currentDistance = Math.abs(current.top - 160);
						const closestDistance = Math.abs(closest.top - 160);
						return currentDistance < closestDistance ? current : closest;
					},
					sectionPositions[0] || {title: '', top: 0}
				);

				// Update the active section
				setActiveSection(closestSection.title);
			});
		};

		// Add scroll event listener
		window.addEventListener('scroll', handleScroll);

		// Initialize by triggering the scroll handler
		handleScroll();

		// Clean up event listener and any pending animation frames
		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (rafId.current) {
				cancelAnimationFrame(rafId.current);
			}
		};
	}, []);

	/************************************************************************************************
	 ** Section Navigation
	 **
	 ** Handles user clicking on a section in the navigation
	 ** Implements smooth scrolling and temporary disables scroll tracking
	 ************************************************************************************************/
	const scrollToSection = (sectionTitle: string): void => {
		const element = sectionRefs.current[sectionTitle];
		if (!element) {
			return;
		}

		// Flag that we're manually scrolling to prevent interference
		isManualScrolling.current = true;

		// Update active section immediately for better UX
		setActiveSection(sectionTitle);

		// Calculate scroll position with offset for header height
		const elementPosition = element.getBoundingClientRect().top;
		const offsetPosition = elementPosition + window.scrollY - 160;

		// Smooth scroll to the target position
		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth'
		});

		// Reset the manual scrolling flag after animation completes
		setTimeout(() => {
			isManualScrolling.current = false;
		}, 500);
	};

	// Early return if data is missing
	if (!faqData?.faqSection) {
		return <div className={'mt-16 text-center text-gray-400'}>{RESOURCES_DICT.faq.noDataMessage}</div>;
	}

	return (
		<div className={'relative mt-[120px] flex w-full flex-col items-center justify-center lg:mt-60 lg:gap-20'}>
			<div className={'container flex flex-col'}>
				{/* FAQ Title */}
				<h1 className={'text-center text-[40px] leading-10 lg:max-w-[600px] lg:text-left lg:text-7xl'}>
					{faqData.title}
				</h1>

				<div className={'my-14 flex justify-center lg:justify-between'}>
					{/* FAQ Sections */}
					<div className={'flex flex-col gap-10 lg:w-3/4'}>
						{faqData.faqSection.map((section: TFaqSection) => (
							<section
								key={section.id}
								ref={el => {
									sectionRefs.current[section.sectionTitle] = el;
								}}
								aria-labelledby={`section-${section.id}`}>
								<h2
									id={`section-${section.id}`}
									className={'mb-6 text-2xl text-gray-500'}>
									{section.sectionTitle}
								</h2>

								<div className={'flex flex-col gap-2'}>
									{section.faqSectionItem.map(item => (
										<QuestionSection
											key={item.id}
											faqSectionItem={item}
										/>
									))}
								</div>
							</section>
						))}
					</div>

					{/* FAQ Navigation Sidebar */}
					<FAQNavigation
						sections={faqData.faqSection}
						activeSection={activeSection}
						onSectionClick={scrollToSection}
					/>
				</div>

				{/* Footer Banner */}
				<Banner />
			</div>
		</div>
	);
}
