<script lang="ts">
	import {
		siReact,
		siDocker,
		siPython,
		siSvelte,
		siMongodb,
		siSolidity,
		siNextdotjs,
		siTypescript,
		siJavascript,
		siPostgresql,
		siTailwindcss
	} from 'simple-icons';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { MapPin, ChevronDown, Download } from 'lucide-svelte';

	type SvgIcon = { viewBox: string; paths: string[] };

	const XIcon: SvgIcon = {
		viewBox: '0 0 24 24',
		paths: [
			'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
		]
	};

	const LinkedInIcon: SvgIcon = {
		viewBox: '0 0 24 24',
		paths: [
			'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
		]
	};

	const GithubIcon: SvgIcon = {
		viewBox: '0 0 24 24',
		paths: [
			'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'
		]
	};

	const LeetCodeIcon: SvgIcon = {
		viewBox: '0 0 24 24',
		paths: [
			'M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z'
		]
	};

	const achievements = [
		'$ achievements --list',
		'🏆 ETHOnline 2025 | Winner — Top 10 / 634 projects (Global)',
		'🥇 HackByte 3.0 | Top 10 — 125 teams (Central India)',
		'🥈 Hackx 3.0 | Runner-up — NMIMS Navi Mumbai'
	];

	let currentLine = $state(0);
	let currentChar = $state(0);
	let displayedText = $state('');

	onMount(() => {
		const typeEffect = setInterval(() => {
			if (currentLine < achievements.length) {
				if (currentChar < achievements[currentLine].length) {
					displayedText += achievements[currentLine][currentChar];
					currentChar++;
				} else {
					displayedText += '\n';
					currentLine++;
					currentChar = 0;
				}
			} else {
				clearInterval(typeEffect);
			}
		}, 50);

		return () => clearInterval(typeEffect);
	});

	type BrandIcon = { title: string; hex: string; path: string };

	const brandColor = (hex: string) => {
		const normalized = hex.toLowerCase();
		if (normalized === '000000' || normalized === 'ffffff') return 'currentColor';
		return `#${hex}`;
	};

	const techStack: { name: string; icon: BrandIcon }[] = [
		{ name: 'React', icon: siReact },
		{ name: 'Python', icon: siPython },
		{ name: 'Docker', icon: siDocker },
		{ name: 'MongoDB', icon: siMongodb },
		{ name: 'SvelteKit', icon: siSvelte },
		{ name: 'Next.js', icon: siNextdotjs },
		{ name: 'Solidity', icon: siSolidity },
		{ name: 'TypeScript', icon: siTypescript },
		{ name: 'JavaScript', icon: siJavascript },
		{ name: 'PostgreSQL', icon: siPostgresql },
		{ name: 'Tailwind CSS', icon: siTailwindcss }
	];
</script>

