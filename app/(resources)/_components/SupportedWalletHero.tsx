/************************************************************************************************
 * SupportedWalletHero Component:

 * This file defines the `SupportedWalletHero` component, which is responsible for rendering
 * a hero image section, typically used on pages detailing specific supported wallets. It
 * displays a background image and overlays the specific wallet's logo.
 ************************************************************************************************/

import Image from 'next/image';

import type {ReactNode} from 'react';

/************************************************************************************************
 * SupportedWalletHero Function:

 * Renders a hero section for a supported wallet page. It displays a generic hero background
 * image and overlays it with the specific wallet's logo image.

 * Args:
 * - props: An object containing:
 *   - url (string): The URL of the wallet's logo image.
 *   - width (number): The width of the wallet's logo image.
 *   - height (number): The height of the wallet's logo image.
 *   - name (string): The name of the wallet, used for the alt text of the logo.

 * Returns:
 * - ReactNode: The JSX element representing the hero section for the wallet page.
 ************************************************************************************************/
export function SupportedWalletHero(props: {url: string; width: number; height: number; name: string}): ReactNode {
	return (
		<section className={'relative flex w-full overflow-hidden rounded-2xl'}>
			<Image
				src={'/supported-wallets/hero.jpg'}
				alt={''}
				width={2800}
				height={720}
			/>
			<div className={'absolute inset-0 flex items-center justify-end py-6 pr-16'}>
				<Image
					src={props.url}
					alt={props.name}
					width={props.width}
					height={props.height}
					className={'my-auto h-full w-auto'}
				/>
			</div>
		</section>
	);
}
