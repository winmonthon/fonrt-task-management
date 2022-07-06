<template>
  <nav
    class="flex justify-between w-full px-5 border-b border-gray-600 py-6 px-10"
  >
    <div class="text-white">
      <button
        class="mx-2 hover:text-gray-600  py-2 px-3 rounded-lg bg-indigo-500 hover:bg-indigo-200"
        @click="$router.push('/dashboard')"
      >
        HOME
      </button>
      <button
        v-if="user.role === 'admin'"
        class="mx-2 hover:text-gray-600  py-2 px-3 rounded-lg bg-indigo-500 hover:bg-indigo-200"
        @click="$router.push('/users')"
      >
        USER
      </button>
      <button
        v-if="user.role !== 'admin'"
        class="mx-2 hover:text-gray-600 py-2 px-3 rounded-lg bg-indigo-500 hover:bg-indigo-200"
        @click="toTask"
      >
        TASK
      </button>
    </div>

    <div>
      <button
        v-if="!isLogin"
        class="mx-2 hover:text-gray-600  py-2 px-3 rounded-lg bg-indigo-500 hover:bg-indigo-200"
        @click="$router.push('/login')"
      >
        Login
      </button>
      <button
        v-if="isLogin"
        class="mx-2 hover:text-gray-600  py-2 px-3 rounded-lg bg-indigo-500 hover:bg-indigo-200"
        @click="$router.push('/login')"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    lineLoggedIn() {
      return this.$store.getters.lineLoggedIn;
    },
    isLogin() {
      if (localStorage.token) {
        return true;
      } else {
        return false;
      }
    },
  },
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user_info'));
  },
  methods: {
    toTask() {
      if (this.user.role === 'sale') {
        return this.$router.push('/task/sale');
      }

      if (this.user.role === 'supervisor') {
        return this.$router.push('/task/supervisor');
      }
    },
  },
};
</script>
