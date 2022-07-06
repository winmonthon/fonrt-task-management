<template>
  <div class="container flex justify-center">
    <div class="mt-5 col-10 ">
      <h1 class="mb-5 text-center">New Task</h1>
      <div>
        <form @submit.prevent="createTask()">
          <div class="mb-3">
            <label
              for="title"
              class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
              >ชื่องาน</label
            >
            <input
              type="text"
              class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              id="title"
              v-model="form.title"
            />
          </div>
          <div class="mb-3">
            <label
              for="description"
              class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
              >รายละเอียด</label
            >
            <input
              type="text"
              class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              id="description"
              v-model="form.description"
            />
          </div>

          <div class="mb-3">
            <label
              for="category"
              class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
              >ประเภทงาน</label
            >
            <select
              class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              aria-label="Default select example"
              v-model="form.category"
            >
              <option selected>Claim</option>
              <option>Demo</option>
              <option>Internal</option>
              <option>MSSP Implement</option>
              <option>Sub-Contractor Service</option>
            </select>
          </div>

          <div class="mb-3">
            <label
              for="date"
              class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
              >วันที่เริ่มต้นงาน</label
            >
            <input
              type="date"
              class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              id="startDate"
              v-model="form.startDate"
            />
          </div>
          <div class="mb-3">
            <label
              for="date"
              class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
              >วันที่สิ้นสุดงาน</label
            >
            <input
              type="date"
              class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              id="endDate"
              v-model="form.endDate"
            />
          </div>

          <div class="mb-3">
            <label
              for="category"
              class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
              >หัวหน้างานผู้รับผิดชอบ</label
            >
            <select
              class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              aria-label="Default select example"
              v-model="form.supervisor"
              @change="addLineUid()"
            >
              <!-- <option selected>เลือกหัวหน้างาน</option> -->
              <option v-for="(user, i) in users" :key="i">{{
                user.name
              }}</option>
            </select>
          </div>

          <button
            v-if="!processing"
            type="submit"
            class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            Submit
          </button>
          <button
            v-if="processing"
            type="submit"
            disabled
            class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            Processing ...
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
<script>
import axios from 'axios';

export default {
  name: 'Task',
  mounted() {
    this.getUsers();
    this.getUserProflie();
  },
  data() {
    return {
      form: {
        title: '',
        description: '',
        startDate: null,
        endDate: null,
        assignBy: '',
        createBy: '',
        category: '',
      },
      users: '',
      processing: false,
    };
  },
  methods: {
    async createTask() {
      try {
        this.processing = true;
        await axios.post(`${process.env.VUE_APP_API}/task/line`, {
          title: this.form.title,
          description: this.form.description,
          startDate: this.form.startDate,
          endDate: this.form.endDate,
          createBy: this.form.createBy,
          assignBy: this.form.assignBy,
          category: this.form.category,
        });

        this.processing = false;
        alert('Create Success');
        this.$router.push({
          path: '/createtasksuccess',
        });
      } catch (error) {
        console.log(error);
        alert('something went wrong');
      }
    },
    async getUsers() {
      const supervisor = await axios.get(
        `${process.env.VUE_APP_API}/users/role?role=supervisor`
      );
      this.users = supervisor.data.data;
    },
    async addLineUid() {
      const found = await this.users.find(
        ({ name }) => name === this.form.supervisor
      );
      this.form.assignBy = found.lineUid;
    },
    getUserProflie() {
      liff.init(
        {
          liffId: '1656467289-VZYx2BzW',
        },
        () => {
          if (liff.isLoggedIn()) {
            liff
              .getProfile()
              .then((profile) => {
                this.form.createBy = profile.userId;

                this.$store.dispatch('lineLogIn', {
                  lineUid: profile.userId,
                });
              })
              .catch((err) => console.error(err));
          } else {
            liff.login();
          }
        },
        (err) => console.error(err.code, error.message)
      );
    },
  },
};
</script>

<style></style>
