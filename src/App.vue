<template>
<div id='app'>
    <Navbar />
    <router-view />
</div>
</template>

<script>
import Navbar from '../src/components/navbar.vue'

export default {
    name: 'App',
    components: {
        Navbar
    },
    data: () => ({
        //
    }),
};
</script>

<style >
#app {
    font-family: 'Prompt', sans-serif;
}
</style>


