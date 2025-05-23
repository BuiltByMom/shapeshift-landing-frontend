import {notFound} from 'next/navigation';

import {ListOfPosts} from '@/app/(resources)/newsroom/(withNavigation)/categories/[category]/ListOfPosts';

/************************************************************************************************
 ** Newsroom Categories Page Component:
 **
 ** This server component is responsible for rendering a page that displays newsroom posts
 ** filtered by a specific category. The category is determined from the URL parameters.
 **
 ** Features:
 ** - Dynamic Category Fetching: Extracts the category slug from the page parameters.
 ** - Content Display: Utilizes the `ListOfPosts` component (from the newsroom context) to fetch
 **   and display the relevant newsroom posts for the determined category.
 ** - Error Handling: If the initial fetch for category validation (to ensure the category
 **   exists or has posts) fails or returns no posts, it triggers a 404 "Not Found" page.
 **
 ** Props:
 ** - `params`: An object containing route parameters. Expected to have a `category` property
 **   which is a string representing the newsroom category slug.
 ************************************************************************************************/

/************************************************************************************************
 ** NewsroomCategoriesPage Default Export:
 **
 ** Asynchronously renders the page content for a specific newsroom category. It extracts the
 ** category slug from the route parameters. It performs an initial fetch to validate the
 ** category (e.g., ensure it exists or has content) before rendering the `ListOfPosts`
 ** component, which then handles the detailed fetching and displaying of posts for that category.
 **
 ** Args:
 ** - props: An object containing `params`, where `params.category` is the slug of the newsroom
 **   category to display.
 **
 ** Returns:
 ** - A Promise resolving to a ReactNode, specifically the `ListOfPosts` component configured
 **   for the current newsroom category, or calls `notFound()` if validation fails.
 ************************************************************************************************/
export default async function NewsroomCategoriesPage(props: {
	params: Promise<{category: string}>;
}): Promise<React.ReactNode> {
	const {category} = await props.params;
	const data = await fetch(
		`${process.env.STRAPI_URL}/api/newsrooms?filters[category][$contains]=${category}&fields[0]=title&fields[1]=slug&fields[2]=publishedAt&populate[0]=featuredImg&sort[0]=publishedAt:desc&pagination[pageSize]=1`,
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

	return <ListOfPosts category={category} />;
}
