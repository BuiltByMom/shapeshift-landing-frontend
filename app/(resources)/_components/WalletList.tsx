'use client';

/************************************************************************************************
 * WalletList Component & Associated Type:

 * This file defines the `WalletList` component, a specialized client component for displaying
 * a grid of supported wallets. It utilizes the generic `ResourceGrid` and `ResourceCard`
 * components for consistent presentation, loading state handling, and empty state messages.
 * It also defines the `TWalletListProps` type for its accepted properties.
 ************************************************************************************************/

import {ResourceCard} from './ResourceCard';
import {ResourceGrid} from './ResourceGrid';

import type {TSupportedWalletData} from '@/components/strapi/types';

/************************************************************************************************
 * TWalletListProps Type:

 * Defines the props accepted by the `WalletList` component.

 * Fields:
 * - wallets: An array of `TSupportedWalletData` objects representing the wallets to display,
 *   or `null` if no data is available or yet loaded.
 * - isLoading: Optional. A boolean flag indicating if the wallet data is currently being loaded.
 *   Defaults to `false`.
 * - className: Optional. A string for applying additional CSS classes to the underlying grid container.
 * - isSearchQuery: Optional. A boolean flag indicating if the current list of wallets is the
 *   result of a search query. This affects the message displayed when no wallets are found.
 ************************************************************************************************/
type TWalletListProps = {
	wallets: TSupportedWalletData[] | null;
	isLoading?: boolean;
	className?: string;
	isSearchQuery?: boolean;
};

/************************************************************************************************
 * WalletList Function:

 * Renders a grid of wallet cards. This client component is specifically designed for displaying
 * supported wallets, leveraging the `ResourceGrid` for layout and `ResourceCard` for each item.
 * It handles loading states and provides appropriate messages if no wallets are available or
 * if a search yields no results.

 * Args:
 * - props (TWalletListProps): An object containing the list of `wallets` to display, an optional
 *   `isLoading` flag, an optional `className` for styling, and an optional `isSearchQuery` flag
 *   to customize the empty state message.

 * Returns:
 * - JSX.Element: The React element representing the grid of wallet cards.
 ************************************************************************************************/
export function WalletList({wallets, isLoading, className, isSearchQuery}: TWalletListProps): JSX.Element {
	return (
		<ResourceGrid
			items={wallets}
			isLoading={isLoading}
			emptyMessage={
				isSearchQuery ? "We couldn't find anything matching your search." : 'No wallets available yet.'
			}
			className={className}
			renderItem={wallet => (
				<ResourceCard
					key={wallet.slug}
					slug={wallet.slug}
					title={wallet.name}
					description={wallet.description}
					imageUrl={wallet.featuredImg?.url}
					imageWidth={wallet.featuredImg?.width}
					imageHeight={wallet.featuredImg?.height}
					baseURL={'/supported-wallets'}
					imagePosition={'center'}
					altText={`${wallet.name} logo`}
				/>
			)}
		/>
	);
}
