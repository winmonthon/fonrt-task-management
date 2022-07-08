<template>
  <div id="app" class="bg-gray-900 text-white dark:bg-gray-900 dark:text-white min-h-screen">
    <div v-if="navbarEnable">
      <navbar />
    </div>
    <router-view />
  </div>
</template>

<script>
import Navbar from '../src/components/navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  computed: {
    navbarEnable() {
      return !this.forbidRoutes.includes(this.$route.name);
    },
  },
  data: () => ({
    forbidRoutes: ['Login', 'Register'],
  }),
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
#app {
  font-family: 'Prompt', sans-serif;
}

.my-btn:hover {
  cursor: pointer !important;
}
</style>
