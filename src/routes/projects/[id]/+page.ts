import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { projects } from '$lib/projects';

export const load: PageLoad = async ({ params, data }) => {
	const project = projects.find((p) => p.id === params.id);

	if (!project) {
		throw error(404, 'Project not found');
	}

	let ExtendedDescription = null;
	try {
		const module = await import(`$lib/projects/extended_descriptions/${params.id}.svx`);
		ExtendedDescription = module.default;
	} catch (e) {
		console.log('No extended description found for this project');
	}

	return {
		project,
		ExtendedDescription,
		repoData: data.repoData,
		screenshots: data.screenshots,
		teamMembersData: data.teamMembersData
	};
};
