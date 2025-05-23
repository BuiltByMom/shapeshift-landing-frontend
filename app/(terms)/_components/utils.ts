/************************************************************************************************
 * Terms Data Transformation Utilities:

 * This module provides utility functions specifically for fetching and transforming data
 * related to legal documents (Privacy Policy and Terms of Service) from an API source
 * into a format suitable for the `TermsAccordion` component (`TTermsItemData`).

 * It encapsulates the data fetching logic (via `getPrivacyPolicy` and `getTermsOfService`)
 * and the mapping of API response fields to the required component prop structure.
 * This separation improves maintainability and keeps the presentation components clean.
 ************************************************************************************************/

import {getPrivacyPolicy, getTermsOfService} from '@/components/utils/query';

import type {TTermsItemData} from '@/app/(terms)/_components/TermsAccordion';

/************************************************************************************************
 * getPrivacyPolicyItems Function:

 * Fetches privacy policy data from the API and transforms it into an array of
 * `TTermsItemData` objects suitable for the `TermsAccordion` component.

 * Returns:
 * - A Promise that resolves to an array of `TTermsItemData` for the privacy policy.
 * - Resolves to an empty array if fetching fails or no data is returned.
 ************************************************************************************************/
export async function getPrivacyPolicyItems(): Promise<TTermsItemData[]> {
	const data = await getPrivacyPolicy();

	if (!data) {
		return [];
	}

	return data.policy.map(policy => ({
		id: policy.id,
		title: policy.title,
		date: policy.date,
		content: policy.policy
	}));
}

/************************************************************************************************
 * getTermsOfServiceItems Function:

 * Fetches terms of service data from the API and transforms it into an array of
 * `TTermsItemData` objects suitable for the `TermsAccordion` component.

 * Returns:
 * - A Promise that resolves to an array of `TTermsItemData` for the terms of service.
 * - Resolves to an empty array if fetching fails or no data is returned.
 ************************************************************************************************/
export async function getTermsOfServiceItems(): Promise<TTermsItemData[]> {
	const data = await getTermsOfService();

	if (!data) {
		return [];
	}

	return data.terms.map(term => ({
		id: term.id,
		title: term.title,
		date: term.date,
		content: term.policy
	}));
}
