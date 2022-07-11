<template>
  <div class="px-5">
    <div class="mt-5 ">
      <h1 class="mb-4 text-center">Tasks</h1>
      <div>
        <button
          class="w-full mb-5 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          @click="$router.push(`/calendar/${userId}`)"
        >
          <i class="fa-solid fa-calendar-days mr-2"></i>Calendar
        </button>
      </div>
      <div class="mb-3">
        <label
          class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
          for=""
          >ค้นหา</label
        >
        <input
          class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
          type="text"
          placeholder="Default input"
          aria-label="default input example"
        />
      </div>

      <div class="flex justify-end px-2">
        <div>
          <b>Page</b> <span>{{ currentPage }}</span>
        </div>
      </div>

      <div v-for="(task, i) in tasks" :key="i" class="mobile-table">
        <div class="flex justify-between my-1">
          <div class="title-mobile">งาน</div>
          <div>
            {{ task.title }}
          </div>
        </div>
        <div class="flex justify-between my-1">
          <div class="title-mobile">รายละเอียด</div>
          <div>
            {{ task.description }}
          </div>
        </div>
        <div class="flex justify-between my-1">
          <div class="title-mobile">กำหนดเริ่ม</div>
          <div>
            {{ task.startDate | toDate }}
          </div>
        </div>
        <div class="flex justify-between my-1">
          <div class="title-mobile">กำหนดส่ง</div>
          <div>
            {{ task.endDate | toDate }}
          </div>
        </div>
        <div class="flex justify-between my-1">
          <div class="title-mobile">ประเภท</div>
          <div>
            {{ task.category }}
          </div>
        </div>
        <div class="flex justify-between my-1">
          <div class="title-mobile">สถานะงาน</div>
          <div>
            {{ task.taskStatus }}
          </div>
        </div>
        <div class="flex justify-between my-1">
          <div class="title-mobile">จัดการ</div>
          <button
            type="button"
            @click="updateTask(i)"
            class="px-2 py-1 text-sm tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            Edit
          </button>
        </div>
      </div>

      <table class="table w-full rounded-sm">
        <thead>
          <tr class="border-b-2 border-gray-600 dark:bg-gray-800">
            <th class="py-2 px-3">งาน</th>
            <th class="py-2 px-3">รายละเอียด</th>
            <th class="py-2 px-3">กำหนดเริ่ม</th>
            <th class="py-2 px-3">กำหนดส่ง</th>
            <th class="py-2 px-3">ประเภท</th>
            <th class="py-2 px-3">สถานะงาน</th>
            <th class="py-2 px-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(task, i) in tasks"
            :key="i"
            class="border-b border-gray-600 dark:bg-gray-700"
          >
            <td class="p-3">{{ task.title }}</td>
            <td class="p-3">{{ task.description }}</td>
            <td class="p-3">{{ task.startDate | toDate }}</td>
            <td class="p-3">{{ task.endDate | toDate }}</td>
            <td class="p-3">{{ task.category }}</td>
            <td class="p-3">{{ task.taskStatus }}</td>
            <td class="p-3">
              <button
                type="button"
                @click="updateTask(i)"
                class="px-2 py-1 text-sm tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="my-5 flex justify-center"
        role="group"
        aria-label="Second group"
      >
        <div>
          <button
            type="button"
            @click="changePage(i)"
            class="border py-1 px-3 bg-gray-600 hover:bg-gray-800 rounded-sm"
            v-for="(page, i) in allPages"
            :key="i"
          >
            {{ i + 1 }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
<script>
import axios from 'axios';
import dayjs from 'dayjs';

export default {
  name: 'SeeTaskSuperviosr',
  data() {
    return {
      lineUid: '',
      allPages: '',
      currentPage: '',
      tasks: [],
      userId: '',
    };
  },
  mounted() {
    this.getUserProflie();
    //this.getTasks()
    // console.log(this.lineUid)
  },
  filters: {
    toDate: function(value) {
      if (!value) return '';
      console.log(value);
      return dayjs(value).format('D MMM YYYY');
    },
  },
  methods: {
    async getTasks() {
      const supervisorData = await axios.get(
        `${process.env.VUE_APP_API}/users/check/lineuid/${this.lineUid}`
      );
      const userId = supervisorData.data.data.userId;
      const tasks = await axios.get(
        `${process.env.VUE_APP_API}/task/supervisor/${userId}`
      );
      console.log(tasks);
      this.tasks = tasks.data.data;
      this.allPages = tasks.data.allPages;
      this.currentPage = tasks.data.currentPage;
      this.userId = userId;
    },
    async changePage(index) {
      const data = await axios.get(
        `${process.env.VUE_APP_API}/task/supervisor/${
          this.userId
        }?page=${index + 1}&size=10`
      );
      this.tasks = data.data.data;
      this.currentPage = data.data.currentPage;
      console.log(data);
    },
    async updateTask(index) {
      this.$router.push({
        path: `/task/supervisor/edit/${this.tasks[index].taskId}`,
      });
    },
    getUserProflie() {
      liff.init(
        {
          liffId: '1656467289-nGazJYoB',
        },
        () => {
          if (liff.isLoggedIn()) {
            liff
              .getProfile()
              .then((profile) => {
                this.lineUid = profile.userId;
                this.$store.dispatch('lineLogIn', {
                  lineUid: profile.userId,
                });

                this.getTasks();
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

<style scoped>
.calendar-btn {
  background-color: rgb(100, 100, 199);
  border: none;
  color: white;
  padding: 10px;
  width: 100%;
  border-radius: 7px;
}
</style>
