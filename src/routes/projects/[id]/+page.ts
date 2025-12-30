import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { projects } from '$lib/projects';

export const load: PageLoad = async ({ params, fetch }) => {
	const project = projects.find((p) => p.id === params.id);

	if (!project) {
		throw error(404, 'Project not found');
	}

	const githubRepoMatch = project.githubLink.match(/github\.com\/([^/]+)\/([^/]+)/);
	const [, owner, repo] = githubRepoMatch || [];

	let repoData = null;

	if (owner && repo) {
		try {
			const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
			if (repoResponse.ok) {
				repoData = await repoResponse.json();
			}
		} catch (e) {
			console.error('Failed to fetch repo data', e);
		}
	}

	const screenshots: string[] = [];
	const screenshotModules = import.meta.glob('/static/projects/*/screenshot-*.png', {
		as: 'url',
		eager: true
	});

	Object.keys(screenshotModules)
		.filter((path) => path.includes(`/projects/${params.id}/`))
		.sort((a, b) => {
			const numA = parseInt(a.match(/screenshot-(\d+)/)?.[1] || '0');
			const numB = parseInt(b.match(/screenshot-(\d+)/)?.[1] || '0');
			return numA - numB;
		})
		.forEach((path) => {
			const publicPath = path.replace('/static', '');
			screenshots.push(publicPath);
		});

	return {
		project,
		repoData,
		screenshots
	};
};
