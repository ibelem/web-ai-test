<script>
	import Nav from './Nav.svelte';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { onMount, beforeUpdate } from 'svelte';
	import { getModelIdfromPath } from '$lib/assets/js/utils';
	import { testQueueStore, testQueueLengthStore } from '$lib/store/store';

	/**
	 * @type {string[]}
	 */
	export let testQueue;
	testQueueStore.subscribe((value) => {
		testQueue = value;
	});

	/**
	 * @type {number}
	 */
	export let testQueueLength;

	testQueueLengthStore.subscribe((value) => {
		testQueueLength = value;
	});

	$: percentageTestQueue = (
		((testQueueLength - testQueue.length) * 100) /
		(testQueueLength * 1.0)
	).toFixed(2);

	$: percentageTestQueueInt = (
		((testQueueLength - testQueue.length) * 100) /
		(testQueueLength * 1.0)
	).toFixed(0);

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
		if ($page.url.pathname.indexOf('web-ai-benchmark') > -1) {
			host = host + '/web-ai-benchmark';
		}
		url = `${host}${fullSearch}`;
	};

	beforeUpdate(() => {
		if (0 < parseInt(percentageTestQueueInt) && parseInt(percentageTestQueueInt) < 100) {
			progress = 'ing';
		} else {
			progress = '';
		}
	});

	onMount(() => {});
</script>

