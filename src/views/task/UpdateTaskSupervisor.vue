<template>
<div class="container d-flex justify-content-center">
    <div class="mt-5 col-10 ">
        <h1 class="mb-5 text-center">New Task</h1>
        <div>
            <form @submit.prevent="updateTask()">
                <div class="mb-3 bg-success p-1 shadow p-3 mb-5 rounded text-center">
                    <label for="category" class="form-label fs-5">สถานะงาน</label>
                    <select class="form-select" aria-label="Default select example" v-model="form.taskStatus">
                        <!-- <option selected>เลือกหัวหน้างาน</option> -->
                        <option v-for="(status,i) in taskStatusEnum" :key="i" :value="status">{{ status|capitalize }}</option>

                    </select>

                </div>
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
                        <option v-for="(category,i) in categoryEnum" :key="i" :value="category">{{ category }}</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="date" class="form-label">วันที่</label>
                    <input type="date" class="form-control" id="password" v-model="form.date">
                </div>

                <button type="submit " class="btn btn-primary ">Submit</button>
            </form>

        </div>

    </div>

</div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
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
            categoryEnum: ['Claim', 'Demo', 'Internal', 'MSSP Implement', 'Sub-Contractor Service'],
            taskStatusEnum: ['progress', 'pending', 'resolved']
        }

    },
    mounted() {
        this.getTask()
    },
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },
    methods: {
        async getTask() {
            const taskId = this.$route.params.taskId
            this.taskId = taskId
            const task = await axios.get(`${process.env.VUE_APP_API}/task/${taskId}`)
            console.log(task)
            this.task = task
            this.form.title = task.data.data.title
            this.form.description = task.data.data.description
            this.form.category = task.data.data.category
            this.form.date = dayjs(task.data.data.endDate).format('YYYY-MM-DD')
            this.form.taskStatus = task.data.data.taskStatus

        },
        async updateTask() {
            await axios.put(`${process.env.VUE_APP_API}/task/${this.taskId}`, {
                title: this.form.title,
                description: this.form.description,
                taskStatus: this.form.taskStatus.toLowerCase(),
                dueDate: this.form.date
            })
            alert('Update success')
            this.$router.push({
                path: `/task/supervisor/`
            })
        },
    }
}
</script>

<style>

</style>
