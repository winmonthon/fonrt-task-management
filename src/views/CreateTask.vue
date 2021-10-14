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
                        <option selected>เลือกประเภทงาน</option>
                        <option>ทำความสะอาด</option>
                        <option>ซ่อมบำรุง</option>
                        <option>ทั่วไป</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="date" class="form-label">วันที่</label>
                    <input type="date" class="form-control" id="password" v-model="form.date">
                </div>

                <div class="mb-3">
                    <label for="category" class="form-label">หัวหน้างานผู้รับผิดชอบ</label>
                    <select class="form-select" aria-label="Default select example" v-model="form.supervisor" @change="addLineUid()">
                        <!-- <option selected>เลือกหัวหน้างาน</option> -->
                        <option v-for="(user,i) in users" :key="i">{{ user.name}}</option>

                    </select>

                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>

        </div>

    </div>

</div>
</template>

<script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script><script>
import axios from 'axios'
import shortid from 'shortid'

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
                date: null,
                assignBy: '',
                createBy: '',
                category: '',

            }, 
            users: ''

        }
    },
    methods: {
        async createTask() {
            const taskId = shortid()
            await axios.post('https://task-mangement-api.herokuapp.com/task/line', {
                title: this.form.title,
                description: this.form.description,
                dueDate: this.form.date,
                createBy: this.form.createBy,
                assignBy: this.form.assignBy,
                category: this.form.category,
                taskId: taskId
            })
            await axios.post('https://task-mangement-api.herokuapp.com/callback/task'),{
                taskId: taskId,
                assignBy: this.form.assignBy,
                
            }
            alert('เพิ่มงานใหม่เรียบร้อบ คุณสามารถปิดหน้าต่างนี้ได้ทันที')
        },
        async getUsers() {
            const supervisor = await axios.get('https://task-mangement-api.herokuapp.com/users/role?role=supervisor')
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
