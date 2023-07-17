import { fileURLToPath, URL } from 'url';
import Components from 'unplugin-vue-components/vite';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		Components({
			//특정 컴포넌트만 해당 모듈에서 import 하기를 원한다면
			dirs: ['src/components/app'],
			dts: true,
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
