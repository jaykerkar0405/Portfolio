<script lang="ts">
	import { page } from '$app/state';
	import HomeIcon from '@lucide/svelte/icons/home';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';

	const errorConfig: Record<
		number,
		{
			message: string;
			description: string;
		}
	> = {
		500: {
			message: 'Internal Server Error',
			description: 'Something went wrong on our end.'
		},
		503: {
			message: 'Service Unavailable',
			description: 'Service temporarily unavailable.'
		},
		404: {
			message: 'Not Found',
			description: "The page you're looking for doesn't exist."
		}
	};

	const getErrorConfig = (status: number) => {
		return (
			errorConfig[status] ?? {
				message: 'Unexpected Error',
				description: 'An unexpected error occurred.'
			}
		);
	};

	const config = $derived.by(() => getErrorConfig(page.status));
</script>

<div class="grid min-h-[calc(100svh-(--spacing(16)))] place-items-center px-6 py-12">
	<Card class="w-full max-w-lg border-border py-10 shadow-sm">
		<CardHeader class="space-y-2 text-center">
			<CardTitle class="text-7xl font-bold">
				{page.status}
			</CardTitle>

			<p class="text-2xl font-semibold tracking-tight text-foreground">
				{config.message}
			</p>
		</CardHeader>

		<CardContent class="text-center">
			<p class="mx-auto max-w-md text-base text-muted-foreground">
				{config.description}
			</p>
		</CardContent>

		<CardFooter class="justify-center pt-2">
			<Button href="/" size="lg" class="gap-2">
				<HomeIcon class="size-4" />
				Go back home
			</Button>
		</CardFooter>
	</Card>
</div>
