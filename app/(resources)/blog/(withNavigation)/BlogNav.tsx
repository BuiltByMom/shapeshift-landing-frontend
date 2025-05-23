/************************************************************************************************
 * Blog Navigation Component:

 * This client-side component, `BlogNav`, renders navigation tabs for the Blog section of the
 * application. It allows users to filter blog content by category or by tag. The component
 * dynamically determines whether to display category tabs or tag tabs based on the current
 * URL path and any route parameters (like a specific category or tag slug).

 * Features:
 * - Context-Aware Navigation: Displays category tabs by default or when on a category-specific
 *   page (e.g., `/blog/categories/[categorySlug]`). It switches to displaying tag tabs when the
 *   user navigates to a tags page (e.g., `/blog/tags` or `/blog/tags/[tagSlug]`).
 * - Active Tab Highlighting: The currently selected category or tag tab is visually
 *   differentiated to provide clear feedback to the user.
 * - Dynamic Link Generation: Constructs the correct HREFs for each tab, ensuring that
 *   clicking a tab leads to the appropriate filtered list of blog posts.
 * - Hook-Based Route Analysis: Leverages `usePathname` and `useParams` hooks from Next.js to
 *   access the current route information, enabling its dynamic and context-aware behavior.
 * - Component Reusability: Utilizes the `TabItem` component for rendering individual tabs,
 *   promoting a consistent look and feel.
 * - Predefined Filter Options: Uses `blogTypes` (for categories) and `blogTags` constants,
 *   likely imported from a shared constants file, to populate the available filter tabs.
 ************************************************************************************************/
'use client';

import {useParams, usePathname} from 'next/navigation';

import {TabItem} from '@/components/common/TabItem';
import {blogTags, blogTypes} from '@/components/constants';

/************************************************************************************************
 * BlogNav Function:

 * Renders the navigation tabs for the blog section. This client component dynamically chooses
 * between displaying category tabs or tag tabs based on the current URL path and parameters.
 * If the path includes '/tags' or if a specific tag parameter is present in the URL, it
 * renders tabs for all available blog tags. Otherwise, it defaults to rendering tabs for
 * blog categories (types).

 * It uses `usePathname` and `useParams` to determine the active route and any relevant slugs
 * for category or tag, highlighting the active tab accordingly.

 * Returns:
 * - React.ReactNode: A JSX fragment containing the rendered tab navigation elements
 *   (using `TabItem` components), or potentially `null` if neither tags nor categories
 *   are applicable (though current logic always renders one or the other).
 ************************************************************************************************/
export function BlogNav(): React.ReactNode {
	const pathname = usePathname();
	const params = useParams();
	const category = (params.category as string) || '';
	const tag = (params.tag as string) || '';

	if (tag || pathname.includes('/tags')) {
		return (
			<div className={'mb-6 flex w-full flex-wrap gap-4 rounded-full p-1'}>
				{blogTags.map(tab => (
					<TabItem
						key={tab.slug}
						title={tab.title}
						selected={tag ? tag.toLowerCase() === tab.slug.toLowerCase() : 'all' === tab.slug}
						href={tab.slug === 'all' ? '/blog/tags' : `/blog/tags/${tab.slug}`}
					/>
				))}
			</div>
		);
	}
	return (
		<div className={'mb-6 flex w-full flex-wrap gap-4 rounded-full p-1'}>
			{blogTypes.map(tab => (
				<TabItem
					key={tab.slug}
					title={tab.title}
					selected={category ? category.toLowerCase() === tab.slug.toLowerCase() : 'all' === tab.slug}
					href={tab.slug === 'all' ? '/blog' : `/blog/categories/${tab.slug}`}
				/>
			))}
		</div>
	);
}
