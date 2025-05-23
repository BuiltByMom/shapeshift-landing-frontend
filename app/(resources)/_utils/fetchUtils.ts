/************************************************************************************************
 ** Resources Fetch Utilities:

 ** This module provides a suite of centralized utility functions for fetching data from the
 ** Strapi API, specifically tailored for the "Resources" section of the application (e.g., blog,
 ** newsroom, FAQs, supported chains/protocols/wallets, discover pages). It standardizes API
 ** request configurations, error handling, and caching strategies to ensure consistency and
 ** maintainability when retrieving resource-related content.

 ** Key Features:
 ** - Type-Safe Fetch Functions: Each function (e.g., `fetchAllProtocols`, `fetchDiscoverBySlug`)
 **   is designed to return data adhering to specific TypeScript types, enhancing code safety.
 ** - Standardized API Configuration: Utilizes a common `apiConfig` object for headers
 **   (including Authorization with a Bearer token) and Next.js caching options (revalidate
 **   every 1 hour).
 ** - Consistent Error Handling: Implements try-catch blocks for network or API errors, logging
 **   detailed messages to the console and typically returning `null` to allow calling code
 **   to handle failures gracefully (e.g., by showing a "not found" page).
 ** - Specific Endpoint Functions: Provides dedicated functions for fetching different types of
 **   resource data, such as all protocols, all chains, all wallets, specific discover pages
 **   by slug, and FAQ data.

 ** Usage Pattern:
 ** - These utility functions are typically imported and used within Next.js page components
 **   (Server Components) or `generateMetadata` functions to fetch necessary data.
 ** - Calling code should check for `null` return values to handle cases where data fetching fails.
 ************************************************************************************************/

import type {
	TDiscoverData,
	TFaqData,
	TSupportedChainData,
	TSupportedProtocolData,
	TSupportedWalletData
} from '@/components/strapi/types';

/************************************************************************************************
 ** apiConfig Constant:

 ** An object containing common configuration settings for API fetch requests made within this
 ** module. It standardizes how API calls are made to the Strapi backend.

 ** Properties:
 ** - `headers`: An object specifying request headers.
 **   - `Authorization`: A Bearer token for authenticating with the Strapi API, sourced from
 **     the `STRAPI_API_TOKEN` environment variable.
 ** - `next`: An object containing Next.js specific fetch options.
 **   - `revalidate`: Sets the cache revalidation period to 3600 seconds (1 hour), meaning
 **     Next.js will attempt to re-fetch the data at most once every hour, serving cached
 **     data in between.
 ************************************************************************************************/
const apiConfig = {
	headers: {
		Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
	},
	next: {
		revalidate: 3600 // Cache for 1 hour
	}
};

/************************************************************************************************
 ** fetchAllProtocols Function:

 ** Asynchronously fetches a list of all supported protocols from the Strapi API.
 ** It uses the '/api/supported-protocols' endpoint and populates all related fields ('*').
 ** The request is configured using `apiConfig` for headers and caching.

 ** Returns:
 ** - A Promise that resolves to an array of `TSupportedProtocolData` objects if successful.
 ** - Resolves to `null` if the fetch operation fails (e.g., network error, non-OK HTTP status).
 **   An error message is logged to the console in case of failure.
 ************************************************************************************************/
export async function fetchAllProtocols(): Promise<TSupportedProtocolData[] | null> {
	try {
		const response = await fetch(`${process.env.STRAPI_URL}/api/supported-protocols?populate=*`, apiConfig);

		if (!response.ok) {
			console.error(`Failed to fetch protocols: ${response.status}`);
			return null;
		}

		const data = await response.json();
		return data.data || null;
	} catch (error) {
		console.error('Error fetching protocols:', error instanceof Error ? error.message : String(error));
		return null;
	}
}

/************************************************************************************************
 ** fetchAllChains Function:

 ** Asynchronously fetches a list of all supported blockchain chains from the Strapi API.
 ** It targets the '/api/supported-chains' endpoint and populates all related fields ('*').
 ** Utilizes `apiConfig` for consistent request headers and caching policy.

 ** Returns:
 ** - A Promise that resolves to an array of `TSupportedChainData` objects on success.
 ** - Resolves to `null` if the fetch fails (e.g., network issue, non-2xx response status).
 **   Logs an error to the console upon failure.
 ************************************************************************************************/
