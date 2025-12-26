<script lang="ts">
	import './layout.css';
	import { ModeWatcher } from 'mode-watcher';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import ScrollToTop from '$lib/components/scroll-to-top.svelte';

	let { children } = $props();
</script>

<ModeWatcher />

<div class="relative flex min-h-screen flex-col">
	<Header />

	<Tooltip.Provider>
		<main class="mx-auto max-w-7xl flex-1">
			{@render children()}
		</main>
	</Tooltip.Provider>

	<Footer />
	<ScrollToTop />
</div>
