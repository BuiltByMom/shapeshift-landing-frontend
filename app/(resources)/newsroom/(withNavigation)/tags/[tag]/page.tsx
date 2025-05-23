/************************************************************************************************
 * Newsroom Tag Page Component:

 * This server component is responsible for rendering a page that displays newsroom posts
 * filtered by a specific tag. The tag is determined from the URL parameters.

 * Features:
 * - Dynamic Tag Fetching: Extracts the tag slug from the page parameters.
 * - Content Display: Utilizes the `ListOfPosts` component (from the current directory) to
 *   fetch and display the relevant newsroom posts for the determined tag.
 * - Error Handling: If the initial fetch for tag validation (to ensure the tag exists or has
 *   posts) fails or returns no posts, it triggers a 404 "Not Found" page.

 * Props:
 * - `params`: An object containing route parameters. Expected to have a `tag` property
 *   which is a string representing the newsroom tag slug.
 ************************************************************************************************/
import {notFound} from 'next/navigation';

import {ListOfPosts} from '@/app/(resources)/newsroom/(withNavigation)/tags/[tag]/ListOfPosts';

/************************************************************************************************
 * NewsroomTagsPage Default Export:

 * Asynchronously renders the page content for a specific newsroom tag. It extracts the tag
 * slug from the route parameters. It performs an initial fetch to validate the tag (e.g.,
 * ensure it exists or has content) before rendering the `ListOfPosts` component, which then
 * handles the detailed fetching and displaying of posts for that tag.

 * Args:
 * - props: An object containing `params`, where `params.tag` is the slug of the newsroom tag
 *   to display.

 * Returns:
 * - A Promise resolving to a ReactNode, specifically the `ListOfPosts` component configured
 *   for the current newsroom tag, or calls `notFound()` if validation fails.
 ************************************************************************************************/
export default async function NewsroomTagsPage(props: {params: Promise<{tag: string}>}): Promise<React.ReactNode> {
	const {tag} = await props.params;
	const data = await fetch(
		`${process.env.STRAPI_URL}/api/newsrooms?filters[tags][$contains]=${tag}&fields[0]=title&fields[1]=slug&fields[2]=publishedAt&populate[0]=featuredImg&sort[0]=publishedAt:desc`,
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
