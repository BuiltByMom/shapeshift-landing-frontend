/************************************************************************************************
 ** Wallet Search Wrapper Component & Associated Types:
 **
 ** This client-side component provides a user interface for searching a list of supported
 ** cryptocurrency wallets. It filters wallets based on a search query and displays them in
 ** two distinct sections: "Featured Wallets" and a general list of other wallets.
 **
 ** Features:
 ** - Search Functionality: Includes a `SearchBar` to allow users to type and search for
 **   wallets by name.
 ** - Segregated Display: Separates wallets into "Featured" and non-featured lists, rendered
 **   using the `WalletList` component.
 ** - Dynamic Filtering: Filters the initial list of wallets based on the user's search input.
 ** - State Management: Manages `searchQuery` and the `filteredWallets` list using `useState`.
 ************************************************************************************************/
'use client';

import {useState} from 'react';

import {SearchBar} from '@/components/common/SearchBar';

import {WalletList} from '../../_components/WalletList';

import type {TSupportedWalletData} from '@/components/strapi/types';
import type {ReactNode} from 'react';

/************************************************************************************************
 ** TWalletSearchWrapperProps Type:
 **
 ** Defines the props for the `WalletSearchWrapper` component.
 **
 ** Fields:
 ** - wallets: An array of `TSupportedWalletData` objects, representing the full list of
 **   wallets to be searched and displayed.
 ************************************************************************************************/
type TWalletSearchWrapperProps = {
	wallets: TSupportedWalletData[];
};

/************************************************************************************************
 ** WalletSearchWrapper Function:
 **
 ** Renders a search interface for a list of supported cryptocurrency wallets. It allows users
 ** to search by wallet name and displays the results categorized into featured and non-featured
 ** sections.
 **
 ** State:
 ** - `filteredWallets` (TSupportedWalletData[]): The list of wallets after applying the current
 **   search query. Initialized with all wallets.
 ** - `searchQuery` (string): The current text entered in the search bar.
 **
 ** Args:
 ** - wallets (TSupportedWalletData[]): The initial array of all supported wallet data.
 **
 ** Returns:
 ** - A ReactNode containing the search bar and the categorized lists of wallets.
 ************************************************************************************************/
export function WalletSearchWrapper({wallets}: TWalletSearchWrapperProps): ReactNode {
	const [filteredWallets, setFilteredWallets] = useState(wallets);
	const [searchQuery, setSearchQuery] = useState('');

	/**********************************************************************************************
	 ** handleSearch Function:                                                                     **
	 **                                                                                              **
	 ** Callback function to update the `searchQuery` state and filter the `wallets` list          **
	 ** based on the new query. The filtering is case-insensitive and updates the                  **
	 ** `filteredWallets` state.                                                                   **
	 **                                                                                              **
	 ** Args:                                                                                        **
	 ** - query (string): The new search query string from the search bar.                           **
	 ***********************************************************************************************/
	const handleSearch = (query: string): void => {
		setSearchQuery(query);
		const filtered = wallets.filter(wallet => wallet.name.toLowerCase().includes(query.toLowerCase()));
		setFilteredWallets(filtered);
	};

	const featuredWallets = filteredWallets?.filter(wallet => wallet.isFeatured);
	const nonFeaturedWallets = filteredWallets?.filter(wallet => !wallet.isFeatured);

	return (
		<>
			<SearchBar
				searchQuery={searchQuery}
				setSearchQueryAction={handleSearch}
			/>

			{/* Featured Wallets */}
			{featuredWallets && featuredWallets.length > 0 && (
				<div className={'mb-12'}>
					<h2 className={'mb-6 text-2xl font-medium'}>{'Featured Wallets'}</h2>
					<WalletList
						wallets={featuredWallets}
						isSearchQuery={!!searchQuery}
					/>
				</div>
			)}

			{/* Wallets grid section */}
			<section
				className={'mt-8'}
				aria-label={'Supported Wallets'}>
				<h2 className={'mb-6 text-2xl font-medium'}>{'Choose your preferred wallet'}</h2>
				<WalletList
					wallets={nonFeaturedWallets}
					isSearchQuery={!!searchQuery}
				/>
			</section>
		</>
	);
}
