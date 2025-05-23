/************************************************************************************************
 ** TermsLoading Component:

 ** This component provides a loading skeleton UI that is displayed while the content for
 ** the terms and conditions or privacy policy pages is being fetched.
 ** It mimics the basic layout of the actual terms pages to create a smoother transition
 ** for the user. The animation indicates that content is actively being loaded.
 ************************************************************************************************/

import type {ReactNode} from 'react';

export default function TermsLoading(): ReactNode {
	return (
		<main className={'container mx-auto mt-40 px-4 py-8'}>
			<div className={'mb-20 flex w-full'}>
				<section className={'flex flex-col'}>
					<div className={'mb-6 h-14 w-80 animate-pulse rounded bg-gray-700'} />
					<div className={'bg-blue-700 h-10 w-36 animate-pulse rounded'} />
				</section>
			</div>

			<div className={'space-y-4'}>
				{Array.from({length: 4}).map((_, index) => (
					<div
						key={index}
						className={'h-24 animate-pulse rounded-2xl bg-secondBg'}
					/>
				))}
			</div>
		</main>
	);
}
