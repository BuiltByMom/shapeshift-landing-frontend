import {notFound} from 'next/navigation';

import {ListOfPosts} from '@/app/(resources)/blog/(withNavigation)/categories/[category]/ListOfPosts';

/************************************************************************************************
 ** Blog Categories Page Component:
 **
 ** This server component is responsible for rendering a page that displays blog posts filtered
 ** by a specific category. The category is determined from the URL parameters.
 **
 ** Features:
 ** - Dynamic Category Fetching: Extracts the category slug from the page parameters.
 ** - Content Display: Utilizes the `ListOfPosts` component to fetch and display the relevant
 **   blog posts for the determined category.
 ** - Metadata Generation: Includes a `generateMetadata` function (though commented out in the
 **   provided snippet) that would typically set page title and other SEO-relevant metadata
 **   based on the category.
 **
 ** Props:
 ** - `params`: An object containing route parameters. Expected to have a `category` property
 **   which is a string representing the category slug.
 ************************************************************************************************/

/************************************************************************************************
 ** BlogCategoriesPage Default Export:
 **
 ** Asynchronously renders the page content for a specific blog category. It extracts the
 ** category slug from the route parameters and passes it to the `ListOfPosts` component,
 ** which then handles fetching and displaying the posts for that category.
 **
 ** Args:
 ** - props: An object containing `params`, where `params.category` is the slug of the blog
 **   category to display.
 **
 ** Returns:
 ** - A Promise resolving to a ReactNode, specifically a `Fragment` containing the `ListOfPosts`
 **   component configured for the current category.
 ************************************************************************************************/
export default async function BlogCategoriesPage(props: {
	params: Promise<{category: string}>;
}): Promise<React.ReactNode> {
	const {category} = await props.params;
	const data = await fetch(
		`${process.env.STRAPI_URL}/api/posts?filters[type][$contains]=${category}&fields[0]=title&fields[1]=slug&fields[2]=publishedAt&populate[0]=featuredImg&sort[0]=publishedAt:desc&pagination[pageSize]=1`,
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
