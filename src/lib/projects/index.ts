import {
	siZod,
	siVite,
	siReact,
	siPrisma,
	siFirebase,
	siSolidity,
	siEthereum,
	siNextdotjs,
	siTypescript,
	siPostgresql,
	siCloudinary,
	siTailwindcss
} from 'simple-icons';
import type { Project } from './types';

export const projects: Project[] = [
	{
		featured: true,
		id: 'vesit-rail',
		title: 'VESITRail',
		deployedLink: 'https://vesitrail.vercel.app',
		githubLink: 'https://github.com/VESITRail/VESITRail',
		shortDescription: 'Streamlined Railway Concessions with Real-time Tracking',
		techStack: [
			siZod,
			siReact,
			siPrisma,
			siFirebase,
			siNextdotjs,
			siTypescript,
			siCloudinary,
			siPostgresql,
			siTailwindcss
		],
		teamMembers: [
			{
				githubUsername: 'Afnankazi'
			},
			{
				githubUsername: 'jaykerkar0405'
			},
			{
				githubUsername: 'Anissh280507'
			},
			{
				githubUsername: 'WhyAsh5114'
			}
		]
	},
	{
		id: 'vault-id',
		featured: false,
		title: 'VaultID',
		hackathonId: 'eth-india-villa',
		videoLink: 'https://youtu.be/kNMljHOG6n8',
		githubLink: 'https://github.com/Crew-object-Object/VaultID',
		shortDescription: 'Portable, wallet-encrypted authentication sessions',
		techStack: [siVite, siSolidity, siEthereum, siTypescript, siTailwindcss],
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
