/************************************************************************************************
 ** Individual Newsroom Post Page Component:
 **
 ** This client-side component is responsible for fetching and rendering the content of a
 ** single newsroom post, identified by its slug from the URL parameters. It handles loading
 ** states, displays the post content (either as HTML or Markdown), and includes navigation
 ** back to the main newsroom.
 **
 ** Features:
 ** - Dynamic Content Fetching: Uses `useParams` to get the post slug and `useFetchNewsroom`
 **   (with `useCachedNews` for potential caching) to retrieve the specific post data.
 ** - Loading State: Displays a `LoadingSkeleton` while the post data is being fetched.
 ** - Content Rendering: Uses a `NewsroomContent` sub-component to render the post body. This
 **   sub-component can handle both direct HTML content and Markdown (with syntax highlighting,
 **   math, emoji support via `ReactMarkdown` and various plugins).
 ** - Image Display: Shows a featured image for the post if available.
 ** - Metadata Display: Shows post title, publication date, and tags.
 ** - Navigation: Includes a "Back to Newsroom" link and a `Banner` at the end.
 ** - Error Handling: If the post is not found (e.g., `useFetchNewsroom` returns no post for
 **   the slug), it triggers a `notFound()` response.
 ************************************************************************************************/
'use client';

import 'highlight.js/styles/github-dark.css';
import Image from 'next/image';
import Link from 'next/link';
import {notFound, useParams, useRouter} from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex'; // For math rendering
import remarkEmoji from 'remark-emoji'; // For emoji support
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math'; // For math equations

import {Banner} from '@/components/common/Banner';
import {IconBack} from '@/components/common/icons/IconBack';
import {useCachedNews} from '@/components/contexts/CachedNews';
import {useFetchNewsroom} from '@/hooks/useFetchNewsroom';

import type {ReactNode} from 'react';

/************************************************************************************************
 ** LoadingSkeleton Component:
 **
 ** Provides a visual placeholder UI that mimics the structure of a newsroom post page while
 ** the actual content is loading. This improves perceived performance and user experience.
 **
 ** Structure:
 ** - A container with animated pulse elements representing the back button, date, tags, title,
 **   and several lines of content.
 ** - Uses Tailwind CSS for styling, including `animate-pulse` and background colors.
 **
 ** Returns:
 ** - A ReactNode representing the loading skeleton.
 ************************************************************************************************/
function LoadingSkeleton(): ReactNode {
	return (
		<div className={'container relative mx-auto mb-96 mt-40 max-w-4xl px-4'}>
			<div className={'absolute -left-32 top-0 h-10 w-20 animate-pulse rounded-lg bg-gray-800'} />
			<div className={'mb-8 h-6 w-32 animate-pulse rounded-lg bg-gray-800'} />
			<div className={'mb-8 flex gap-2'}>
				<div className={'h-6 w-24 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-6 w-24 animate-pulse rounded-lg bg-gray-800'} />
			</div>
			<div className={'mb-8 h-12 w-3/4 animate-pulse rounded-lg bg-gray-800'} />
			<div className={'space-y-4'}>
				<div className={'h-4 w-full animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-5/6 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-4/6 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-3/4 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-full animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-2/3 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-5/6 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-4/6 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-3/4 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-full animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-2/3 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-3/4 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-full animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-4/6 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-3/4 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-full animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-2/3 animate-pulse rounded-lg bg-gray-800'} />
			</div>
		</div>
	);
}

/************************************************************************************************
 ** NewsroomContent Component:
 **
 ** Renders the main body content of a newsroom post. It can handle content provided as either
 ** raw HTML or Markdown. For Markdown, it uses `ReactMarkdown` with plugins for extended
 ** functionality like GFM (GitHub Flavored Markdown), emoji, math equations (KaTeX), and code
 ** syntax highlighting.
 **
 ** Features:
 ** - Dual Content Handling: Detects if the input `content` string contains HTML tags. If so, it
 **   renders it using `dangerouslySetInnerHTML`. Otherwise, it processes it as Markdown.
 ** - Rich Markdown Rendering: Includes plugins for:
 **   - `remark-gfm`: Tables, strikethrough, task lists, etc.
 **   - `remark-emoji`: Converts emoji codes like `:tada:` to actual emoji.
 **   - `remark-math` & `rehype-katex`: Renders LaTeX math expressions.
 **   - `rehype-highlight`: Provides syntax highlighting for code blocks.
 ** - Custom Styling: Applies custom CSS classes for various Markdown elements (headers, code
 **   blocks, tables, images, blockquotes, lists, links) and includes global JSX styles for
 **   overall `blog-content` (retained name for style consistency) formatting.
 **
 ** Props:
 ** - `content`: A string containing the newsroom post body, either as HTML or Markdown.
 **
 ** Returns:
 ** - A ReactNode representing the formatted newsroom post content.
 ************************************************************************************************/
