import {BlogBreadcrumb} from '@/app/(resources)/blog/(withNavigation)/BlogBreadcrumb';
import {BlogNav} from '@/app/(resources)/blog/(withNavigation)/BlogNav';
import {BlogTitle} from '@/app/(resources)/blog/(withNavigation)/BlogTitle';

/************************************************************************************************
 * Blog Page Layout Component:

 * This server component defines the layout structure for pages within the blog section that
 * require navigation elements (like category/tag tabs and a title). It typically wraps
 * content such as lists of posts for all blogs, or posts filtered by category or tag.

 * Structure:
 * - A main container div with responsive padding and max-width.
 * - `BlogTitle`: A component that dynamically displays the title based on the current view
 *   (e.g., "ShapeShift Blog", "Category: Tutorials", "Tagged: DeFi").
 * - `BlogNav`: A component that renders navigation tabs for categories and tags.
 * - `children`: Placeholder for the specific content of the page using this layout (e.g., a
 *   list of blog posts).

 * Props:
 * - `children`: ReactNode, the content to be rendered within this layout.
 * - `params`: An object, potentially containing parameters like `category` if the layout is
 *   used for a category-specific page. (Note: `params` is typed but not directly used in the
 *   provided snippet for rendering, likely used by child components or metadata).
 ************************************************************************************************/

/************************************************************************************************
 * BlogPageLayout Default Export:

 * Asynchronously renders the common layout for blog pages that include navigation elements.
 * This layout includes a dynamic title (`BlogTitle`), navigation tabs (`BlogNav`), and then
 * renders the `children` prop which represents the specific content of the page (e.g., a list
 * of posts).

 * Args:
 * - props: An object containing:
 *   - `children` (ReactNode): The main content to be displayed within the layout.
 *   - `params` (Promise<{category: string}>): Route parameters, typically used by child
 *     components or for metadata generation, not directly by this layout for rendering.

 * Returns:
 * - A Promise resolving to a ReactNode, specifically a `Fragment` containing the title,
 *   navigation, and the main page content.
 ************************************************************************************************/
export default async function BlogPageLayout(props: {
	children: React.ReactNode;
	params: Promise<{category: string}>;
}): Promise<React.ReactNode> {
	await props.params;

	return (
		<main className={'container mx-auto mt-10 py-8 lg:mt-24'}>
			<BlogBreadcrumb />
			<BlogTitle />
			<BlogNav />
			{props.children}
		</main>
	);
}
