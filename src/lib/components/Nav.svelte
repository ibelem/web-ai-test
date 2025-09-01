<script>
  import { onMount } from 'svelte';
  import { base } from '$app/paths';
  
  let isMenuOpen = false;
  let isDropdownOpen = false;
  
  // Toggle mobile menu
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    // Close dropdown when menu closes
    if (!isMenuOpen) {
      isDropdownOpen = false;
    }
  }
  
  // Toggle dropdown menu
  function toggleDropdown(event) {
    event.stopPropagation();
    isDropdownOpen = !isDropdownOpen;
  }
  
  // Close mobile menu on window resize (if switched to desktop view)
  onMount(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        isMenuOpen = false;
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<nav>
  <div class="navbar">
    <button class="menu-toggle" on:click={toggleMenu} aria-expanded={isMenuOpen} aria-label="Toggle navigation menu">
      <span class="hamburger"></span>
    </button>
    
    <ul class="menu" class:active={isMenuOpen}>
      <li><a href="{base}/">Home</a></li>
      <li><a href="{base}/tests">SOTA · ONNX</a></li>
      <li><a href="{base}/tflite">SOTA · TFLite</a></li>
      <li><a href="{base}/custom">Custom</a></li>
      <li><a href="{base}/pv">PV</a></li>
      <li><a href="{base}/specific">Specific</a></li>
      <li class="dropdown">
        <button on:click={toggleDropdown} class="dropdown-toggle" aria-expanded={isDropdownOpen}>
          Other <span class="dropdown-arrow"></span>
        </button>
        <ul class="dropdown-menu" class:active={isDropdownOpen}>
          <li><a href="{base}/fallback">Fallback</a></li>
          <li><a href="{base}/graph">Graph</a></li>
          <li><a href="{base}/conformance">Conformance</a></li>
          <li><a href="{base}/operators">Operators</a></li>
        </ul>
      </li>
      <li><a href="{base}/limits">Limits</a></li>
      <li><a href="{base}/about">About</a></li>
    </ul>
  </div>
</nav>

<style>
  .navbar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 1rem 10px;
  }
  
  .menu {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  
  .menu li {
    position: relative;
  }

	.menu li:hover {
    background-color: var(--red-005);
  }
  
  .menu a {
    display: block;
    padding: 0.5rem 1rem;
    text-decoration: none;
  }
  
  .dropdown-toggle {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem 1rem;
    font-size: 13.65px;
		font-family: 'JetBrains Mono', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .dropdown-arrow {
    border-top: 4px solid var(--font);
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    margin-left: 5px;
    transition: transform 0.2s;
  }
  
  .dropdown-toggle[aria-expanded="true"] .dropdown-arrow {
    transform: rotate(180deg);
  }
  
  .dropdown-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    min-width: 150px;
    list-style-type: none;
    margin: 0;
    padding: 0;
    z-index: 1000;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--grey-02);
  }
  
  .dropdown-menu.active {
    display: block;
  }
  
  .dropdown-menu a {
    padding: 0.7rem 1rem;
  }

  .dropdown-menu a:hover {
    background-color: var(--red-005);
  }
  
  .menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }
  
  .hamburger {
    display: block;
    position: relative;
    width: 24px;
    height: 2px;
    background-color: var(--font);
  }
  
  .hamburger::before,
  .hamburger::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background-color: var(--font);
    left: 0;
    transition: transform 0.2s;
  }
  
  .hamburger::before {
    top: -6px;
  }
  
  .hamburger::after {
    bottom: -6px;
  }
  
  /* Hamburger animation when menu is open */
  .menu-toggle[aria-expanded="true"] .hamburger {
    background-color: transparent;
  }
  
  .menu-toggle[aria-expanded="true"] .hamburger::before {
    transform: rotate(45deg);
    top: 0;
  }
  
  .menu-toggle[aria-expanded="true"] .hamburger::after {
    transform: rotate(-45deg);
    bottom: 0;
  }
  
  /* Media query for mobile */
  @media (max-width: 768px) {
    .navbar {
      justify-content: space-between;
    }
    
    .menu {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
			margin: 0 2px;
      background-color: var(--red);
      z-index: 1000;
      box-shadow: rgba(198, 26, 62, 0.15) 0px 10px 20px -12px,rgba(198, 26, 62, 0.3) 0px 18px 16px -18px;
      border-bottom: 1px solid var(--grey-02);
			border-bottom-left-radius: 5px;
			border-bottom-right-radius: 5px;
    }

    .menu.active {
      display: flex;
    }
    
    .menu-toggle {
      display: block;
    }

		.menu button, .menu a {
			color: white;
		}

		.dropdown-arrow {
			border-top: 4px solid white;
		}
    
    .dropdown-menu {
      position: static;
      width: 100%;
      box-shadow: none;
      border: none;
      background-color: #f8f9fa;
    }

		.dropdown-menu {
			background: transparent;
		}

		.dropdown-menu li:hover {
			background-color: var(--red-01);
		}
    
    .dropdown-menu li a {
      padding: 0.5rem 2rem 0.5rem 2rem;
    }
  }
</style>