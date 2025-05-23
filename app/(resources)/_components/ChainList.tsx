/************************************************************************************************
 * ChainList Component:

 * This component is responsible for rendering a grid of supported blockchain networks (chains).
 * It utilizes the generic `ResourceGrid` and `ResourceCard` components to display each chain.

 * Purpose & Features:
 * - Displays a list of blockchain networks, each with its name, description, and logo.
 * - Handles loading states by showing a skeleton UI (via `ResourceGrid`).
 * - Shows an appropriate message if no chains are available or if a search yields no results.
 * - Each chain card links to a dedicated page for that chain (e.g., `/supported-chains/[slug]`)

 * Props:
 * - chains: An array of `TSupportedChainData` objects, or null if data is not yet loaded.
 * - isLoading: Optional boolean, true if data is currently being fetched.
 * - className: Optional string for additional CSS classes on the grid container.
 * - isSearchQuery: Optional boolean, true if the list is a result of a search query,
 *   affecting the empty state message.
 ************************************************************************************************/

import {ResourceCard} from '@/app/(resources)/_components/ResourceCard';
import {ResourceGrid} from '@/app/(resources)/_components/ResourceGrid';

import type {TSupportedChainData} from '@/components/strapi/types';
import type {ReactNode} from 'react';

type TChainListProps = {
	chains: TSupportedChainData[] | null;
	isLoading?: boolean;
	className?: string;
	isSearchQuery?: boolean;
};

export function ChainList({chains, isLoading, className, isSearchQuery}: TChainListProps): ReactNode {
	return (
		<ResourceGrid
			items={chains}
			isLoading={isLoading}
			emptyMessage={
				isSearchQuery
					? "We couldn't find anything matching your search."
					: 'No blockchain networks available yet.'
			}
			className={className}
			renderItem={chain => (
				<ResourceCard
					key={chain.slug}
					slug={chain.slug}
					title={chain.name}
					description={chain.description}
					imageUrl={chain.featuredImg?.url}
					imageWidth={chain.featuredImg?.width}
					imageHeight={chain.featuredImg?.height}
					baseURL={'/supported-chains'}
					imagePosition={'bottom'}
					altText={`${chain.name} logo`}
				/>
			)}
		/>
	);
}
