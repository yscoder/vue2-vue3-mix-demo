<template>
    <input type="text" v-model="value">
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

</script>

<style scoped>

</style>
