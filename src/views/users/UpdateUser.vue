<template>
<div>
    <div class="container d-flex justify-content-center">
        <div class="mt-5 col-10 ">
            <h1 class="mb-5 text-center">Update User</h1>
            <div>
                <form @submit.prevent="updateUser()">
                    <div class="mb-3">
                        <label for="name" class="form-label">ชื่อ-นามสกุล</label>
                        <input type="text" class="form-control" id="name" v-model="form.name">

                    </div>
                    <div class="mb-3">
                        <label for="tel" class="form-label">เบอร์โทรศัพท์</label>
                        <input type="tel" class="form-control" id="tel" v-model="form.tel">
                    </div>

                    <div class="mb-3">
                        <label for="password" class="form-label">ตำแหน่ง</label>
                        <select class="form-select" aria-label="Default select example" v-model="form.role">
                            <option v-for="(role,i) in roleEnum" :key="i" :value="role">{{ role| capitalize}}</option>
                        </select>
                    </div>

                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>

            </div>

        </div>

    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'UpdateUser',
    data() {
        return {
            form: {
                name: '',
                tel: '',
                role: '',
                userId: ''
            },
            roleEnum: ['sale', 'engineer', 'supervisor'],
            selectedRole: 'test'

        }
    },
    mounted() {
        this.getUserByUserId()
    },
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },
    methods: {

        async getUserByUserId() {

            const userId = this.$route.params.id
            this.form.userId = userId
            const user = await axios.get(`https://task-mangement-api.herokuapp.com/users/${userId}`)
            console.log(user)
            this.form.name = user.data.data.name
            this.form.tel = user.data.data.tel
            this.form.role = user.data.data.role

        },
        async updateUser() {
            await axios.put(`https://task-mangement-api.herokuapp.com/users/${this.form.userId}`, {
                name: this.form.name,
                tel: this.form.tel,
                role: this.form.role.toLowerCase()
            })
            alert('update success')
            this.$router.push({
                path: `/users`
            })
        }
    }
}
</script>

<style>

</style>
