<script lang="ts">
	import { ArrowUp } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';

	let scrollY = $state(0);
	let visible = $derived(scrollY > 300);

	$effect(() => {
		const handleScroll = () => {
			scrollY = window.scrollY;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};
</script>

{#if visible}
	<Button
		size="icon"
		variant="default"
		onclick={scrollToTop}
		aria-label="Scroll to top"
		class="fixed right-8 bottom-26 z-50 cursor-pointer shadow-lg transition-all duration-300 hover:shadow-xl lg:bottom-8"
	>
		<ArrowUp class="size-5" />
	</Button>
{/if}
