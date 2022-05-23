<template>
<div class="container d-flex justify-content-center">
  <div class="mt-5 col-10 ">
    <h1 class="mb-5 text-center">New Task</h1>
    <div>
      <form @submit.prevent="createTask()">
        <div class="mb-3">
          <label for="title" class="form-label">ชื่องาน</label>
          <input type="text" class="form-control" id="title" v-model="form.title">

        </div>
        <div class="mb-3">
          <label for="description" class="form-label">รายละเอียด</label>
          <input type="text" class="form-control" id="description" v-model="form.description">
        </div>

        <div class="mb-3">
          <label for="category" class="form-label">ประเภทงาน</label>
          <select class="form-select" aria-label="Default select example" v-model="form.category">
            <option selected>Claim</option>
            <option>Demo</option>
            <option>Internal</option>
            <option>MSSP Implement</option>
            <option>Sub-Contractor Service</option>
          </select>
        </div>

        <div class="mb-3">
          <label for="date" class="form-label">วันที่เริ่มต้นงาน</label>
          <input type="date" class="form-control" id="startDate" v-model="form.startDate">
        </div>
        <div class="mb-3">
          <label for="date" class="form-label">วันที่สิ้นสุดงาน</label>
          <input type="date" class="form-control" id="endDate" v-model="form.endDate">
        </div>

        <div class="mb-3">
          <label for="category" class="form-label">หัวหน้างานผู้รับผิดชอบ</label>
          <select class="form-select" aria-label="Default select example" v-model="form.supervisor" @change="addLineUid()">
            <!-- <option selected>เลือกหัวหน้างาน</option> -->
            <option v-for="(user,i) in users" :key="i">{{ user.name}}</option>

          </select>

        </div>

        <button v-if="!processing" type="submit" class="btn btn-primary">Submit</button>
        <button v-if="processing" type="submit" disabled class="btn btn-primary">Processing ...</button>
      </form>

    </div>

  </div>

</div>
</template>

<script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script><script>
import axios from 'axios'

export default {
  name: 'Task',
  mounted() {
    this.getUsers()
    this.getUserProflie()

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
      processing: false

    }
  },
  methods: {
    async createTask() {
      try {
        this.processing = true
        await axios.post(`${process.env.VUE_APP_API}/task/line`, {
          title: this.form.title,
          description: this.form.description,
          startDate: this.form.startDate,
          endDate: this.form.endDate,
          createBy: this.form.createBy,
          assignBy: this.form.assignBy,
          category: this.form.category,

        })

        this.processing = false
        alert('Create Success')
        this.$router.push({
          path: '/createtasksuccess'
        })
      } catch (error) {
        console.log(error)
        alert('something went wrong')
      }

    },
    async getUsers() {
      const supervisor = await axios.get(`${process.env.VUE_APP_API}/users/role?role=supervisor`)
      this.users = supervisor.data.data

    },
    async addLineUid() {
      const found = await this.users.find(({
        name
      }) => name === this.form.supervisor)
      this.form.assignBy = found.lineUid

    },
    getUserProflie() {
      liff.init({
        liffId: "1656467289-VZYx2BzW"
      }, () => {
        if (liff.isLoggedIn()) {
          liff.getProfile().then(profile => {

            this.form.createBy = profile.userId;

            this.$store.dispatch('lineLogIn', {
              lineUid: profile.userId
            })

          }).catch(
            err => console.error(err)
          );
        } else {
          liff.login();
        }
      }, err => console.error(err.code, error.message));
    }

  }
}
</script>

<style>

</style>
