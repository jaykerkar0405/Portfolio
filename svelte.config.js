import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				if (path.match(/\/projects\/[^/]+\/screenshot-\d+\.png$/)) {
					return;
				}
				throw new Error(message);
			}
		}
	},
	extensions: ['.svelte', '.svx'],
	preprocess: [vitePreprocess(), mdsvex()]
};

export default config;
