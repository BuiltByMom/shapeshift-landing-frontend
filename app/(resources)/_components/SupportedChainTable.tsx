'use client';

import {IconPlus} from '@/components/common/icons/IconPlus';
import {allWallets, supportedChains} from '@/components/constants';

import type {ReactNode} from 'react';

export default function SupportedChainTable(): ReactNode {
	return (
		<div>
			<table className={'w-full border-collapse rounded-2xl border border-stroke'}>
				<thead>
					<tr>
						<th className={'sticky left-0 border border-stroke pb-6 text-left text-sm text-gray-500'} />
						{allWallets.map(wallet => (
							<th
								key={wallet}
								className={'h-20 w-[184px] border border-stroke text-center font-normal text-gray-500'}>
								{wallet}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{Object.keys(supportedChains).map(chain => (
						<tr key={chain}>
							<td
								align={'center'}
								className={'left-0 h-20 w-[184px] border border-stroke py-4 text-gray-500'}>
								{supportedChains[chain as keyof typeof supportedChains].name}
							</td>
							{allWallets.map(wallet => (
								<td
									align={'center'}
									key={wallet}
									className={'h-20 w-[184px] border border-stroke'}>
									{supportedChains[chain as keyof typeof supportedChains].supported.includes(
										wallet
									) ? (
										<div
											className={'flex size-10 items-center justify-center rounded-full bg-blue'}>
											<IconPlus className={'size-4 text-white'} />
										</div>
									) : (
										<div className={'h-px w-[14px] rounded-[1px] bg-white/20'} />
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
