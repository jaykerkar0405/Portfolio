<script lang="ts">
	import './layout.css';
	import { ModeWatcher } from 'mode-watcher';
	import Header from '$lib/components/header.svelte';

	let { children } = $props();
</script>

<ModeWatcher />

<div class="relative flex min-h-screen flex-col">
	<Header />

	<main class="flex-1">
		{@render children()}
	</main>
</div>
