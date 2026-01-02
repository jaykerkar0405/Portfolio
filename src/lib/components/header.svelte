<script lang="ts">
	import { page } from '$app/state';
	import { toggleMode } from 'mode-watcher';
	import { scale } from 'svelte/transition';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import { Button } from '$lib/components/ui/button';
	import { navigationItems } from '$lib/config/navigation';

	const isActive = (href: string) => {
		if (href === '/') {
			return page.url.pathname === '/';
		}
		return page.url.pathname.startsWith(href);
	};
</script>

<header
	class="sticky top-0 z-50 w-full border-b-2 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
>
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-16 xl:px-6">
		<a href="/" class="flex items-center gap-2.5">
			<img src="/icons/apple-touch-icon.png" alt="Logo" class="size-8 rounded-lg" />
			<span class="text-lg font-bold">Jay Kerkar</span>
		</a>

		<div class="flex items-center gap-4">
			<nav class="hidden items-center space-x-1 lg:flex">
				{#each navigationItems as item (item.href)}
					<a
						href={item.href}
						class="relative px-5 py-2.5 text-base font-medium text-muted-foreground transition-colors duration-150
    ease-out after:absolute
    after:-bottom-0.5 after:left-1/2 after:h-[1.75px]
    after:w-0 after:-translate-x-1/2
    after:bg-foreground after:transition-all
    after:duration-200
    hover:text-foreground hover:after:w-1/2
    {isActive(item.href) ? 'text-foreground after:w-full' : ''}"
					>
						{item.label}
					</a>
				{/each}
			</nav>

			<Button onclick={toggleMode} variant="outline" size="icon" class="relative">
				{#key page.url.pathname}
					<span in:scale={{ duration: 200 }}>
						<SunIcon class="size-[1.15rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
					</span>
					<span in:scale={{ duration: 200 }} class="absolute">
						<MoonIcon class="size-[1.15rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
					</span>
				{/key}
				<span class="sr-only">Toggle theme</span>
			</Button>
		</div>
	</div>
</header>

<div class="fixed bottom-0 left-0 z-50 h-20 w-full border-t-2 bg-background lg:hidden">
	<div class="mx-auto grid h-full max-w-lg grid-cols-3 font-medium">
		{#each navigationItems as item (item.href)}
			<a
				href={item.href}
				class="inline-flex flex-col items-center justify-center gap-0.5 px-5 py-2 transition-colors duration-150 ease-out {isActive(
					item.href
				)
					? 'bg-primary text-primary-foreground'
					: 'hover:bg-primary hover:text-primary-foreground'}"
			>
				<span class="flex size-5.5 items-center justify-center">
					<svelte:component this={item.icon} />
				</span>
				<span class="text-[0.85rem]">{item.label}</span>
			</a>
		{/each}
	</div>
</div>
