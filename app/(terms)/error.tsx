/************************************************************************************************
 ** Terms Error Boundary Component:

 ** This component serves as an error boundary specifically for pages within the `(terms)`
 ** route group. If an error occurs during the rendering of a terms page (e.g., Terms of
 ** Service, Privacy Policy), this component will be displayed instead of a broken page.

 ** It provides a user-friendly message, logs the error to the console for debugging purposes,
 ** and offers a "Try again" button which attempts to re-render the page, as well as a
 ** "Return home" button.
 ************************************************************************************************/
'use client';

import {useEffect} from 'react';

import {Button} from '@/components/common/Button';

import type {ReactNode} from 'react';

type TErrorProps = {
	error: Error & {digest?: string};
	reset: () => void;
};

export default function TermsError({error, reset}: TErrorProps): ReactNode {
	useEffect(() => {
		// Log the error to console for debugging
		console.error('Terms page error:', error);
	}, [error]);

	return (
		<main className={'container mx-auto mt-40 flex flex-col items-center px-4 py-8 text-center'}>
			<h1 className={'mb-6 text-4xl md:text-7xl'}>{'Something went wrong'}</h1>
			<p className={'mb-8 text-lg text-gray-300'}>
				{'We encountered an error while loading this page. Please try again later.'}
			</p>
			<div className={'flex gap-4'}>
				<Button
					variant={'blue'}
					onClick={reset}
					title={'Try again'}
				/>
				<Button
					variant={'white'}
					href={'/'}
					title={'Return home'}
				/>
			</div>
		</main>
	);
}
