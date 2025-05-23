/**
 * ProtocolSearchWrapper Component
 *
 * A wrapper component that provides search functionality for protocols.
 * It displays protocols in two sections: featured and non-featured protocols.
 * The search functionality filters protocols based on their names.
 */

'use client';

import {useState} from 'react';

import {SearchBar} from '@/components/common/SearchBar';

import {ProtocolList} from '../../_components/ProtocolList';

import type {TSupportedProtocolData} from '@/components/strapi/types';
import type {ReactNode} from 'react';

/************************************************************************************************
 ** Protocol Search Wrapper Component & Associated Types:
 **
 ** This client-side component provides a user interface for searching a list of supported
 ** DeFi protocols. It filters protocols based on a search query and displays them in two
 ** distinct sections: "Featured Protocols" and a general list of other protocols.
 **
 ** Features:
 ** - Search Functionality: Includes a `SearchBar` to allow users to type and search for
 **   protocols by name.
 ** - Segregated Display: Separates protocols into "Featured" and non-featured lists, rendered
 **   using the `ProtocolList` component.
 ** - Dynamic Filtering: Filters the initial list of protocols based on the user's search input.
 ** - State Management: Manages `searchQuery` and the `filteredProtocols` list using `useState`.
 ************************************************************************************************/

/************************************************************************************************
 ** TProtocolSearchWrapperProps Type:
 **
 ** Defines the props for the `ProtocolSearchWrapper` component.
 **
 ** Fields:
 ** - protocols: An array of `TSupportedProtocolData` objects, representing the full list of
 **   protocols to be searched and displayed.
 ************************************************************************************************/
type TProtocolSearchWrapperProps = {
	protocols: TSupportedProtocolData[];
};

/************************************************************************************************
 ** ProtocolSearchWrapper Function:
 **
 ** Renders a search interface for a list of supported DeFi protocols. It allows users to
 ** search by protocol name and displays the results categorized into featured and non-featured
 ** sections.
 **
 ** State:
 ** - `filteredProtocols` (TSupportedProtocolData[]): The list of protocols after applying the
 **   current search query. Initialized with all protocols.
 ** - `searchQuery` (string): The current text entered in the search bar.
 **
 ** Args:
 ** - protocols (TSupportedProtocolData[]): The initial array of all supported protocol data.
 **
 ** Returns:
 ** - A ReactNode containing the search bar and the categorized lists of protocols.
 *************************************************************************************************/
export function ProtocolSearchWrapper({protocols}: TProtocolSearchWrapperProps): ReactNode {
	/**********************************************************************************************
	 ** State Management
	 ** - filteredProtocols: protocols filtered by search query
	 ** - searchQuery: current search input value
	 *********************************************************************************************/
	const [filteredProtocols, setFilteredProtocols] = useState(protocols);
	const [searchQuery, setSearchQuery] = useState('');

	/**********************************************************************************************
	 ** Search Handler
	 ** Filters protocols based on name matches (case-insensitive)
	 *********************************************************************************************/
	const handleSearch = (query: string): void => {
		setSearchQuery(query);
		const filtered = protocols.filter(protocol => protocol.name.toLowerCase().includes(query.toLowerCase()));
		setFilteredProtocols(filtered);
	};

	/**********************************************************************************************
	 ** Protocol Filtering
	 ** Split protocols into featured and non-featured categories
	 *********************************************************************************************/
	const featuredProtocols = filteredProtocols?.filter(protocol => protocol.isFeatured);
	const nonFeaturedProtocols = filteredProtocols?.filter(protocol => !protocol.isFeatured);

	return (
		<>
			<SearchBar
				searchQuery={searchQuery}
				setSearchQueryAction={handleSearch}
			/>

			{/* Featured Protocols */}
			{featuredProtocols && featuredProtocols.length > 0 && (
				<div className={'mb-12'}>
					<h2 className={'mb-6 text-2xl font-medium'}>{'Featured Protocols'}</h2>
					<ProtocolList
						protocols={featuredProtocols}
						isSearchQuery={Boolean(searchQuery)}
					/>
				</div>
			)}

			{/* Protocols grid section */}
			<section
				className={'mt-8'}
				aria-label={'Supported Protocols'}>
				<h2 className={'mb-6 text-2xl font-medium'}>{'Choose your preferred protocol'}</h2>
				<ProtocolList
					protocols={nonFeaturedProtocols}
					isSearchQuery={Boolean(searchQuery)}
				/>
			</section>
		</>
	);
}
