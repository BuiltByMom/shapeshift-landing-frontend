import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/requests.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
	/* config options here */
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https' as const,
				hostname: 'w84april.ghost.io',
				pathname: '/content/images/**'
			},
			{
				protocol: 'https' as const,
				hostname: 'static.ghost.org',
				pathname: '/content/images/**'
			}
		]
	},
	env: {
		WALLETCONNECT_PROJECT_ID: process.env.WALLETCONNECT_PROJECT_ID ?? ''
	},
	async headers() {
		return [
			{
				source: '/',
				headers: [
					{
						key: 'cross-origin-embedder-policy',
						value: 'require-corp'
					}
				]
			}
		];
	}
};

export default withNextIntl(nextConfig);
