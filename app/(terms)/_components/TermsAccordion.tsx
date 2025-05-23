/************************************************************************************************
 ** TermsAccordion Component & Associated Types:

 ** This file defines a reusable accordion component specifically designed for displaying
 ** items within the Terms of Service or Privacy Policy pages. Each accordion item can be
 ** expanded or collapsed to show or hide its content.

 ** Features:
 ** - Uses `framer-motion` for smooth open/close animations.
 ** - Accessibility: Supports keyboard navigation (Enter/Space to toggle) and ARIA attributes.
 ** - Optimized: Uses `React.memo` to prevent unnecessary re-renders of individual accordions.
 ** - Generic: Accepts `TTermsItemData` to display different content items.

 ** `TTermsItemData` Type:
 ** - Defines the structure for each item displayed in the accordion, including an `id`,
 **   `title`, `date`, and the main `content` (as a string, potentially Markdown).

 ** `TermsAccordion` Function Component:
 ** - Manages its own open/closed state.
 ** - Renders a clickable header with the item's title and date.
 ** - Shows an animated plus/minus icon to indicate a toggle.
 ** - Displays the item's content (rendered via `TermsMarkdown`) when open.
 ************************************************************************************************/
'use client';

import {AnimatePresence, motion} from 'framer-motion';
import 'highlight.js/styles/github-dark.css';
import {memo, useCallback, useState} from 'react';

import TermsMarkdown from '@/app/(terms)/_components/TermsMarkdown';
import {AnimatedPlusMinusIcon} from '@/components/QuestionSection';

import type {KeyboardEvent, ReactNode} from 'react';

export type TTermsItemData = {
	id: number;
	title: string;
	date: string;
	content: string;
};

type TTermsAccordionProps = {
	item: TTermsItemData;
};

/************************************************************************************************
 ** TermsAccordion Function Component:

 ** Renders a single expandable/collapsible item for the terms pages.

 ** Props:
 ** - item: A `TTermsItemData` object containing the title, date, and content for the accordion item.

 ** State:
 ** - isOpen: Boolean, true if the accordion item is currently expanded, false otherwise.

 ** Callbacks:
 ** - handleToggle: Toggles the `isOpen` state.
 ** - handleKeyDown: Allows toggling with Enter or Spacebar for accessibility.
 ************************************************************************************************/
function TermsAccordion({item}: TTermsAccordionProps): ReactNode {
	const [isOpen, setIsOpen] = useState(false);

	const handleToggle = useCallback(() => {
		setIsOpen(prevState => !prevState);
	}, []);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			if (event.key === 'Enter' || event.key === ' ') {
				event.preventDefault();
				handleToggle();
			}
		},
		[handleToggle]
	);

	return (
		<div className={'group rounded-2xl bg-secondBg hover:bg-secondHoverBg'}>
			<div
				className={'flex cursor-pointer items-center justify-between px-10 py-8'}
				onClick={handleToggle}
				onKeyDown={handleKeyDown}
				role={'button'}
				tabIndex={0}
				aria-expanded={isOpen}
				aria-controls={`content-${item.id}`}>
				<div className={'flex flex-col gap-2 text-2xl'}>
					<span className={'font-bold'}>{item.title}</span>
					<span className={'text-sm text-gray-500'}>
						{new Date(item.date).toLocaleDateString(undefined, {
							year: 'numeric',
							month: 'long',
							day: 'numeric'
						})}
					</span>
				</div>
				<div
					className={
						'flex size-12 min-w-[48px] items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:scale-[1.16] group-hover:bg-blueHover'
					}
					aria-hidden={'true'}>
					<AnimatedPlusMinusIcon isOpen={isOpen} />
				</div>
			</div>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						id={`content-${item.id}`}
						initial={{height: 0, opacity: 0}}
						animate={{height: 'auto', opacity: 1}}
						exit={{height: 0, opacity: 0}}
						transition={{
							duration: 0.3,
							ease: 'easeInOut'
						}}
						className={'overflow-hidden'}>
						<div className={'rounded-2xl px-10 pb-6 text-gray-500'}>
							<TermsMarkdown content={item.content} />
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

/************************************************************************************************
 ** Default Export (Memoized TermsAccordion):

 ** Exports the `TermsAccordion` component wrapped in `React.memo`.
 ** This optimization prevents the component from re-rendering if its props (`item`) have not changed,
 ** which can be beneficial when rendering a list of accordion items.
 ************************************************************************************************/
export default memo(TermsAccordion);
