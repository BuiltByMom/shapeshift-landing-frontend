/************************************************************************************************
 ** BlogPost Components:
 **
 ** This file contains components related to displaying blog posts, including a general
 ** `BlogPost` component for individual posts, and specialized sub-components like
 ** `FeaturedPost` for highlighting a specific post and `PostCard` for a compact card view.
 **
 ** Features:
 ** - Versatile Display: Offers different ways to present blog posts (full, featured, card).
 ** - Content Truncation: `PostCard` can truncate long summaries for a cleaner look.
 ** - Image Handling: Displays featured images for posts.
 ** - Metadata Display: Shows post title, publication date, and tags.
 ** - Client-Side Navigation: Uses Next.js `Link` for navigating to individual post pages.
 ************************************************************************************************/
'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useMemo} from 'react';

import {cl} from './utils/cl';

import type {TBlogPost} from '@/components/strapi/types';
import type {ReactElement, ReactNode} from 'react';

/********************************************************************************************
 * Blog Post Card Component
 *
 * Displays a blog post preview card with image, title, date, and category.
 * Handles both internal and external blog links.
 ********************************************************************************************/

export function BlogPost({
	post,
	className,
	isClassic = false
}: {
	post: TBlogPost;
	className?: string;
	isClassic?: boolean;
}): ReactNode {
	if (post.isFeatured && !isClassic) {
		return (
			<>
				<FeaturedPost
					post={post}
					className={'hidden lg:grid'}
				/>
				<PostCard
					post={post}
					className={'!bg-slate-800 lg:hidden'}
				/>
			</>
		);
	}

	return (
		<PostCard
			post={post}
			className={className}
		/>
	);
}

/************************************************************************************************
 ** FeaturedPost Sub-Component:

 ** Renders a blog post in a "featured" style, typically larger and more prominent than regular
 ** posts. It displays the post's featured image, title, publication date, and tags.
 ** Clicking the post navigates to its full page.

 ** Props:
 ** - post (TBlogPost): The blog post data to display.
 ** - className (string, optional): Additional CSS classes for the main container.
 ************************************************************************************************/
function FeaturedPost({post, className}: {post: TBlogPost; className?: string}): ReactNode {
	const formatDate = useMemo(
		() =>
			(date: string): string => {
				return new Date(date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				});
			},
		[]
	);

	return (
		<Link
			href={`/blog/${post.slug}`}
			className={cl('col-span-3 h-[364px] grid grid-cols-2 rounded-2xl bg-secondBg p-6', className)}>
			<div className={'col-span-1 size-full max-h-[316px] max-w-[632px] overflow-hidden rounded-2xl'}>
				{post?.featuredImg?.url ? (
					<Image
						src={`${process.env.STRAPI_URL}${post?.featuredImg.url}`}
						alt={post.slug}
						width={post?.featuredImg.width ?? 0}
						height={post?.featuredImg.height ?? 0}
						className={'size-full object-cover'}
					/>
				) : (
					<div className={'h-full max-h-[316px] w-auto rounded-2xl bg-gray-500'} />
				)}
			</div>

			<div className={'col-span-1 ml-6 flex size-full flex-col justify-end gap-2'}>
				<div className={'flex items-center'}>
					{post.type?.length > 1 && <p className={'mr-2 text-xs text-blue'}>{post?.type.join(', ')}</p>}
					<p className={'text-xs text-gray-500'}>{formatDate(post.publishedAt)}</p>
				</div>
				<div>
					<p className={'text-[32px] leading-[40px]'}>{post.title}</p>
				</div>
			</div>
		</Link>
	);
}

/************************************************************************************************
 ** PostCard Sub-Component:
 **
 ** Renders a blog post as a compact card. It shows the featured image, title, a truncated
 ** summary, and the publication date. Ideal for lists or grids of posts.
 **
 ** Props:
 ** - post (TBlogPost): The blog post data.
 ** - className (string, optional): Additional CSS classes.
 ************************************************************************************************/
function PostCard({post, className}: {post: TBlogPost; className?: string}): ReactElement {
	/********************************************************************************************
	 * Memo: Creates a date formatting function
	 * No dependencies as it's a static function
	 ********************************************************************************************/
	const formatDate = useMemo(
		() =>
			(date: string): string => {
				return new Date(date).toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				});
			},
		[]
	);

	return (
		<Link
			href={`/blog/${post.slug}`}
			className={cl(
				'rounded-2xl p-6 transition-all bg-secondBg duration-300 hover:scale-[1.02] hover:bg-secondHoverBg',
				className
			)}>
			<div className={'h-[204px] max-w-[408px] overflow-hidden rounded-2xl'}>
				{post?.featuredImg?.url ? (
					<Image
						src={`${process.env.STRAPI_URL}${post?.featuredImg?.url}`}
						alt={post.slug}
						width={post?.featuredImg?.width ?? 0}
						height={post?.featuredImg?.height ?? 0}
						className={'size-full object-cover'}
					/>
				) : (
					<div className={'h-[204px] w-auto rounded-2xl bg-gray-500'} />
				)}
			</div>

			<div className={'mt-6 flex flex-col gap-2'}>
				<div className={'flex items-center'}>
					{post.type?.length > 1 && <p className={'mr-2 text-xs text-blue'}>{post?.type.join(', ')}</p>}
					<p className={'text-xs text-gray-500'}>{formatDate(post.publishedAt)}</p>
				</div>
				<div>
					<p className={'text-2xl'}>{post.title}</p>
				</div>
			</div>
		</Link>
	);
}
