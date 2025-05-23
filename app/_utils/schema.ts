/* eslint-disable @typescript-eslint/naming-convention */
/************************************************************************************************
 ** Schema.org JSON-LD Generator Utilities:

 ** This module provides utility functions to generate Schema.org compliant JSON-LD (JavaScript
 ** Object Notation for Linked Data) structured data. This data helps search engines understand
 ** the content of web pages, leading to better SEO and the possibility of rich snippets in
 ** search results.

 ** Supported Schemas:
 ** - BlogPosting: For individual blog articles.
 ** - SoftwareApplication: For product pages (representing ShapeShift's offerings as software).
 ** - WebSite: For the main website identity.
 ** - Organization: For providing information about ShapeShift as an organization.
 ************************************************************************************************/

import type {TBlogPost} from '@/components/strapi/types';

/************************************************************************************************
 ** organizationSchema Constant:

 ** Defines the base Schema.org `Organization` data for ShapeShift.
 ** This constant is reused by other schema generation functions.
 ** Includes properties like context, type, name, URL, logo, and social media links (sameAs).
 ************************************************************************************************/
const organizationSchema = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: 'ShapeShift',
	url: 'https://shapeshift.com',
	logo: 'https://shapeshift.com/icon.png',
	sameAs: ['https://twitter.com/ShapeShift', 'https://discord.com/invite/shapeshift']
};

/************************************************************************************************
 ** generateBlogPostSchema Function:

 ** Generates Schema.org `BlogPosting` (Article) structured data for a given blog post.

 ** Args:
 ** - post: A `TBlogPost` object containing details of the blog post (title, slug, summary, etc.).
 ** - baseUrl: The base URL of the website (e.g., "https://shapeshift.com").

 ** Returns:
 ** - A Record<string, any> representing the JSON-LD schema for the blog post.
 **   Returns an empty object if essential post data (title or slug) is missing.
 ************************************************************************************************/
export function generateBlogPostSchema(post: TBlogPost, baseUrl: string): Record<string, any> {
	// Ensure we have required fields
	if (!post?.title || !post.slug) {
		return {};
	}

	const postUrl = `${baseUrl}/blog/${post.slug}`;
	const imageUrl = post.featuredImg?.url
		? `${process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.shapeshift.com'}${post.featuredImg.url}`
		: `${baseUrl}/opengraph-image.png`;

	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		description: post.summary || '',
		image: imageUrl,
		url: postUrl,
		datePublished: post.publishedAt,
		dateModified: post.updatedAt || post.publishedAt,
		author: {
			'@type': 'Organization',
			name: 'ShapeShift',
			url: baseUrl
		},
		publisher: organizationSchema,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': postUrl
		},
		keywords: post.tags?.join(', ') || '',
		articleSection: post.type?.[0] || 'General'
	};
}

/************************************************************************************************
 ** generateProductSchema Function:

 ** Generates Schema.org `SoftwareApplication` structured data for a product page.

 ** Args:
 ** - title: The title of the product.
 ** - description: A description of the product.
 ** - featuredImage: Optional URL of the product's featured image.
 ** - pageURL: The URL of the product page.
 ** - features: Optional array of objects, each with `title` and `description` for product features.

 ** Returns:
 ** - A Record<string, any> representing the JSON-LD schema for the product.
 **   Returns an empty object if essential data (title or pageURL) is missing.
 ************************************************************************************************/
export function generateProductSchema({
	title,
	description,
	featuredImage,
	pageURL,
	features = []
}: {
	title: string;
	description: string;
	featuredImage?: string;
	pageURL: string;
	features?: {title: string; description: string}[];
}): Record<string, any> {
	// Ensure we have required fields
	if (!title || !pageURL) {
		return {};
	}

	const productID = pageURL.split('/').pop() || 'shapeshift-product';
	const image =
		featuredImage || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://shapeshift.com'}/opengraph-image.png`;

	return {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		id: productID,
		name: title,
		description: description || '',
		image: image,
		url: pageURL,
		applicationCategory: 'FinanceApplication',
		operatingSystem: 'Web, Android, iOS',
		author: organizationSchema,
		publisher: organizationSchema,
		...(features.length > 0 && {
			featureList: {
				'@type': 'ItemList',
				itemListElement: features.map((feature, index) => ({
					'@type': 'ListItem',
					position: index + 1,
					name: feature.title,
					description: feature.description
				}))
			}
		})
	};
}

/************************************************************************************************
 ** generateWebsiteSchema Function:

 ** Generates Schema.org `WebSite` structured data.

 ** Args:
 ** - baseUrl: The base URL of the website.

 ** Returns:
 ** - A Record<string, any> representing the JSON-LD schema for the website.
 ************************************************************************************************/
export function generateWebsiteSchema(baseUrl: string): Record<string, any> {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'ShapeShift',
		url: baseUrl
	};
}

/************************************************************************************************
 ** generateOrganizationSchema Function:

 ** Returns the predefined `organizationSchema` constant for use as Organization structured data.

 ** Returns:
 ** - A Record<string, any> representing the JSON-LD schema for the organization.
 ************************************************************************************************/
export function generateOrganizationSchema(): Record<string, any> {
	return organizationSchema;
}
