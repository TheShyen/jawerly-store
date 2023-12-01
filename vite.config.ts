import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
import checker from "vite-plugin-checker";

export default defineConfig({
    plugins: [
        vue({
            template: { transformAssetUrls }
        }),
        quasar({
            sassVariables: 'src/quasar-variables.sass',

        }),
        checker({
            typescript: true,
            vueTsc: true
        }),
    ],
    server: {

    },
    base: '/jawerly-store/',
    build: {
        outDir: 'dist'
    },

})


