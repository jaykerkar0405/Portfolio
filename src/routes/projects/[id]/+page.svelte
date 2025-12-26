<script lang="ts">
	let { data } = $props();
</script>

<div class="container mx-auto px-4 py-16">
	<h1 class="text-4xl font-bold mb-4">Project ID:</h1>
	<p class="text-2xl text-gray-600">{data.id}</p>
</div>
