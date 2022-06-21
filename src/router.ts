import { createRouter, createWebHashHistory } from 'vue-router'
import V3Demo from './vue3/demo.vue'
import V2Demo from './vue2/demo.vue'
import wrapper from './wrap-vue2'

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/v3',
            component: V3Demo
        },
        {
            path: '/v2',
            component: wrapper(V2Demo)
        }
    ]
})

