import Image from 'next/image';

import {IconActivityRings} from './common/icons/IconActivityRings';
import {IconBlog} from './common/icons/IconBlog';
import {IconBulb} from './common/icons/IconBulb';
import {IconChains} from './common/icons/IconChains';
import {IconCheckCircle} from './common/icons/IconCheckCircle';
import {IconDapp} from './common/icons/IconDapp';
import {IconDiscord} from './common/icons/IconDiscord';
import {IconDiscover} from './common/icons/IconDiscover';
import {IconDocs} from './common/icons/IconDocs';
import {IconDollar} from './common/icons/IconDollar';
import {IconFox} from './common/icons/IconFox';
import {IconGlobe} from './common/icons/IconGlobe';
import {IconGovern} from './common/icons/IconGovern';
import {IconHeart} from './common/icons/IconHeart';
import {IconKey} from './common/icons/IconKey';
import {IconMedium} from './common/icons/IconMedium';
import {IconMobile} from './common/icons/IconMobile';
import {IconPercent} from './common/icons/IconPercent';
import {IconQuestion} from './common/icons/IconQuestion';
import {IconResource} from './common/icons/IconResource';
import {IconScanDevice} from './common/icons/IconScanDevice';
import {IconShield} from './common/icons/IconShield';
import {IconStar} from './common/icons/IconStar';
import {IconTelegram} from './common/icons/IconTelegram';
import {IconTriLink} from './common/icons/IconTriLink';
import {IconTwitter} from './common/icons/IconTwitter';
import {IconWallet} from './common/icons/IconWallet';
import {IconWarpcast} from './common/icons/IconWarpcast';

import type {TCardsRowSection} from '@/components/strapi/types';

export const dAppUrl =
	'https://app.shapeshift.com/?utm_source=mainpage&utm_medium=launchdapp&utm_campaign=top#/trade/eip155:1/erc20:0xc770eefad204b5180df6a14ee197d99d808ee52d/eip155:1/slip44:60/0';

const docsUrl = 'https://docs.shapeshift.com/';

const githubUrl = 'https://github.com/shapeshift';

export const appResources = [
	{name: 'Blog', href: '/blog', description: 'Latest news and updates', icon: <IconBlog />},
	{
		name: 'Discover',
		description: 'Learn more about the ShapeShift ecosystem',
		href: '/discover',
		icon: <IconDiscover />
	},
	{name: 'FAQ', href: '/faq', description: 'Frequently asked questions', icon: <IconQuestion />},
	{
		name: 'Supported chains',
		href: '/supported-chains',
		description: 'Blockchain networks we support',
		icon: <IconChains />
	},
	{
		name: 'Supported wallets',
		href: '/supported-wallets',
		description: 'Wallets we support',
		icon: <IconWallet />
	},
	{
		name: 'Supported protocols',
		href: '/supported-protocols',
		description: 'Protocols we support',
		icon: <IconScanDevice />
	},
	{
		name: 'Support',
		href: 'https://shapeshift.zendesk.com/',
		description: 'Support portal',
		icon: <IconCheckCircle />
	},
	{name: 'Terms of Service', href: '/terms-of-service', description: 'Our terms and conditions', icon: <IconDocs />},
	{name: 'Privacy Policy', href: '/privacy-policy', description: 'How we handle your data', icon: <IconDocs />}
];

export const appDao = [
	{name: 'Fox token', href: '/dao/fox-token', description: 'Our governance token', icon: <IconFox />},
	{
		name: 'Governance',
		href: 'https://snapshot.box/#/s:shapeshiftdao.eth',
		description: 'Participate in decision making',
		icon: <IconGovern />
	},
	{name: 'Docs', href: docsUrl, description: 'Technical documentation', icon: <IconDocs />},
	{name: 'Join us', href: 'https://forum.shapeshift.com/', description: 'Join the community', icon: <IconStar />},
	{
		name: 'Share your ideas',
		href: 'https://shapeshift.canny.io/',
		description: 'Share your ideas',
		icon: <IconBulb />
	}
];

