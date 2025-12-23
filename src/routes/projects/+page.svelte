<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
</script>

<svelte:head>
	<title>Projects | Jay Kerkar</title>
	<meta name="description" content="Explore my portfolio of software development projects" />
</svelte:head>

<main class="mx-auto max-w-7xl px-6 py-12 md:px-16 xl:px-6">
	<div class="mb-12">
		<h1 class="mb-4 text-4xl font-bold tracking-tight">Projects</h1>
		<p class="text-lg text-muted-foreground">A collection of my software development projects and contributions</p>
	</div>

	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		<Card>
			<CardHeader>
				<CardTitle>Project Coming Soon</CardTitle>
			</CardHeader>
			<CardContent>
				<p class="text-muted-foreground">Check back soon for project updates</p>
			</CardContent>
		</Card>
	</div>
</main>
