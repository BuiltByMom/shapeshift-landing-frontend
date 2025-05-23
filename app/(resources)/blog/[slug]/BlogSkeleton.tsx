/************************************************************************************************
 ** Blog Post Skeleton Loader Component:
 **
 ** This component provides a visual placeholder (skeleton loader) for an individual blog post
 ** page while its content is being fetched. It mimics the structure of a typical blog post,
 ** including placeholders for a title, metadata (like date or author), and several paragraphs
 ** of content. This improves the user experience by reducing perceived load times and providing
 ** immediate visual feedback.
 **
 ** Structure:
 ** - A main container div with responsive padding and max-width.
 ** - Animated pulse divs representing:
 **   - A large block for the main title.
 **   - A smaller block for metadata.
 **   - Several lines of varying widths to simulate paragraphs of text.
 ** - All placeholder elements use a consistent background color and pulsing animation to
 **   indicate loading activity.
 ************************************************************************************************/

import type {ReactNode} from 'react';

/************************************************************************************************
 ** BlogSkeleton Function:
 **
 ** Renders a skeleton loading UI for a single blog post page. This is typically displayed
 ** while the actual content of the blog post is being fetched and prepared for rendering.
 ** The skeleton includes placeholders for a title, metadata, and multiple paragraphs of text,
 ** all with a pulsing animation.
 **
 ** Returns:
 ** - A ReactNode representing the visual skeleton of a blog post page.
 ************************************************************************************************/
export function BlogSkeleton(): ReactNode {
	return (
		<div className={'container relative mx-auto mb-96 mt-40 max-w-4xl px-4'}>
			<div className={'absolute -left-32 top-0 h-10 w-20 animate-pulse rounded-lg bg-gray-800'} />
			<div className={'mb-8 h-6 w-32 animate-pulse rounded-lg bg-gray-800'} />
			<div className={'mb-8 flex gap-2'}>
				<div className={'h-6 w-24 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-6 w-24 animate-pulse rounded-lg bg-gray-800'} />
			</div>
			<div className={'mb-8 h-12 w-3/4 animate-pulse rounded-lg bg-gray-800'} />
			<div className={'space-y-4'}>
				<div className={'h-4 w-full animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-5/6 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-4/6 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-3/4 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-full animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-2/3 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-5/6 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-4/6 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-3/4 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-full animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-2/3 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-3/4 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-full animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-4/6 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-3/4 animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-full animate-pulse rounded-lg bg-gray-800'} />
				<div className={'h-4 w-2/3 animate-pulse rounded-lg bg-gray-800'} />
			</div>
		</div>
	);
}
