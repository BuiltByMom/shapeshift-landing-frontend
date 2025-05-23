/* eslint-disable @typescript-eslint/naming-convention */
/************************************************************************************************
 * Resources Section Constants:

 * This file serves as a centralized repository for configuration data and static content
 * specifically used across the resources section of the ShapeShift application. It helps in
 * maintaining consistency and eases the management of resource-specific information.

 * Contents:
 * - `DEFAULT_PAGINATION`: An object defining default pagination settings (page size, sort
 *   order, initial page) commonly used for lists of resources like blog posts or news articles.
 * - `DEFAULT_FEATURES`: An array of strings representing common feature highlights that might
 *   be displayed on pages for supported protocols or wallets.

 * Purpose & Benefits:
 * - Centralization: Consolidates resource-specific static data in one place.
 * - Consistency: Ensures uniform behavior (e.g., pagination) and content (e.g., feature lists)
 *   across different resource pages.
 * - Maintainability: Simplifies updates to these shared values; changes are made in this
 *   single file rather than across multiple components or pages.
 * - Scalability: Allows for easy modification or addition of shared constants as the
 *   resources section grows.
 ************************************************************************************************/

/************************************************************************************************
 * DEFAULT_PAGINATION Constant:

 * An object containing default pagination settings. These are used across various resource
 * list pages (e.g., blog, newsroom) to ensure consistent pagination behavior.

 * Fields:
 * - `PAGE_SIZE`: The default number of items to display per page.
 * - `SORT`: The default sort order for items (e.g., 'desc' for newest first).
 * - `INITIAL_PAGE`: The default starting page number for pagination.
 ************************************************************************************************/
export const DEFAULT_PAGINATION = {
	PAGE_SIZE: 12,
	SORT: 'desc' as const,
	INITIAL_PAGE: 1
};

/************************************************************************************************
 * DEFAULT_FEATURES Constant:

 * An array of strings, where each string represents a common feature or benefit that can be
 * highlighted on pages related to supported protocols, wallets, or other resources.
 * This promotes consistency in how these features are presented.
 * Example features: "Self-custodial", "Private", "Multichain trading".
 ************************************************************************************************/
export const DEFAULT_FEATURES = ['Self-custodial', 'Private', 'Multichain trading'];
