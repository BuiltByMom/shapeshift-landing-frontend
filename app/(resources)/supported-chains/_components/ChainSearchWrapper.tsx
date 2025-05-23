'use client';

import {useState} from 'react';

import {Dropdown} from '@/components/common/Dropdown';
import {SearchBar} from '@/components/common/SearchBar';
import {CHAIN_TYPES} from '@/components/constants';

import {ChainList} from '../../_components/ChainList';

import type {TSupportedChainData, TSupportedChainTypes} from '@/components/strapi/types';
import type {ReactNode} from 'react';

/************************************************************************************************
 * Chain Search Wrapper Component & Associated Types:

 * This client-side component provides a user interface for searching and filtering a list of
 * supported blockchain networks (chains). It allows users to filter chains by their type
 * (e.g., EVM, Solana, Bitcoin, Cosmos) and search for specific chains by name.

 * Features:
 * - Search Functionality: Includes a `SearchBar` to allow users to type and search for chains
 *   by name.
 * - Type Filtering: Integrates a `Dropdown` component to filter chains based on predefined
 *   chain types (e.g., from `CHAIN_TYPES` constant).
 * - Dynamic List Display: Uses the `ChainList` component to render the filtered and/or
 *   searched list of chains.
 * - State Management: Manages the `searchQuery` and `selectedType` filter using `useState`.
 * - Responsive Layout: Assumed to be responsive due to the nature of the child components used.
 ************************************************************************************************/

/************************************************************************************************
 * TChainSearchWrapperProps Type:

 * Defines the props for the `ChainSearchWrapper` component.

 * Fields:
 * - chains: An array of `TSupportedChainData` objects, representing the full list of chains
 *   to be searched and filtered.
 ************************************************************************************************/
type TChainSearchWrapperProps = {
	chains: TSupportedChainData[];
};

/************************************************************************************************
 * ChainSearchWrapper Function:

 * Renders a search and filter interface for a list of supported blockchain chains.
 * It allows users to filter chains by type (e.g., EVM, Bitcoin) and search by name. The
 * component manages the filtering logic and passes the resultant list to `ChainList`.

 * State:
 * - `searchQuery` (string): The current text entered in the search bar.
 * - `selectedType` ('All chains' | TSupportedChainTypes): The currently selected chain type
 *   for filtering.

 * Args:
 * - chains (TSupportedChainData[]): The initial array of all supported chain data.

 * Returns:
 * - A ReactNode containing the search bar, filter dropdown, and the list of filtered chains.
 *************************************************************************************************/
export function ChainSearchWrapper({chains}: TChainSearchWrapperProps): ReactNode {
	/** State for search query and selected chain type filter **/
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedType, setSelectedType] = useState<'All chains' | TSupportedChainTypes>('All chains');

	/**********************************************************************************************
	 * Filter chains based on selected chain type
	 * Returns all chains if 'All chains' is selected, otherwise filters by typeOfChain
	 *********************************************************************************************/
	const chainsByType = chains.filter(chain => {
		if (selectedType === 'All chains') {
			return true;
		}
		return chain.typeOfChain === selectedType;
	});

	/**********************************************************************************************
	 * Further filter chains by search query
	 * Filters the type-filtered chains by matching chain names with search query
	 *********************************************************************************************/
	const filteredChains = chainsByType.filter(chain => chain.name.toLowerCase().includes(searchQuery.toLowerCase()));

	/**********************************************************************************************
	 * handleSearch Function:                                                                     *
	 *                                                                                              *
	 * Callback function to update the `searchQuery` state when the user types in the `SearchBar`.**
	 *                                                                                              *
	 * Args:                                                                                        *
	 * - query (string): The new search query string from the search bar.                           *
	 ***********************************************************************************************/
	const handleSearch = (query: string): void => {
		setSearchQuery(query);
	};

	return (
		<>
			<SearchBar
				searchQuery={searchQuery}
				setSearchQueryAction={handleSearch}
			/>

			{/** Chains grid section **/}
			<section
				className={'mt-8'}
				aria-label={'Supported Chains'}>
				<div className={'mb-6 flex w-full justify-between'}>
					<h2 className={'text-2xl font-medium'}>{'Chains'}</h2>
					<Dropdown
						options={CHAIN_TYPES}
						value={selectedType}
						onChangeAction={setSelectedType}
						allItemsLabel={'All chains'}
					/>
				</div>
				<ChainList
					chains={filteredChains}
					isSearchQuery={Boolean(searchQuery)}
				/>
			</section>
		</>
	);
}
