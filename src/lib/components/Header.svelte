<script>
	import Nav from './Nav.svelte';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { onMount, beforeUpdate } from 'svelte';
	import { getModelIdfromPath } from '$lib/assets/js/utils';
	// import { testQueueStore, testQueueLengthStore } from '$lib/store/store';

	// /**
	//  * @type {string[]}
	//  */
	// export let testQueue;
	// testQueueStore.subscribe((value) => {
	// 	testQueue = value;
	// });

	// /**
	//  * @type {number}
	//  */
	// export let testQueueLength;

	// testQueueLengthStore.subscribe((value) => {
	// 	testQueueLength = value;
	// });

	// $: percentageTestQueue = (
	// 	((testQueueLength - testQueue.length) * 100) /
	// 	(testQueueLength * 1.0)
	// ).toFixed(2);

	// $: percentageTestQueueInt = (
	// 	((testQueueLength - testQueue.length) * 100) /
	// 	(testQueueLength * 1.0)
	// ).toFixed(0);

	$: progress = '';

	$: url = base;
	$: search = '';
	$: fullSearch = search;

	const homeUrl = () => {
		search = $page.url.search;
		if ($page.url.pathname.indexOf('/run/') > -1 && search.indexOf('model=') <= -1) {
			if (search.indexOf('?') > -1) {
				fullSearch = search + '&model=' + getModelIdfromPath();
			} else {
				fullSearch = search;
			}
		} else {
			fullSearch = search;
		}
		let host = $page.url.protocol + '//' + $page.url.hostname;
		let port = $page.url.port;
		if (port) {
			host = host + ':' + port;
		}
		if ($page.url.pathname.indexOf('web-ai-run') > -1) {
			host = host + '/web-ai-run';
		}
		url = `${host}${fullSearch}`;
	};

	beforeUpdate(() => {
		// if (0 < parseInt(percentageTestQueueInt) && parseInt(percentageTestQueueInt) < 100) {
		// 	progress = 'ing';
		// } else {
		// 	progress = '';
		// }
	});

	onMount(() => {});
</script>

