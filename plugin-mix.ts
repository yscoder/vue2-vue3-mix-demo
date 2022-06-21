import { Plugin, mergeConfig, UserConfig } from 'vite'
import vue3Plugin, { } from '@vitejs/plugin-vue'
import { createVuePlugin as vue2Plugin, vueComponentNormalizer, vueHotReload } from 'vite-plugin-vue2'
import type { Options as V3Option } from '@vitejs/plugin-vue'
import type { VueViteOptions as V2Option } from 'vite-plugin-vue2'

interface MixPluginOption {
    vue2Match: RegExp
    vue3Option?: V3Option
    vue2Option?: V2Option
}

export function vueMixPlugin(option: MixPluginOption): Plugin {
    const v3Plugin = vue3Plugin(option.vue3Option)
    const v2Plugin = vue2Plugin(option.vue2Option)

    const vue2filter = file => option.vue2Match.test(file)

    return {
        name: 'vit:vue-mix',
        config(config, env) {
            return mergeConfig(
                <UserConfig>v3Plugin.config(config, env),
                <UserConfig>v2Plugin.config(config, env)
            )
        },
        configResolved(config) {
            v3Plugin.configResolved(config)
            v2Plugin.configResolved(config)
        },
        handleHotUpdate(ctx) {
            if (vue2filter(ctx.file)) {
                return v2Plugin.handleHotUpdate(ctx)
            }
            return v3Plugin.handleHotUpdate(ctx)
        },
        configureServer(server) {
            v3Plugin.configureServer(server)
            v2Plugin.configureServer(server)
        },
        buildStart(option) {
            v3Plugin.buildStart.call(this, option)
            if (v2Plugin.buildStart) {
                v2Plugin.buildStart.call(this, option)
            }
        },
        async resolveId(id) {
            if (id === vueComponentNormalizer
                || id === vueHotReload
                || vue2filter(id)) {
                return await v2Plugin.resolveId.call(this, id)
            }
            return await v3Plugin.resolveId.call(this, id)
        },
        load(id) {
            if (id === vueComponentNormalizer
                || id === vueHotReload
                || vue2filter(id)) {
                return v2Plugin.load.call(this, id)
            }
            return v3Plugin.load.call(this, id)
        },
        async transform(code, id, opt) {
            if (vue2filter(id)) {
                return await v2Plugin.transform.call(this, code, id, opt)
            }
            return v3Plugin.transform.call(this, code, id, opt)
        }
    }
}
