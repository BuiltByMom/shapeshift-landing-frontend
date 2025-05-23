'use client';

/************************************************************************************************
 * ProtocolList Component & TProtocolListProps Type:

 * This file defines the `ProtocolList` component and its associated `TProtocolListProps` type.
 * The component is designed for displaying a grid of protocol cards.

 * `TProtocolListProps` Type:
 * - Defines the props for the `ProtocolList` component.
 * - Fields:
 *   - protocols: An array of `TSupportedProtocolData` objects or null.
 *   - isLoading: Optional boolean indicating if data is loading.
 *   - className: Optional string for additional CSS classes.
 *   - isSearchQuery: Optional boolean indicating if the list is a search result, affecting
 *     the empty state message.

 * `ProtocolList` Function:
 * - A specialized component for displaying protocol grids.
 * - Uses `ResourceGrid` and `ResourceCard` for consistent display.
 * - Handles loading states and empty states (differentiating between a general empty state
 *   and a no-search-results state).
 * - Each protocol card links to its dedicated page (e.g., `/supported-protocols/[slug]`).
 * - Optimized for protocol data structure and provides type-safe implementation.
 ************************************************************************************************/

import {ResourceCard} from '@/app/(resources)/_components/ResourceCard';
import {ResourceGrid} from '@/app/(resources)/_components/ResourceGrid';

import type {TSupportedProtocolData} from '@/components/strapi/types';
import type {ReactNode} from 'react';

/************************************************************************************************
 * TProtocolListProps Type:

 * Defines the props for the `ProtocolList` component.

 * Fields:
 * - protocols: An array of `TSupportedProtocolData` objects representing the protocols to display,
 *   or null if no data is available.
 * - isLoading: Optional boolean flag indicating if the protocol data is currently being loaded.
 *   Defaults to false.
 * - className: Optional string for applying additional CSS classes to the underlying `ResourceGrid`.
 * - isSearchQuery: Optional boolean flag indicating if the current list of protocols is the
 *   result of a search query. This affects the message displayed when no protocols are found.
 ************************************************************************************************/
type TProtocolListProps = {
	protocols: TSupportedProtocolData[] | null;
	isLoading?: boolean;
	className?: string;
	isSearchQuery?: boolean;
};

/************************************************************************************************
 * ProtocolList Function:

 * Renders a grid of protocol cards using the `ResourceGrid` and `ResourceCard` components.
 * It is designed to display a list of supported protocols, handling loading states and
 * empty states (differentiating between a general empty state and a no-search-results state).

 * Args:
 * - protocols (TSupportedProtocolData[] | null): The list of protocol data to display.
 * - isLoading (boolean, optional): True if the data is currently loading.
 * - className (string, optional): Additional CSS classes for the grid.
 * - isSearchQuery (boolean, optional): True if the list is a result of a search.

 * Returns:
 * - ReactNode: The JSX element representing the list of protocol cards.
 ************************************************************************************************/
export function ProtocolList({protocols, isLoading, className, isSearchQuery}: TProtocolListProps): ReactNode {
	return (
		<ResourceGrid
			items={protocols}
			isLoading={isLoading}
			emptyMessage={
				isSearchQuery ? "We couldn't find anything matching your search." : 'No protocols available yet.'
			}
			className={className}
			renderItem={protocol => (
				<ResourceCard
					key={protocol.slug}
					slug={protocol.slug}
					title={protocol.name}
					description={protocol.description}
					imageUrl={protocol.featuredImg?.url}
					imageWidth={protocol.featuredImg?.width}
					imageHeight={protocol.featuredImg?.height}
					baseURL={'/supported-protocols'}
					imagePosition={'center'}
					altText={`${protocol.name} logo`}
				/>
			)}
		/>
	);
}
