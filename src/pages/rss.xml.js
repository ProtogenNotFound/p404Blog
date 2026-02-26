import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { getBaseUrl, SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	const baseUrl = getBaseUrl();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `${baseUrl}blog/${post.id}/`,
		})),
	});
}