<header>
	<div id="logo" class={progress}>
		<a href={url} on:click={homeUrl}>
			<svg width="642" height="160" viewBox="0 0 642 160" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M15 80L33 59" stroke="#C61A3E" stroke-width="6" stroke-linecap="round"/>
					<path d="M63 73L44 58" stroke="#C61A3E" stroke-width="6" stroke-linecap="round"/>
					<path d="M77 75L103 69" stroke="#C61A3E" stroke-width="6" stroke-linecap="round"/>
					<path d="M126 30L119 53" stroke="#C61A3E" stroke-width="6" stroke-linecap="round"/>
					<path d="M151 55L127 61" stroke="#C61A3E" stroke-width="6" stroke-linecap="round"/>
					<path d="M161 64L156 99" stroke="#C61A3E" stroke-width="6" stroke-linecap="round"/>
					<path d="M163 52L193 97" stroke="#C61A3E" stroke-width="6" stroke-linecap="round"/>
					<path d="M162 106L188 106" stroke="#C61A3E" stroke-width="6" stroke-linecap="round"/>
					<path d="M148 112L119 133" stroke="#C61A3E" stroke-width="6" stroke-linecap="round"/>
					<path d="M101 104L155 146" stroke="#C61A3E" stroke-width="6" stroke-linecap="round"/>
					<path d="M183 140L155 146" stroke="#C61A3E" stroke-width="6" stroke-linecap="round"/>
					<path d="M194 131L197 119" stroke="#C61A3E" stroke-width="6" stroke-linecap="round"/>
					<path d="M195 145L203 156" stroke="#C61A3E" stroke-width="6" stroke-linecap="round"/>
					<path d="M123 74L149 101" stroke="#C61A3E" stroke-width="6" stroke-linecap="round"/>
					<path d="M67 85L55 117" stroke="#C61A3E" stroke-width="6" stroke-linecap="round"/>
					<path d="M27 86L87 102" stroke="#C61A3E" stroke-width="6" stroke-linecap="round"/>
					<path d="M79 50L97 93" stroke="#C61A3E" stroke-width="6" stroke-linecap="round"/>
					<path d="M120 25L88 35" stroke="#C61A3E" stroke-width="6" stroke-linecap="round"/>
					<circle cx="38.5" cy="52.5" r="6.5" stroke="#C61A3E" stroke-width="4"/>
					<circle cx="69.5" cy="77.5" r="6.5" stroke="#C61A3E" stroke-width="4"/>
					<circle cx="127.5" cy="22.5" r="6.5" stroke="#C61A3E" stroke-width="4"/>
					<circle cx="154.5" cy="106.5" r="6.5" stroke="#C61A3E" stroke-width="4"/>
					<circle cx="112.5" cy="138.5" r="6.5" stroke="#C61A3E" stroke-width="4"/>
					<circle cx="190.5" cy="138.5" r="6.5" stroke="#C61A3E" stroke-width="4"/>
					<circle cx="200" cy="107" r="10" stroke="#C61A3E" stroke-width="6"/>
					<circle cx="115" cy="65" r="10" stroke="#C61A3E" stroke-width="6"/>
					<circle cx="15" cy="82" r="12" fill="white" stroke="#C61A3E" stroke-width="6"/>
					<circle cx="75" cy="39" r="12" fill="white" stroke="#C61A3E" stroke-width="6"/>
					<circle cx="163" cy="52" r="12" fill="white" stroke="#C61A3E" stroke-width="6"/>
					<circle cx="101" cy="104" r="12" fill="white" stroke="#C61A3E" stroke-width="6"/>
					<circle cx="156" cy="145" r="12" fill="white" stroke="#C61A3E" stroke-width="6"/>
					<path class="text" d="M389.525 77L392.6 22.25H400.475L397.7 60.5C397.65 61.35 397.575 62.4 397.475 63.65C397.375 64.85 397.25 66.075 397.1 67.325C396.95 68.575 396.825 69.675 396.725 70.625C396.975 69.675 397.225 68.575 397.475 67.325C397.775 66.075 398.075 64.85 398.375 63.65C398.725 62.4 399.025 61.35 399.275 60.5L409.85 22.25H417.95L416.075 60.5C416.025 61.35 415.975 62.4 415.925 63.65C415.875 64.85 415.825 66.075 415.775 67.325C415.725 68.575 415.675 69.675 415.625 70.625C415.825 69.675 416.05 68.575 416.3 67.325C416.55 66.075 416.8 64.85 417.05 63.65C417.35 62.4 417.6 61.35 417.8 60.5L427.175 22.25H435.2L420.575 77H410.225L412.175 38.6C412.225 37.65 412.3 36.55 412.4 35.3C412.5 34 412.6 32.725 412.7 31.475C412.8 30.175 412.875 29.075 412.925 28.175C412.725 29.075 412.475 30.175 412.175 31.475C411.875 32.725 411.575 34 411.275 35.3C410.975 36.55 410.7 37.65 410.45 38.6L399.95 77H389.525ZM450.096 77.75C446.596 77.75 443.671 77.075 441.321 75.725C438.971 74.375 437.271 72.5 436.221 70.1C435.221 67.65 434.971 64.8 435.471 61.55L437.121 51.2C437.671 47.95 438.846 45.125 440.646 42.725C442.446 40.275 444.721 38.375 447.471 37.025C450.271 35.675 453.421 35 456.921 35C460.371 35 463.271 35.675 465.621 37.025C467.971 38.375 469.646 40.275 470.646 42.725C471.696 45.125 471.946 47.95 471.396 51.2L470.196 58.625H444.996L444.471 61.55C444.071 64.45 444.421 66.65 445.521 68.15C446.671 69.6 448.621 70.325 451.371 70.325C453.471 70.325 455.196 69.975 456.546 69.275C457.946 68.525 458.921 67.45 459.471 66.05H468.771C467.921 68.4 466.571 70.45 464.721 72.2C462.921 73.95 460.771 75.325 458.271 76.325C455.771 77.275 453.046 77.75 450.096 77.75ZM462.021 53.375L462.396 51.125C462.846 48.275 462.521 46.1 461.421 44.6C460.321 43.05 458.421 42.275 455.721 42.275C453.021 42.275 450.846 43.05 449.196 44.6C447.596 46.15 446.571 48.35 446.121 51.2L445.896 52.775L462.846 52.625L462.021 53.375ZM498.516 77.75C495.116 77.75 492.566 76.8 490.866 74.9C489.216 72.95 488.641 70.3 489.141 66.95L490.941 69.125H488.841L487.566 77H478.416L487.116 22.25H496.491L494.616 33.8L492.741 43.625H494.916L492.516 45.8C493.016 42.45 494.416 39.825 496.716 37.925C499.066 35.975 501.941 35 505.341 35C509.491 35 512.566 36.425 514.566 39.275C516.566 42.125 517.191 45.975 516.441 50.825L514.641 62C514.141 65.2 513.141 68 511.641 70.4C510.141 72.75 508.266 74.575 506.016 75.875C503.766 77.125 501.266 77.75 498.516 77.75ZM496.491 69.65C498.891 69.65 500.866 68.95 502.416 67.55C503.966 66.15 504.941 64.15 505.341 61.55L506.991 51.2C507.391 48.6 507.041 46.6 505.941 45.2C504.841 43.8 503.091 43.1 500.691 43.1C498.341 43.1 496.391 43.825 494.841 45.275C493.291 46.675 492.291 48.65 491.841 51.2L490.191 61.55C489.791 64.1 490.141 66.1 491.241 67.55C492.391 68.95 494.141 69.65 496.491 69.65ZM541.823 77L564.323 22.25H576.398L581.573 77H572.273L571.373 63.725H556.823L551.723 77H541.823ZM559.673 56.075H570.848L569.873 41.375C569.723 38.925 569.573 36.725 569.423 34.775C569.323 32.775 569.273 31.325 569.273 30.425C568.973 31.325 568.473 32.775 567.773 34.775C567.123 36.725 566.348 38.9 565.448 41.3L559.673 56.075ZM590.919 77L592.269 68.75H603.294L609.294 30.5H598.344L599.619 22.25H631.119L629.769 30.5H618.744L612.744 68.75H623.694L622.419 77H590.919Z" fill="#C61A3E"/>
					<path class="text" d="M230.475 158L239.175 103.25H255.975C261.275 103.25 265.275 104.525 267.975 107.075C270.675 109.575 271.675 113 270.975 117.35C270.625 119.8 269.75 121.925 268.35 123.725C266.95 125.525 265.225 126.925 263.175 127.925C261.125 128.925 258.9 129.425 256.5 129.425V129.125C259.15 129.075 261.425 129.575 263.325 130.625C265.225 131.625 266.625 133.125 267.525 135.125C268.475 137.125 268.7 139.55 268.2 142.4C267.7 145.55 266.55 148.3 264.75 150.65C262.95 153 260.625 154.825 257.775 156.125C254.975 157.375 251.75 158 248.1 158H230.475ZM240.825 150.2H248.775C251.525 150.2 253.8 149.475 255.6 148.025C257.4 146.525 258.5 144.5 258.9 141.95C259.3 139.4 258.825 137.35 257.475 135.8C256.175 134.2 254.15 133.4 251.4 133.4H243.45L240.825 150.2ZM244.65 125.825H252.225C254.725 125.825 256.775 125.175 258.375 123.875C260.025 122.525 261.05 120.7 261.45 118.4C261.8 116.1 261.35 114.3 260.1 113C258.9 111.7 257.05 111.05 254.55 111.05H246.975L244.65 125.825ZM292.096 158.75C288.596 158.75 285.671 158.075 283.321 156.725C280.971 155.375 279.271 153.5 278.221 151.1C277.221 148.65 276.971 145.8 277.471 142.55L279.121 132.2C279.671 128.95 280.846 126.125 282.646 123.725C284.446 121.275 286.721 119.375 289.471 118.025C292.271 116.675 295.421 116 298.921 116C302.371 116 305.271 116.675 307.621 118.025C309.971 119.375 311.646 121.275 312.646 123.725C313.696 126.125 313.946 128.95 313.396 132.2L312.196 139.625H286.996L286.471 142.55C286.071 145.45 286.421 147.65 287.521 149.15C288.671 150.6 290.621 151.325 293.371 151.325C295.471 151.325 297.196 150.975 298.546 150.275C299.946 149.525 300.921 148.45 301.471 147.05H310.771C309.921 149.4 308.571 151.45 306.721 153.2C304.921 154.95 302.771 156.325 300.271 157.325C297.771 158.275 295.046 158.75 292.096 158.75ZM304.021 134.375L304.396 132.125C304.846 129.275 304.521 127.1 303.421 125.6C302.321 124.05 300.421 123.275 297.721 123.275C295.021 123.275 292.846 124.05 291.196 125.6C289.596 127.15 288.571 129.35 288.121 132.2L287.896 133.775L304.846 133.625L304.021 134.375ZM320.416 158L326.941 116.75H336.091L334.816 124.625H337.366L334.516 126.8C335.066 123.4 336.466 120.75 338.716 118.85C341.016 116.95 343.891 116 347.341 116C351.391 116 354.416 117.35 356.416 120.05C358.416 122.75 359.041 126.375 358.291 130.925L354.016 158H344.641L348.766 131.9C349.166 129.4 348.816 127.475 347.716 126.125C346.616 124.775 344.916 124.1 342.616 124.1C340.266 124.1 338.316 124.8 336.766 126.2C335.266 127.6 334.291 129.6 333.841 132.2L329.791 158H320.416ZM382.187 158.75C378.687 158.75 375.737 158.1 373.337 156.8C370.937 155.45 369.212 153.575 368.162 151.175C367.162 148.725 366.912 145.85 367.412 142.55L369.062 132.2C369.612 128.85 370.787 125.975 372.587 123.575C374.387 121.175 376.687 119.325 379.487 118.025C382.337 116.675 385.512 116 389.012 116C394.212 116 398.137 117.35 400.787 120.05C403.487 122.7 404.562 126.325 404.012 130.925H394.637C394.787 128.775 394.262 127.125 393.062 125.975C391.862 124.775 390.087 124.175 387.737 124.175C385.187 124.175 383.112 124.875 381.512 126.275C379.912 127.625 378.912 129.575 378.512 132.125L376.787 142.55C376.387 145.1 376.762 147.075 377.912 148.475C379.112 149.875 380.987 150.575 383.537 150.575C385.887 150.575 387.837 150 389.387 148.85C390.987 147.65 392.037 145.975 392.537 143.825H401.987C401.037 148.425 398.787 152.075 395.237 154.775C391.737 157.425 387.387 158.75 382.187 158.75ZM410.358 158L419.058 103.25H428.433L426.258 116.75L424.758 124.625H427.308L424.458 126.8C425.008 123.4 426.408 120.75 428.658 118.85C430.958 116.95 433.833 116 437.283 116C441.333 116 444.358 117.35 446.358 120.05C448.358 122.75 448.983 126.375 448.233 130.925L443.958 158H434.583L438.708 131.9C439.108 129.4 438.758 127.475 437.658 126.125C436.558 124.775 434.858 124.1 432.558 124.1C430.208 124.1 428.258 124.8 426.708 126.2C425.208 127.6 424.233 129.6 423.783 132.2L419.733 158H410.358ZM453.454 158L459.979 116.75H467.629L466.729 122.3H468.379L466.879 123.65C467.279 121.35 468.229 119.5 469.729 118.1C471.229 116.7 473.004 116 475.054 116C477.254 116 478.829 116.9 479.779 118.7C480.729 120.5 480.954 122.925 480.454 125.975L479.404 122.3H481.954L480.754 123.65C481.154 121.35 482.104 119.5 483.604 118.1C485.104 116.7 486.929 116 489.079 116C491.629 116 493.504 116.95 494.704 118.85C495.904 120.75 496.229 123.325 495.679 126.575L490.729 158H482.479L487.354 126.95C487.604 125.6 487.479 124.55 486.979 123.8C486.529 123 485.729 122.6 484.579 122.6C483.479 122.6 482.554 122.975 481.804 123.725C481.104 124.475 480.629 125.55 480.379 126.95L475.429 158H468.679L473.629 126.95C473.829 125.55 473.679 124.475 473.179 123.725C472.729 122.975 471.929 122.6 470.779 122.6C469.629 122.6 468.704 122.975 468.004 123.725C467.304 124.475 466.854 125.55 466.654 126.95L461.704 158H453.454ZM513.424 158.75C509.274 158.75 506.174 157.325 504.124 154.475C502.124 151.625 501.524 147.8 502.324 143L504.049 131.825C504.599 128.575 505.624 125.775 507.124 123.425C508.624 121.075 510.499 119.25 512.749 117.95C514.999 116.65 517.499 116 520.249 116C523.649 116 526.174 116.975 527.824 118.925C529.524 120.825 530.099 123.45 529.549 126.8L527.824 124.625H529.924L530.974 116.75H540.349L533.824 158H524.599L525.874 150.125H523.849L526.249 147.95C525.699 151.3 524.274 153.95 521.974 155.9C519.674 157.8 516.824 158.75 513.424 158.75ZM518.074 150.65C520.424 150.65 522.374 149.95 523.924 148.55C525.474 147.1 526.449 145.1 526.849 142.55L528.499 132.2C528.949 129.65 528.599 127.675 527.449 126.275C526.299 124.825 524.549 124.1 522.199 124.1C519.799 124.1 517.824 124.8 516.274 126.2C514.774 127.6 513.824 129.6 513.424 132.2L511.774 142.55C511.324 145.15 511.649 147.15 512.749 148.55C513.849 149.95 515.624 150.65 518.074 150.65ZM546.545 158L553.07 116.75H561.92L560.645 124.625H562.97L559.445 129.425C560.145 124.975 561.67 121.625 564.02 119.375C566.42 117.125 569.57 116 573.47 116C577.92 116 581.195 117.375 583.295 120.125C585.395 122.875 586.07 126.675 585.32 131.525L584.795 134.525H574.97L575.42 132.2C575.82 129.55 575.445 127.5 574.295 126.05C573.195 124.6 571.445 123.875 569.045 123.875C566.595 123.875 564.57 124.6 562.97 126.05C561.42 127.5 560.445 129.55 560.045 132.2L555.92 158H546.545ZM590.466 158L599.166 103.25H608.541L603.816 132.95H609.816L622.416 116.75H633.141L617.466 137.075L626.841 158H616.491L609.066 140.9H602.541L599.841 158H590.466Z" fill="#C61A3E"/>
					<path d="M301 24H413" stroke="#C61A3E" stroke-width="3" stroke-linecap="round"/>
					<path d="M340 37H398" stroke="#C61A3E" stroke-width="3" stroke-linecap="round"/>
					<path d="M248 50H396" stroke="#C61A3E" stroke-width="3" stroke-linecap="round"/>
					<path d="M295 63H395" stroke="#C61A3E" stroke-width="3" stroke-linecap="round"/>
					<path d="M334 75H390" stroke="#C61A3E" stroke-width="3" stroke-linecap="round"/>
				</svg>
			<!-- <span>alpha</span> -->
		</a>
	</div>
	<div class="nav"><Nav></Nav></div>
