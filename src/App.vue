<template>
<div id='app'>
  <div v-if="navbarEnable">
    <navbar />
  </div>
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
  computed: {
    navbarEnable() {
      return !this.forbidRoutes.includes(this.$route.name)
    },
  },
  data: () => ({
    forbidRoutes: [
      'Login',
      'Register'
    ],
  }),
};
</script>

<style>
#app {
  font-family: 'Prompt', sans-serif;
}

.my-btn:hover{
cursor: pointer !important;
}
</style>
