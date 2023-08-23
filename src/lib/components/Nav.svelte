<script>
	import { base } from '$app/paths';

	export const navItems = [
		{
			title: 'home',
			route: '/'
		},
		{
			title: 'about',
			route: '/about'
		}
	];
</script>

<nav>
	<a href="{base}/">home</a>
	<a href="{base}/about">about</a>
</nav>
