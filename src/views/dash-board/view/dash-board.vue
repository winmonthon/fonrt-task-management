<template>
<div>
  <div class="my-3">
    <h2 class="text-center">HOME</h2>
  </div>
  <div class="d-flex justify-content-center my-2 align-items-center">
    <input class="my-date-picker mx-1" v-model="startDate" type="month">
    TO
    <input class="my-date-picker mx-1" v-model="endDate" type="month">
    <span @click="getTaskInfo" class="material-icons my-btn mx-2">
      search
    </span>
  </div>

  <div class="d-flex justify-content-center my-4 align-items-center">
    <input placeholder="Search" type="text" class="my-search" v-model="searchtext"><span @click="getTaskInfo" class="material-icons my-btn mx-2">
      search
    </span>
  </div>

  <div v-if="loading" class="d-flex justify-content-center">
    <div class="spinner-border " role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-if="!loading" class="px-5 my-table">
    <table class="table ">
      <thead>
        <tr>
          <th scope="col">Number</th>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">End Date</th>
          <th scope="col">Supervisor</th>
          <th scope="col">Created By</th>
          <th scope="col">Engineer</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task , i) in tasks" :key="i">
          <th scope="row">{{i+1}}</th>
          <td>{{task.title}}</td>
          <td>
            <div class="my-content">{{task.description}}
            </div>
          </td>
          <td>
            <div style="width:100px">{{task.endDate | toDate}}
            </div>
          </td>
          <td class="my-content">{{task.assignBy.name}}</td>
          <td class="my-content">{{task.createBy.name}}</td>
          <td>
            <div v-if="task.engineer">
              {{task.engineer.name|| '-'}}
            </div>
            <div v-if="!task.engineer">
              {{ '-'}}
            </div>
          </td>
          <td>
            <div style="width:100px" :class="task.taskStatus">{{task.taskStatus}}</div>
          </td>
        </tr>

      </tbody>
    </table>
  </div>

  <!-- 
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav> -->

</div>
</template>

<script>
import dayjs from 'dayjs'
import axios from 'axios'
export default {
  data() {
    return {
      startDate: dayjs(new Date()).subtract(1, 'y').format('YYYY-MM'),
      endDate: dayjs(new Date()).format('YYYY-MM'),
      tasks: [],
      searchtext: '',
      loading: true
    }
  },
  mounted() {
    this.getTaskInfo()
  },
  filters: {
    toDate(val) {
      if (!val) return '-'

      return dayjs(val).format('DD MMM YY')
    }
  },
  methods: {
    async getTaskInfo() {
      this.loading = true
      const {
        data
      } = await axios({
        method: 'get',
        url: `${process.env.VUE_APP_API}/task/dashboard?startDate=${this.startDate}&endDate=${this.endDate}&q=${this.searchtext}`
      })

      this.tasks = data
      this.loading = false
    }
  }
}
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

.progress {
  background-color: rgb(228, 150, 47);
  color: aliceblue !important;
  text-align: center !important;
  border-radius: 20px;
  font-size: 0.8rem !important;
}

.pending {
  background-color: rgb(228, 180, 47);
  color: aliceblue;
  text-align: center;
  border-radius: 20px;
  font-size: 0.8rem;
}

.resolved {
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
</style>
