import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
	plugins: [sveltekit(), basicSsl()],
	build: {
    rollupOptions: {
      external: [
        "@xenova/transformers"
      ],
    },
  },
	server: {
		https: true,
		cors: true,
		headers: {
			"Cache-Control": "max-age=31536000,immutable",
			"Access-Control-Allow-Origin": "*",
			"Cross-Origin-Opener-Policy": "same-origin",
			"Cross-Origin-Embedder-Policy": "require-corp"
		}
	}
});
