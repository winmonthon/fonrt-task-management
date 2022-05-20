<template>
<nav class="my-navbar navbar-dark bg-dark ">

  <div class="text-white">
    <button class="navbar-brand btn fs-5 " @click="$router.push('/dashboard')">HOME</button>
    <button v-if="user.role === 'admin'" class="navbar-brand btn fs-5 " @click="$router.push('/users')">USER</button>
    <button v-if="user.role !== 'admin'" class="navbar-brand btn fs-5 " @click="toTask">TASK</button>
  </div>

  <div class="">
    <button v-if="!isLogin" class="navbar-brand fs-5 btn btn-outline-light" @click="$router.push('/login')">Login</button>
    <button v-if="isLogin" class="navbar-brand fs-5 btn btn-outline-light" @click="$router.push('/login')">Logout</button>
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
    },
    isLogin() {
      if (localStorage.token) {
        return true
      } else {
        return false
      }
    }
  },
  data() {
    return {
      user: {}
    }
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user_info'))
  },
  methods: {
    toTask() {
      if (this.user.role === 'sale') {

        return this.$router.push('/task/sale')
      }

      if (this.user.role === 'supervisor') {

        return this.$router.push('/task/supervisor')
      }
    }
  }

}
</script>

<style>
.my-navbar {
  display: flex;
  padding: 10px;
  justify-content: space-between !important;
  width: 100%;
}
</style>