<header>
	<div id="logo" class={progress}>
		<a href={url} on:click={homeUrl}>
			<svg
				width="656"
				height="204"
				viewBox="0 0 656 204"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					class="weights"
					d="M15 90L33 69"
					stroke="white"
					stroke-width="6"
					stroke-linecap="round"
				/>
				<path
					class="weights"
					d="M63 83L44 68"
					stroke="white"
					stroke-width="6"
					stroke-linecap="round"
				/>
				<path
					class="weights"
					d="M77 85L103 79"
					stroke="white"
					stroke-width="6"
					stroke-linecap="round"
				/>
				<path
					class="weights"
					d="M126 40L119 63"
					stroke="white"
					stroke-width="6"
					stroke-linecap="round"
				/>
				<path
					class="weights"
					d="M151 65L127 71"
					stroke="white"
					stroke-width="6"
					stroke-linecap="round"
				/>
				<path
					class="weights"
					d="M161 74L156 109"
					stroke="white"
					stroke-width="6"
					stroke-linecap="round"
				/>
				<path
					class="weights"
					d="M163 62L193 107"
					stroke="white"
					stroke-width="6"
					stroke-linecap="round"
				/>
				<path
					class="weights"
					d="M162 116L188 116"
					stroke="white"
					stroke-width="6"
					stroke-linecap="round"
				/>
				<path
					class="weights"
					d="M148 122L119 143"
					stroke="white"
					stroke-width="6"
					stroke-linecap="round"
				/>
				<path
					class="weights"
					d="M101 114L155 156"
					stroke="white"
					stroke-width="6"
					stroke-linecap="round"
				/>
				<path
					class="weights"
					d="M183 150L155 156"
					stroke="white"
					stroke-width="6"
					stroke-linecap="round"
				/>
				<path
					class="weights"
					d="M194 141L197 129"
					stroke="white"
					stroke-width="6"
					stroke-linecap="round"
				/>
				<path
					class="weights"
					d="M195 155L203 166"
					stroke="white"
					stroke-width="6"
					stroke-linecap="round"
				/>
				<path
					class="weights"
					d="M123 84L149 111"
					stroke="white"
					stroke-width="6"
					stroke-linecap="round"
				/>
				<path
					class="weights"
					d="M67 95L55 127"
					stroke="white"
					stroke-width="6"
					stroke-linecap="round"
				/>
				<path
					class="weights"
					d="M27 96L87 112"
					stroke="white"
					stroke-width="6"
					stroke-linecap="round"
				/>
				<path
					class="weights"
					d="M79 60L97 103"
					stroke="white"
					stroke-width="6"
					stroke-linecap="round"
				/>
				<path
					class="weights"
					d="M120 35L88 45"
					stroke="white"
					stroke-width="6"
					stroke-linecap="round"
				/>
				<circle class="c1" cx="38.5" cy="62.5" r="6.5" stroke="white" stroke-width="4" />
				<circle class="c2" cx="69.5" cy="87.5" r="6.5" stroke="white" stroke-width="4" />
				<circle class="c3" cx="127.5" cy="32.5" r="6.5" stroke="white" stroke-width="4" />
				<circle class="c4" cx="154.5" cy="116.5" r="6.5" stroke="white" stroke-width="4" />
				<circle class="c5" cx="112.5" cy="148.5" r="6.5" stroke="white" stroke-width="4" />
				<circle class="c6" cx="190.5" cy="148.5" r="6.5" stroke="white" stroke-width="4" />
				<circle class="c7" cx="200" cy="117" r="10" stroke="white" stroke-width="6" />
				<circle class="c8" cx="115" cy="75" r="10" stroke="white" stroke-width="6" />
				<circle class="c9" cx="15" cy="92" r="15" fill="white" />
				<circle class="c10" cx="75" cy="49" r="15" fill="white" />
				<circle class="c11" cx="163" cy="62" r="15" fill="white" />
				<circle class="c12" cx="101" cy="114" r="15" fill="white" />
				<circle class="c13" cx="156" cy="155" r="15" fill="white" />
				<path
					d="M280.08 85H262.6L260.168 44.568V37.272H258.344V44.568L255.912 85H238.432L236.608 31.8H245.728L246.944 72.232V79.072H248.768V72.232L251.2 31.8H267.312L269.744 72.232V79.072H271.568V72.232L272.784 31.8H281.904L280.08 85ZM296.899 69.268C296.95 70.3827 297.203 71.4213 297.659 72.384C298.166 73.296 298.824 74.1067 299.635 74.816C300.496 75.4747 301.459 76.0067 302.523 76.412C303.638 76.7667 304.803 76.944 306.019 76.944C308.4 76.944 310.224 76.5387 311.491 75.728C312.758 74.8667 313.67 73.8533 314.227 72.688L322.435 77.248C321.979 78.2107 321.346 79.224 320.535 80.288C319.724 81.3013 318.66 82.2387 317.343 83.1C316.076 83.9613 314.506 84.6707 312.631 85.228C310.807 85.7853 308.654 86.064 306.171 86.064C303.334 86.064 300.75 85.608 298.419 84.696C296.088 83.784 294.062 82.4667 292.339 80.744C290.667 79.0213 289.35 76.9187 288.387 74.436C287.475 71.9533 287.019 69.1413 287.019 66V65.544C287.019 62.656 287.5 60.0213 288.463 57.64C289.476 55.2587 290.844 53.232 292.567 51.56C294.29 49.888 296.291 48.596 298.571 47.684C300.902 46.7213 303.384 46.24 306.019 46.24C309.262 46.24 312.048 46.8227 314.379 47.988C316.71 49.1027 318.635 50.5467 320.155 52.32C321.675 54.0427 322.79 55.968 323.499 58.096C324.208 60.1733 324.563 62.2 324.563 64.176V69.268H296.899ZM305.943 54.904C303.511 54.904 301.535 55.5373 300.015 56.804C298.495 58.02 297.507 59.4387 297.051 61.06H314.835C314.531 59.2867 313.568 57.8173 311.947 56.652C310.376 55.4867 308.375 54.904 305.943 54.904ZM342.978 85H333.402V31.8H342.978V52.776H344.346C345.36 50.6987 346.829 49.1027 348.754 47.988C350.68 46.8227 353.137 46.24 356.126 46.24C358.356 46.24 360.458 46.6707 362.434 47.532C364.461 48.3933 366.209 49.66 367.678 51.332C369.198 52.9533 370.389 54.9547 371.25 57.336C372.162 59.7173 372.618 62.428 372.618 65.468V66.836C372.618 69.9267 372.188 72.6627 371.326 75.044C370.465 77.4253 369.3 79.452 367.83 81.124C366.361 82.7453 364.613 83.9867 362.586 84.848C360.61 85.6587 358.457 86.064 356.126 86.064C354.404 86.064 352.909 85.8867 351.642 85.532C350.376 85.1773 349.261 84.696 348.298 84.088C347.386 83.48 346.601 82.796 345.942 82.036C345.334 81.2253 344.802 80.3893 344.346 79.528H342.978V85ZM353.01 76.944C356 76.944 358.406 76.032 360.23 74.208C362.105 72.3333 363.042 69.8 363.042 66.608V65.696C363.042 62.504 362.105 59.996 360.23 58.172C358.406 56.2973 356 55.36 353.01 55.36C350.021 55.36 347.589 56.3227 345.714 58.248C343.89 60.1227 342.978 62.6053 342.978 65.696V66.608C342.978 69.6987 343.89 72.2067 345.714 74.132C347.589 76.0067 350.021 76.944 353.01 76.944ZM454.441 73.6H436.353L433.769 85H423.281L435.973 31.8H454.821L467.513 85H457.025L454.441 73.6ZM438.481 64.024H452.237L446.081 36.816H444.713L438.481 64.024ZM474.148 31.8H509.716V41.376H496.948V75.424H509.716V85H474.148V75.424H486.916V41.376H474.148V31.8Z"
					fill="white"
					class="title1"
				/>
				<path
					class="title2"
					d="M239.496 158.424H244.512V124.376H239.496V114.8H262.828C265.361 114.8 267.591 115.155 269.516 115.864C271.492 116.573 273.139 117.536 274.456 118.752C275.824 119.968 276.837 121.437 277.496 123.16C278.205 124.832 278.56 126.656 278.56 128.632V129.544C278.56 132.584 277.699 135.016 275.976 136.84C274.304 138.664 272.176 139.931 269.592 140.64V142.008C272.176 142.717 274.304 144.009 275.976 145.884C277.699 147.708 278.56 150.14 278.56 153.18V154.092C278.56 156.068 278.205 157.917 277.496 159.64C276.837 161.312 275.824 162.781 274.456 164.048C273.139 165.264 271.492 166.227 269.516 166.936C267.591 167.645 265.361 168 262.828 168H239.496V158.424ZM254.544 158.424H261.84C263.968 158.424 265.691 157.968 267.008 157.056C268.325 156.144 268.984 154.624 268.984 152.496V152.04C268.984 149.912 268.325 148.392 267.008 147.48C265.691 146.568 263.968 146.112 261.84 146.112H254.544V158.424ZM254.544 136.536H261.84C263.968 136.536 265.691 136.105 267.008 135.244C268.325 134.332 268.984 132.812 268.984 130.684V130.228C268.984 128.1 268.325 126.605 267.008 125.744C265.691 124.832 263.968 124.376 261.84 124.376H254.544V136.536ZM296.899 152.268C296.95 153.383 297.203 154.421 297.659 155.384C298.166 156.296 298.824 157.107 299.635 157.816C300.496 158.475 301.459 159.007 302.523 159.412C303.638 159.767 304.803 159.944 306.019 159.944C308.4 159.944 310.224 159.539 311.491 158.728C312.758 157.867 313.67 156.853 314.227 155.688L322.435 160.248C321.979 161.211 321.346 162.224 320.535 163.288C319.724 164.301 318.66 165.239 317.343 166.1C316.076 166.961 314.506 167.671 312.631 168.228C310.807 168.785 308.654 169.064 306.171 169.064C303.334 169.064 300.75 168.608 298.419 167.696C296.088 166.784 294.062 165.467 292.339 163.744C290.667 162.021 289.35 159.919 288.387 157.436C287.475 154.953 287.019 152.141 287.019 149V148.544C287.019 145.656 287.5 143.021 288.463 140.64C289.476 138.259 290.844 136.232 292.567 134.56C294.29 132.888 296.291 131.596 298.571 130.684C300.902 129.721 303.384 129.24 306.019 129.24C309.262 129.24 312.048 129.823 314.379 130.988C316.71 132.103 318.635 133.547 320.155 135.32C321.675 137.043 322.79 138.968 323.499 141.096C324.208 143.173 324.563 145.2 324.563 147.176V152.268H296.899ZM305.943 137.904C303.511 137.904 301.535 138.537 300.015 139.804C298.495 141.02 297.507 142.439 297.051 144.06H314.835C314.531 142.287 313.568 140.817 311.947 139.652C310.376 138.487 308.375 137.904 305.943 137.904ZM344.574 168H334.998V130.304H344.574V135.928H345.942C346.804 133.8 348.197 132.153 350.122 130.988C352.048 129.823 354.302 129.24 356.886 129.24C358.71 129.24 360.408 129.544 361.978 130.152C363.6 130.709 365.018 131.596 366.234 132.812C367.45 134.028 368.388 135.573 369.046 137.448C369.756 139.323 370.11 141.552 370.11 144.136V168H360.534V146.568C360.534 143.883 359.876 141.78 358.558 140.26C357.292 138.689 355.442 137.904 353.01 137.904C350.173 137.904 348.045 138.867 346.626 140.792C345.258 142.667 344.574 145.2 344.574 148.392V168ZM418.317 154.168C417.456 158.627 415.404 162.224 412.161 164.96C408.969 167.696 404.688 169.064 399.317 169.064C396.531 169.064 393.921 168.633 391.489 167.772C389.108 166.911 387.031 165.669 385.257 164.048C383.484 162.427 382.091 160.425 381.077 158.044C380.064 155.663 379.557 152.952 379.557 149.912V149C379.557 145.96 380.064 143.224 381.077 140.792C382.091 138.36 383.484 136.283 385.257 134.56C387.081 132.837 389.184 131.52 391.565 130.608C393.997 129.696 396.581 129.24 399.317 129.24C404.587 129.24 408.843 130.608 412.085 133.344C415.379 136.08 417.456 139.677 418.317 144.136L408.893 146.568C408.589 144.339 407.627 142.413 406.005 140.792C404.384 139.171 402.104 138.36 399.165 138.36C397.797 138.36 396.505 138.613 395.289 139.12C394.073 139.627 393.009 140.361 392.097 141.324C391.185 142.236 390.451 143.376 389.893 144.744C389.387 146.061 389.133 147.556 389.133 149.228V149.684C389.133 151.356 389.387 152.851 389.893 154.168C390.451 155.435 391.185 156.499 392.097 157.36C393.009 158.221 394.073 158.88 395.289 159.336C396.505 159.741 397.797 159.944 399.165 159.944C402.104 159.944 404.333 159.209 405.853 157.74C407.424 156.271 408.437 154.295 408.893 151.812L418.317 154.168ZM437.797 168H428.221V114.8H437.797V136.384H439.165C440.127 134.104 441.546 132.356 443.421 131.14C445.295 129.873 447.601 129.24 450.337 129.24C452.211 129.24 453.934 129.544 455.505 130.152C457.075 130.76 458.443 131.672 459.609 132.888C460.774 134.104 461.686 135.675 462.345 137.6C463.003 139.475 463.333 141.704 463.333 144.288V168H453.757V146.568C453.757 143.883 453.098 141.78 451.781 140.26C450.514 138.689 448.665 137.904 446.233 137.904C443.395 137.904 441.267 138.867 439.849 140.792C438.481 142.667 437.797 145.2 437.797 148.392V168ZM512.452 168H502.876V141.552C502.876 140.488 502.597 139.703 502.04 139.196C501.533 138.639 500.849 138.36 499.988 138.36C498.974 138.36 498.164 138.664 497.556 139.272C496.998 139.88 496.72 140.792 496.72 142.008V168H487.144V141.552C487.144 140.488 486.84 139.703 486.232 139.196C485.674 138.639 484.99 138.36 484.18 138.36C483.268 138.36 482.508 138.664 481.9 139.272C481.292 139.88 480.988 140.792 480.988 142.008V168H471.412V130.304H480.988V133.952H482.356C482.66 132.584 483.344 131.469 484.408 130.608C485.522 129.696 486.966 129.24 488.74 129.24C490.412 129.24 491.83 129.696 492.996 130.608C494.161 131.469 494.946 132.584 495.352 133.952H496.72C497.125 132.584 497.961 131.469 499.228 130.608C500.545 129.696 502.166 129.24 504.092 129.24C506.625 129.24 508.652 130.101 510.172 131.824C511.692 133.496 512.452 135.827 512.452 138.816V168ZM545.535 162.528C544.522 164.909 543.103 166.607 541.279 167.62C539.455 168.583 537.327 169.064 534.895 169.064C532.615 169.064 530.462 168.633 528.435 167.772C526.459 166.911 524.711 165.644 523.191 163.972C521.671 162.3 520.455 160.273 519.543 157.892C518.682 155.511 518.251 152.8 518.251 149.76V148.544C518.251 145.555 518.682 142.869 519.543 140.488C520.404 138.107 521.57 136.08 523.039 134.408C524.508 132.736 526.206 131.469 528.131 130.608C530.107 129.696 532.21 129.24 534.439 129.24C537.124 129.24 539.278 129.696 540.899 130.608C542.571 131.52 543.888 132.939 544.851 134.864H546.219V130.304H555.795V156.6C555.795 158.12 556.479 158.88 557.847 158.88H559.291V168H552.755C551.032 168 549.614 167.493 548.499 166.48C547.435 165.467 546.903 164.149 546.903 162.528H545.535ZM537.023 159.944C539.81 159.944 542.039 159.032 543.711 157.208C545.383 155.333 546.219 152.8 546.219 149.608V148.696C546.219 145.504 545.383 142.996 543.711 141.172C542.039 139.297 539.81 138.36 537.023 138.36C534.236 138.36 532.007 139.297 530.335 141.172C528.663 142.996 527.827 145.504 527.827 148.696V149.608C527.827 152.8 528.663 155.333 530.335 157.208C532.007 159.032 534.236 159.944 537.023 159.944ZM565.85 130.304H581.81V135.776H583.178C583.887 133.699 585.078 132.103 586.75 130.988C588.473 129.823 590.525 129.24 592.906 129.24C596.655 129.24 599.67 130.431 601.95 132.812C604.23 135.143 605.37 138.715 605.37 143.528V145.2L595.49 146.112V145.048C595.49 142.971 594.958 141.324 593.894 140.108C592.83 138.841 591.234 138.208 589.106 138.208C586.978 138.208 585.306 138.943 584.09 140.412C582.874 141.881 582.266 143.984 582.266 146.72V158.88H590.93V168H564.938V158.88H572.69V139.424H565.85V130.304ZM626.825 144.136H628.649L638.681 130.304H649.169V130.76L637.009 148.012V149.38L650.385 167.544V168H639.441L628.649 153.256H626.825V168H617.249V114.8H626.825V144.136Z"
					fill="white"
				/>
			</svg>
		</a>
	</div>
	<div class="nav"><Nav></Nav></div>
</header>

{#if percentageTestQueue}
	<div style="width: {percentageTestQueue}%" class="progress _{percentageTestQueueInt}"></div>
{/if}

<style>
	#logo.ing svg path {
		stroke: var(--white-01) !important;
		fill: var(--white-01) !important;
	}

	#logo.ing svg circle.c1 {
		animation:
			horizontal 3s infinite linear alternate,
			vertical 1.5s infinite linear alternate;
		/* colorX 26s infinite steps(10),
			colorY 14s infinite steps(7); */
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
	}

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
		background: var(--red);
		height: 60px;
		width: 190px;
		text-align: center;
		box-shadow:
			rgba(198, 26, 62, 0.15) 0px 10px 20px -12px,
			rgba(198, 26, 62, 0.3) 0px 18px 16px -18px;
	}
	#logo svg {
		height: 50px;
		width: 180px;
		padding-top: 5px;
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
</style>
