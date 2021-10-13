<template>
<div class="container d-flex justify-content-center">
    <div class="mt-5 col-10 ">
        <h1 class="mb-5 text-center">New Task</h1>
        <div>
            <form>
                <div class="mb-3">
                    <label for="title" class="form-label">ชื่องาน</label>
                    <input type="text" class="form-control" id="title" v-model="form.title">

                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">รายละเอียด</label>
                    <input type="tel" class="form-control" id="description" v-model="form.description">
                </div>

                <div class="mb-3">
                    <label for="category" class="form-label">ประเภทงาน</label>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>เลือกประเภทงาน</option>
                        <option value="ทำความสะอาด">ทำความสะอาด</option>
                        <option value="ซ่อมบำรุง">ซ่อมบำรุง</option>
                        <option value="ทั่วไป">ทั่วไป</option>
                    </select>
                    </div>

                <div class="mb-3">
                    <label for="date" class="form-label">วันที่</label>
                    <input type="date" class="form-control" id="password" v-model="form.date">
                </div>

                <button type="submit" class="btn btn-primary" @click="createTask()">Submit</button>
            </form>

        </div>

    </div>

</div>
</template>

<script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script><script>
import axios from 'axios'
export default {
    name: 'Task',
    data() {
        return {
            form: {
                title: '',
                description: '',
                date: null
            }
        }
    },
    methods: {
        async createTask() {
            await axios.post('http://localhost:3000/task', {
                title: this.form.title,
                description: this.form.description,
                date: this.form.date,
                lineUid: 'asdfasdf74123'
            })
            alert('Create Success!!')
        }
    }
}
</script>

<style>

</style>
