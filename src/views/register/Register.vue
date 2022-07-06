<template>
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
          <div class="text-center">
            <h2
              class="text-4xl font-bold text-center text-gray-700 dark:text-white"
            >
              Sign up
            </h2>
            <p class="text-red-600 mt-3">{{ isUsers }}</p>
            <p v-if="!isUsers" class="mt-3 text-gray-500 dark:text-gray-300">
              Sign up to access your account
            </p>
          </div>

          <div class="mt-8">
            <form @submit.prevent="validate()">
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >Name</label
                >
                <input
                  type="name"
                  name="name"
                  id="name"
                  placeholder="Your Name"
                  v-model="form.name"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div class="mt-6">
                <label
                  for="tel"
                  class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >Phone Number</label
                >
                <input
                  type="tel"
                  name="tel"
                  id="tel"
                  placeholder="Your Phone Number"
                  v-model="form.tel"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                <p class="text-red-600 font-medium">{{ isTelTure }}</p>
              </div>

              <div class="mt-6">
                <label
                  for="email"
                  class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >Email</label
                >
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="example@example.com"
                  v-model="form.email"
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
                  type="submit"
                  class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Sign up
                </button>
              </div>
            </form>

            <p class="mt-6 text-sm text-center text-gray-400">
              You already have an account.
              <a
                href="/login"
                class="text-blue-500 focus:outline-none focus:underline hover:underline"
                >Login</a
              >.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script
  charset="utf-8"
  src="https://static.line-scdn.net/liff/edge/2/sdk.js"
></script>
<script>
import axios from 'axios';

export default {
  name: 'Register',
  data() {
    return {
      form: {
        name: '',
        tel: '',
        password: null,
        lineUid: '',
        email: '',
      },
      isTelTure: '',
      isUsers: '',
    };
  },
  mounted() {
    // this.getLineUid();
  },
  methods: {
    async createUser() {
      try {
        await axios.post(`${process.env.VUE_APP_API}/users`, {
          name: this.form.name,
          tel: this.form.tel,
          password: this.form.password,
          lineUid: this.form.lineUid,
          email: this.form.email,
        });
        alert('Create Success!!');
        this.$router.push({
          path: '/registersuccess',
        });
      } catch (err) {
        console.error(err);
      }
    },
    getLineUid() {
      liff.init(
        {
          liffId: '1656467289-2Mq017bP',
        },
        () => {
          if (liff.isLoggedIn()) {
            liff
              .getProfile()
              .then((profile) => {
                this.form.lineUid = profile.userId;
              })
              .catch((err) => console.error(err));
          } else {
            liff.login();
          }
        },
        (err) => console.error(err.code, error.message)
      );
    },
    async validate() {
      this.isTelTure = '';
      this.isUsers = '';
      const checkUsers = await axios.get(
        `${process.env.VUE_APP_API}/users/check/lineuid/${this.form.lineUid}`
      );
      const checkTel = await axios.get(
        `${process.env.VUE_APP_API}/users/check/tel/${this.form.tel}`
      );
      const phone = /[0]{1}[0-9]{9}/;

      const isTel = phone.exec(this.form.tel);
      if (!isTel) {
        return (this.isTelTure = 'หมายเลขโทรศัทพ์ไม่ถูกต้อง');
      }

      if (checkUsers.data.data !== null || checkTel.data.data !== null) {
        return (this.isUsers = 'คุณมีบัญชีอยู่ในระบบเรียบร้อยแล้ว');
      } else {
        this.isTelTure = '';
        this.isUsers = '';
        this.createUser();
      }
    },
  },
};
</script>
