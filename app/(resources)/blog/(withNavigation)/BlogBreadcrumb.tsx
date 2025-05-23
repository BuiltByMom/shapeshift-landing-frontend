'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {IconBack} from '@/components/common/icons/IconBack';
import {cl} from '@/components/utils/cl';

/************************************************************************************************
 ** BlogBreadcrumb Component:

 ** This client-side component renders a breadcrumb link that facilitates navigation back to the
 ** main Blog page (`/blog`). It is primarily intended for use on sub-pages within the blog
 ** section, such as individual post pages, or pages filtered by category or tag.

 ** Behavior:
 ** - Utilizes the `usePathname` hook from Next.js to determine the current URL.
 ** - If the current path is exactly `/blog` (the main blog page), the breadcrumb is made
 **   invisible and non-interactive, as it would be redundant.
 ** - On any other path within the blog section, it displays a "Back to blog" link, styled with
 **   a back arrow icon, allowing users to easily return to the blog's root page.
 ** - Uses the `cl` utility for conditional class application based on the current path.
 ************************************************************************************************/

/************************************************************************************************
 ** BlogBreadcrumb Function:

 ** Renders a breadcrumb navigation link. If the current path is '/blog', the breadcrumb
 ** is hidden as it would be redundant. Otherwise, it displays a "Back to blog" link with a
 ** back arrow icon, allowing users to navigate from a specific blog post or category/tag page
 ** back to the main blog landing page.

 ** This component is client-rendered due to its use of the `usePathname` hook.

 ** Returns:
 ** - React.ReactNode: The JSX for the breadcrumb link, or an invisible, non-interactive
 **   element if on the main blog page.
 ************************************************************************************************/
export function BlogBreadcrumb(): React.ReactNode {
	const pathname = usePathname();

	return (
		<Link
			className={cl(
				'mb-6 flex items-center gap-1 py-2 text-gray-500',
				pathname === '/blog' ? 'invisible pointer-events-none' : ''
			)}
			href={'/blog'}>
			<IconBack />
			<span className={'ml-2'}>{'Back to blog'}</span>
		</Link>
	);
}
