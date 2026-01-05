import {
	siZod,
	siVite,
	siReact,
	siNumpy,
	siPython,
	siPrisma,
	siOpencv,
	siFirebase,
	siSolidity,
	siShadcnui,
	siEthereum,
	siNextdotjs,
	siMediapipe,
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
		featured: true,
		id: 'chrono-vault',
		title: 'ChronoVault',
		hackathonId: 'ethonline-2025',
		videoLink: 'https://youtu.be/Qg4RDl1IBHM',
		githubLink: 'https://github.com/WhyAsh5114/ChronoVault',
		deployedLink: 'https://chronovault-ethonline.vercel.app',
		techStack: [siSolidity, siEthereum, siNextdotjs, siTypescript, siTailwindcss],
		shortDescription: 'Web3 wallet with TOTP-based 2FA and zero-knowledge security',
		teamMembers: [
			{
				githubUsername: 'jaykerkar0405'
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
	},
	{
		id: 'fit-snap',
		featured: false,
		title: 'FitSnap',
		hackathonId: 'hackx3.0',
		deployedLink: 'https://fitsnap-hackx.vercel.app',
		githubLink: 'https://github.com/Crew-object-Object/FitSnap',
		shortDescription: 'AI-powered size prediction with AR virtual try-on',
		techStack: [siTypescript, siNextdotjs, siReact, siShadcnui, siPrisma, siPython, siNumpy, siMediapipe, siOpencv],
		teamMembers: [
			{
				githubUsername: 'jaykerkar0405'
			},
			{
				githubUsername: 'WhyAsh5114'
			},
			{
				githubUsername: 'sundaram123krishnan'
			},
			{
				githubUsername: 'kryyo1441'
			}
		]
	}
];

export type { Project, TechStack, TeamMember } from './types';
