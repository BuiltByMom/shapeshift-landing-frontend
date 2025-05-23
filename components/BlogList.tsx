'use client';

import Link from 'next/link';

import {useFetchPosts} from '@/hooks/useFetchPosts';

import {BlogPost} from './BlogPost';
import {Button} from './common/Button';

import type {TBlogPost} from '@/components/strapi/types';
import type {ReactNode} from 'react';

/************************************************************************************************
 * BlogList Component:

 * This client-side component is responsible for fetching and displaying a list of the latest
 * blog posts. It typically appears on pages like the homepage or sections dedicated to recent
 * content.

 * Features:
 * - Data Fetching: Uses the `useFetchPosts` hook to retrieve blog post data.
 * - Configurable Display: Allows specifying the number of posts to show (`pageSize`) and the
 *   sort order.
 * - Loading State: Shows a skeleton UI (a grid of pulsing placeholders) while posts are being
 *   fetched, improving perceived performance.
 * - Empty State: Displays a message if no blog posts are found or if there's an error fetching.
 * - Post Rendering: Uses the `BlogPost` component to render each individual post in the list.
 * - Responsive Grid: Arranges posts in a responsive grid that adapts to different screen sizes.
 ************************************************************************************************/

/************************************************************************************************
 * LatestBlogPosts Function Export:

 * Fetches and renders a list of the latest blog posts. It utilizes the `useFetchPosts` hook
 * for data retrieval and displays a loading skeleton or an empty message as appropriate.
 * The number of posts and sort order can be configured via props.

 * Props:
 * - pageSize (number, optional): The maximum number of posts to display (default: 3).
 * - sort ('asc' | 'desc', optional): The sort order for posts (default: 'desc' for latest first).

 * Returns:
 * - A ReactElement containing the grid of blog posts, or a loading/empty state indicator.
 ************************************************************************************************/
export function LatestBlogPosts({limit, isWithTitle = true}: {limit: number; isWithTitle?: boolean}): ReactNode {
	const {posts} = useFetchPosts({page: 1, pageSize: limit, sort: 'desc'});
	return (
		<div className={'grid w-full grid-cols-1 gap-4 lg:grid-cols-3'}>
			{isWithTitle && (
				<div className={'col-span-1 flex flex-col gap-16'}>
					<h1 className={'text-[40px] leading-10 text-white lg:text-7xl'}>{'Read more about ShapeShift.'}</h1>
					<Link href={'/blog'}>
						<Button title={'See all articles'} />
					</Link>
				</div>
			)}
			{posts.map((post: TBlogPost) => (
				<BlogPost
					key={post.id}
					post={post}
					isClassic
				/>
			))}
		</div>
	);
}
