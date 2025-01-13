'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {ConnectButton} from '@rainbow-me/rainbowkit';

import type {ReactNode} from 'react';

export function Header(): ReactNode {
	const pathname = usePathname();

	return (
		<header className={'flex items-center justify-between border-b border-gray-200 px-6 py-4'}>
			<div className={'flex items-center gap-8'}>
				<nav className={'flex gap-6'}>
					<Link
						href={'/'}
						className={`text-sm font-medium ${
							pathname === '/' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
						}`}>
						{'Home'}
					</Link>
					<Link
						href={'/blog'}
						className={`text-sm font-medium ${
							pathname === '/blog' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
						}`}>
						{'Blog'}
					</Link>
				</nav>
			</div>
			<ConnectButton />
		</header>
	);
}
