import Image from 'next/image';

import type {ReactElement} from 'react';

async function getPost(slug: string): any {
	const response = await fetch(
		`https://w84april.ghost.io/ghost/api/content/posts/slug/${slug}/?key=7945d41133160c2f1f1b430d77`
	);
	const {posts} = await response.json();
	return posts[0]; // Ghost API returns an array with one post
}

export default async function PostPage({params}: {params: {slug: string}}): Promise<ReactElement> {
	const post = await getPost(params.slug);
	return (
		<article className={'mx-auto max-w-4xl px-4 py-8'}>
			{/* Header section */}
			<header className={'mb-8'}>
				<h1 className={'mb-4 text-4xl font-bold'}>{post.title}</h1>
				{post.feature_image && (
					<Image
						src={post.feature_image}
						alt={post.title}
						width={1200}
						height={630}
						className={'h-auto w-full rounded-lg shadow-lg'}
						priority
					/>
				)}
			</header>

			{/* Main content */}
			<div
				className={'ghost-content prose prose-lg max-w-none dark:prose-invert'}
				dangerouslySetInnerHTML={{__html: post.html}}
			/>
		</article>
	);
}
