<template>
<div class="mt-10">
  <h1 class="mb-5 text-center">Home</h1>
  <div class="flex justify-center items-center">
    <input class="block px-4 py-2 mr-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" v-model="startDate" type="month" @change="getTaskInfo" />
    TO
    <input class="block px-4 py-2 ml-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" v-model="endDate" type="month" @change="getTaskInfo" />
    <!-- <span
        @click="getTaskInfo"
        class="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 ml-1"
      >
        Search
      </span> -->
  </div>

  <div class="flex justify-center items-center mb-10">
    <div class="mr-2">
      <input placeholder="Search" type="text" class="block px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" v-model="searhText" @keydown.enter="getTaskInfo" />

    </div>

    <div class="fliter-input ml-2">

      <select @change="getTaskInfo" v-model="statusFilter" name="cars" id="cars" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" type="text" placeholder="Default input" aria-label="default input example">
        <option value="">all</option>
        <option value="pending">pending</option>
        <option value="progress">progress</option>
        <option value="resolved">finished</option>
      </select>

    </div>
    <!-- <span
        @click="getTaskInfo"
        class="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 mt-2 ml-1"
      >
        Search
      </span> -->
  </div>

  <div v-if="loading" class="flex justify-center">
    <div class="spinner-border " role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-if="!loading" class="px-5 my-table">
    <div v-for="(task, i) in tasks" :key="i" class="mobile-table">
      <div class="flex justify-between my-1">
        <div class="title-mobile">Number</div>
        <div>
          {{ i + 1 }}
        </div>
      </div>
      <div class="flex justify-between my-1">
        <div class="title-mobile">Title</div>
        <div>
          {{ task.title }}
        </div>
      </div>
      <div class="flex justify-between my-1">
        <div class="title-mobile">Description</div>
        <div>
          {{ task.description }}
        </div>
      </div>
      <div class="flex justify-between my-1">
        <div class="title-mobile">End Date</div>
        <div>
          {{ task.endDate | toDate }}
        </div>
      </div>
      <div class="flex justify-between my-1">
        <div class="title-mobile">Supervisor</div>
        <div>
          {{ task.assignBy.name }}
        </div>
      </div>
      <div class="flex justify-between my-1">
        <div class="title-mobile">Created By</div>
        <div>
          {{ task.createBy.name }}
        </div>
      </div>
      <div class="flex justify-between my-1">
        <div class="title-mobile">Engineer</div>
        <div v-if="task.engineer">
          {{ task.engineer.name || '-' }}
        </div>
        <div v-if="!task.engineer">
          {{ '-' }}
        </div>
      </div>
      <div class="flex justify-between">
        <div class="title-mobile">Status</div>
        <div style="width:100px" :class="`my-${task.taskStatus}`">
          {{ task.taskStatus | toStatus}}
        </div>
      </div>
    </div>

    <table class="table w-full rounded-sm">
      <thead>
        <tr class="border-b-2 border-gray-600 dark:bg-gray-800">
          <th class="py-2 px-3">Number</th>
          <th class="py-2 px-3">Title</th>
          <th class="py-2 px-3">Description</th>
          <th class="py-2 px-3">End Date</th>
          <th class="py-2 px-3">Supervisor</th>
          <th class="py-2 px-3">Created By</th>
          <th class="py-2 px-3">Engineer</th>
          <th class="py-2 px-3">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, i) in tasks" :key="i" class="border-b border-gray-600 dark:bg-gray-700">
          <th scope="row">{{ i + 1 }}</th>
          <td class="p-3">{{ task.title }}</td>
          <td class="p-3">
            {{ task.description }}
          </td>
          <td class="p-3">
            {{ task.endDate | toDate }}
          </td>
          <td class="p-3">{{ task.assignBy.name }}</td>
          <td class="p-3">{{ task.createBy.name }}</td>
          <td class="p-3">
            <div v-if="task.engineer">
              {{ task.engineer.name || '-' }}
            </div>
            <div v-if="!task.engineer">
              {{ '-' }}
            </div>
          </td>
          <td class="p-3">
            <div :class="`my-${task.taskStatus}`">
              {{ task.taskStatus | toStatus}}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import dayjs from 'dayjs';
import axios from 'axios';
export default {
  data() {
    return {
      startDate: dayjs(new Date())
        .subtract(1, 'y')
        .format('YYYY-MM'),
      endDate: dayjs(new Date()).format('YYYY-MM'),
      tasks: [],
      loading: true,
      searhText: '',
      statusFilter: ''
    };
  },
  mounted() {
    this.getTaskInfo();
  },
  filters: {
    toDate(val) {
      if (!val) return '-';

      return dayjs(val).format('DD MMM YY');
    },
    toStatus(val) {
      if (!val) return '-'

      if (val === 'resolved') {
        return 'finished'
      }

      return val
    }
  },
  methods: {
    async getTaskInfo() {
      this.loading = true;
      const {
        data
      } = await axios({
        method: 'get',
        url: `${process.env.VUE_APP_API}/task/dashboard?startDate=${this.startDate}&endDate=${this.endDate}&q=${this.searhText}&status=${this.statusFilter}`,
      });

      this.tasks = data;
      this.loading = false;
    },
  },
};
</script>

<style scoped>
.my-date-picker {
  height: 50px;
  width: 150px;
  padding: 10px;
  border-radius: 10px;
}

.my-content {
  max-width: 150px !important;
  text-overflow: ellipsis !important;

  overflow: hidden;
}

.my-progress {
  background-color: rgb(228, 150, 47);
  color: aliceblue !important;
  text-align: center !important;
  border-radius: 20px;
  font-size: 0.8rem !important;
}

.my-pending {
  background-color: rgb(228, 180, 47);
  color: aliceblue;
  text-align: center;
  border-radius: 20px;
  font-size: 0.8rem;
}

.my-resolved {
  background-color: rgb(21, 184, 48);
  color: aliceblue;
  text-align: center;
  border-radius: 20px;
  font-size: 0.8rem;
}

.my-table {
  overflow: auto !important;
}

.my-search {
  height: 2rem;
  border-radius: 10px;
  font-size: 1rem;
  padding: 5px;
}

.mobile-table {
  border-top: 1px solid;
  padding-top: 5px;
  padding-bottom: 5px;
}

.title-mobile {
  font-weight: 600;
}

@media only screen and (max-width: 600px) {
  .table {
    display: none;
  }
}

@media only screen and (min-width: 600px) {
  .mobile-table {
    display: none;
  }
}
</style>
