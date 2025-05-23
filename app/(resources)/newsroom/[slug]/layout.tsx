import {notFound} from 'next/navigation';

import type {Metadata} from 'next';

/************************************************************************************************
 * Newsroom Post Layout Component:

 * This server component defines the layout for individual newsroom post pages (e.g.,
 * `/newsroom/[slug]`). Its primary responsibilities are to fetch metadata specific to the post
 * for SEO and social sharing, and to provide a basic structural wrapper for the post content.

 * Features:
 * - Dynamic Metadata Generation: The `generateMetadata` function fetches data for the specific
 *   news post based on its slug. This data (title, summary, featured image, tags, etc.) is
 *   then used to construct comprehensive metadata (title, description, Open Graph tags,
 *   Twitter card tags) for optimal SEO and social media sharing.
 * - Content Placeholder: The layout component itself is straightforward, primarily rendering its
 *   `children`. The actual content of the news post is passed as `children` from the page
 *   component.
 * - Error Handling: If a post with the given slug is not found during metadata generation, it
 *   triggers a `notFound()` response.

 * Data Flow for Metadata:
 * 1. Receives `params` containing the post `slug`.
 * 2. Fetches post details from the Strapi API (`/api/newsrooms`) filtered by the `slug`.
 * 3. Extracts title, summary, featured image URL, tags, and publication date.
 * 4. Constructs and returns a `Metadata` object.
 ************************************************************************************************/
export async function generateMetadata({params}: {params: Promise<{slug: string}>}): Promise<Metadata> {
	const {slug} = await params;
	const data = await fetch(
		`${process.env.STRAPI_URL}/api/newsrooms?filters[slug][$eq]=${slug}&fields[0]=postSummary&fields[1]=tags&fields[2]=title&fields[3]=publishedAt&populate[0]=featuredImg`,
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
		title: `${post.title} | ShapeShift Newsroom`,
		description: post.postSummary || `Read ${post.title} on ShapeShift Newsroom`,
		keywords: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags,
		openGraph: {
			title: post.title,
			description: post.postSummary,
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
			description: post.postSummary || `Read ${post.title} on ShapeShift Newsroom`,
			images: [
				{
					url: `${process.env.STRAPI_URL}${imageUrl}`
				}
			]
		}
	};
}

/************************************************************************************************
 * NewsroomPostLayout Default Export:

 * Provides the basic layout structure for an individual newsroom post page. This component
 * simply renders its `children`, which will be the actual content of the news post (e.g.,
 * title, body, images) provided by the corresponding page component.

 * Args:
 * - children (ReactNode): The content of the individual news post to be rendered within this
 *   layout.

 * Returns:
 * - A ReactNode, which is the direct rendering of the `children` prop.
 ************************************************************************************************/
export default function NewsroomPostLayout({children}: {children: React.ReactNode}): React.ReactNode {
	return children;
}
