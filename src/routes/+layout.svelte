<script lang="ts">
	import './layout.css';
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
		{@render children()}
	</main>

	<Footer />
	<ScrollToTop />
</div>
