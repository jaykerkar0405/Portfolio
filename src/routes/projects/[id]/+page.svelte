<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Carousel from '$lib/components/ui/carousel';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { ExternalLink, Github, Star, Zap } from 'lucide-svelte';

	let { data } = $props();

	const project = $derived(data.project);
	const repoData = $derived(data.repoData);
	const screenshots = $derived(data.screenshots || []);

	const formatNumber = (num: number) => {
		if (num >= 1000) {
			return `${(num / 1000).toFixed(1)}k`;
		}
		return num.toString();
	};
</script>

<svelte:head>
	<title>{project.title} | Projects | Jay Kerkar</title>
	<meta name="description" content={project.shortDescription} />
</svelte:head>

<div class="container mx-auto max-w-7xl px-4 py-12">
	<div class="mb-8">
		<div class="flex flex-wrap items-start justify-between gap-4">
			<div class="flex items-start gap-4">
				<img
					alt={project.title}
					src={`/projects/${project.id}/icon.png`}
					class="size-15 rounded-lg border border-border object-cover"
				/>

				<div class="-mt-1 flex flex-col lg:gap-1">
					<h1 class="text-[1.675rem] font-bold">{project.title}</h1>
					<p class="text-[0.9rem] text-muted-foreground">{project.shortDescription}</p>
				</div>
			</div>

			<div class="flex flex-col gap-4">
				{#if project.hackathonId}
					<a href="/hackathons/{project.hackathonId}" class="lg:hidden">
						<Button variant="outline" class="gap-2">
							<Zap class="size-4" />
							Built at ETHIndiaVilla 2025
						</Button>
					</a>
				{/if}

				<div class="flex flex-wrap items-center gap-3">
					{#if repoData?.stargazers_count !== undefined && repoData.stargazers_count !== null}
						<a
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub stars"
							href={`${project.githubLink}/stargazers`}
						>
							<Button variant="outline" class="gap-2">
								<Star class="size-4" />
								{formatNumber(repoData.stargazers_count)}
							</Button>
						</a>
					{/if}

					{#if project.deployedLink}
						<a target="_blank" rel="noopener noreferrer" href={project.deployedLink} aria-label="View deployed site">
							<Button variant="outline" size="icon">
								<ExternalLink class="size-4" />
							</Button>
						</a>
					{/if}

					<a href={project.githubLink} target="_blank" rel="noopener noreferrer" aria-label="View on GitHub">
						<Button size="icon">
							<Github class="size-4" />
						</Button>
					</a>
				</div>
			</div>
		</div>
	</div>

	{#if screenshots.length > 0}
		<div class="mb-8">
			<Carousel.Root opts={{ align: 'start' }} class="w-full">
				<Carousel.Content class="-ml-2 md:-ml-4">
					{#each screenshots as screenshot, i}
						<Carousel.Item class="basis-full pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3">
							<Card class="overflow-hidden py-0">
								<CardContent class="p-0">
									<img
										src={screenshot}
										alt="{project.title} Screenshot {i + 1}"
										class="aspect-video w-full rounded-lg object-cover"
									/>
								</CardContent>
							</Card>
						</Carousel.Item>
					{/each}
				</Carousel.Content>
				<Carousel.Previous class="left-2 bg-background! lg:-left-12" />
				<Carousel.Next class="right-2 bg-background! lg:-right-12" />
			</Carousel.Root>
		</div>
	{/if}
</div>
