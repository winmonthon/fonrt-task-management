<template>
  <!-- component -->
  <div class="bg-white dark:bg-gray-900">
    <div class="flex justify-center h-screen">
      <div
        class="hidden bg-cover lg:block lg:w-2/3"
        style="background-image: url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)"
      >
        <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
          <!-- <div>
                        <h2 class="text-4xl font-bold text-white">Brand</h2>
                        
                        <p class="max-w-xl mt-3 text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus molestiae</p>
                    </div> -->
        </div>
      </div>

      <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
        <div class="flex-1">
          <div class="flex flex-col items-center">
            <img class="w-60 mb-8" src="../../public/building.png">
            <h2
              class="text-4xl font-bold text-center text-gray-700 dark:text-white"
            >
              Login
            </h2>
            <p class="text-red-600 mt-3">{{ isUser }}</p>
            <p v-if="!isUser" class="mt-3 text-gray-500 dark:text-gray-300">
              Login to access your account
            </p>

            <div v-if="processing" class="justify-center flex mb-3 text-white">
              <div class="spinner-border " role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>

          <div class="mt-8">
            <form @submit.prevent="login()">
              <div>
                <label
                  for="tel"
                  class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >Phone Number</label
                >
                <input
                  type="tel"
                  name="tel"
                  id="tel"
                  placeholder="example@example.com"
                  v-model="form.tel"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div class="mt-6">
                <label
                  for="password"
                  class="text-sm text-gray-600 dark:text-gray-200"
                  >Password</label
                >
                <input
                  type="password"
                  name="password"
                  id="password"
                  v-model="form.password"
                  placeholder="Your Password"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div class="mt-6">
                <button
                  @click="login()"
                  class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Login
                </button>
              </div>
            </form>

            <p class="mt-6 text-sm text-center text-gray-400">
              Don&#x27;t have an account yet?
              <a
                href="/"
                class="text-blue-500 focus:outline-none focus:underline hover:underline"
                >Sign up</a
              >.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
<script>
import axios from 'axios';
import JWT from 'jsonwebtoken';
export default {
  name: 'Login',
  data() {
    return {
      form: {
        tel: '',
        password: null,
      },
      isUser: '',
      processing: false,
    };
  },
  mounted() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_info');
  },
  methods: {
    async validation() {
      const checked = await axios({
        method: 'get',
        url: `${process.env.VUE_APP_API}/users`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    },
    async login() {
      try {
        this.processing = true;
        const { data } = await axios({
          method: 'post',
          url: `${process.env.VUE_APP_API}/login`,
          data: {
            tel: this.form.tel,
            password: this.form.password,
          },
        });

        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user_info', JSON.stringify(data.data.user));
        this.$router.push('/dashboard');

        // const SECRET_KEY = `88ea517d4a88d955c828b22ac1eb6e226094e45e57994d4c683d21c3f05aa85b1a87fb590d208a9bc523d7355d99aec8a9bd42185e0a4e87852d8b014ff92ee7`
        // const decoded = JWT.decode(this.$store.state.token, SECRET_KEY)

        // if (data.data.user.role === 'admin') {
        //   localStorage.setItem('token', data.data.token)
        //   return this.$router.push({
        //     path: `/users`
        //   })
        // }

        // if (data.data.user.role === 'sale') {
        //   localStorage.setItem('token', data.data.token)
        //   return this.$router.push({
        //     path: `/task/sale`

        //   })
        // }

        // alert('บัญชีของคุณยังไม่ได้รับการอนุมัติจากผู้ดูแล กรุณารอการอัพเดทจากผู้ดูแล')
        // this.$router.push({
        //   path: `/logout`

        // })

        this.processing = false;
      } catch (error) {
        this.isUser = error.response.data.msg;
        this.processing = false;

        setTimeout(() => {
          this.isUser = '';
        }, 5000);
      }
    },
  },
};
</script>
