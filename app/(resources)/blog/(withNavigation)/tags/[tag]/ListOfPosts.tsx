/************************************************************************************************
 * Blog Tag-Filtered List of Posts Component:

 * This client component is responsible for displaying a paginated list of blog posts that
 * are filtered by a specific tag. The tag is provided as a prop.

 * Features:
 * - Tag-Based Filtering: Fetches and displays only posts associated with the given tag.
 * - Pagination: Inherits pagination capabilities from the `PostList` component.
 * - Configurable Page Size and Sort Order: Uses predefined constants for page size and sort
 *   direction, but these could be customized if needed.
 * - Clear Empty State: Provides a user-friendly message if no posts are found for the
 *   specified tag.

 * Props:
 * - `tag`: A string representing the tag slug to filter posts by.
 ************************************************************************************************/
'use client';

import {Fragment, useState} from 'react';
import ReactPaginate from 'react-paginate';

import {BlogPost} from '@/components/BlogPost';
import {Banner} from '@/components/common/Banner';
import {IconChevron} from '@/components/common/icons/IconChevron';
import {cl} from '@/components/utils/cl';
import {useFetchPosts} from '@/hooks/useFetchPosts';

import type {TBlogPost} from '@/components/strapi/types';
import type {ReactElement} from 'react';

/************************************************************************************************
 * PAGE_SIZE Constant:

 * Defines the number of posts to display per page in the tag-filtered list.
 * Default value is 12.
 ************************************************************************************************/
const PAGE_SIZE = 12;

/************************************************************************************************
 * SORT Constant:

 * Defines the sort order for the posts in the tag-filtered list.
 * Default value is 'desc' (descending, i.e., newest posts first).
 ************************************************************************************************/
const SORT = 'desc';

/************************************************************************************************
 * ListOfPosts Function:

 * Renders a list of blog posts filtered by the provided tag slug. It utilizes the
 * `PostList` component, passing the `tag` prop to it, along with configured `PAGE_SIZE`
 * and `SORT` parameters. This allows for a paginated and sorted display of posts relevant
 * to the specified tag.

 * Args:
 * - props: An object containing `tag` (string) - the slug of the tag for which to display posts.

 * Returns:
 * - A ReactElement representing the list of posts for the given tag.
 ************************************************************************************************/
export function ListOfPosts(props: {tag: string}): ReactElement {
	const {tag} = props;
	const [page, setPage] = useState(1);
	const {posts, pagination, isLoading} = useFetchPosts({
		page,
		pageSize: PAGE_SIZE,
		sort: SORT,
		tag: tag,
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
					{posts.map((post: TBlogPost) => (
						<BlogPost
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
