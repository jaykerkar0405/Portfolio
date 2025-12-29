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
				<img src={`/projects/${project.id}/icon.png`} alt={project.title} class="size-12 rounded-lg object-cover" />

				<div class="-mt-1 min-w-0 flex-1">
					<h3 class="mb-1 text-xl font-bold">{project.title}</h3>
					<p class="text-sm text-muted-foreground">{project.shortDescription}</p>
				</div>
			</div>

			<div class="flex shrink-0 gap-2">
				<a target="_blank" href={project.githubLink} rel="noopener noreferrer" aria-label="View on GitHub">
					<Button variant="outline" size="icon">
						<Github class="size-4" />
					</Button>
				</a>

				{#if project.deployedLink}
					<a target="_blank" rel="noopener noreferrer" href={project.deployedLink} aria-label="View deployed site">
						<Button variant="outline" size="icon">
							<ExternalLink class="size-4" />
						</Button>
					</a>
				{/if}
			</div>
		</div>

		<div class="w-full overflow-x-auto rounded-xl border border-border bg-secondary/30">
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
		</div>

		<div class="flex items-center justify-between gap-4">
			{#if project.hackathonId}
				<a href="/hackathons/{project.hackathonId}">
					<Button variant="outline" class="gap-2">
						<Zap class="size-4" />
						Built at hackathon
					</Button>
				</a>
			{/if}

			<a href="/projects/{project.id}">
				<Button class="gap-2">
					View details
					<ArrowRight class="size-4" />
				</Button>
			</a>
		</div>
	</CardContent>
</Card>
