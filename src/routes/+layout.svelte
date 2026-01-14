<script lang="ts">
	import './layout.css';
	import { fade } from 'svelte/transition';
	import { navigating } from '$app/stores';
	import { ModeWatcher } from 'mode-watcher';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import ScrollToTop from '$lib/components/scroll-to-top.svelte';

	let { children } = $props();
</script>

<ModeWatcher />

<div class="relative">
	<Header />

	<main>
		{#key $navigating?.to?.url.pathname}
			<div in:fade={{ duration: 200, delay: 100 }} out:fade={{ duration: 150 }}>
				{@render children()}
			</div>
		{/key}
	</main>

	<Footer />
	<ScrollToTop />
</div>
