import { defineConfig } from 'vite'
import { vueMixPlugin } from './plugin-mix'

export default defineConfig({
    server: {
        open: true,
        host: '0.0.0.0',
    },
    plugins: [
        vueMixPlugin({
            vue2Match: /src\/vue2.+\.vue/,
        })
    ]
})
