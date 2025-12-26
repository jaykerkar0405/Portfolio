<script lang="ts">
	import { projects } from '$lib/data/projects';
	import ProjectCard from '$lib/components/project-card.svelte';

	const otherProjects = projects.filter((p) => !p.featured);
	const featuredProjects = projects.filter((p) => p.featured);
</script>

<div class="container mx-auto max-w-7xl px-4 py-12">
	{#if featuredProjects.length > 0}
		<section class="mb-16">
			<h2 class="mb-8 text-3xl font-bold">Featured Projects</h2>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each featuredProjects as project (project.id)}
					<ProjectCard {project} />
				{/each}
			</div>
		</section>
	{/if}

	{#if otherProjects.length > 0}
		<section class="mb-16">
			<h2 class="mb-8 text-3xl font-bold">Other Projects</h2>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each otherProjects as project (project.id)}
					<ProjectCard {project} />
				{/each}
			</div>
		</section>
	{/if}
</div>
