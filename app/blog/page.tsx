import Link from 'next/link';

import type {ReactElement} from 'react';

export default async function Blog(): Promise<ReactElement> {
	const data = await fetch('https://w84april.ghost.io/ghost/api/content/posts/?key=7945d41133160c2f1f1b430d77');
	const {posts} = await data.json();
	return (
		<div>
			{posts.map(post => (
				<div key={post.id}>
					<Link href={`/blog/${post.slug}`}>
						<h2 className={'hover:underline'}>{post.title}</h2>
					</Link>
					{/* <div dangerouslySetInnerHTML={{__html: post.html}} /> */}
				</div>
			))}
		</div>
	);
}
