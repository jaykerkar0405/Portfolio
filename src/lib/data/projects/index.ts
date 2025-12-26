import type { Project } from './types';
import { siReact, siNodedotjs, siMongodb, siStripe, siDocker, siFirebase, siVite } from 'simple-icons';

export const projects: Project[] = [
	{
		id: 'vault-id',
		title: 'VaultID',
		icon: '/projects/vault-id/icon.png',
		githubLink: 'https://github.com/Crew-object-Object/VaultID',
		shortDescription: 'Portable, wallet-encrypted authentication sessions',
		hackathonId: 'eth-india-villa',
		teamMembers: [
			{
				githubUrl: 'https://github.com/username1',
				role: 'Full Stack Developer'
			},
			{
				githubUrl: 'https://github.com/username2',
				role: 'UI/UX Designer'
			},
			{
				githubUrl: 'https://github.com/username3',
				role: 'Backend Developer'
			}
		],
		techStack: [siReact, siNodedotjs, siMongodb, siStripe, siDocker, siFirebase, siVite],
		extendedDescriptionPath: '/src/lib/data/projects/ecommerce-platform.md',
		videoLink: 'https://youtube.com/watch?v=demoVideo123',
		images: [
			'/projects/ecommerce-platform/screenshot-1.jpg',
			'/projects/ecommerce-platform/screenshot-2.jpg',
			'/projects/ecommerce-platform/screenshot-3.jpg'
		],
		featured: true
	},
	{
		id: 'vault-asas',
		title: 'VaultID',
		icon: '/projects/vault-id/icon.png',
		githubLink: 'https://github.com/Crew-object-Object/VaultID',
		shortDescription: 'Portable, wallet-encrypted authentication sessions',
		hackathonId: 'eth-india-villa',
		teamMembers: [
			{
				githubUrl: 'https://github.com/username1',
				role: 'Full Stack Developer'
			},
			{
				githubUrl: 'https://github.com/username2',
				role: 'UI/UX Designer'
			},
			{
				githubUrl: 'https://github.com/username3',
				role: 'Backend Developer'
			}
		],
		techStack: [siReact, siNodedotjs, siMongodb, siStripe, siDocker, siFirebase, siVite],
		extendedDescriptionPath: '/src/lib/data/projects/ecommerce-platform.md',
		videoLink: 'https://youtube.com/watch?v=demoVideo123',
		images: [
			'/projects/ecommerce-platform/screenshot-1.jpg',
			'/projects/ecommerce-platform/screenshot-2.jpg',
			'/projects/ecommerce-platform/screenshot-3.jpg'
		],
		featured: true
	},
	{
		id: 'vault-asasasadasdas',
		title: 'VaultID',
		icon: '/projects/vault-id/icon.png',
		githubLink: 'https://github.com/Crew-object-Object/VaultID',
		shortDescription: 'Portable, wallet-encrypted authentication sessions',
		hackathonId: 'eth-india-villa',
		teamMembers: [
			{
				githubUrl: 'https://github.com/username1',
				role: 'Full Stack Developer'
			},
			{
				githubUrl: 'https://github.com/username2',
				role: 'UI/UX Designer'
			},
			{
				githubUrl: 'https://github.com/username3',
				role: 'Backend Developer'
			}
		],
		techStack: [siReact, siNodedotjs, siMongodb, siStripe, siDocker, siFirebase, siVite],
		extendedDescriptionPath: '/src/lib/data/projects/ecommerce-platform.md',
		videoLink: 'https://youtube.com/watch?v=demoVideo123',
		images: [
			'/projects/ecommerce-platform/screenshot-1.jpg',
			'/projects/ecommerce-platform/screenshot-2.jpg',
			'/projects/ecommerce-platform/screenshot-3.jpg'
		],
		featured: true
	},
	{
		id: 'vault-213123123123',
		title: 'VaultID',
		icon: '/projects/vault-id/icon.png',
		githubLink: 'https://github.com/Crew-object-Object/VaultID',
		shortDescription: 'Portable, wallet-encrypted authentication sessions',
		hackathonId: 'eth-india-villa',
		teamMembers: [
			{
				githubUrl: 'https://github.com/username1',
				role: 'Full Stack Developer'
			},
			{
				githubUrl: 'https://github.com/username2',
				role: 'UI/UX Designer'
			},
			{
				githubUrl: 'https://github.com/username3',
				role: 'Backend Developer'
			}
		],
		techStack: [siReact, siNodedotjs, siMongodb, siStripe, siDocker, siFirebase, siVite],
		extendedDescriptionPath: '/src/lib/data/projects/ecommerce-platform.md',
		videoLink: 'https://youtube.com/watch?v=demoVideo123',
		images: [
			'/projects/ecommerce-platform/screenshot-1.jpg',
			'/projects/ecommerce-platform/screenshot-2.jpg',
			'/projects/ecommerce-platform/screenshot-3.jpg'
		],
		featured: false
	}
];

export type { Project, TeamMember, TechStack } from './types';
