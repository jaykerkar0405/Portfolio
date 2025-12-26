export interface TeamMember {
	role: string;
	githubUrl: string;
}

export interface TechStack {
	hex: string;
	path: string;
	title: string;
}

export interface Project {
	id: string;
	icon: string;
	title: string;
	images: string[];
	featured: boolean;
	githubLink: string;
	videoLink?: string;
	hackathonId?: string;
	deployedLink?: string;
	techStack: TechStack[];
	shortDescription: string;
	teamMembers: TeamMember[];
	extendedDescriptionPath: string;
}
