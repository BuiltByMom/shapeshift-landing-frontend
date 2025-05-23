/************************************************************************************************
 * ProtocolEasier Component:

 * This component highlights how ShapeShift simplifies interactions with a given protocol,
 * contrasting it with the complexities of traditional methods. It emphasizes the benefits
 * of using "Shifts" within ShapeShift for managing protocol-related assets.

 * Props:
 * - protocolName: The name of the protocol being featured.

 * Structure:
 * - A main container div with a background image and responsive grid layout.
 * - Three distinct sections within the grid:
 *   1. "[ProtocolName] shouldn't be difficult": Explains the problem ShapeShift solves.
 *   2. "Why Shifts?": Details the advantages of using Shifts for the protocol.
 *   3. "It's easier with ShapeShift": A concluding statement.
 * - Each section has specific text content and styling.
 ************************************************************************************************/
import type {ReactNode} from 'react';

/************************************************************************************************
 * ProtocolEasier Function:

 * Renders a section explaining how ShapeShift makes interacting with a specific protocol easier
 * through its "Shifts" feature.

 * Args:
 * - protocolName (string): The name of the protocol to be featured in the text.

 * Returns:
 * - ReactNode: The JSX element representing the "Protocol Easier" section.
 ************************************************************************************************/
export function ProtocolEasier({protocolName}: {protocolName: string}): ReactNode {
	return (
		<div
			className={
				'container col-span-1 mt-2 grid grid-cols-1 gap-4 overflow-hidden rounded-2xl bg-secondBg p-6 lg:col-span-6 lg:aspect-[1400/476] lg:h-[476px] lg:grid-cols-3 lg:p-10'
			}
			style={{
				backgroundImage: "url('/supported-chains/grid-bg.png')",
				backgroundSize: 'cover',
				backgroundPosition: 'center'
			}}>
			<div className={'flex w-full flex-col items-center gap-6 rounded-2xl bg-secondHoverBg p-10'}>
				<div className={'text-left'}>
					<p className={'pb-2 text-2xl text-white'}>{`${protocolName} shouldn't be difficult`}</p>
					<p className={'pb-4 text-base text-secondary/50'}>
						{`Gone are the days of juggling five transactions across three different interfaces just to use ${protocolName}.`}
					</p>
					<p className={'text-base text-secondary/50'}>{'ShapeShift fixes this with Shifts.'}</p>
				</div>
			</div>
			<div className={'flex w-full flex-col items-center gap-6 rounded-2xl bg-secondHoverBg p-10'}>
				<div className={'text-left'}>
					<p className={'pb-2 text-2xl text-white'}>{'Why Shifts?'}</p>
					<p className={'pb-4 text-base text-secondary/50'}>
						{`Manage, find opportunities and reallocate your positions in ${protocolName} with a single click.`}
					</p>
					<p className={'pb-4 text-base text-secondary/50'}>
						{
							'Shifts automates the process of swapping any tokens: Liquidity pool tokens, Vault tokens, Liquid staking derivatives (LSDs), Yield tokens, etc.'
						}
					</p>
					<p className={'text-base text-secondary/50'}>
						{'Shifts make it easier to earn more with your investments.'}
					</p>
				</div>
			</div>
			<div className={'flex w-full items-center justify-start px-20'}>
				<p className={'text-[40px] leading-[48px] text-white'}>{"It's easier with ShapeShift"}</p>
			</div>
		</div>
	);
}
