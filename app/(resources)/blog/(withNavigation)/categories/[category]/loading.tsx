/************************************************************************************************
 * Blog Categories Loading Skeleton Component:

 * This component provides a loading skeleton UI specifically for the blog categories page.
 * It displays a placeholder structure that mimics the layout of the actual content,
 * improving perceived performance and user experience while data is being fetched for a
 * specific blog category.

 * Structure:
 * - A main container div with responsive padding and max-width.
 * - A series of animated pulse divs representing the expected layout of posts within a category.
 *   - Three placeholder blocks are shown, arranged in a responsive grid (1 column on mobile,
 *     2 on medium screens, and 3 on large screens).
 *   - Each placeholder has a fixed height and a background color that pulses to indicate
 *     loading activity.
 ************************************************************************************************/

/************************************************************************************************
 * BlogCategoriesLoading Default Export:

 * Provides the loading skeleton UI for the blog categories page. This component is typically
 * used by Next.js's Suspense feature or similar data fetching mechanisms to show a
 * placeholder while the actual category-specific blog posts are being loaded.

 * Returns:
 * - A ReactNode representing the visual skeleton of the blog categories page.
 ************************************************************************************************/
export default function BlogCategoriesLoading(): React.ReactNode {
	return (
		<div className={'mb-20 grid gap-6 lg:grid-cols-3'}>
			{[...Array(12)].map((_, i) => (
				<div
					key={i}
					className={'h-64 animate-pulse rounded-2xl bg-gray-800'}
				/>
			))}
		</div>
	);
}
