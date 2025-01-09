import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'w84april.ghost.io',
				pathname: '/content/images/**'
			},
			{
				protocol: 'https',
				hostname: 'static.ghost.org',
				pathname: '/content/images/**'
			}
		]
	},
	async headers() {
		return [
			{
				source: '/',
				headers: [
					{
						key: 'cross-origin-opener-policy',
						value: 'same-origin'
					},
					{
						key: 'cross-origin-embedder-policy',
						value: 'require-corp'
					}
				]
			}
		];
	}
};

export default nextConfig;
