/************************************************************************************************
 * Blog Tags Loading Skeleton Component:

 * This component provides a loading skeleton UI for pages that display blog posts filtered
 * by a specific tag. It renders a placeholder structure that mimics the layout of the actual
 * content, enhancing the user experience by providing visual feedback while data is being
 * fetched for the tagged posts.

 * Structure:
 * - A main container div with responsive padding and a maximum width.
 * - A series of animated pulse divs that represent the anticipated layout of posts.
 *   - Typically, three such placeholder blocks are displayed, arranged in a responsive grid
 *     (1 column on mobile, 2 on medium screens, 3 on large screens).
 *   - Each placeholder has a predefined height and a background that pulses, indicating
 *     that content is currently loading.
 ************************************************************************************************/

/************************************************************************************************
 * BlogTagsLoading Default Export:

 * Provides the loading skeleton UI for the blog tags page. This component is typically
 * utilized by Next.js's Suspense feature or similar data fetching strategies to display a
 * placeholder while the actual blog posts associated with a specific tag are being loaded.

 * Returns:
 * - A ReactNode representing the visual skeleton of a blog page filtered by a tag.
 ************************************************************************************************/
export default function BlogTagsLoading(): React.ReactNode {
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
