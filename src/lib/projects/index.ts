import type { Project } from './types';
import { siVite, siSolidity, siEthereum, siTypescript, siTailwindcss } from 'simple-icons';

export const projects: Project[] = [
	{
		id: 'vault-id',
		featured: true,
		title: 'VaultID',
		hackathonId: 'eth-india-villa',
		videoLink: 'https://youtu.be/kNMljHOG6n8',
		githubLink: 'https://github.com/Crew-object-Object/VaultID',
		shortDescription: 'Portable, wallet-encrypted authentication sessions',
		techStack: [siVite, siSolidity, siEthereum, siTypescript, siTailwindcss],
		extendedDescriptionPath: '/src/lib/projects/extended_descriptions/vault-id.md',
		teamMembers: [
			{
				githubUsername: 'jaykerkar0405'
			},
			{
				githubUsername: 'WhyAsh5114'
			},
			{
				githubUsername: 'sundaram123krishnan'
			}
		]
	}
];

export type { Project, TechStack, TeamMember } from './types';
