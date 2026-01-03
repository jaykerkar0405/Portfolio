import { error } from '@sveltejs/kit';
import { projects } from '$lib/projects';
import type { PageServerLoad } from './$types';
import { GITHUB_PAT } from '$env/static/private';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const project = projects.find((p) => p.id === params.id);

	if (!project) {
		throw error(404, 'Project not found');
	}

	const githubRepoMatch = project.githubLink.match(/github\.com\/([^/]+)\/([^/]+)/);
	const [, owner, repo] = githubRepoMatch || [];

	let repoData = null;

	const headers: HeadersInit = {};
	if (GITHUB_PAT) {
		headers['Authorization'] = `Bearer ${GITHUB_PAT}`;
	}

	if (owner && repo) {
		try {
			const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
				headers
			});
			if (repoResponse.ok) {
				repoData = await repoResponse.json();
			}
		} catch (e) {
			console.error('Failed to fetch repo data', e);
		}
	}

	const screenshots: string[] = [];

	for (let i = 1; i <= 20; i++) {
		const screenshotPath = `/projects/${params.id}/screenshot-${i}.png`;
		try {
			const response = await fetch(screenshotPath, { method: 'HEAD' });
			if (response.ok) {
				screenshots.push(screenshotPath);
			} else {
				break;
			}
		} catch {
			break;
		}
	}

	const teamMembersData = await Promise.all(
		project.teamMembers.map(async (member) => {
			try {
				const response = await fetch(`https://api.github.com/users/${member.githubUsername}`, {
					headers
				});
				if (response.ok) {
					const data = await response.json();
					return {
						username: member.githubUsername,
						name: data.name || member.githubUsername,
						avatar: data.avatar_url,
						followers: data.followers,
						profileUrl: data.html_url
					};
				}
			} catch (e) {
				console.error(`Failed to fetch data for ${member.githubUsername}`, e);
			}
			return null;
		})
	);

	return {
		repoData,
		screenshots,
		teamMembersData: teamMembersData.filter((member): member is NonNullable<typeof member> => member !== null)
	};
};
