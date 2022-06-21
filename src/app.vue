<template>
    <header>
        <h1>Vue 2 & 3 共存</h1>
    </header>
    <nav>
        <router-link to="/v3">vue3</router-link>
        <router-link to="/v2">vue2</router-link>
    </nav>
    <router-view></router-view>
</template>

<script setup lang="ts">

</script>

<style module>
body {
    text-align: center;
}
h1 {
    margin-bottom: 40px;
}
nav {
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
}
nav a {
    display: inline-block;
    margin: 0 4px;
}
a {
    color: rgb(46, 166, 246);
}
</style>
