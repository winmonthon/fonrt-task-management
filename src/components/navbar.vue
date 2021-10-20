<template>
<nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid justify-content-end">
        <div v-if="!lineLoggedIn">
            <router-link v-if="!loggedIn" class="navbar-brand fs-5 btn btn-outline-light" :to="{name :'Login'}">Login</router-link>
            <router-link v-if="loggedIn" class="navbar-brand fs-5 btn btn-outline-light" :to="{name : 'Logout'}">Logout</router-link>
        </div>
        <div>
            
        </div>
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
        lineLoggedIn(){
            return this.$store.getters.lineLoggedIn
        }
    },
    // methods: {
    //     checkLogin() {
    //         if (this.$store.getters.lineLoggedIn) {
    //             this.$router.push({
    //                 path: `/login`
    //             })
    //         } else {
    //             return null
    //         }
    //     }
    // }
}
</script>

<style>

</style>
