<script lang="ts">
	import { page } from '$app/state';
	import type { Component } from 'svelte';
	import HomeIcon from '@lucide/svelte/icons/home';
	import { Button } from '$lib/components/ui/button';
	import WrenchIcon from '@lucide/svelte/icons/wrench';
	import SearchXIcon from '@lucide/svelte/icons/search-x';
	import TriangleAlertIcon from '@lucide/svelte/icons/triangle-alert';
	import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';

	const errorConfig: Record<
		number,
		{
			icon: Component;
			message: string;
			description: string;
		}
	> = {
		500: {
			icon: TriangleAlertIcon,
			message: 'Internal Server Error',
			description: 'Something went wrong on our end.'
		},
		503: {
			icon: WrenchIcon,
			message: 'Service Unavailable',
			description: 'Service temporarily unavailable.'
		},
		404: {
			icon: SearchXIcon,
			message: 'Not Found',
			description: "The page you're looking for doesn't exist."
		}
	};

	const getErrorConfig = (status: number) => {
		return (
			errorConfig[status] ?? {
				icon: TriangleAlertIcon,
				message: 'Unexpected Error',
				description: 'An unexpected error occurred.'
			}
		);
	};

	const config = $derived.by(() => getErrorConfig(page.status));
</script>

<div class="grid min-h-[calc(100svh-(--spacing(16)))] place-items-center px-6 py-12">
	<Card class="w-full max-w-lg border-border py-7.5 shadow-sm">
		<CardHeader class="justify-items-center gap-4 pt-2 text-center">
			{@const Icon = config.icon}
			<div class="inline-flex size-18 items-center justify-center rounded-full border bg-muted">
				<Icon class="size-9 text-foreground" strokeWidth={1.75} />
			</div>

			<div class="space-y-1">
				<CardTitle class="text-6xl font-bold tracking-tighter">{page.status}</CardTitle>
				<p class="text-xl font-semibold tracking-tight text-foreground">
					{config.message}
				</p>
			</div>
		</CardHeader>

		<CardContent class="text-center">
			<p class="mx-auto max-w-md text-base text-muted-foreground">
				{config.description}
			</p>
		</CardContent>

		<CardFooter class="justify-center">
			<Button href="/" size="lg" class="gap-2">
				<HomeIcon class="size-4" />
				Go back home
			</Button>
		</CardFooter>
	</Card>
</div>
