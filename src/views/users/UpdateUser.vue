<template>
  <div>
    <div class="flex justify-center">
      <div
        class="mt-5 col-10 w-max border-2 border-gray-800 rounded-lg p-10 shadow"
      >
        <h1 class="mb-5 text-center text-xl">Update User</h1>
        <div>
          <form @submit.prevent="updateUser()">
            <div class="mb-3">
              <label
                for="name"
                class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                >ชื่อ-นามสกุล</label
              >
              <input
                type="text"
                class="block px-4 py-2 ml-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                id="name"
                v-model="form.name"
              />
            </div>
            <div class="mb-3">
              <label
                for="tel"
                class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                >เบอร์โทรศัพท์</label
              >
              <input
                type="tel"
                class="block px-4 py-2 ml-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                id="tel"
                v-model="form.tel"
              />
            </div>

            <div class="mb-3">
              <label
                for="password"
                class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                >ตำแหน่ง</label
              >
              <select
                class="block px-4 py-2 ml-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                aria-label="Default select example"
                v-model="form.role"
              >
                <option v-for="(role, i) in roleEnum" :key="i" :value="role">{{
                  role | capitalize
                }}</option>
              </select>
            </div>

            <button
              type="submit"
              class="w-full mt-6 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UpdateUser',
  data() {
    return {
      form: {
        name: '',
        tel: '',
        role: '',
        userId: '',
        lineUid: '',
      },
      roleEnum: ['sale', 'engineer', 'supervisor'],
      selectedRole: 'test',
    };
  },
  mounted() {
    this.getUserByUserId();
  },
  filters: {
    capitalize: function(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  methods: {
    async getUserByUserId() {
      const userId = this.$route.params.id;
      this.form.userId = userId;
      const user = await axios.get(
        `${process.env.VUE_APP_API}/users/${userId}`
      );
      console.log(user);
      this.form.name = user.data.data.name;
      this.form.tel = user.data.data.tel;
      this.form.role = user.data.data.role;
      this.form.lineUid = user.data.data.lineUid;
    },
    async updateUser() {
      await axios.put(`${process.env.VUE_APP_API}/users/${this.form.userId}`, {
        name: this.form.name,
        tel: this.form.tel,
        role: this.form.role.toLowerCase(),
      });

      await axios({
        method: 'post',
        url: `${process.env.VUE_APP_API}/users/richmenu`,
        data: {
          lineUid: this.form.lineUid,
          role: this.form.role,
        },
      });

      alert('update success');
      this.$router.push({
        path: `/users`,
      });
    },
  },
};
</script>

<style></style>
