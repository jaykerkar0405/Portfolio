<script lang="ts">
	import {
		X,
		Zap,
		Star,
		Video,
		Users,
		Github,
		Layers,
		ChevronUp,
		ChevronLeft,
		ChevronRight,
		ExternalLink
	} from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Carousel from '$lib/components/ui/carousel';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';

	let { data } = $props();

	const project = $derived(data.project);
	const repoData = $derived(data.repoData);
	const screenshots = $derived(data.screenshots || []);
	const teamMembersData = $derived(data.teamMembersData || []);
	const ExtendedDescription = $derived(data.ExtendedDescription);

	let fullHeight = $state(0);
	let leftColHeight = $state(0);
	let leftColRef: HTMLDivElement;
	let descColRef: HTMLDivElement;
	let isExpanded = $state(false);
	let needsExpansion = $state(false);
	let selectedImageIndex = $state<number | null>(null);

	const openImageModal = (index: number) => {
		selectedImageIndex = index;
	};

	const closeImageModal = () => {
		selectedImageIndex = null;
	};

	const navigateImage = (direction: 'prev' | 'next') => {
		if (selectedImageIndex === null) return;
		if (direction === 'prev') {
			selectedImageIndex = selectedImageIndex === 0 ? screenshots.length - 1 : selectedImageIndex - 1;
		} else {
			selectedImageIndex = selectedImageIndex === screenshots.length - 1 ? 0 : selectedImageIndex + 1;
		}
	};

	$effect(() => {
		if (leftColRef && descColRef) {
			const checkHeight = () => {
				const leftHeight = leftColRef.offsetHeight - 9.3;
				const descHeight = descColRef.scrollHeight;
				leftColHeight = leftHeight;
				fullHeight = descHeight;
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
	<div class="mb-8" in:fade={{ duration: 300, delay: 100 }}>
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
							Built at hackathon
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
		<div class="mb-8" in:fade={{ duration: 300, delay: 200 }}>
			<Carousel.Root opts={{ align: 'start' }} class="w-full">
				<Carousel.Content class="-ml-2 md:-ml-4">
					{#each screenshots as screenshot, i}
						<Carousel.Item class="basis-full pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3">
							<Card class="cursor-pointer overflow-hidden py-0" onclick={() => openImageModal(i)}>
								<CardContent class="p-0">
									<img
										src={screenshot}
										alt="{project.title} Screenshot {i + 1}"
										class="aspect-video w-full rounded-lg object-cover transition-transform hover:scale-105"
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
		<div bind:this={leftColRef} class="flex flex-col gap-5" in:fade={{ duration: 300, delay: 250 }}>
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
						style="scrollbar-gutter: stable;"
						class="tech-stack-scroll w-full overflow-x-auto overflow-y-hidden rounded-xl border border-border bg-secondary/30"
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
				</CardContent>
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

		<div class="lg:col-span-2" in:fade={{ duration: 300, delay: 300 }}>
			<Card class="relative py-1">
				<CardContent class="p-0">
					<div class="relative">
						<div
							style:max-height={isExpanded ? `${fullHeight}px` : `${leftColHeight}px`}
							class="overflow-hidden transition-all duration-700 ease-in-out"
						>
							<div
								bind:this={descColRef}
								class="prose max-w-none p-8 prose-zinc dark:prose-invert prose-headings:font-bold prose-h1:mt-0 prose-h1:mb-6 prose-h1:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl prose-p:text-base prose-p:leading-7 prose-a:text-primary prose-a:underline hover:prose-a:text-primary/80 prose-strong:font-semibold prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-[''] prose-ul:my-4 prose-li:my-2 prose-hr:my-8 prose-hr:border-border"
							>
								<ExtendedDescription />
							</div>
						</div>

						{#if needsExpansion && !isExpanded}
							<div
								class="pointer-events-none absolute inset-x-0 -bottom-1 h-32 rounded-xl bg-linear-to-t from-background via-background/95 to-transparent backdrop-blur-[px] transition-opacity duration-700"
							></div>
						{/if}

						{#if needsExpansion}
							<div class="flex justify-center {isExpanded ? 'pt-4 pb-4' : 'absolute inset-x-0 bottom-4'}">
								<Button
									variant="default"
									onclick={() => (isExpanded = !isExpanded)}
									class="relative z-10 gap-2 shadow-lg backdrop-blur-sm transition-all duration-300"
								>
									{isExpanded ? 'Show Less' : 'See More'}
									<div
										class="transition-transform duration-300"
										style:transform={isExpanded ? 'rotate(0deg)' : 'rotate(180deg)'}
									>
										<ChevronUp class="size-4" />
									</div>
								</Button>
							</div>
						{/if}
					</div>
				</CardContent>
			</Card>
		</div>
	</div>
</div>

{#if selectedImageIndex !== null}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
		onclick={closeImageModal}
		onkeydown={(e) => {
			if (e.key === 'Escape') closeImageModal();
			if (e.key === 'ArrowLeft') navigateImage('prev');
			if (e.key === 'ArrowRight') navigateImage('next');
		}}
		role="button"
		tabindex="-1"
	>
		<button
			aria-label="Close"
			onclick={closeImageModal}
			class="absolute top-4 right-4 z-10 rounded-full border border-white/30 bg-black/60 p-2 shadow-lg backdrop-blur-sm transition-all hover:border-white/50 hover:bg-black/80"
		>
			<X class="size-6 text-white" />
		</button>

		{#if screenshots.length > 1}
			<button
				onclick={(e) => {
					e.stopPropagation();
					navigateImage('prev');
				}}
				aria-label="Previous image"
				class="absolute left-4 z-10 rounded-full border border-white/30 bg-black/60 p-3 shadow-lg backdrop-blur-sm transition-all hover:border-white/50 hover:bg-black/80"
			>
				<ChevronLeft class="size-6 cursor-pointer text-white" />
			</button>

			<button
				onclick={(e) => {
					e.stopPropagation();
					navigateImage('next');
				}}
				aria-label="Next image"
				class="absolute right-4 z-10 rounded-full border border-white/30 bg-black/60 p-3 shadow-lg backdrop-blur-sm transition-all hover:border-white/50 hover:bg-black/80"
			>
				<ChevronRight class="size-6 cursor-pointer text-white" />
			</button>
		{/if}

		<div
			role="presentation"
			class="max-h-[90vh] max-w-[90vw]"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
		>
			<img
				src={screenshots[selectedImageIndex]}
				class="max-h-[90vh] w-auto rounded-lg object-contain"
				alt="{project.title} Screenshot {selectedImageIndex + 1}"
			/>
			{#if screenshots.length > 1}
				<div class="mt-4 text-center text-sm text-white/70">
					{selectedImageIndex + 1} / {screenshots.length}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.tech-stack-scroll {
		scrollbar-gutter: stable;
		scrollbar-width: thin;
		scrollbar-color: transparent transparent;
	}
	.tech-stack-scroll::-webkit-scrollbar {
		width: 6px;
		height: 6px;
	}
	.tech-stack-scroll:hover,
	.tech-stack-scroll:focus-within {
		scrollbar-color: hsl(var(--border)) transparent;
	}
	.tech-stack-scroll::-webkit-scrollbar-track {
		background: transparent;
	}
	.tech-stack-scroll::-webkit-scrollbar-thumb {
		background: transparent;
		border-radius: 3px;
	}
	.tech-stack-scroll:hover::-webkit-scrollbar-thumb,
	.tech-stack-scroll:focus-within::-webkit-scrollbar-thumb {
		background: hsl(var(--border));
	}
</style>
