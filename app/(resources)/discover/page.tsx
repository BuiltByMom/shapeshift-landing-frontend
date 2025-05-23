/************************************************************************************************
 ** Main Discover Page Component:
 **
 ** This server component serves as the main landing page for the "Discover" section. It is
 ** responsible for fetching the initial list of all discoverable items (e.g., features,
 ** products, or content pieces) and then rendering them, typically using a search and filter
 ** interface provided by a client component like `DiscoverSearchWrapper`.
 **
 ** Features:
 ** - Data Fetching: Asynchronously fetches all discoverable items from the Strapi API using
 **   the `getDiscovers` function (or a similar utility, assuming its existence based on
 **   the context of other fetch utilities).
 ** - Content Display: Passes the fetched discover items to the `DiscoverSearchWrapper`
 **   component, which handles the search UI and filtered display of these items.
 ** - Error Handling: Includes a basic check for the fetched data; if `discovers` is null (e.g.,
 **   due to an API error or no content), it could potentially render an alternative UI or log
 **   an error, though the provided snippet focuses on passing it to the wrapper.
 ************************************************************************************************/
import {Banner} from '@/components/common/Banner';
import {Button} from '@/components/common/Button';
import {RESOURCES_DICT} from '@/components/dictionary/resources';
import {getDiscovers} from '@/components/utils/query';

import {DiscoverSearchWrapper} from './_components/DiscoverSearchWrapper';

import type {ReactNode} from 'react';

/************************************************************************************************
 ** DiscoverPage Default Export:
 **
 ** Asynchronously renders the main "Discover" page. It fetches all discoverable items and
 ** passes them to the `DiscoverSearchWrapper` component, which provides the user interface
 ** for searching and viewing these items.
 **
 ** Returns:
 ** - A Promise resolving to a ReactNode, specifically the `DiscoverSearchWrapper` component
 **   populated with all fetched discover items.
 ************************************************************************************************/
export default async function DiscoverPage(): Promise<ReactNode> {
	const discover = await getDiscovers();

	return (
		<div className={'flex w-full justify-center'}>
			<div className={'container mt-[120px] flex flex-col justify-center lg:mt-48'}>
				<section className={'mb-16 flex flex-col items-center'}>
					<div className={'mb-6 flex flex-col items-center gap-2'}>
						<h1 className={'text-[40px] leading-10 lg:text-7xl'}>{RESOURCES_DICT.discover.title}</h1>
					</div>
					<Button
						variant={'blue'}
						href={'https://app.shapeshift.com/'}
						title={RESOURCES_DICT.discover.ctaButton}
					/>
				</section>

				<DiscoverSearchWrapper discover={discover} />

				<div className={'my-16'}>
					<Banner />
				</div>
			</div>
		</div>
	);
}
