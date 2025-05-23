/************************************************************************************************
 ** Newsroom Category Posts List Component:
 **
 ** This client-side component is responsible for displaying a list of newsroom posts filtered
 ** by a specific category. The category slug is passed as a prop. It leverages the generic
 ** `PostList` component to handle the actual fetching, pagination, and rendering of posts.
 **
 ** Features:
 ** - Category-Specific Filtering: Ensures that only posts belonging to the specified newsroom
 **   category are displayed.
 ** - Reusability: Uses the shared `PostList` component for consistency in display and
 **   functionality (e.g., pagination, loading states, empty states).
 ** - Category Name Formatting: Converts the category slug to a display-friendly, capitalized
 **   format for use in messages (e.g., empty state message).
 ** - Dynamic Empty State Message: Provides a context-aware message if no posts are found in
 **   the specified category.
 **
 ** Props:
 ** - `category`: A string representing the slug of the newsroom category to filter posts by.
 ************************************************************************************************/
'use client';

import {Fragment, useState} from 'react';
import ReactPaginate from 'react-paginate';

import {Banner} from '@/components/common/Banner';
import {IconChevron} from '@/components/common/icons/IconChevron';
import {newsroomCategoriesSlugToCategory} from '@/components/constants';
import {NewsPost} from '@/components/NewsPost';
import {cl} from '@/components/utils/cl';
import {useFetchNewsroom} from '@/hooks/useFetchNewsroom';

import type {ReactElement} from 'react';

const PAGE_SIZE = 12;
const SORT = 'desc';

/************************************************************************************************
 ** ListOfPosts Function:
 **
 ** Renders a list of newsroom posts filtered by the provided category slug. It utilizes the
 ** `PostList` component, passing the `category` prop (after converting the slug to the
 ** appropriate category type via `newsroomCategoriesSlugToCategory`) and a custom
 ** `emptyMessage`. This allows for a paginated display of posts belonging to the specified
 ** newsroom category.
 **
 ** Args:
 ** - props: An object containing `category` (string) - the slug of the newsroom category for
 **   which to display posts.
 **
 ** Returns:
 ** - A ReactElement representing the list of newsroom posts for the given category.
 ************************************************************************************************/
export function ListOfPosts(props: {category: string}): ReactElement {
	const {category} = props;
	const [page, setPage] = useState(1);
	const {posts, pagination, isLoading} = useFetchNewsroom({
		page,
		pageSize: PAGE_SIZE,
		sort: SORT,
		category: newsroomCategoriesSlugToCategory(category),
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
				<div className={'mb-20 grid gap-6 lg:grid-cols-3'}>
					{posts.map(post => (
						<NewsPost
							key={post.documentId}
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
				containerClassName={'flex gap-2 items-center justify-center mb-16'}
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
