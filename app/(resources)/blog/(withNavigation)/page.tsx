/************************************************************************************************
 ** Blog List Page:

 ** Displays a paginated grid of blog posts
 ** Features loading state, pagination, and empty state handling

 ** Features:
 ** - Client-side pagination for better UX
 ** - Loading skeletons during data fetch
 ** - Responsive grid layout for different screen sizes
 ** - Accessible navigation controls

 ** Data Flow:
 ** - Uses useFetchPosts hook to retrieve blog data
 ** - Handles pagination state in client component
 ** - Manages loading and empty states appropriately

 ** - Provides a clean and focused view for browsing all available blog posts.
 ************************************************************************************************/

'use client';

import {PostList} from '@/app/(resources)/_components/PostList';

import type {ReactNode} from 'react';

/************************************************************************************************
 ** BlogListPage Default Export:
 **
 ** Renders the main blog listing page, which displays all blog posts in a paginated format.
 ** It achieves this by utilizing the `PostList` component without any category or tag filters,
 ** effectively showing all posts.
 **
 ** Returns:
 ** - A ReactNode, specifically the `PostList` component configured to display all blog posts.
 ************************************************************************************************/
export default function BlogListPage(): ReactNode {
	return <PostList emptyMessage={"We couldn't find any blog posts matching your criteria."} />;
}
