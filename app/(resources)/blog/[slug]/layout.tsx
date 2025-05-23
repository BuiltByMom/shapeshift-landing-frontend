import {notFound} from 'next/navigation';

import type {Metadata} from 'next';

/************************************************************************************************
 * Layout component for blog post pages
 * Handles metadata generation for SEO and social sharing
 * Uses Next.js 13+ Metadata API
 ************************************************************************************************/

/************************************************************************************************
 ** generateMetadata Function:
 **
 ** Asynchronously generates metadata for a specific blog post page. It fetches the blog post
 ** data using its slug from the route parameters. Based on the fetched data, it constructs
 ** metadata including the page title, description, and Open Graph/Twitter card details (like
 ** title, description, and image). If the post is not found, it returns an empty metadata
 ** object.
 **
 ** Args:
 ** - params: An object containing `slug` (string) of the blog post.
 **
 ** Returns:
 ** - A Promise resolving to a `Metadata` object for the blog post page.
 ************************************************************************************************/
export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
	const {slug} = await params;
	const data = await fetch(
		`${process.env.STRAPI_URL}/api/posts?filters[slug][$eq]=${slug}&fields[0]=summary&fields[2]=tags&fields[3]=title&fields[4]=publishedAt&populate[0]=featuredImg`,
		{
			headers: {
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
			}
		}
	).then(async res => res.json());

	const post = data.data[0];

	if (!post) {
		return notFound();
	}

	const imageUrl = post.featuredImg.formats.thumbnail.url;
	return {
		title: `${post.title} | ShapeShift Blog`,
		description: post.summary || `Read ${post.title} on ShapeShift Blog`,
		keywords: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags,
		openGraph: {
			title: post.title,
			description: post.summary,
			type: 'article',
			publishedTime: post.publishedAt,
			images: [
				{
					url: `${process.env.STRAPI_URL}${imageUrl}`
				}
			],
			authors: ['ShapeShift'],
			tags: Array.isArray(post.tags) ? post.tags : [post.tags]
		},
		twitter: {
			card: 'summary_large_image',
			title: post.title,
			description: post.summary || `Read ${post.title} on ShapeShift Blog`,
			images: [
				{
					url: `${process.env.STRAPI_URL}${imageUrl}`
				}
			]
		}
	};
}

/************************************************************************************************
 ** BlogPostLayout Default Export:
 **
 ** Provides the layout structure for individual blog post pages. This component wraps the
 ** actual content of a blog post (`children`) within a styled main container. It typically
 ** includes a banner at the bottom of the page.
 **
 ** Args:
 ** - children (ReactNode): The content of the individual blog post to be rendered within this
 **   layout.
 **
 ** Returns:
 ** - A ReactNode representing the layout for a single blog post.
 ************************************************************************************************/
export default function BlogPostLayout({children}: {children: React.ReactNode}): React.ReactNode {
	return children;
}
