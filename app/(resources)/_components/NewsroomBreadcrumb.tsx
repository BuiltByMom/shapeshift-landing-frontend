'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';

import {IconBack} from '@/components/common/icons/IconBack';
import {cl} from '@/components/utils/cl';

/************************************************************************************************
 * NewsroomBreadcrumb Component:

 * This client component renders a breadcrumb link that navigates the user back to the main
 * Newsroom page (`/newsroom`). It is designed to be displayed on sub-pages within the
 * newsroom, such as category or tag filtered views, or individual news post pages.

 * Behavior:
 * - Uses `usePathname` to get the current URL path.
 * - If the current path is exactly `/newsroom`, the breadcrumb becomes invisible and
 *   non-interactive, as it's redundant on the main newsroom page itself.
 * - Otherwise, it displays a "Back to Newsroom" link with a back arrow icon.
 ************************************************************************************************/

export function NewsroomBreadcrumb(): React.ReactNode {
	const pathname = usePathname();

	return (
		<Link
			className={cl(
				'mb-6 flex items-center gap-1 px-4 py-2 text-gray-500',
				pathname === '/newsroom' ? 'invisible pointer-events-none' : ''
			)}
			href={'/newsroom'}>
			<IconBack />
			<span>{'Back to Newsroom'}</span>
		</Link>
	);
}