export const appProducts = [
	{
		name: 'dApp',
		href: dAppUrl,
		description: 'Trade, track, buy, and earn with your favorite crypto.',
		icon: <IconDapp />
	},
	{name: 'Trade', href: '/trade', description: 'Trade 10,000+ assets with one click.', icon: <IconDollar />},
	{
		name: 'DeFi Wallet',
		href: '/defi-wallet',
		description: 'All-In-One ShapeShift DeFi wallet.',
		icon: <IconResource />
	},
	{name: 'Earn', href: '/earn', description: 'Easiest and fastest way to earn crypto.', icon: <IconPercent />},
	{
		name: 'Mobile app',
		href: '/mobile-app',
		description: 'The only crypto app you need.',
		icon: <IconMobile />
	},
	{
		name: 'KeepKey',
		href: 'https://www.keepkey.com/',
		description: 'The Next Frontier of Crypto Security.',
		icon: <IconKey />
	}
];

export const headerTabs = [
	{name: 'Products', href: '/products', value: 'products'},
	{name: 'Resources', href: '/resources', value: 'resources'},
	{name: 'DAO', href: '/dao', value: 'dao'}
];

export const footerLinks = {
	Products: appProducts,
	Resources: appResources,
	DAO: appDao,
	Connect: [
		{name: 'Twitter', href: 'https://twitter.com/shapeshift'},
		{name: 'Medium', href: 'https://medium.com/shapeshift'},
		{name: 'Discord', href: 'https://discord.gg/shapeshift'},
		{name: 'Telegram', href: 'https://t.me/shapeshift'},
		{name: 'Warpcast', href: 'https://warpcast.com/shapeshift'}
	]
};

export const allWallets = [
	'KeepKey',
	'ShapeShift Wallet',
	'MetaMask',
	'XDEFI',
	'Wallet Connect',
	'Ledger',
	'Coinbase Wallet',
	'Phantom Wallet',
	'Keplr'
];

export const supportedChains = {
	btc: {
		name: 'BTC',
		supported: ['KeepKey', 'ShapeShift Wallet', 'XDEFI', 'Ledger', 'Coinbase Wallet']
	},
	eth: {
		name: 'ETH + ERC-20',
		supported: ['KeepKey', 'ShapeShift Wallet', 'MetaMask', 'XDEFI', 'Wallet Connect', 'Ledger', 'Coinbase Wallet']
	},
	base: {
		name: 'Base',
		supported: ['KeepKey', 'ShapeShift Wallet', 'MetaMask', 'Wallet Connect', 'Ledger', 'Coinbase Wallet']
	},
	atom: {
		name: 'ATOM',
		supported: ['KeepKey', 'ShapeShift Wallet', 'XDEFI', 'Ledger', 'Keplr']
	},
	gnosis: {
		name: 'Gnosis',
		supported: ['KeepKey', 'ShapeShift Wallet', 'MetaMask', 'Ledger', 'Coinbase Wallet']
	},
	doge: {
		name: 'DOGE',
		supported: ['KeepKey', 'ShapeShift Wallet', 'XDEFI', 'Ledger', 'Coinbase Wallet']
	},
	avalanche: {
		name: 'Avalanche',
		supported: ['KeepKey', 'ShapeShift Wallet', 'MetaMask', 'XDEFI', 'Wallet Connect', 'Ledger', 'Coinbase Wallet']
	},
	bch: {
		name: 'BCH',
		supported: ['KeepKey', 'ShapeShift Wallet', 'XDEFI', 'Ledger']
	},
	bnbs: {
		name: 'BNB',
		supported: ['KeepKey', 'ShapeShift Wallet', 'XDEFI', 'Ledger', 'Coinbase Wallet']
	},
	arb: {
		name: 'ARB',
		supported: ['KeepKey', 'ShapeShift Wallet', 'MetaMask', 'XDEFI', 'Wallet Connect', 'Ledger', 'Coinbase Wallet']
	},
	optimism: {
		name: 'Optimism',
		supported: ['KeepKey', 'ShapeShift Wallet', 'MetaMask', 'Wallet Connect', 'Ledger']
	},
	polygon: {
		name: 'Polygon',
		supported: ['KeepKey', 'ShapeShift Wallet', 'MetaMask', 'XDEFI', 'Wallet Connect', 'Ledger', 'Coinbase Wallet']
	},
	thorchain: {
		name: 'THORChain',
		supported: ['KeepKey', 'ShapeShift Wallet', 'XDEFI', 'Ledger']
	},
	ltc: {
		name: 'LTC',
		supported: ['KeepKey', 'ShapeShift Wallet', 'Ledger', 'Coinbase Wallet']
	},
	sol: {
		name: 'SOL',
		supported: ['Phantom Wallet']
	}
};

