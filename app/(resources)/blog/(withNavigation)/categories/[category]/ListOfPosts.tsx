/************************************************************************************************
 * Category Blog Posts List Component:

 * Displays a filtered list of blog posts by category
 * Features loading state, pagination, and empty state handling

 * Features:
 * - Uses shared PostList component for consistency
 * - Maps category slugs to actual category types
 * - Shows loading state during data fetching
 * - Handles empty state when no posts are found

 * Data Flow:
 * - Accepts category parameter from route
 * - Converts slug to proper category type
 * - Passes category filter to the fetch hook

 * - `category`: The slug of the category to filter posts by.
 ************************************************************************************************/

'use client';

import {PostList} from '@/app/(resources)/_components/PostList';
import {blogTypesSlugToCategory} from '@/components/constants';

import type {ReactElement} from 'react';

/************************************************************************************************
 * ListOfPosts Function:

 * Renders a list of blog posts filtered by the provided category slug. It utilizes the
 * `PostList` component, passing the `category` prop to it. This allows for a
 * paginated display of posts belonging to the specified category.

 * Args:
 * - category (string): The slug of the category for which to display posts.

 * Returns:
 * - A ReactElement representing the list of posts for the given category.
 ************************************************************************************************/
export function ListOfPosts({category}: {category: string}): ReactElement {
	// Convert URL slug to proper category type for the API
	const categoryType = blogTypesSlugToCategory(category);

	// Format category name for display (capitalize first letter)
	const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

	return (
		<PostList
			category={categoryType}
			emptyMessage={`We couldn't find any posts in the ${formattedCategory} category.`}
		/>
	);
}
