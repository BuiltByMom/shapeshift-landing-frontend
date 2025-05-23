/************************************************************************************************
 ** Blog Content Component:
 **
 ** This client-side component is responsible for rendering the main content of a blog post.
 ** It takes a string of HTML content (presumably fetched from a CMS or similar source) and
 ** dangerously sets it as inner HTML within a div. This allows for flexible rendering of
 ** rich text content, including various HTML tags and styling that might be present in the
 ** source.
 **
 ** Security Note:
 ** Using `dangerouslySetInnerHTML` can expose the application to cross-site scripting (XSS)
 ** attacks if the `content` prop is not properly sanitized before being passed to this
 ** component. It is crucial to ensure that the HTML content comes from a trusted source or
 ** is sanitized to remove any malicious scripts or tags.
 **
 ** Props:
 ** - `content`: A string containing the HTML content of the blog post.
 ************************************************************************************************/
'use client';

import 'highlight.js/styles/github-dark.css';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex'; // For math rendering
import remarkEmoji from 'remark-emoji'; // For emoji support
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math'; // For math equations

import type {ReactNode} from 'react';

/************************************************************************************************
 ** BlogContent Function:
 **
 ** Renders the HTML content of a blog post. It uses `dangerouslySetInnerHTML` to interpret
 ** the provided HTML string. This component is typically used to display the body of a blog
 ** post that includes rich formatting.
 **
 ** Args:
 ** - content (string): The HTML string representing the blog post's content.
 **
 ** Returns:
 ** - A ReactNode, specifically a `div` element whose inner HTML is set to the provided content.
 ************************************************************************************************/
export function BlogContent({content}: {content: string}): ReactNode {
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
								className={'text-blue underline transition-colors hover:text-blueHover'}
								target={'_blank'}
								rel={'noopener noreferrer'}
								{...props}
							/>
						),
						p: ({...props}) => (
							<p
								className={'mb-4'}
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
