<template>
    <div>
        <h2>这是一个 vue2 路由</h2>
        <CustomInput v-model="msg"></CustomInput>
        <div>你输入了：{{ msg }}</div>
        <router-link to="/v3">跳转 vue3 页面</router-link>
    </div>
</template>
<script>
import CustomInput from './vue2-input.vue'

export default {
    components: {
        CustomInput
    },
    data() {
        return {
            msg: ''
        }
    },
}
</script>
