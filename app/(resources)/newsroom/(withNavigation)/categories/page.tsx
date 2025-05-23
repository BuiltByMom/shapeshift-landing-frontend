/************************************************************************************************
 * Newsroom All Categories Page Component:

 * This client-side component renders the page that displays all newsroom posts when the user
 * navigates to the general categories view (e.g., `/newsroom/categories`) without a specific
 * category selected. It effectively lists all news posts, paginated.

 * Features:
 * - Default View: Serves as the landing page for browsing all newsroom categories, showing all
 *   posts by default.
 * - Pagination: Inherits pagination from the underlying mechanism (likely `useFetchNewsroom`
 *   and `ReactPaginate`).
 * - Loading State: Shows a loading skeleton while posts are being fetched.
 * - Empty State: Displays a message if no newsroom posts are found.
 * - Consistent UI: Uses `NewsPost` for individual post rendering and `Banner` for a consistent
 *   footer/CTA.
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

 * Renders a paginated list of all newsroom posts. This component is displayed when the user
 * is on the general newsroom categories page (e.g., /newsroom/categories) without a specific
 * category chosen. It utilizes the `useFetchNewsroom` hook to fetch posts and `ReactPaginate`
 * for pagination controls.

 * State:
 * - `page`: The current page number for pagination, managed by `useState`.

 * Fetched Data:
 * - `posts`: An array of newsroom post objects.
 * - `pagination`: Pagination metadata (e.g., total pages).
 * - `isLoading`: Boolean indicating if posts are currently being fetched.

 * Returns:
 * - A ReactNode containing the list of news posts, pagination, loading/empty states, and a
 *   banner.
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
