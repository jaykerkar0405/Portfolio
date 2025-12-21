import type { Component } from 'svelte';
import HomeIcon from '@lucide/svelte/icons/home';
import TrophyIcon from '@lucide/svelte/icons/trophy';
import FolderKanbanIcon from '@lucide/svelte/icons/folder-kanban';

export interface NavigationItem {
	href: string;
	label: string;
	icon: Component;
}

export const navigationItems: NavigationItem[] = [
	{ label: 'Home', href: '/', icon: HomeIcon },
	{ label: 'Projects', href: '/projects', icon: FolderKanbanIcon },
	{ label: 'Hackathons', href: '/hackathons', icon: TrophyIcon }
];
