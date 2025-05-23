/* eslint-disable @typescript-eslint/naming-convention */
/************************************************************************************************
 * Product Section Constants:

 * This file serves as a centralized repository for configuration data and static content
 * specifically used across the core product pages of the ShapeShift application. It helps in
 * maintaining consistency and eases the management of product-specific information.

 * Contents:
 * - `PRODUCT_FOOTER_CONFIGS`: An object mapping product identifiers (keys) to their
 *   respective footer banner configurations. Each configuration includes tag text, title,
 *   button text, and a target URL for the call-to-action in the footer.

 * Purpose & Benefits:
 * - Centralization: Consolidates product-specific static data in one place.
 * - Consistency: Ensures uniform messaging and links across different product footers.
 * - Maintainability: Simplifies updates to footer content; changes are made in this
 *   single file rather than across multiple components or pages.
 * - Scalability: Allows for easy addition of configurations for new products without
 *   altering the logic of the components that consume this data.
 ************************************************************************************************/

/**
 * Footer banner configuration for each product type
 * Contains display text, button text, and target URLs
 */
export const PRODUCT_FOOTER_CONFIGS = {
	'defi-wallet': {
		tag: 'ShapeShift DeFi wallet',
		title: 'Everything you need in one place.',
		buttonText: 'Get started',
		href: 'https://app.shapeshift.com'
	},
	earn: {
		tag: 'Earn with ShapeShift',
		title: 'Everything you need in one place.',
		buttonText: 'Start Earning',
		href: 'https://app.shapeshift.com/#/earn'
	},
	trade: {
		tag: 'Trade with ShapeShift',
		title: 'Everything you need in one place.',
		buttonText: 'Start Trading',
		href: 'https://app.shapeshift.com/'
	},
	'mobile-app': {
		tag: 'ShapeShift mobile app',
		title: 'Everything you need in one place.',
		buttonText: 'Start Earning',
		href: 'https://app.shapeshift.com/#/earn'
	}
};