export async function fetchAllChains(): Promise<TSupportedChainData[] | null> {
	try {
		const response = await fetch(`${process.env.STRAPI_URL}/api/supported-chains?populate=*`, apiConfig);

		if (!response.ok) {
			console.error(`Failed to fetch chains: ${response.status}`);
			return null;
		}

		const data = await response.json();
		return data.data || null;
	} catch (error) {
		console.error('Error fetching chains:', error instanceof Error ? error.message : String(error));
		return null;
	}
}

/************************************************************************************************
 ** fetchAllWallets Function:

 ** Asynchronously fetches a list of all supported wallets from the Strapi API.
 ** This function queries the '/api/supported-wallets' endpoint, ensuring all linked fields
 ** are populated ('*'). It employs `apiConfig` for request headers and caching.

 ** Returns:
 ** - A Promise that resolves to an array of `TSupportedWalletData` objects if the request is
 **   successful.
 ** - Resolves to `null` in case of a fetch error (e.g., network problem, non-successful HTTP
 **   response). An error message is logged to the console on failure.
 ************************************************************************************************/
export async function fetchAllWallets(): Promise<TSupportedWalletData[] | null> {
	try {
		const response = await fetch(`${process.env.STRAPI_URL}/api/supported-wallets?populate=*`, apiConfig);

		if (!response.ok) {
			console.error(`Failed to fetch wallets: ${response.status}`);
			return null;
		}

		const data = await response.json();
		return data.data || null;
	} catch (error) {
		console.error('Error fetching wallets:', error instanceof Error ? error.message : String(error));
		return null;
	}
}

/************************************************************************************************
 ** fetchDiscoverBySlug Function:

 ** Asynchronously fetches data for a specific "Discover" page from the Strapi API, identified
 ** by its slug.
 ** It queries the '/api/discovers' endpoint, filtering by the provided `slug` and populating
 ** specific fields related to features, images, and CTAs. Uses `apiConfig`.

 ** Args:
 ** - slug (string): The slug of the "Discover" page to retrieve.

 ** Returns:
 ** - A Promise that resolves to a `TDiscoverData` object if found and fetched successfully.
 ** - Resolves to `null` if the discover page is not found, or if any error occurs during
 **   the fetch (e.g., network error, non-OK HTTP status). Errors are logged to the console.
 ************************************************************************************************/
export async function fetchDiscoverBySlug(slug: string): Promise<TDiscoverData | null> {
	try {
		const response = await fetch(
			`${process.env.STRAPI_URL}/api/discovers?filters[slug][$eq]=${slug}&populate[0]=features&fields[1]=title&fields[2]=description&populate[3]=featuredImg&populate[4]=features.image&fields[5]=tag&populate[6]=features.buttonCta`,
			apiConfig
		);

		if (!response.ok) {
			console.error(`Failed to fetch discover data for slug "${slug}": ${response.status}`);
			return null;
		}

		const data = await response.json();
		return data.data?.[0] || null;
	} catch (error) {
		console.error(
			`Error fetching discover data for slug "${slug}":`,
			error instanceof Error ? error.message : String(error)
		);
		return null;
	}
}

/************************************************************************************************
 ** fetchFaqData Function:

 ** Asynchronously fetches the FAQ (Frequently Asked Questions) data from the Strapi API.
 ** It targets the '/api/faq' endpoint and populates nested fields for FAQ sections and their
 ** individual items. The request is configured using `apiConfig`.

 ** Returns:
 ** - A Promise that resolves to a `TFaqData` object containing all FAQ content if successful.
 ** - Resolves to `null` if the fetch operation encounters an error (e.g., network issues,
 **   non-OK HTTP response). Errors are logged to the console.
 ************************************************************************************************/
export async function fetchFaqData(): Promise<TFaqData | null> {
	try {
		const response = await fetch(
			`${process.env.STRAPI_URL}/api/faq?populate[faqSection][populate][faqSectionItem][populate]=*`,
			apiConfig
		);

		if (!response.ok) {
			console.error(`Failed to fetch FAQ data: ${response.status}`);
			return null;
		}

		const data = await response.json();
		return data.data || null;
	} catch (error) {
		console.error('Error fetching FAQ data:', error instanceof Error ? error.message : String(error));
		return null;
	}
}