</header>

<!-- {#if percentageTestQueue}
	<div style="width: {percentageTestQueue}%" class="progress _{percentageTestQueueInt}"></div>
{/if} -->

<style>
	#logo.ing svg path {
		stroke: var(--white-01) !important;
		fill: var(--white-01) !important;
	}

	/* #logo.ing svg circle.c1 {
		animation:
			horizontal 3s infinite linear alternate,
			vertical 1.5s infinite linear alternate;
	}

	#logo.ing svg circle.c2 {
		animation:
			horizontal 2.8s infinite linear alternate,
			vertical 1.2s infinite linear alternate;
	}

	#logo.ing svg circle.c3 {
		animation:
			horizontal 3.6s infinite linear alternate,
			vertical 1.8s infinite linear alternate;
	}

	#logo.ing svg circle.c4 {
		animation:
			horizontal 2s infinite linear alternate,
			vertical 1s infinite linear alternate;
	}

	#logo.ing svg circle.c5 {
		animation:
			horizontal 1.6s infinite linear alternate,
			vertical 0.8s infinite linear alternate;
	}

	#logo.ing svg circle.c6 {
		animation:
			horizontal 3s infinite linear alternate,
			vertical 0.8s infinite linear alternate;
	}

	#logo.ing svg circle.c7 {
		animation:
			horizontal 2.2s infinite linear alternate,
			vertical 2s infinite linear alternate;
	}

	#logo.ing svg circle.c8 {
		animation:
			horizontal 3.2s infinite linear alternate,
			vertical 2s infinite linear alternate;
	}

	#logo.ing svg circle.c9 {
		animation:
			horizontal 4s infinite linear alternate,
			vertical 1.5s infinite linear alternate;
	}

	#logo.ing svg circle.c10 {
		animation:
			horizontal 3s infinite linear alternate,
			vertical 1.2s infinite linear alternate;
	}

	#logo.ing svg circle.c11 {
		animation:
			horizontal 4s infinite linear alternate,
			vertical 1.8s infinite linear alternate;
	}

	#logo.ing svg circle.c12 {
		animation:
			horizontal 3s infinite linear alternate,
			vertical 1s infinite linear alternate;
	}

	#logo.ing svg circle.c13 {
		animation:
			horizontal 3.8s infinite linear alternate,
			vertical 2s infinite linear alternate;
	}

	#logo.ing svg circle {
		animation-composition: accumulate;
	} */

	@keyframes horizontal {
		from {
			transform: translateX(-60px);
		}
		to {
			transform: translateX(600px);
		}
	}
	@keyframes vertical {
		from {
			transform: translateY(-50px);
		}
		to {
			transform: translateY(130px);
		}
	}
	@keyframes colorX {
		to {
			filter: hue-rotate(360deg);
		}
	}
	@keyframes colorY {
		to {
			filter: hue-rotate(360deg);
		}
	}

	header {
		background-color: var(--white);
		z-index: 1;
		position: relative;
	}
	#logo {
		height: 60px;
		width: 240px;
	}

	@media (max-width: 768px) {
		#logo {
			margin-left: 10px;
		}
	}

	#logo svg {
		height: 40px;
		width: 160px;
		padding: 10px 0;
	}
	.progress {
		position: fixed;
		top: 0px;
		height: 1px;
		left: 0px;
		border-top: 1px solid var(--red);
		z-index: 2;
	}

	._100 {
		border-top: 1px solid var(--green) !important;
	}

	/* #logo a span {
		position: relative;
		top: -9px;
		right: -74px;
		font-size: 0.5rem;
		background-color: var(--red);
		color: var(--white);
		padding: 2px 8px;
		border-top: 1px solid var(--white-02);
		border-bottom-left-radius: 3px;
		border-bottom-right-radius: 3px;
		box-shadow:
			rgba(198, 26, 62, 0.15) 0px 10px 20px -12px,
			rgba(198, 26, 62, 0.3) 0px 18px 16px -18px;
	}

	#logo.ing a span {
		background-color: transparent;
		color: var(--white-01);
	} */
</style>
