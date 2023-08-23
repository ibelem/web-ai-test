<script>
	import { siteTitle, siteURL } from '$lib/config';
</script>

<footer>
	&copy;{new Date().getFullYear()}

	{#if siteURL}
		<a href="https://{siteURL}">{siteTitle}</a>
	{:else}
		{siteTitle}
	{/if}
</footer>
