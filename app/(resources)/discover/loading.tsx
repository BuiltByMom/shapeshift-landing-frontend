import {Banner} from '@/components/common/Banner';
import {Button} from '@/components/common/Button';
import {StrapiDiscover} from '@/components/StrapiDiscover';

import type {ReactNode} from 'react';

/************************************************************************************************
 * Discover Page Loading Skeleton Component:

 * This component provides a loading skeleton UI for the main "Discover" page. It displays a
 * placeholder structure that mimics the layout of the actual content, including a search bar
 * and a grid of resource cards. This enhances perceived performance and user experience while
 * the actual discoverable items are being fetched.

 * Structure:
 * - A main container div with responsive padding and max-width.
 * - An animated pulse div for the search bar placeholder.
 * - A series of animated pulse divs for the resource card placeholders, arranged in a
 *   responsive grid (1 column on mobile, 2 on medium screens, 3 on large screens).
 * - Each placeholder element uses a consistent background color and pulsing animation.
 ************************************************************************************************/

/************************************************************************************************
 * Loading Default Export:

 * Provides the loading skeleton UI for the main "Discover" page. This component is typically
 * used by Next.js's Suspense feature or similar data fetching mechanisms to show a
 * placeholder while the actual list of discoverable items is being loaded.

 * Returns:
 * - A ReactNode representing the visual skeleton of the Discover page, including placeholders
 *   for a search bar and a grid of items.
 ************************************************************************************************/
export default function Loading(): ReactNode {
	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container mt-[120px] flex flex-col justify-center lg:mt-48'}>
				<section className={'flex flex-col items-start'}>
					<div className={'mb-6 flex flex-col items-center gap-2'}>
						<h1 className={'text-[40px] leading-10 lg:text-7xl'}>{'Explore Web3 with ShapeShift'}</h1>
					</div>
					<Button
						variant={'blue'}
						href={'https://app.shapeshift.com/'}
						title={'Get Started'}
					/>
				</section>

				<section className={'mt-8'}>
					<StrapiDiscover isLoading />
				</section>
				<div className={'my-16'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
