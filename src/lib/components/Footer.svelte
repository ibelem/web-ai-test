<script>
	import { siteTitle, siteURL } from '$lib/config';
</script>

<footer>
	<span class="copyright">&copy;</span>{new Date().getFullYear()}

	{#if siteURL}
		<a href="https://{siteURL}">{siteTitle}</a>
	{:else}
		{siteTitle}
	{/if}
</footer>

<style>
	footer {
		margin: 10px;
		text-align: center;
	}
	.copyright {
		font-family: 'Intel One Mono';
	}
</style>
