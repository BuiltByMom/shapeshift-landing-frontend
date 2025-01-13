'use client';

import {useTranslations} from 'next-intl';

import type {ReactNode} from 'react';

export default function HomePage(): ReactNode {
	const t = useTranslations('SomePage');
	return (
		<main className={'p-6'}>
			<h1>{t('first_translation')}</h1>
		</main>
	);
}
