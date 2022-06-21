import { h, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter, RouteLocationRaw } from 'vue-router'

let uuid = 0

export default function (v2Component) {
    const v2Id = `comp-vue2-${uuid}`
    const V2Component = Vue2.extend(v2Component)
    let instance
    uuid += 1

    return {
        name: 'wrap-vue2',
        setup() {
            const router = useRouter()
            const route = useRoute()

            Vue2.prototype.$route = route
            Vue2.prototype.$router = router
            Vue2.component('router-link', {
                props: {
                    to: [String, Object],
                    tag: {
                        type: String,
                        default: 'a'
                    },
                    replace: Boolean,
                    append: Boolean,
                    exact: Boolean,
                },
                render(h) {
                    const { to, tag, replace } = this.$props

                    const link = router.resolve(to)

                    return h(tag, {
                        attrs: {
                            href: link.href
                        },
                        on: {
                            click: () => {
                                const loc: RouteLocationRaw = {
                                    name: link.name,
                                    path: link.path,
                                    params: link.params,
                                    query: link.query,
                                }
                                if(replace) {
                                    router.replace(loc)
                                    return
                                }
                                router.push(loc)
                            },
                        }
                    }, this.$slots.default)
                }
            })

            onMounted(() => {
                instance = new V2Component()
                instance.$mount(`#${v2Id}`)
            })
            onUnmounted(() => {
                instance.$destroy()
                instance = null
            })
        },
        render() {
            return h('div', {
                id: 'v2-wrapper'
            }, [h('div', {
                id: v2Id,
                style: {
                    width: '100%',
                    height: '100%'
                }
            })])
        }
    }
}