export const landingCards: TCardsRowSection = {
	id: 11,
	title: '',
	ctaBlock: {
		id: 1,
		title: 'Get the app',
		url: '/apple-app-store'
	},
	cards: [
		{
			id: 49,
			title: 'Trade',
			description: 'Trade 10,000+ assets for Bitcoin, Ethereum, DOGE, & more with one click.',
			isTextFirst: false,
			href: 'https://app.shapeshift.com/',
			image: {
				url: '/landing/cardBuyAndSell.png',
				width: 922,
				height: 512,
				formats: {
					thumbnail: {
						width: 245,
						height: 116,
						url: '/uploads/thumbnail_img_5997fe520e.png'
					}
				}
			}
		},
		{
			id: 50,
			title: 'Save',
			description: 'FOX token has power on ShapeShift! Get discounts on fees when you hold FOX.',
			isTextFirst: false,
			href: 'https://app.shapeshift.com/pools#/fox',
			image: {
				url: '/landing/cardethbtc.png',
				width: 922,
				height: 512,
				formats: {
					thumbnail: {
						width: 245,
						height: 116,
						url: '/uploads/thumbnail_img_5997fe520e.png'
					}
				}
			}
		},
		{
			id: 51,
			title: 'Earn',
			description:
				'Earn up to 12% on your Bitcoin, Ethereum, Dogecoin, Cosmos and more. Always non-custodial. Always real yield.',
			isTextFirst: false,
			href: 'https://app.shapeshift.com/pools#/earn',
			image: {
				url: '/landing/cardShapeshiftDAO.png',
				width: 922,
				height: 512,
				formats: {
					thumbnail: {
						width: 245,
						height: 116,
						url: '/landing/cardShapeshiftDAO.png'
					}
				}
			}
		}
	]
};

export const foxTokenBenefits = [
	{
		title: 'Work from anywhere in the World.',
		icon: <IconGlobe />
	},
	{
		title: 'Get healthcare coverage (for US based workers)*',
		icon: <IconHeart />
	},
	{
		title: 'Work anonymously',
		icon: <IconShield />
	},
	{
		title: 'Optional W2s for US contributors*',
		icon: <IconActivityRings />
	},
	{
		title: 'Get paid in USDC, FOX, or Fiat*',
		icon: <IconDollar />
	},
	{
		title: 'Work with a fully distributed team of top talent',
		icon: <IconTriLink />
	}
];

export const foxTokenCommunityItems = [
	{
		href: 'https://twitter.com/fox_token',
		icon: <IconTwitter className={'transition-all duration-200 group-hover:text-blue'} />
	},
	{
		href: 'https://medium.com/@fox_token',
		icon: <IconMedium className={'transition-all duration-200 group-hover:text-blue'} />
	},
	{
		href: 'https://discord.gg/fox_token',
		icon: <IconDiscord className={'transition-all duration-200 group-hover:text-blue'} />
	},
	{
		href: 'https://t.me/fox_token',
		icon: <IconTelegram className={'transition-all duration-200 group-hover:text-blue'} />
	},
	{
		href: 'https://w.social/fox_token',
		icon: <IconWarpcast className={'transition-all duration-200 group-hover:text-blue'} />
	}
];

