import {notFound} from 'next/navigation';

import {ListOfPosts} from '@/app/(resources)/blog/(withNavigation)/tags/[tag]/ListOfPosts';

/************************************************************************************************
 * Blog Tag Page Component:

 * This server component is responsible for rendering a page that displays blog posts filtered
 * by a specific tag. The tag is determined from the URL parameters.

 * Features:
 * - Dynamic Tag Fetching: Extracts the tag slug from the page parameters.
 * - Content Display: Utilizes the `ListOfPosts` component to fetch and display the relevant
 *   blog posts for the determined tag.
 * - Metadata Generation: Includes a `generateMetadata` function (commented out) that would
 *   typically set the page title and other SEO-relevant information based on the tag.

 * Props:
 * - `params`: An object containing route parameters, expected to have a `tag` property
 *   which is a string representing the tag slug.
 ************************************************************************************************/

/************************************************************************************************
 * BlogTagsPage Default Export:

 * Asynchronously renders the page content for a specific blog tag. It extracts the tag slug
 * from the route parameters and passes it to the `ListOfPosts` component. `ListOfPosts` then
 * handles fetching and displaying the posts associated with that tag.

 * Args:
 * - props: An object containing `params`, where `params.tag` is the slug of the blog tag to
 *   display posts for.

 * Returns:
 * - A Promise resolving to a ReactNode, specifically a `Fragment` containing the `ListOfPosts`
 *   component configured for the current tag.
 ************************************************************************************************/
export default async function BlogTagsPage(props: {params: Promise<{tag: string}>}): Promise<React.ReactNode> {
	const {tag} = await props.params;
	const data = await fetch(
		`${process.env.STRAPI_URL}/api/posts?filters[tags][$contains]=${tag}&fields[0]=title&fields[1]=slug&fields[2]=publishedAt&populate[0]=featuredImg&sort[0]=publishedAt:desc`,
		{
			headers: {
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
			}
		}
	);
	const {data: posts} = await data.json();

	if (!posts) {
		return notFound();
	}

	return <ListOfPosts tag={tag} />;
}