function NewsroomContent({content}: {content: string}): ReactNode {
	// Check if content looks like HTML (contains HTML tags)
	const isHtml = /<\/?(?:div|span|p|a|img|h[1-6]|ul|ol|li|table|tr|td|th|br|hr|em|strong)[^>]*>/i.test(content);

	return (
		<div className={'blog-content prose prose-invert max-w-none'}>
			{isHtml ? (
				// eslint-disable-next-line @typescript-eslint/naming-convention
				<div dangerouslySetInnerHTML={{__html: content}} />
			) : (
				<ReactMarkdown
					remarkPlugins={[remarkGfm, remarkEmoji, remarkMath]}
					rehypePlugins={[rehypeHighlight, rehypeKatex]}
					components={{
						// Headers
						h1: ({...props}) => (
							<h1
								className={'mb-4 mt-8 text-4xl font-bold'}
								{...props}
							/>
						),
						h2: ({...props}) => (
							<h2
								className={'mb-3 mt-6 text-3xl font-bold'}
								{...props}
							/>
						),
						h3: ({...props}) => (
							<h3
								className={'mb-2 mt-4 text-2xl font-bold'}
								{...props}
							/>
						),

						// Code blocks
						code: ({className, children, ...props}) => {
							const match = /language-(\w+)/.exec(className || '');
							return match ? (
								<div className={'relative'}>
									<div className={'absolute right-2 top-2 text-xs text-gray-400'}>{match[1]}</div>
									<pre className={className}>
										<code
											className={className}
											{...props}>
											{children}
										</code>
									</pre>
								</div>
							) : (
								<code
									className={'rounded bg-gray-800 px-1.5 py-0.5'}
									{...props}>
									{children}
								</code>
							);
						},

						// Tables
						table: ({...props}) => (
							<div className={'my-8 overflow-x-auto'}>
								<table
									className={'min-w-full'}
									{...props}
								/>
							</div>
						),
						th: ({...props}) => (
							<th
								className={'bg-gray-800 px-6 py-3 text-left'}
								{...props}
							/>
						),
						td: ({...props}) => (
							<td
								className={'border-t border-gray-700 px-6 py-4'}
								{...props}
							/>
						),

						// Images
						img: ({...props}) => (
							<Image
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								// @ts-ignore
								width={1200}
								// eslint-disable-next-line @typescript-eslint/ban-ts-comment
								// @ts-ignore
								height={1200}
								className={'my-8 h-auto max-w-full rounded-lg shadow-lg'}
								loading={'lazy'}
								{...props}
							/>
						),

						// Blockquotes
						blockquote: ({...props}) => (
							<blockquote
								className={'border-blue-500 my-6 border-l-4 pl-4 italic text-gray-300'}
								{...props}
							/>
						),

						// Lists
						ul: ({...props}) => (
							<ul
								className={'my-4 list-inside list-disc'}
								{...props}
							/>
						),
						ol: ({...props}) => (
							<ol
								className={'my-4 list-inside list-decimal'}
								{...props}
							/>
						),

						// Links
						a: ({...props}) => (
							<a
								className={'text-blue-400 hover:text-blue-300 transition-colors'}
								target={'_blank'}
								rel={'noopener noreferrer'}
								{...props}
							/>
						)
					}}>
					{content}
				</ReactMarkdown>
			)}

			<style
				jsx
				global>
				{`
					.blog-content {
						/* Base styles */
						font-size: 1.125rem;
						line-height: 1.75;
						color: #e5e7eb;
					}

					/* Code blocks */
					.blog-content pre {
						background-color: #1f2937;
						padding: 1.5rem;
						border-radius: 0.5rem;
						overflow-x: auto;
						margin: 1.5rem 0;
						position: relative;
					}

					/* Footnotes */
					.blog-content .footnotes {
						border-top: 1px solid #374151;
						margin-top: 2rem;
						padding-top: 1rem;
					}

					.blog-content .footnotes ol {
						font-size: 0.875rem;
					}

					/* Definition lists */
					.blog-content dl {
						margin: 1.5rem 0;
					}

					.blog-content dt {
						font-weight: bold;
						margin-top: 1rem;
					}

					.blog-content dd {
						margin-left: 1.5rem;
					}

					/* Custom containers */
					.blog-content .warning {
						background-color: #fef3c7;
						border-left: 4px solid #f59e0b;
						padding: 1rem;
						margin: 1.5rem 0;
						color: #92400e;
					}

					.blog-content p {
						margin-bottom: 16px;
					}

					.blog-content strong {
						margin-top: 20px;
						display: inline-block;
					}
					.blog-content img {
						margin-top: 20px;
						margin-bottom: 20px;
					}
				`}
			</style>
		</div>
	);
}