export const foxTokenContributeItems = [
	{
		title: 'Contribute',
		href: githubUrl
	},
	{
		title: 'Govern',
		href: 'https://snapshot.box/#/s:shapeshiftdao.eth'
	},
	{
		title: 'Read Docs',
		href: docsUrl
	},
	{
		title: 'Discuss',
		href: 'https://forum.shapeshift.com/'
	}
];

export const blogTypes = [
	{
		title: 'All posts',
		slug: 'all'
	},
	{
		title: 'Partner Integrations',
		slug: 'partner-integrations'
	},
	{
		title: 'Ethereum',
		slug: 'ethereum'
	},
	{
		title: 'Crypto 101',
		slug: 'crypto-101'
	},
	{
		title: 'Bitcoin',
		slug: 'bitcoin'
	},
	{
		title: 'Crypto pro',
		slug: 'crypto-pro'
	},
	{
		title: 'Thought Leadership',
		slug: 'thought-leadership'
	},
	{
		title: 'Governance Newsletters',
		slug: 'governance-newsletters'
	},
	{
		title: 'Newsletter',
		slug: 'newsletter'
	}
];
export function blogTypesSlugToCategory(slug: string): string {
	return blogTypes.find(tab => tab.slug === slug)?.title ?? slug;
}

export const newsroomCategories = [
	{
		title: 'All',
		slug: 'all'
	},
	{
		title: 'In The News',
		slug: 'in-the-news'
	},
	{
		title: 'Press Releases',
		slug: 'press-releases'
	}
];
export function newsroomCategoriesSlugToCategory(slug: string): string {
	return newsroomCategories.find(tab => tab.slug === slug)?.title ?? slug;
}

export const SUPPORTED_TOKENS = [
	{
		symbol: 'ETH',
		name: 'Ethereum',
		icon: '/widget/eth_icon.png',
		slug: 'ethereum',
		decimals: {
			btc: 8,
			eth: 18,
			sol: 8,
			usdt: 8,
			bnbeth: 18
		},
		requestKey: 'ETH',
		tokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
	},
	{
		symbol: 'BTC',
		name: 'Bitcoin',
		icon: '/widget/btc_icon.png',
		slug: 'bitcoin',
		decimals: {
			btc: 8,
			eth: 8,
			sol: 8,
			usdt: 8,
			bnbeth: 18
		},
		requestKey: 'BTC'
	},
	{
		symbol: 'USDT',
		name: 'Tether on Ethereum',
		icon: '/widget/usdt_icon.png',
		sublogo: '/widget/eth_icon.png',
		slug: 'tether-on-ethereum',
		decimals: {
			btc: 8,
			eth: 8,
			sol: 5,
			usdt: 8,
			bnbeth: 6
		},
		requestKey: 'USDT-0XDAC17F958D2EE523A2206206994597C13D831EC7',
		tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7'
	},
	{
		symbol: 'BNB',
		name: 'BNB',
		icon: '/widget/bnb_icon.png',
		slug: 'bnb',
		decimals: {
			eth: 18,
			btc: 8,
			sol: 8,
			usdt: 8,
			bnbeth: 18
		},
		requestKey: 'BNB',
		tokenAddress: ''
	},
	{
		symbol: 'BNBETH',
		name: 'BNB on Ethereum',
		icon: '/widget/bnb_icon.png',
		sublogo: '/widget/eth_icon.png',
		slug: 'bnb-on-ethereum',
		decimals: {
			btc: 8,
			eth: 18,
			sol: 8,
			usdt: 8,
			bnbeth: 18
		},
		tokenAddress: '0xb8c77482e45f1f44de1745f52c74426c631bdd52',
		requestKey: 'BNB'
	},
	{
		symbol: 'SOL',
		name: 'Solana',
		icon: '/widget/sol_icon.png',
		slug: 'solana',
		decimals: {
			btc: 8,
			eth: 18,
			sol: 8,
			usdt: 8,
			bnbeth: 18
		},
		requestKey: 'SOL'
	}
];

