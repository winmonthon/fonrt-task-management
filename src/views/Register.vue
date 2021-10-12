<template>
<div class="container d-flex justify-content-center">
    <div class="mt-5 col-10 ">
        <h1 class="mb-5 text-center">Resgiter</h1>
        <div>
            <form>
                <div class="mb-3">
                    <label for="name" class="form-label">ชื่อ-นามสกุล</label>
                    <input type="text" class="form-control" id="name" v-model="form.name">

                </div>
                <div class="mb-3">
                    <label for="tel" class="form-label">เบอร์โทรศัพท์</label>
                    <input type="tel" class="form-control" id="tel" v-model="form.tel">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">รหัสผ่าน</label>
                    <input type="password" class="form-control" id="password" v-model="form.password">
                </div>

                <button type="submit" class="btn btn-primary" @click="createUser()">Submit</button>
            </form>

        </div>

    </div>

</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Register',
    data() {
        return {
            form: {
                name: '',
                tel: '',
                password: null
            }
        }
    },
    methods: {
        async createUser() {
            await axios.post('http://localhost:3000/users', {
                name: this.form.name,
                tel: this.form.tel,
                password: this.form.password,
                lineUid: 'asdfasdf74123'
            })
            alert('Create Success!!')
        }
    }

}
</script>
