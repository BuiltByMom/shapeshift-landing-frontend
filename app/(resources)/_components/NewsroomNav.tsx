/************************************************************************************************
 ** Newsroom Navigation Component:
 **
 ** This client-side component renders navigation tabs for the Newsroom section.
 ** It dynamically displays either category tabs or tag tabs based on the current URL path
 ** and route parameters. It helps users filter news content by category or tag.
 **
 ** Features:
 ** - Context-aware: Shows category tabs by default or on category pages, and tag tabs
 **   on tag-related pages (e.g., /newsroom/tags or /newsroom/tags/[tag]).
 ** - Active tab highlighting: The currently selected category or tag tab is visually distinct.
 ** - Dynamic links: Generates correct HREFs for each tab, leading to the respective
 **   filtered news list.
 ** - Uses `usePathname` and `useParams` hooks from Next.js to determine the current route
 **   and parameters for dynamic behavior.
 ** - Leverages the `TabItem` component for individual tab rendering.
 ** - Utilizes predefined `newsroomCategories` and `newsroomTags` from constants.
 ************************************************************************************************/
'use client';

import {useParams, usePathname} from 'next/navigation';

import {TabItem} from '@/components/common/TabItem';
import {newsroomCategories, newsroomTags} from '@/components/constants';

/************************************************************************************************
 ** NewsroomNav Function:
 **
 ** Renders the navigation tabs for the newsroom. It checks the current path and parameters
 ** to decide whether to display category tabs or tag tabs.
 **
 ** If the path includes '/tags' or a specific tag parameter is present, it renders tabs for
 ** all available newsroom tags. Otherwise, it defaults to rendering tabs for newsroom categories.
 **
 ** Returns:
 ** - A ReactNode containing the rendered tab navigation, or null if no tabs are applicable.
 ************************************************************************************************/
export function NewsroomNav(): React.ReactNode {
	const pathname = usePathname();
	const params = useParams();
	const category = (params.category as string) || '';
	const tag = (params.tag as string) || '';

	if (tag || pathname.includes('/tags')) {
		return (
			<div className={'mb-6 flex w-full flex-wrap gap-4 rounded-full p-1'}>
				{newsroomTags.map(tab => (
					<TabItem
						key={tab.slug}
						title={tab.title}
						selected={tag ? tag.toLowerCase() === tab.slug.toLowerCase() : 'all' === tab.slug}
						href={tab.slug === 'all' ? '/newsroom/tags' : `/newsroom/tags/${tab.slug}`}
					/>
				))}
			</div>
		);
	}
	return (
		<div className={'mb-6 flex w-full flex-wrap gap-4 rounded-full p-1'}>
			{newsroomCategories.map(tab => (
				<TabItem
					key={tab.slug}
					title={tab.title}
					selected={category ? category.toLowerCase() === tab.slug.toLowerCase() : 'all' === tab.slug}
					href={tab.slug === 'all' ? '/newsroom' : `/newsroom/categories/${tab.slug}`}
				/>
			))}
		</div>
	);
}
