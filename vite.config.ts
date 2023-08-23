import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
	plugins: [sveltekit(), basicSsl()],
	server: {
		https: true,
		cors: true,
		headers: {
			"Cache-Control": "max-age=31536000,immutable",
			"Cross-Origin-Opener-Policy": "same-origin",
			"Cross-Origin-Embedder-Policy": "require-corp"
		}
	}
});
