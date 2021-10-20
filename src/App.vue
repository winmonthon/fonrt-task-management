<template>
<div id="app">
    <navbar />
    <router-view />
</div>
</template>

<script>
import navbar from '../src/components/navbar.vue'

export default {
    name: 'App',
    components: {
        navbar
    }
}
</script>

<style>
#app {
    font-family: 'Prompt', sans-serif;

}
</style>
