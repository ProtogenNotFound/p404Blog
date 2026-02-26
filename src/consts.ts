// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Astro Blog';
export const SITE_DESCRIPTION = 'Welcome to my website!';

/** Base URL with trailing slash (e.g. "/p404Blog/") for building internal links on GH Pages. */
export function getBaseUrl(): string {
	const b = import.meta.env.BASE_URL ?? '';
	return b.endsWith('/') ? b : `${b}/`;
}
