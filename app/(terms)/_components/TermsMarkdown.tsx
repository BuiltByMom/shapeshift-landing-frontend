/************************************************************************************************
 * TermsMarkdown Component & Helpers:

 * This file provides a specialized Markdown renderer for the terms and conditions and
 * privacy policy pages. It ensures consistent styling and handling of Markdown content,
 * with a fallback to render raw HTML if the content appears to be HTML-based.

 * Features:
 * - Uses `react-markdown` with plugins for GFM, emoji, math, and syntax highlighting.
 * - Custom renderers for HTML elements (headings, code, tables, images, etc.) to apply
 *   Tailwind CSS classes for styling.
 * - `isHtmlContent` helper to detect if the input is likely HTML.
 * - `CodeBlock` helper component for rendering syntax-highlighted code blocks with language display.
 * - Optimized with `React.memo` for the main `TermsMarkdown` component.
 ************************************************************************************************/
'use client';

import 'highlight.js/styles/github-dark.css';
import Image from 'next/image';
import {memo} from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import remarkEmoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import type {ComponentProps, ReactNode} from 'react';

type TTermsMarkdownProps = {
	content: string;
};

/************************************************************************************************
 * isHtmlContent Function:

 * Helper function to determine if a given string of content is likely HTML rather than Markdown.
 * It checks for the presence of common HTML tags.

 * Args:
 * - content: The string content to check.

 * Returns:
 * - Boolean: True if HTML tags are detected, false otherwise.
 ************************************************************************************************/
function isHtmlContent(content: string): boolean {
	return /<\/?(?:div|span|p|a|img|h[1-6]|ul|ol|li|table|tr|td|th|br|hr|em|strong)[^>]*>/i.test(content);
}

/************************************************************************************************
 * TermsMarkdown Function Component:

 * Renders Markdown content with specific styling for terms pages.
 * If the content is detected as HTML, it will render it directly using `dangerouslySetInnerHTML`.
 * Otherwise, it uses `ReactMarkdown` with custom components for styling.

 * Props:
 * - content: The string content to render (can be Markdown or HTML).
 ************************************************************************************************/
function TermsMarkdown({content}: TTermsMarkdownProps): ReactNode {
	if (isHtmlContent(content)) {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		return <div dangerouslySetInnerHTML={{__html: content}} />;
	}

	return (
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
				code: CodeBlock,

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

				// Images - properly typed with next/image
				img: ({src, alt}) => {
					// If src is missing, render nothing
					if (!src) {
						return null;
					}

					return (
						<Image
							src={src}
							alt={alt || ''}
							width={1200}
							height={1200}
							className={'my-8 h-auto max-w-full rounded-lg shadow-lg'}
							loading={'lazy'}
						/>
					);
				},

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
				li: ({...props}) => (
					<li
						className={'my-4 list-inside'}
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
	);
}

/************************************************************************************************
 * CodeBlock Function Component:

 * Custom renderer for code blocks within Markdown content.
 * If a language is specified (e.g., ```js), it displays the language name and applies
 * syntax highlighting via `rehype-highlight`.
 * Inline code is rendered with a simple background.

 * Props:
 * - className: Optional className, used to detect the language (e.g., "language-javascript").
 * - children: The code content to render.
 * - ...props: Other props passed to the underlying `code` element.
 ************************************************************************************************/
function CodeBlock({className, children, ...props}: ComponentProps<'code'>): ReactNode {
	const match = /language-(\w+)/.exec(className || '');

	if (match) {
		return (
			<div className={'relative'}>
				<div
					className={'absolute right-2 top-2 text-xs text-gray-400'}
					aria-label={`Language: ${match[1]}`}>
					{match[1]}
				</div>
				<pre className={className}>
					<code
						className={className}
						{...props}>
						{children}
					</code>
				</pre>
			</div>
		);
	}

	return (
		<code
			className={'rounded bg-gray-800 px-1.5 py-0.5'}
			{...props}>
			{children}
		</code>
	);
}

/************************************************************************************************
 * Default Export (Memoized TermsMarkdown):

 * Exports the `TermsMarkdown` component wrapped in `React.memo`.
 * This prevents re-renders if the `content` prop has not changed, optimizing performance.
 ************************************************************************************************/
export default memo(TermsMarkdown);
