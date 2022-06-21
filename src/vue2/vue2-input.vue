<template>
    <input type="text" v-model="inputValue">
</template>
<script>
export default {
    props: {
        value: String
    },
    computed: {
        inputValue: {
            get() {
                return this.value
            },
            set(val) {
                this.$emit('input', val)
            }
        }
    }
}
</script>
