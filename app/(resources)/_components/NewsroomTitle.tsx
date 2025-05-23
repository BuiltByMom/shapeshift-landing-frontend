/************************************************************************************************
 * Newsroom Title Component:

 * This client-side component dynamically generates and displays the title for various
 * Newsroom pages. The title changes based on the current route, specifically whether the
 * user is viewing all news, a specific category, all tags, or a specific tag.

 * Features:
 * - Contextual Titling: Displays "ShapeShift Newsroom" by default.
 *   - If a category is active (e.g., /newsroom/categories/[category]), it shows
 *     "Category: [CategoryName]".
 *   - If viewing all tags (e.g., /newsroom/tags), it shows "All tags".
 *   - If a specific tag is active (e.g., /newsroom/tags/[tag]), it shows "Tagged: [TagName]".
 * - Styling: Uses distinct styling for the main part of the title and the dynamic
 *   (category/tag) part, often highlighting the dynamic part in blue.
 * - Route Awareness: Employs `usePathname` and `useParams` from Next.js to determine the
 *   current context and adjust the title accordingly.
 * - Helper Function: Uses `newsroomCategoriesSlugToCategory` to convert a category slug
 *   to its displayable name.
 ************************************************************************************************/
'use client';

import {useParams, usePathname} from 'next/navigation';

import {newsroomCategoriesSlugToCategory} from '@/components/constants';

/************************************************************************************************
 * NewsroomTitle Function:

 * Determines and renders the appropriate title for the current newsroom page view.
 * It inspects URL parameters (`category`, `tag`) and the current pathname to construct
 * a context-specific title.

 * Logic Flow:
 * 1. If a `tag` parameter exists or the pathname includes '/tags':
 *    - If a specific `tag` is present, display "Tagged: [tag_name]".
 *    - Otherwise (on the main /newsroom/tags page), display "All tags".
 * 2. Else if a `category` parameter exists:
 *    - Display "Category: [category_name]" (using `newsroomCategoriesSlugToCategory` for display name).
 * 3. Otherwise (on the main /newsroom page):
 *    - Display "ShapeShift Newsroom."

 * Returns:
 * - A ReactNode containing the dynamically generated title, styled appropriately.
 ************************************************************************************************/
export function NewsroomTitle(): React.ReactNode {
	const pathname = usePathname();
	const params = useParams();
	const category = (params.category as string) || '';
	const tag = (params.tag as string) || '';

	if (tag || pathname.includes('/tags')) {
		if (tag) {
			return (
				<div className={'mb-8 text-7xl'}>
					<span className={'text-white'}>{'Tagged: '}</span>
					<span className={'capitalize text-blue'}>{tag}</span>
				</div>
			);
		}
		return (
			<div className={'mb-8 text-7xl'}>
				<span className={'text-white'}>{'All '}</span>
				<span className={'capitalize text-blue'}>{'tags'}</span>
			</div>
		);
	}

	if (category) {
		return (
			<div className={'mb-8 text-7xl'}>
				<span className={'text-white'}>{'Category: '}</span>
				<span className={'capitalize text-blue'}>{newsroomCategoriesSlugToCategory(category)}</span>
			</div>
		);
	}
	return (
		<div className={'mb-8 text-[40px] leading-10 lg:text-7xl'}>
			<span className={'text-white'}>{'ShapeShift'}</span>
			&nbsp;
			<span className={'text-blue'}>{'Newsroom'}</span>
			<span className={'hidden text-blue lg:inline'}>{'.'}</span>
		</div>
	);
}
