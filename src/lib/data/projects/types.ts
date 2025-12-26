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
	deployedLink: string;
	hackathonId?: string;
	techStack: TechStack[];
	shortDescription: string;
	teamMembers: TeamMember[];
	extendedDescriptionPath: string;
}
