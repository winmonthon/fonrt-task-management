<template>
  <nav
    class="flex justify-between w-full px-3 border-b border-gray-600 py-6 md:px-10 "
  >
    <div class="text-white flex">
      <img class="w-16 hidden md:block" src="../../public/building.png">
      <button
        class="mx-2 hover:text-gray-600  py-2 px-3 rounded-lg bg-indigo-500 hover:bg-indigo-200"
        @click="$router.push('/dashboard')"
      >
        <i class="fa-solid fa-house mr-2"></i>HOME
      </button>
      <button
        v-if="user.role === 'admin'"
        class="mx-2 hover:text-gray-600  py-2 px-3 rounded-lg bg-indigo-500 hover:bg-indigo-200"
        @click="$router.push('/users')"
      >
        <i class="fa-solid fa-user mr-2"></i>USER
      </button>
      <button
        v-if="user.role !== 'admin'"
        class="mx-2 hover:text-gray-600 py-2 px-3 rounded-lg bg-indigo-500 hover:bg-indigo-200"
        @click="toTask"
      >
        <i class="fa-solid fa-clipboard mr-2"></i>TASK
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
        class="mx-2 hover:text-gray-600  py-2 px-3 rounded-lg bg-indigo-500 hover:bg-indigo-200 flex items-center"
        @click="$router.push('/login')"
      >
        <i class="fa-solid fa-right-from-bracket mr-2 "></i><span class="hidden md:block">Logout</span>
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
