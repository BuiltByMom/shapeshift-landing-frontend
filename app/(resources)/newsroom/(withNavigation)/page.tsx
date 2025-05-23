/************************************************************************************************
 * Newsroom List Page Component (All Posts):

 * This client-side component renders the main newsroom listing page, displaying all newsroom
 * posts in a paginated format. It serves as the default view when no specific category or
 * tag filters are applied by the user.

 * Features:
 * - Comprehensive Listing: Shows all available newsroom posts.
 * - Pagination: Implements pagination using `useFetchNewsroom` and `ReactPaginate` to handle
 *   large numbers of posts efficiently.
 * - Loading State: Displays a skeleton loader while posts are being fetched, improving UX.
 * - Empty State: Shows a user-friendly message if no newsroom posts are found.
 * - Consistent Post Display: Uses the `NewsPost` component to render each individual news item,
 *   ensuring a uniform look and feel.
 * - Banner: Includes a `Banner` component, likely for calls-to-action or important announcements.

 * Constants:
 * - `PAGE_SIZE`: Defines the number of posts to display per page (12).
 * - `SORT`: Sets the default sort order for posts ('desc' for newest first).
 ************************************************************************************************/
'use client';

import {Fragment, useState} from 'react';
import ReactPaginate from 'react-paginate';

import {Banner} from '@/components/common/Banner';
import {IconChevron} from '@/components/common/icons/IconChevron';
import {NewsPost} from '@/components/NewsPost';
import {cl} from '@/components/utils/cl';
import {useFetchNewsroom} from '@/hooks/useFetchNewsroom';

import type {ReactNode} from 'react';

const PAGE_SIZE = 12;
const SORT = 'desc';

/************************************************************************************************
 * NewsroomList Function (Default Export):

 * Renders a paginated list of all newsroom posts. This component is typically used as the
 * main page for the newsroom (e.g., `/newsroom`) when no specific filters (like category or
 * tag) are active. It fetches data using `useFetchNewsroom` and manages pagination state.

 * State:
 * - `page`: The current page number for pagination, initialized to 1 and managed by `useState`.

 * Fetched Data (from `useFetchNewsroom`):
 * - `posts`: An array of newsroom post objects.
 * - `pagination`: Object containing pagination metadata (e.g., `pageCount`).
 * - `isLoading`: Boolean indicating whether the posts are currently being fetched.

 * Returns:
 * - A ReactNode containing the grid of news posts, pagination controls, loading/empty state
 *   indicators, and a banner.
 ************************************************************************************************/
export default function NewsroomList(): ReactNode {
	const [page, setPage] = useState(1);
	const {posts, pagination, isLoading} = useFetchNewsroom({
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
						<NewsPost
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
