<template>
  <div class="flex justify-center">
    <div class="mt-5 col-10 ">
      <h1 class="mb-5 text-center">New Task</h1>
      <div>
        <form @submit.prevent="updateTask()">
          <div class="border-b my-5 pb-5">
            <label
              for="category"
              class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
              >สถานะงาน</label
            >
            <select
              class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              aria-label="Default select example"
              v-model="form.taskStatus"
            >
              <!-- <option selected>เลือกหัวหน้างาน</option> -->
              <option
                v-for="(status, i) in taskStatusEnum"
                :key="i"
                :value="status"
                >{{ status | capitalize }}</option
              >
            </select>
          </div>
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
              <option
                v-for="(category, i) in categoryEnum"
                :key="i"
                :value="category"
                >{{ category }}</option
              >
            </select>
          </div>

          <div class="mb-3">
            <label
              for="date"
              class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
              >วันที่</label
            >
            <input
              type="date"
              class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              id="password"
              v-model="form.date"
            />
          </div>

          <button
            type="submit "
            class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
export default {
  name: 'UpdateTaskSupervisor',
  data() {
    return {
      form: {
        title: '',
        description: '',
        date: null,
        taskStatus: '',
        category: '',
      },
      taskId: '',
      task: '',
      categoryEnum: [
        'Claim',
        'Demo',
        'Internal',
        'MSSP Implement',
        'Sub-Contractor Service',
      ],
      taskStatusEnum: ['progress', 'pending', 'resolved'],
    };
  },
  mounted() {
    this.getTask();
  },
  filters: {
    capitalize: function(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  methods: {
    async getTask() {
      const taskId = this.$route.params.taskId;
      this.taskId = taskId;
      const task = await axios.get(`${process.env.VUE_APP_API}/task/${taskId}`);
      console.log(task);
      this.task = task;
      this.form.title = task.data.data.title;
      this.form.description = task.data.data.description;
      this.form.category = task.data.data.category;
      this.form.date = dayjs(task.data.data.endDate).format('YYYY-MM-DD');
      this.form.taskStatus = task.data.data.taskStatus;
    },
    async updateTask() {
      await axios.put(`${process.env.VUE_APP_API}/task/${this.taskId}`, {
        title: this.form.title,
        description: this.form.description,
        taskStatus: this.form.taskStatus.toLowerCase(),
        dueDate: this.form.date,
      });
      alert('Update success');
      this.$router.push({
        path: `/task/supervisor/`,
      });
    },
  },
};
</script>

<style></style>
