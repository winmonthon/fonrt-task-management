<template>
<nav v-if="!lineLoggedIn" class="navbar navbar-dark bg-dark">
    <div class="container-fluid justify-content-end">
        <router-link v-if="!loggedIn" class="navbar-brand fs-5 btn btn-outline-light" :to="{name :'Login'}">Login</router-link>
        <router-link v-if="loggedIn" class="navbar-brand fs-5 btn btn-outline-light" :to="{name : 'Logout'}">Logout</router-link>
    </div>

</nav>
</template>

<script>
export default {
    name: 'Navbar',
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn
        },
        lineLoggedIn() {
            return this.$store.getters.lineLoggedIn
        }
    },

}
</script>

<style>

</style>
