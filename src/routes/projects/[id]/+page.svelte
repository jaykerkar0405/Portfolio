<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Carousel from '$lib/components/ui/carousel';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { ExternalLink, Github, Users, Star, Zap, Video, Layers, ChevronDown, ChevronUp } from 'lucide-svelte';

	let { data } = $props();

	const project = $derived(data.project);
	const repoData = $derived(data.repoData);
	const screenshots = $derived(data.screenshots || []);
	const teamMembersData = $derived(data.teamMembersData || []);
	const ExtendedDescription = $derived(data.ExtendedDescription);

	let leftColHeight = $state(0);
	let leftColRef: HTMLDivElement;
	let descColRef: HTMLDivElement;
	let isExpanded = $state(false);
	let needsExpansion = $state(false);

	$effect(() => {
		if (leftColRef && descColRef) {
			const checkHeight = () => {
				const leftHeight = leftColRef.offsetHeight - 9.3;
				const descHeight = descColRef.scrollHeight;
				leftColHeight = leftHeight;
				needsExpansion = descHeight > leftHeight;
			};
			checkHeight();
			const resizeObserver = new ResizeObserver(checkHeight);
			resizeObserver.observe(leftColRef);
			resizeObserver.observe(descColRef);
			return () => resizeObserver.disconnect();
		}
	});

	const formatNumber = (num: number) => {
		if (num >= 1000) {
			return `${(num / 1000).toFixed(1)}k`;
		}
		return num.toString();
	};

	const brandColor = (hex: string) => {
		const normalized = hex.toLowerCase();
		if (normalized === '000000' || normalized === 'ffffff') return 'currentColor';
		return `#${hex}`;
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
						<a target="_blank" rel="noopener noreferrer" href={project.deployedLink}>
							<Button variant="outline" size="icon" aria-label="View deployed site">
								<ExternalLink class="size-4" />
							</Button>
						</a>
					{/if}

					<a href={project.githubLink} target="_blank" rel="noopener noreferrer">
						<Button size="icon" aria-label="View on GitHub">
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

	<div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
		<div bind:this={leftColRef} class="flex flex-col gap-5">
			{#if project.videoLink}
				<Card>
					<CardHeader>
						<CardTitle class="flex items-center gap-2 text-lg">
							<Video class="size-5" />
							Demo
						</CardTitle>
					</CardHeader>

					<CardContent class="-mt-2 p-0">
						<div class="aspect-video w-full px-6">
							<iframe
								allowfullscreen
								class="h-full w-full rounded-lg"
								title="{project.title} Demo Video"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								src={project.videoLink.replace('youtu.be/', 'www.youtube.com/embed/').replace('watch?v=', 'embed/')}
							></iframe>
						</div>
					</CardContent>
				</Card>
			{/if}

			<Card>
				<CardHeader>
					<CardTitle class="flex items-center gap-2 text-lg">
						<Layers class="size-5" />
						Tech Stack
					</CardTitle>
				</CardHeader>

				<CardContent class="-mt-2 py-0"
					><div
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
					</div></CardContent
				>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle class="flex items-center gap-2 text-lg">
						<Users class="size-5" />
						Team
					</CardTitle>
				</CardHeader>

				<CardContent class="-mt-2 py-0">
					<div class="grid gap-4">
						{#each teamMembersData as member}
							<a
								target="_blank"
								href={member.profileUrl}
								rel="noopener noreferrer"
								class="flex items-center gap-4 rounded-lg border border-border bg-secondary/30 p-4 transition-colors hover:bg-secondary/50"
							>
								<img src={member.avatar} alt={member.name} class="size-12 rounded-full border-2 border-border" />
								<div class="flex flex-col gap-1">
									<span class="font-semibold">{member.name}</span>
									<span class="text-sm text-muted-foreground">@{member.username}</span>
								</div>
							</a>
						{/each}
					</div>
				</CardContent>
			</Card>
		</div>

		<div class="lg:col-span-2">
			<Card class="relative overflow-hidden py-1">
				<CardContent class="p-0">
					<div
						bind:this={descColRef}
						style:overflow={!isExpanded && needsExpansion ? 'hidden' : 'visible'}
						style:max-height={!isExpanded && needsExpansion ? `${leftColHeight}px` : 'none'}
						class="prose max-w-none p-8 transition-all duration-300 prose-zinc dark:prose-invert prose-headings:font-bold prose-h1:mt-0 prose-h1:mb-6 prose-h1:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl prose-p:text-base prose-p:leading-7 prose-a:text-primary prose-a:underline hover:prose-a:text-primary/80 prose-strong:font-semibold prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-[''] prose-ul:my-4 prose-li:my-2 prose-hr:my-8 prose-hr:border-border"
					>
						<ExtendedDescription />
					</div>
				</CardContent>

				{#if needsExpansion && !isExpanded}
					<div
						class="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background via-background/80 to-transparent"
					></div>
				{/if}

				{#if needsExpansion}
					<div class="flex justify-center pb-4 {!isExpanded ? 'absolute inset-x-0 bottom-0' : 'pt-4'}">
						<Button
							variant="default"
							onclick={() => (isExpanded = !isExpanded)}
							class="relative z-10 gap-2  backdrop-blur-sm"
						>
							{isExpanded ? 'Show Less' : 'See More'}
							{#if isExpanded}
								<ChevronUp class="size-4" />
							{:else}
								<ChevronDown class="size-4" />
							{/if}
						</Button>
					</div>
				{/if}
			</Card>
		</div>
	</div>
</div>

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
