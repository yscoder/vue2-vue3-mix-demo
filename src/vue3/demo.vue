<template>
    <h2>这是一个 vue3 路由</h2>
    <CustomInput v-model="msg"></CustomInput>
    <div>你输入了：{{ msg }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomInput from './vue3-input.vue'

const msg = ref('')
</script>

<style scoped>

</style>
