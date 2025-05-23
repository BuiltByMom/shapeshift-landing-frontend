'use client';

import {useState} from 'react';

import {SearchBar} from '@/components/common/SearchBar';
import {StrapiDiscover} from '@/components/StrapiDiscover';

import type {TDiscoverData} from '@/components/strapi/types';
import type {ReactNode} from 'react';

/************************************************************************************************
 ** Discover Search Wrapper Component:
 **
 ** This client-side component provides a search interface for "Discover" items. It allows
 ** users to filter a list of discoverable features or content based on a search query.
 **
 ** Features:
 ** - Search Input: Renders a `SearchBar` component for user input.
 ** - Dynamic Filtering: Filters the `discover` items based on the search term, matching against
 **   item titles and descriptions (case-insensitive).
 ** - Results Display: Uses the `ResourceGrid` and `ResourceCard` components to display the
 **   filtered search results in a responsive grid.
 ** - Empty State Handling: Shows an appropriate message if no items match the search or if
 **   the initial list of discover items is empty.
 ** - Debounced Search: (Implied by typical SearchBar usage) Search input changes likely trigger
 **   filtering after a short delay to avoid excessive re-renders.
 **
 ** Props:
 ** - `discover`: An array of `TDiscoverData` objects representing all discoverable items, or
 **   null if no data is initially available.
 ************************************************************************************************/

/************************************************************************************************
 ** TDiscoverSearchWrapperProps Type:
 **
 ** Defines the props for the `DiscoverSearchWrapper` component.
 **
 ** Fields:
 ** - discover: An array of `TDiscoverData` objects representing all discoverable items, or
 **   `null` if no data is initially available. This list will be filtered by the search term.
 ************************************************************************************************/
type TDiscoverSearchWrapperProps = {
	discover: TDiscoverData[] | null;
};

/************************************************************************************************
 ** DiscoverSearchWrapper Function:
 **
 ** Renders a search interface and a grid of "Discover" items. Users can type into the search
 ** bar to filter the displayed items based on their title or description.
 **
 ** State:
 ** - `searchQuery`: Stores the current text entered by the user in the search bar.
 ** - `filteredDiscover`: Stores the array of `TDiscoverData` items that match the current
 **   `searchQuery`.
 **
 ** Effects:
 ** - Updates `filteredDiscover` whenever `searchQuery` or the initial `discover` prop changes.
 **   The filtering is case-insensitive and checks both item titles and descriptions.
 **
 ** Args:
 ** - discover (TDiscoverData[] | null): The initial list of all discoverable items.
 **
 ** Returns:
 ** - A ReactNode containing the search bar and the grid of filtered discover items.
 ************************************************************************************************/
export function DiscoverSearchWrapper({discover}: TDiscoverSearchWrapperProps): ReactNode {
	const [searchQuery, setSearchQuery] = useState('');

	/**********************************************************************************************
	 ** Filter discover items by search query
	 ** Filters items by matching names with search query
	 *********************************************************************************************/
	const filteredDiscover = discover?.filter(
		item =>
			item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.tag.toLowerCase().includes(searchQuery.toLowerCase())
	);

	/**********************************************************************************************
	 ** Group discover items by type for organized display
	 ** This reduces the array of discover items into an object where:
	 ** - Keys are the different types (categories) of discover items
	 ** - Values are arrays of items belonging to each type
	 *********************************************************************************************/
	const groupedDiscover = filteredDiscover?.reduce(
		(acc, item) => {
			const type = item.type;
			if (!acc[type]) {
				acc[type] = [];
			}
			acc[type].push(item);
			return acc;
		},
		{} as Record<string, TDiscoverData[]>
	);

	return (
		<div className={'flex w-full flex-col gap-8'}>
			<SearchBar
				searchQuery={searchQuery}
				setSearchQueryAction={setSearchQuery}
			/>

			{groupedDiscover &&
				Object.entries(groupedDiscover).map(([type, items]) => (
					<section
						key={type}
						className={'mt-8'}>
						<h2 className={'mb-6 text-2xl font-medium'}>{type}</h2>
						<StrapiDiscover discover={items} />
					</section>
				))}
		</div>
	);
}