<div class="container mx-auto max-w-7xl px-4 py-12">
	<div class="lg:flex lg:flex-col">
		<div class="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
			<div in:fade={{ duration: 300, delay: 100 }}>
				<Card>
					<CardContent class="p-8">
						<h1 class="mb-4 text-4xl font-bold">Hi, I&apos;m Jay Kerkar</h1>
						<div class="mb-6 flex items-center gap-2 text-muted-foreground">
							<MapPin class="size-5" />
							<span>Mumbai, India</span>
						</div>
						<p class="text-lg leading-relaxed text-muted-foreground">
							Full-stack developer specializing in scalable web applications, mobile development, and Web3 solutions.
							Explore my projects, hackathon wins, and technical expertise in modern frameworks.
						</p>
					</CardContent>
				</Card>
			</div>

			<div in:fade={{ duration: 300, delay: 200 }}>
				<Card class="flex h-full flex-col py-0">
					<CardContent class="flex flex-1 flex-col p-0">
						<div class="flex h-full flex-col overflow-hidden rounded-lg bg-secondary/30">
							<div class="flex items-center gap-2 border-b border-border bg-secondary/50 px-4 py-3">
								<div class="size-3 rounded-full bg-red-500"></div>
								<div class="size-3 rounded-full bg-yellow-500"></div>
								<div class="size-3 rounded-full bg-green-500"></div>
							</div>
							<div class="flex-1 p-4 md:p-8">
								<pre
									class="wrap-break-words min-h-35 font-mono text-xs leading-relaxed whitespace-pre-wrap text-foreground sm:text-sm">{displayedText}<span
										class="animate-pulse">▊</span
									></pre>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>

		<div class="space-y-6 lg:space-y-8">
			<div class="flex justify-center" in:fade={{ duration: 300, delay: 250 }}>
				<div class="w-full overflow-x-auto rounded-2xl border border-border bg-card">
					<Tooltip.Provider>
						<div class="flex min-h-20 items-center justify-between px-4">
							{#each techStack as tech (tech.name)}
								<Tooltip.Root>
									<Tooltip.Trigger
										aria-label={tech.name}
										class="flex size-14 shrink-0 items-center justify-center rounded-lg transition-transform hover:scale-110"
									>
										<svg
											width="40"
											height="40"
											viewBox="0 0 24 24"
											fill="currentColor"
											xmlns="http://www.w3.org/2000/svg"
											style="color: {brandColor(tech.icon.hex)}"
										>
											<path d={tech.icon.path} />
										</svg>
									</Tooltip.Trigger>
									<Tooltip.Content>
										<p class="font-medium">{tech.name}</p>
									</Tooltip.Content>
								</Tooltip.Root>
							{/each}
						</div>
					</Tooltip.Provider>
				</div>
			</div>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4" in:fade={{ duration: 300, delay: 300 }}>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://github.com/jaykerkar0405"
					class="flex items-center gap-4 rounded-lg border border-border bg-card p-6 transition-colors"
				>
					<svg
						width="24"
						height="24"
						fill="currentColor"
						viewBox={GithubIcon.viewBox}
						xmlns="http://www.w3.org/2000/svg"
					>
						{#each GithubIcon.paths as d (d)}
							<path {d} />
						{/each}
					</svg>
					<div>
						<p class="font-medium">GitHub</p>
						<p class="text-sm text-muted-foreground">jaykerkar0405</p>
					</div>
				</a>

				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://in.linkedin.com/in/jaykerkar0405"
					class="flex items-center gap-4 rounded-lg border border-border bg-card p-6 transition-colors"
				>
					<svg
						width="24"
						height="24"
						fill="currentColor"
						viewBox={LinkedInIcon.viewBox}
						xmlns="http://www.w3.org/2000/svg"
					>
						{#each LinkedInIcon.paths as d (d)}
							<path {d} />
						{/each}
					</svg>
					<div>
						<p class="font-medium">LinkedIn</p>
						<p class="text-sm text-muted-foreground">jaykerkar0405</p>
					</div>
				</a>

				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://x.com/jaykerkar0405"
					class="flex items-center gap-4 rounded-lg border border-border bg-card p-6 transition-colors"
				>
					<svg width="24" height="24" fill="currentColor" viewBox={XIcon.viewBox} xmlns="http://www.w3.org/2000/svg">
						{#each XIcon.paths as d (d)}
							<path {d} />
						{/each}
					</svg>
					<div>
						<p class="font-medium">X</p>
						<p class="text-sm text-muted-foreground">@jaykerkar0405</p>
					</div>
				</a>

				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://leetcode.com/u/jaykerkar0405"
					class="flex items-center gap-4 rounded-lg border border-border bg-card p-6 transition-colors"
				>
					<svg
						width="24"
						height="24"
						fill="currentColor"
						viewBox={LeetCodeIcon.viewBox}
						xmlns="http://www.w3.org/2000/svg"
					>
						{#each LeetCodeIcon.paths as d (d)}
							<path {d} />
						{/each}
					</svg>
					<div>
						<p class="font-medium">LeetCode</p>
						<p class="text-sm text-muted-foreground">jaykerkar0405</p>
					</div>
				</a>
			</div>

			<a href="#about" aria-label="Scroll to about section" class="hidden animate-bounce justify-center py-6 lg:flex">
				<ChevronDown class="size-8 text-muted-foreground" />
			</a>
		</div>
	</div>

	<div id="about" class="mt-12 lg:mt-0" in:fade={{ duration: 300, delay: 150 }}>
		<h2 class="mb-8 text-3xl font-bold">About</h2>
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
			<Card>
				<CardContent class="px-8 py-2">
					<h3 class="mb-4 text-xl font-semibold">My Approach</h3>
					<div class="space-y-4 leading-relaxed text-muted-foreground">
						<p>
							I'm a hackathon-driven developer who has participated in multiple national and global hackathons, building
							under real constraints and tight timelines.
						</p>
						<p>
							Earlier, I focused on building projects blindly for learning. Now, I intentionally design projects around
							real problems faced by people, aiming for practical impact.
						</p>
						<p>
							I strongly value quality code over quantity - writing clean, maintainable systems that scale beyond demos.
						</p>
					</div>
					<div class="mt-6">
						<a href="/docs/resume.pdf" download="Jay_Kerkar_Resume.pdf">
							<Button class="gap-2">
								<Download class="size-4" />
								Download Resume
							</Button>
						</a>
					</div>
				</CardContent>
			</Card>

			<div class="flex flex-col gap-6">
				<Card class="flex-1">
					<CardContent class="px-8 py-2">
						<h3 class="mb-4 text-xl font-semibold">What I'm Learning Now</h3>
						<ul class="ml-4 list-outside list-disc space-y-3 text-muted-foreground marker:text-primary">
							<li class="pl-0.5">Agentic AI systems and workflows</li>
							<li class="pl-0.5">Ethereum fundamentals and protocol basics</li>
							<li class="pl-0.5">Zero-knowledge proofs and ZK systems</li>
						</ul>
					</CardContent>
				</Card>

				<Card class="flex-1">
					<CardContent class="px-8 py-2">
						<h3 class="mb-4 text-xl font-semibold">Education</h3>
						<div class="flex items-start justify-between gap-4">
							<div class="space-y-2">
								<p class="font-medium">VES Institute of Technology</p>
								<p class="text-sm text-muted-foreground">Bachelor of Engineering - Information Technology</p>
							</div>
							<div class="shrink-0 space-y-2 text-right">
								<p class="text-sm text-muted-foreground">2023 - 2027</p>
								<p class="text-sm font-medium">CGPA: 9.87 / 10</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	</div>
</div>
