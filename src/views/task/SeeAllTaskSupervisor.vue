<template>
<div class="container px-md-2 ">
    <div class="mt-5  ">
        <h1 class="mb-5 text-center">Tasks</h1>
        <div class='mb-3'>
            <label class="col mb-1" for="">ค้นหา</label>
            <input class="form-control col" type="text" placeholder="Default input" aria-label="default input example">
        </div>

        <div class="d-flex justify-content-end px-2">
            <div>
                <b>Page</b> <span>{{currentPage}}</span>
            </div>
        </div>
        <div style="overflow-x:auto;">
            <table class=" table">
                <thead>
                    <tr>
                        <th scope="col">งาน</th>
                        <th scope="col">รายละเอียด</th>
                        <th scope="col">กำหนดเริ่ม</th>
                        <th scope="col">กำหนดส่ง</th>
                        <th scope="col">ประเภท</th>
                        <th scope="col">สถานะงาน </th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(task,i) in tasks" :key="i">
                        <td>{{task.title}}</td>
                        <td>{{task.description}}</td>
                        <td>{{task.startDate |toDate }}</td>
                        <td>{{task.endDate |toDate }}</td>
                        <td>{{task.category }}</td>
                        <td>{{task.taskStatus}}</td>
                        <td><button type="button" @click="updateTask(i)" class="btn btn-sm btn-outline-secondary">Edit</button></td>
                    </tr>

                </tbody>
            </table>
        </div>
        <div class="btn-group me-2 d-flex justify-content-center" role="group" aria-label="Second group">

            <div>
                <button type="button" @click="changePage(i)" class="btn btn-sm btn-outline-secondary mx-2 mb-5" v-for="(page,i) in allPages" :key="i">{{i+1}}</button>
            </div>

        </div>
    </div>

</div>
</template>

<script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script><script>
import axios from 'axios'
import dayjs from 'dayjs'

export default {
    name: 'SeeTaskSuperviosr',
    data() {
        return {

            lineUid: '',

            allPages: '',
            currentPage: '',
            tasks: [],
            userId: ''
        }
    },
    mounted() {
        this.getUserProflie()
        //this.getTasks()
        // console.log(this.lineUid)

    },
    filters: {
        toDate: function (value) {
            if (!value) return ''
            console.log(value)
            return dayjs(value).format('D MMM YYYY')

        }
    },
    methods: {

        async getTasks() {
            const supervisorData = await axios.get(`https://task-mangement-api.herokuapp.com/users/check/lineuid/${this.lineUid}`)
            const userId = supervisorData.data.data.userId
            const tasks = await axios.get(`https://task-mangement-api.herokuapp.com/task/supervisor/${userId}`)
            console.log(tasks)
            this.tasks = tasks.data.data
            this.allPages = tasks.data.allPages
            this.currentPage = tasks.data.currentPage
            this.userId = userId
        },
        async changePage(index) {
            const data = await axios.get(`https://task-mangement-api.herokuapp.com/task/supervisor/${this.userId}?page=${index+1}&size=10`)
            this.tasks = data.data.data
            this.currentPage = data.data.currentPage
            console.log(data)
        },
        async updateTask(index) {
            this.$router.push({
                path: `/task/supervisor/edit/${this.tasks[index].taskId}`
            })

        },
        getUserProflie() {
            liff.init({
                liffId: "1656467289-nGazJYoB"
            }, () => {
                if (liff.isLoggedIn()) {
                    liff.getProfile().then(profile => {

                        this.lineUid = profile.userId
                        this.$store.dispatch('lineLogIn', {
                            lineUid: profile.userId
                        })

                        this.getTasks()
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