export const SUPPORTED_CHAINS = [
	{id: 'bitcoin', name: 'Bitcoin', icon: '/widget/btc_icon.png', requestKey: 'BTC'},
	{id: 'base', name: 'Base', icon: '/widget/base_icon.png', requestKey: 'BASE'},
	{id: 'ethereum', name: 'Ethereum', icon: '/widget/eth_icon.png', requestKey: 'ETH', chainId: '1'},
	{id: 'solana', name: 'Solana', icon: '/widget/sol_icon.png', requestKey: 'SOL'},
	{id: 'bnb', name: 'BNB Smart Chain', icon: '/widget/bnb_icon.png', requestKey: 'BSC'}
];

export const TOKEN_CHAIN_SUPPORT: Record<string, string[]> = {
	USDT: ['arbitrum', 'ethereum', 'optimism'],
	BTC: ['bitcoin'],
	BNBETH: ['ethereum'],
	BNB: ['bnb'],
	SOL: ['solana'],
	ETH: ['arbitrum', 'base', 'optimism', 'ethereum']
};

export const blogTags = [
	{
		title: 'All tags',
		slug: 'all'
	},
	{
		title: 'Arbitrum',
		slug: 'arbitrum'
	},
	{
		title: 'Bitcoin',
		slug: 'bitcoin'
	},
	{
		title: 'Bitcoin Price',
		slug: 'bitcoin-price'
	},
	{
		title: 'Bitcoin Wallet',
		slug: 'bitcoin-wallet'
	},
	{
		title: 'CoinCap',
		slug: 'coincap'
	},
	{
		title: 'Cryptocurrency',
		slug: 'cryptocurrency'
	},
	{
		title: 'Culture',
		slug: 'culture'
	},
	{
		title: 'DAO',
		slug: 'dao'
	},
	{
		title: 'DeFi',
		slug: 'defi'
	},
	{
		title: 'Developer',
		slug: 'developer'
	},
	{
		title: 'DEX',
		slug: 'dex'
	},
	{
		title: 'Ethereum',
		slug: 'ethereum'
	},
	{
		title: 'Finance',
		slug: 'finance'
	},
	{
		title: 'FOX Token',
		slug: 'fox-token'
	},
	{
		title: 'KeepKey',
		slug: 'keepkey'
	},
	{
		title: 'Ledger',
		slug: 'ledger'
	},
	{
		title: 'Mobile',
		slug: 'mobile'
	},
	{
		title: 'News',
		slug: 'news'
	},
	{
		title: 'Optimism',
		slug: 'optimism'
	},
	{
		title: 'Portis',
		slug: 'portis'
	},
	{
		title: 'Security',
		slug: 'security'
	},
	{
		title: 'ShapeShift',
		slug: 'shapeshift'
	},
	{
		title: 'THORChain',
		slug: 'thorchain'
	},
	{
		title: 'Trader',
		slug: 'trader'
	},
	{
		title: 'Trading',
		slug: 'trading'
	},
	{
		title: 'Trezor',
		slug: 'trezor'
	},
	{
		title: 'Wallet',
		slug: 'wallet'
	}
];

