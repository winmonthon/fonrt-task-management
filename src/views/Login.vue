<template>
<div class="container d-flex justify-content-center">
    <div class="mt-5 col-10 ">
        <h1 class="mb-5 text-center">Login</h1>
        <div>
            <form>
               
                <div class="mb-3">
                    <label for="tel" class="form-label">เบอร์โทรศัพท์</label>
                    <input type="tel" class="form-control" id="tel" v-model="form.tel">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">รหัสผ่าน</label>
                    <input type="password" class="form-control" id="password" v-model="form.password">
                </div>

                <button type="submit" class="btn btn-primary" @click="login()">Login</button>
            </form>

        </div>

    </div>

</div>
</template>

<script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script><script>
import axios from 'axios'

export default {
    name: 'Login',
    data() {
        return {
            form: {
                
                tel: '',
                password: null
            }
        }
    },
    methods: {
        async login() {
            await axios.post('http://localhost:3000/login', {
                
                tel: this.form.tel,
                password: this.form.password,
               
            })
            alert('Login Success!!')
        }
    }

}
</script>
