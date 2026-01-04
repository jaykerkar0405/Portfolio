<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { Project } from '$lib/projects/types';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { ExternalLink, Github, Zap, ArrowRight } from 'lucide-svelte';

	let { project }: { project: Project } = $props();

	const brandColor = (hex: string) => {
		const normalized = hex.toLowerCase();
		if (normalized === '000000' || normalized === 'ffffff') return 'currentColor';
		return `#${hex}`;
	};
</script>

<Card class="flex flex-col overflow-hidden py-3">
	<CardContent class="flex flex-1 flex-col gap-5.5 p-6">
		<div class="flex items-start justify-between gap-4">
			<div class="flex items-start gap-3">
				<img
					alt={project.title}
					src={`/projects/${project.id}/icon.png`}
					class="size-12 rounded-lg border border-border object-cover"
				/>

				<div class="-mt-1 min-w-0 flex-1">
					<h3 class="mb-1 text-xl font-bold">{project.title}</h3>
					<p class="text-sm text-muted-foreground">{project.shortDescription}</p>
				</div>
			</div>

			<div class="flex shrink-0 gap-2">
				<a target="_blank" href={project.githubLink} rel="noopener noreferrer">
					<Button variant="outline" size="icon" aria-label="View on GitHub">
						<Github class="size-4" />
					</Button>
				</a>

				{#if project.deployedLink}
					<a target="_blank" rel="noopener noreferrer" href={project.deployedLink}>
						<Button variant="outline" size="icon" aria-label="View deployed site">
							<ExternalLink class="size-4" />
						</Button>
					</a>
				{/if}
			</div>
		</div>

		<div
			class="scrollbar-hide w-full overflow-x-auto overflow-y-hidden rounded-xl border border-border bg-secondary/30"
		>
			<Tooltip.Provider>
				<div class="flex items-center justify-between gap-3 px-4 py-3">
					{#each project.techStack as tech (tech.title)}
						<Tooltip.Root>
							<Tooltip.Trigger
								aria-label={tech.title}
								class="flex size-9 shrink-0 items-center justify-center rounded-lg transition-transform hover:scale-110"
							>
								<svg
									width="26"
									height="26"
									viewBox="0 0 24 24"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
									style="color: {brandColor(tech.hex)}"
								>
									<path d={tech.path} />
								</svg>
							</Tooltip.Trigger>
							<Tooltip.Content>
								<p class="font-medium">{tech.title}</p>
							</Tooltip.Content>
						</Tooltip.Root>
					{/each}
				</div>
			</Tooltip.Provider>
		</div>

		<div class="flex items-center gap-4">
			{#if project.hackathonId}
				<a href="/hackathons/{project.hackathonId}">
					<Button variant="outline" class="gap-2">
						<Zap class="size-4" />
						Built at hackathon
					</Button>
				</a>
			{/if}

			<a href="/projects/{project.id}" class="ml-auto">
				<Button class="gap-2" aria-label="View {project.title} details">
					View
					<ArrowRight class="size-4" />
				</Button>
			</a>
		</div>
	</CardContent>
</Card>

<style>
	.scrollbar-hide {
		scrollbar-width: none;
		-ms-overflow-style: none;
		scrollbar-gutter: stable;
	}
	.scrollbar-hide::-webkit-scrollbar {
		width: 0;
		height: 0;
	}
	.scrollbar-hide:hover,
	.scrollbar-hide:focus-within {
		scrollbar-width: thin;
	}
	.scrollbar-hide::-webkit-scrollbar-track {
		background: transparent;
	}
	.scrollbar-hide:hover::-webkit-scrollbar,
	.scrollbar-hide:focus-within::-webkit-scrollbar {
		width: 6px;
		height: 6px;
	}
	.scrollbar-hide:hover::-webkit-scrollbar-thumb,
	.scrollbar-hide:focus-within::-webkit-scrollbar-thumb {
		background: hsl(var(--border));
		border-radius: 3px;
	}
</style>
