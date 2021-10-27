<template>
<div class="container px-md-2 ">
    <div class="mt-5  ">
        <h1 class="mb-5 text-center">All Users</h1>
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
                        <th scope="col">ชื่อ</th>
                        <th scope="col">เบอร์โทรศัพท์</th>
                        <th scope="col">อีเมล</th>
                        <th scope="col">ตำแหน่ง</th>
                        <th scope="col"> </th>
                        <th scope="col"> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user,i) in users" :key="i">
                        <td>{{user.name}}</td>
                        <td>{{user.tel}}</td>
                        <td>{{user.email}}</td>
                        <td>{{user.role}}</td>
                        <td><button type="button" @click="updateUser(i)" class="btn btn-sm btn-outline-secondary">Edit</button></td>
                        <td><button type="button" @click="deleteUser(i)" class="btn btn-sm btn-outline-danger">Delete</button></td>
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

export default {
    name: 'SeeTask',
    data() {
        return {
            users: '',
            allPages: '',
            currentPage: '1',
            size: ''
        }
    },
    mounted() {
        this.getUsers()
        this.checkLogin()
    },

    methods: {
        async getUsers() {
            try {
                const allUsers = await axios({
                    method: 'get',
                    url: `https://task-mangement-api.herokuapp.com/users/?page=${this.currentPage}&size=10`,
                    headers: {
                        Authorization: `Bearer ${this.$store.state.token}`,
                    },
                })

                if (allUsers.data.message === 'Role Unauthorized') {
                    alert('คุณไม่ได้รับอุณญาติให้เข้าถึงข้อมูลนี้')
                    this.$router.push({
                        path: `/login`
                    })
                } else if (allUsers.data.message === 'token require' || allUsers.data.message === 'token expired') {
                    this.$router.push({
                        path: `/login`
                    })
                }

                this.users = allUsers.data.data
                this.allPages = parseInt(allUsers.data.allPages)
                this.currentPage = allUsers.data.currentPage
            } catch (error) {
                console.error('error', error)
            }

        },
        async changePage(index) {
            const data = await axios({
                method: 'get',
                url: `https://task-mangement-api.herokuapp.com/users?page=${index+1}&size=10`,
                headers: {
                    Authorization: `Bearer ${this.$store.state.token}`,
                },
            })

            this.users = data.data.data
            this.currentPage = data.data.currentPage

        },
        async deleteUser(index) {
            confirm(`คุณต้องการลบ ${this.users[index].name} หรือไม่`)
            await axios({
                method: 'delete',
                url: `https://task-mangement-api.herokuapp.com/users/${this.users[index].userId}`,
                headers: {
                    Authorization: `Bearer ${this.$store.state.token}`,
                },
            })
            await this.getUsers()

        },
        async updateUser(index) {
            this.$router.push({
                path: `/updateuser/${this.users[index].userId}`
            })
            console.log(index)
        },
        checkLogin() {
            if (!this.$store.getters.loggedIn) {
                this.$router.push({
                    path: `/login`
                })
            } else {
                return null
            }
        }
    }

}
</script>
