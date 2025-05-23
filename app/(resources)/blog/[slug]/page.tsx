/************************************************************************************************
 * Individual Blog Post Page Component:

 * This server component is responsible for rendering a single blog post page. It fetches the
 * content for a specific blog post based on its slug (obtained from the URL parameters)
 * and then displays this content using the `BlogContent` component. It also handles loading
 * and error states gracefully.

 * Features:
 * - Dynamic Content Fetching: Retrieves blog post data by slug using `useFetchPosts`.
 * - Content Rendering: Uses `BlogContent` to display the fetched post HTML.
 * - Loading State: Displays a `BlogSkeleton` component while the post data is being fetched.
 * - Error Handling: If the post is not found (e.g., invalid slug or API error), it triggers
 *   a 404 "Not Found" page using Next.js's `notFound()` function.
 * - SEO: Injects a JSON-LD script for `BlogPosting` schema to improve search engine
 *   visibility.

 * Props:
 * - `params`: An object containing route parameters, expected to have a `slug` property which
 *   is a string representing the unique identifier of the blog post.
 ************************************************************************************************/
'use client';

import 'highlight.js/styles/github-dark.css';
import Link from 'next/link';
import {notFound, useParams, useRouter} from 'next/navigation';
import Script from 'next/script';

import {BlogContent} from '@/app/(resources)/blog/[slug]/BlogContent';
import {BlogSkeleton} from '@/app/(resources)/blog/[slug]/BlogSkeleton';
import {generateBlogPostSchema} from '@/app/_utils/schema';
import {Banner} from '@/components/common/Banner';
import {IconBack} from '@/components/common/icons/IconBack';
import {useCachedPosts} from '@/components/contexts/CachedPosts';
import {useFetchPosts} from '@/hooks/useFetchPosts';

import type {ReactNode} from 'react';

/************************************************************************************************
 * BlogPost Default Export:

 * Asynchronously renders an individual blog post page. It fetches the post data based on the
 * slug from the URL parameters. While loading, it shows a `BlogSkeleton`. If the post is
 * found, it displays the content using `BlogContent` and includes a JSON-LD script for SEO.
 * If the post is not found, it redirects to a 404 page.

 * Returns:
 * - A Promise resolving to a ReactNode representing the blog post page, or calls `notFound()`
 *   if the post data cannot be fetched.
 ************************************************************************************************/
export default function BlogPost(): ReactNode {
	const params = useParams();
	const slug = params.slug as string;

	const {
		cachedResponse: {data: cachedPosts}
	} = useCachedPosts();
	const {posts, isLoading} = useFetchPosts({
		page: 1,
		pageSize: 1,
		sort: 'desc',
		populateContent: true,
		cachePosts: true,
		slug: slug,
		skip: !!cachedPosts.find(p => p.slug === slug)
	});

	const post = [...cachedPosts, ...posts].find(p => p.slug === slug);
	const router = useRouter();

	if (isLoading) {
		return <BlogSkeleton />;
	}

	if (!post) {
		notFound();
	}

	// Generate structured data for the blog post
	const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shapeshift.com';
	const blogPostSchema = generateBlogPostSchema(post, baseUrl);

	return (
		<>
			{/* Add structured data */}
			<Script
				id={'blog-post-schema'}
				type={'application/ld+json'}
				// eslint-disable-next-line @typescript-eslint/naming-convention
				dangerouslySetInnerHTML={{__html: JSON.stringify(blogPostSchema)}}
			/>

			<article className={'prose prose-invert container relative mx-auto mb-20 mt-40 max-w-4xl px-4'}>
				<button
					className={'absolute -left-32 top-0 flex items-center gap-1 p-3 pt-0 text-gray-500'}
					onClick={() => router.back()}>
					<IconBack />
					<span>{'Back'}</span>
				</button>
				<div className={'mb-8 text-gray-400'}>{new Date(post.publishedAt).toLocaleDateString()}</div>

				<div className={'mb-8 flex flex-wrap gap-2'}>
					{post.tags.map((tag: string, index: number) => (
						<Link
							href={`/blog/tags/${tag}`}
							className={'text-blue'}
							key={index}>
							{`#${tag}`}
						</Link>
					))}
				</div>
				<h1 className={'mb-4 text-4xl font-bold'}>{post.slug.replace(/-/g, ' ')}</h1>
				<BlogContent content={post.content} />
			</article>
			{!isLoading && (
				<div className={'container mx-auto'}>
					<Banner />
				</div>
			)}
		</>
	);
}
