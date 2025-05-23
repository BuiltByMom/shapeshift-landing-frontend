/************************************************************************************************
 ** Newsroom Page Layout Component (With Navigation):
 **
 ** This server component defines the layout structure for pages within the newsroom section
 ** that require navigation elements (like category/tag tabs, a title, and breadcrumbs). It
 ** typically wraps content such as lists of news posts, whether they are all posts or those
 ** filtered by a specific category or tag.
 **
 ** Structure:
 ** - A main container div with responsive padding and max-width.
 ** - `NewsroomBreadcrumb`: Displays a breadcrumb trail for easy navigation back to the main
 **   newsroom page.
 ** - `NewsroomTitle`: A component that dynamically displays the title based on the current view
 **   (e.g., "ShapeShift Newsroom", "Category: Press Releases", "Tagged: Partnership").
 ** - `NewsroomNav`: A component that renders navigation tabs for newsroom categories and tags.
 ** - `children`: Placeholder for the specific content of the page using this layout (e.g., a
 **   list of news posts).
 **
 ** Props:
 ** - `children`: ReactNode, the content to be rendered within this layout.
 ** - `params`: An object, potentially containing parameters like `category` or `tag` if the
 **   layout is used for a filtered page. (Note: `params` is typed and awaited but its value
 **   is primarily used by child components like `NewsroomTitle` and `NewsroomNav` or for
 **   metadata generation, not directly by this layout for rendering its immediate structure).
 ************************************************************************************************/
import {NewsroomBreadcrumb} from '@/app/(resources)/_components/NewsroomBreadcrumb';
import {NewsroomNav} from '@/app/(resources)/_components/NewsroomNav';
import {NewsroomTitle} from '@/app/(resources)/_components/NewsroomTitle';

/************************************************************************************************
 ** NewsroomPageLayout Default Export:
 **
 ** Asynchronously renders the common layout for newsroom pages that include navigation
 ** elements. This layout includes a breadcrumb, a dynamic title (`NewsroomTitle`), navigation
 ** tabs (`NewsroomNav`), and then renders the `children` prop which represents the specific
 ** content of the page (e.g., a list of news posts).
 **
 ** Args:
 ** - props: An object containing:
 **   - `children` (ReactNode): The main content to be displayed within the layout.
 **   - `params` (Promise<{category: string}>): Route parameters, awaited to ensure they are
 **     resolved before rendering, typically used by child components or for metadata.
 **
 ** Returns:
 ** - A Promise resolving to a ReactNode, specifically a `main` element containing the
 **   breadcrumb, title, navigation, and the main page content.
 ************************************************************************************************/
export default async function NewsroomPageLayout(props: {
	children: React.ReactNode;
	params: Promise<{category: string}>;
}): Promise<React.ReactNode> {
	await props.params;

	return (
		<main className={'container mx-auto mt-32 py-8'}>
			<NewsroomBreadcrumb />
			<NewsroomTitle />
			<NewsroomNav />
			{props.children}
		</main>
	);
}
