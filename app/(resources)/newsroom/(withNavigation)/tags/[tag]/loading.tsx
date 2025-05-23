/************************************************************************************************
 * Newsroom Tags Loading Skeleton Component:

 * This component provides a loading skeleton UI specifically for the newsroom tags page.
 * It displays a placeholder structure that mimics the layout of the actual content,
 * improving perceived performance and user experience while data is being fetched for a
 * specific newsroom tag.

 * Structure:
 * - A main container div with responsive padding and max-width.
 * - A series of animated pulse divs representing the expected layout of posts under a tag.
 *   - Typically, twelve placeholder blocks are shown, arranged in a responsive grid (1 column
 *     on mobile, up to 3 on large screens).
 *   - Each placeholder has a fixed height and a background color that pulses to indicate
 *     loading activity.
 ************************************************************************************************/

/************************************************************************************************
 * NewsroomTagsLoading Default Export:

 * Provides the loading skeleton UI for the newsroom tags page. This component is typically
 * used by Next.js's Suspense feature or similar data fetching mechanisms to show a
 * placeholder while the actual tag-specific newsroom posts are being loaded.

 * Returns:
 * - A ReactNode representing the visual skeleton of the newsroom tags page.
 ************************************************************************************************/
export default function NewsroomTagsLoading(): React.ReactNode {
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