export const newsroomTags = [
	{
		title: 'All tags',
		slug: 'all'
	},
	{
		title: 'Cryptocurrency',
		slug: 'cryptocurrency'
	},
	{
		title: 'DeFi',
		slug: 'defi'
	},
	{
		title: 'Ethereum',
		slug: 'ethereum'
	},
	{
		title: 'Finance',
		slug: 'finance'
	},
	{
		title: 'Culture',
		slug: 'culture'
	},
	{
		title: 'DEX',
		slug: 'dex'
	},
	{
		title: 'Bitcoin',
		slug: 'bitcoin'
	},
	{
		title: 'DAO',
		slug: 'dao'
	},
	{
		title: 'ShapeShift',
		slug: 'shapeshift'
	},
	{
		title: 'KeepKey',
		slug: 'keepkey'
	},
	{
		title: 'News',
		slug: 'news'
	},
	{
		title: 'Trading',
		slug: 'trading'
	},
	{
		title: 'Bitcoin Wallet',
		slug: 'bitcoin-wallet'
	},
	{
		title: 'Security',
		slug: 'security'
	},
	{
		title: 'Developer',
		slug: 'developer'
	},
	{
		title: 'Bitcoin Price',
		slug: 'bitcoin-price'
	},
	{
		title: 'Optimism',
		slug: 'optimism'
	},
	{
		title: 'Trader',
		slug: 'trader'
	},
	{
		title: 'Ledger',
		slug: 'ledger'
	},
	{
		title: 'Mobile',
		slug: 'mobile'
	}
];

export const CarouselLogos = {
	cowSwap: {
		href: 'https://cow.fi/',
		src: '/landing/cow-swap.png',
		Logo: () => (
			<Image
				src={'/landing/cow-swap.png'}
				alt={'cow swap'}
				width={'200'}
				height={'40'}
			/>
		)
	},
	thorchain: {
		href: 'https://thorchain.org/',
		src: '/landing/thorchain.png',
		Logo: () => (
			<Image
				src={'/landing/thorchain.png'}
				alt={'thorchain'}
				width={'180'}
				height={'40'}
			/>
		)
	},
	onramper: {
		href: 'https://www.onramper.com/',
		src: '/landing/onramper.png',
		Logo: () => (
			<Image
				src={'/landing/onramper.png'}
				alt={'onramper'}
				width={'190'}
				height={'40'}
			/>
		)
	},
	nownodes: {
		href: 'https://nownodes.io/',
		src: '/landing/nownodes.png',
		Logo: () => (
			<Image
				src={'/landing/nownodes.png'}
				alt={'nownodes'}
				width={'160'}
				height={'40'}
			/>
		)
	},
	banxa: {
		href: 'https://banxa.com/',
		src: '/landing/banxa.png',
		Logo: () => (
			<Image
				src={'/landing/banxa.png'}
				alt={'banxa'}
				width={'170'}
				height={'40'}
			/>
		)
	},
	zerion: {
		href: 'https://zerion.io/',
		src: '/landing/zerion.png',
		Logo: () => (
			<Image
				src={'/landing/zerion.png'}
				alt={'zerion'}
				width={'170'}
				height={'40'}
			/>
		)
	},
	lifi: {
		href: 'https://li.fi/',
		src: '/landing/lifi.png',
		Logo: () => (
			<Image
				src={'/landing/lifi.png'}
				alt={'lifi'}
				width={'100'}
				height={'40'}
			/>
		)
	},
	// eslint-disable-next-line @typescript-eslint/naming-convention
	Ox: {
		href: 'https://0x.org/',
		src: '/landing/0x.png',
		Logo: () => (
			<Image
				src={'/landing/0x.png'}
				alt={'0x'}
				width={'55'}
				height={'40'}
			/>
		)
	}
};

/************************************************************************************************
 * Popup Animation Configuration
 * Defines the animation for the popup's entrance and exit
 * - Slides up from bottom
 * - Fades in
 * - Spring animation for natural feel
 ************************************************************************************************/
export const popupAnimation = {
	initial: {
		opacity: 0,
		y: 100,
		scale: 0.95,
		z: 1
	},
	animate: {
		opacity: 1,
		y: 0,
		scale: 1,
		z: 1,
		transition: {
			type: 'spring',
			stiffness: 100,
			damping: 10,
			mass: 1,
			delay: 0.4
		}
	},
	exit: {
		opacity: 0,
		y: 50,
		scale: 0.95,
		z: 1,
		transition: {
			duration: 0.2
		}
	}
};
