/************************************************************************************************
 ** Fetch Utilities for Core Products:

 ** This module provides a generic and centralized utility function for fetching data from an API,
 ** specifically tailored for the core product sections of the application. It standardizes
 ** error handling and API request configurations, such as caching and authorization.

 ** Key Features:
 ** - Generic Fetch Function: `fetchWithErrorHandling` can be used to fetch data for various
 **   endpoints with consistent behavior.
 ** - Error Handling: Implements try-catch blocks to gracefully handle network errors or
 **   issues during the fetch process. Logs errors to the console.
 ** - Response Validation: Checks if the HTTP response status is `ok` (e.g., 2xx status codes).
 **   Logs an error if the response is not ok.
 ** - Authorization: Includes an Authorization header with a Bearer token, presumably for
 **   accessing a protected API (e.g., Strapi).
 ** - Caching: Configures Next.js fetch to revalidate the cache every 3600 seconds (1 hour),
 **   ensuring data is reasonably fresh while reducing redundant API calls.
 ** - Type Safety: The generic function `fetchWithErrorHandling<T>` allows specifying the
 **   expected response type `T`, promoting type safety in data consumption.

 ** Usage:
 ** - Imported by product-specific fetcher modules (e.g., `ProductFetcher.ts`) to make actual
 **   API calls.
 ** - The calling function provides the specific API endpoint, query parameters, and a descriptive
 **   error message context.
 ************************************************************************************************/

/************************************************************************************************
 ** fetchWithErrorHandling<T> Function:

 ** A generic asynchronous function designed to fetch data from a specified API endpoint.
 ** It incorporates error handling, authorization, and caching.

 ** Args:
 ** - endpoint (string): The specific API endpoint path (e.g., 'defi-wallet', 'products').
 ** - queryParams (string): A string of URL query parameters to be appended to the request
 **   (e.g., 'populate=*&filter[name]=value').
 ** - errorContext (string): A descriptive string used in error messages to provide context
 **   about what data was being fetched (e.g., 'DeFi Wallet page', 'Trade product data').

 ** Type Parameters:
 ** - T: The expected type of the data to be returned upon a successful fetch. This allows
 **   the function to be type-safe and return a Promise resolving to `T | null`.

 ** Returns:
 ** - Promise<T | null>: A promise that resolves to the fetched data (typed as `T`) if the
 **   request is successful and the response is ok. Resolves to `null` if an error occurs
 **   during the fetch process, if the response status is not ok, or if the data extraction fails.
 ************************************************************************************************/
export async function fetchWithErrorHandling<T>(
	endpoint: string,
	queryParams: string,
	errorContext: string
): Promise<T | null> {
	try {
		const response = await fetch(`${process.env.STRAPI_URL}/api/${endpoint}?${queryParams}`, {
			headers: {
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`
			},
			next: {
				revalidate: 3600 // Cache for 1 hour
			}
		});

		if (!response.ok) {
			console.error(`Failed to fetch ${errorContext}: Status ${response.status}`);
			return null;
		}

		const data = await response.json();
		return data.data;
	} catch (error) {
		console.error(`Error fetching ${errorContext}:`, error instanceof Error ? error.message : String(error));
		return null;
	}
}
