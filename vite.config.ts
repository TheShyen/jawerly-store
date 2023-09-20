import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

export default defineConfig({
    plugins: [
        vue({
            template: { transformAssetUrls }
        }),

        quasar({
            sassVariables: 'src/quasar-variables.sass',

        })
    ]
})

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/jawerly-store/'
        : '/'
}