/************************************************************************************************
 ** NewsroomPostPage Function (Default Export):
 **
 ** Fetches and renders an individual newsroom post based on the slug from the URL.
 ** It manages loading states, displays post metadata (title, date, tags, featured image), and
 ** renders the post content using the `NewsroomContent` component.
 **
 ** Hooks Used:
 ** - `useParams`: To get the `slug` of the news post from the URL.
 ** - `useRouter`: For programmatic navigation (e.g., back button).
 ** - `useCachedNews`: To potentially retrieve the post from a cache.
 ** - `useFetchNewsroom`: To fetch the post data if not found in cache or if caching is not used.
 **
 ** Logic Flow:
 ** 1. Retrieves `slug` from URL.
 ** 2. Attempts to get the post from `cachedNews` using the slug.
 ** 3. If not in cache, fetches the post using `useFetchNewsroom` with `populateContent: true`.
 ** 4. Displays `LoadingSkeleton` if `isLoading` is true.
 ** 5. If the post is not found after fetching, calls `notFound()`.
 ** 6. Renders the post details: back button, date, tags, title, featured image (if any), and
 **    the main content via `NewsroomContent`.
 ** 7. Includes a `Banner` at the bottom.
 **
 ** Returns:
 ** - A ReactNode representing the full newsroom post page, or a loading state, or triggers a
 **   404 if the post is not found.
 ************************************************************************************************/
export default function NewsroomPostPage(): ReactNode {
	const {slug} = useParams();

	const {
		cachedResponse: {data: cachedPosts}
	} = useCachedNews();
	const {posts, isLoading} = useFetchNewsroom({
		page: 1,
		pageSize: 1,
		sort: 'desc',
		populateContent: true,
		cachePosts: true,
		slug: slug as string,
		skip: !!cachedPosts.find(p => p.slug === slug)
	});

	const post = [...cachedPosts, ...posts].find(p => p.slug === slug);
	const router = useRouter();

	if (isLoading) {
		return <LoadingSkeleton />;
	}

	if (!post) {
		notFound();
	}

	return (
		<>
			<article className={'prose prose-invert container relative mx-auto mb-20 mt-40 max-w-4xl px-4'}>
				<button
					type={'button'}
					className={'absolute -left-32 top-0 flex items-center gap-1 p-3 pt-0 text-gray-500'}
					onClick={() => router.back()}>
					<IconBack />
					<span>{'Back'}</span>
				</button>
				<div className={'mb-8 text-gray-400'}>{new Date(post.publishedAt).toLocaleDateString()}</div>

				<div className={'mb-8 flex flex-wrap gap-2'}>
					{post.tags.map((tag: string) => (
						<Link
							href={`/newsroom/tags/${tag}`}
							className={'text-blue'}
							key={tag}>
							{`#${tag}`}
						</Link>
					))}
				</div>
				<h1 className={'mb-4 text-4xl font-bold'}>{post.slug.replace(/-/g, ' ')}</h1>
				<NewsroomContent content={post.content} />
			</article>
			{!isLoading && (
				<div className={'container mx-auto'}>
					<Banner />
				</div>
			)}
		</>
	);
}
