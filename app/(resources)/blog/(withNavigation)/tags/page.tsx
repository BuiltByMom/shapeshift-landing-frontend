/************************************************************************************************
 * Blog All Tags Page Component:

 * This client component is responsible for displaying a paginated list of all blog posts,
 * specifically for the main tags page (e.g., /blog/tags). While it lists all posts, it's
 * conceptually part of the tag navigation structure, serving as the landing page when a user
 * navigates to the general tags section before selecting a specific tag.

 * Features:
 * - Comprehensive Post Listing: Shows all blog posts, not filtered by any specific tag.
 * - Pagination: Inherits pagination from the `PostList` component.
 * - Configurable Page Size and Sort Order: Uses constants for page size and sort direction.
 * - Consistent User Experience: Provides a familiar list view even when no specific tag is
 *   selected yet within the tags section.
 ************************************************************************************************/
'use client';

import {Fragment, useState} from 'react';
import ReactPaginate from 'react-paginate';

import {BlogPost} from '@/components/BlogPost';
import {Banner} from '@/components/common/Banner';
import {IconChevron} from '@/components/common/icons/IconChevron';
import {cl} from '@/components/utils/cl';
import {useFetchPosts} from '@/hooks/useFetchPosts';

import type {ReactNode} from 'react';

/************************************************************************************************
 * PAGE_SIZE Constant:

 * Defines the number of posts to display per page on the all-tags blog listing.
 * Default value is 12.
 ************************************************************************************************/
const PAGE_SIZE = 12;

/************************************************************************************************
 * SORT Constant:

 * Defines the sort order for the posts on the all-tags blog listing.
 * Default value is 'desc' (descending, i.e., newest posts first).
 ************************************************************************************************/
const SORT = 'desc';

/************************************************************************************************
 * BlogList Default Export (for All Tags Page):

 * Renders a list of all blog posts, typically used for the main '/blog/tags' page.
 * It utilizes the `PostList` component, configured with `PAGE_SIZE` and `SORT` constants,
 * but without a specific `tag` filter, thus displaying all posts in a paginated and sorted
 * manner.

 * Returns:
 * - A ReactNode representing the list of all blog posts.
 ************************************************************************************************/
export default function BlogList(): ReactNode {
	const [page, setPage] = useState(1);
	const {posts, pagination, isLoading} = useFetchPosts({
		page,
		pageSize: PAGE_SIZE,
		sort: SORT,
		populateContent: true,
		cachePosts: true
	});

	if (isLoading) {
		return (
			<div className={'mb-20 grid gap-6 lg:grid-cols-3'}>
				{[...Array(PAGE_SIZE)].map((_, i) => (
					<div
						key={i}
						className={'h-64 animate-pulse rounded-2xl bg-gray-800'}
					/>
				))}
			</div>
		);
	}

	return (
		<Fragment>
			{posts.length === 0 ? (
				<p className={'my-20 text-center text-2xl text-gray-400'}>
					{"We couldn't find any blog posts matching your criteria."}
				</p>
			) : (
				<div className={'mb-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3'}>
					{posts.map(post => (
						<BlogPost
							key={post.slug}
							post={post}
							className={'!bg-stroke'}
						/>
					))}
				</div>
			)}
			<ReactPaginate
				pageCount={pagination?.pageCount ?? 1}
				pageRangeDisplayed={5}
				marginPagesDisplayed={2}
				onPageChange={({selected}) => setPage(selected + 1)}
				containerClassName={'flex gap-2 items-center justify-center'}
				pageClassName={'opacity-20 hover:opacity-100 transition-opacity'}
				pageLinkClassName={'px-6 py-4 flex items-center justify-center'}
				activeClassName={'!opacity-100'}
				previousClassName={cl(
					'hover:opacity-100 transition-opacity',
					page === 1 ? 'opacity-20' : 'opacity-100'
				)}
				previousLinkClassName={'px-6 py-4 flex items-center justify-center'}
				nextLinkClassName={'px-6 py-4 flex items-center justify-center'}
				nextClassName={cl(
					'hover:opacity-100 transition-opacity',
					page === pagination?.pageCount ? 'opacity-20' : 'opacity-100'
				)}
				disabledClassName={'hover:opacity-20 opacity-20 transition-opacity'}
				disabledLinkClassName={'cursor-not-allowed'}
				previousLabel={<IconChevron />}
				nextLabel={<IconChevron className={'rotate-180'} />}
			/>
			<Banner />
		</Fragment>
	);
}
