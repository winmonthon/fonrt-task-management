<template>
<div class="container d-flex justify-content-center">
    <div class="mt-5 col-10 ">
        <h1 class="mb-5 text-center">Login</h1>
        <p class='text-danger fs-3 text-center'>{{isUser}}</p>
        <div>
            <form @submit.prevent="login()">

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
import JWT from 'jsonwebtoken'
export default {
    name: 'Login',
    data() {
        return {
            form: {

                tel: '',
                password: null
            },
            isUser: ''
        }
    },
    methods: {
        async validation(){
            const checked = await axios({
            
            method: 'get',
                    url: `https://task-mangement-api.herokuapp.com/users`,
                    headers: {
                        Authorization: `Bearer ${this.$store.state.token}`,
                    },
        })},
        
        async login() {
            await this.$store.dispatch('loginToken', {
                tel: this.form.tel,
                password: this.form.password
            })
            console.log('data', this.$store.state.token)
            if(!this.$store.state.token){
                this.isUser = 'เบอร์โทรศัพท์หรือรหัสผ่านไม่ถูกต้อง'
            }
            const SECRET_KEY = '88ea517d4a88d955c828b22ac1eb6e226094e45e57994d4c683d21c3f05aa85b1a87fb590d208a9bc523d7355d99aec8a9bd42185e0a4e87852d8b014ff92ee7'
            const decoded = JWT.decode(this.$store.state.token, SECRET_KEY)
            if (decoded.role === 'admin') {
                this.$router.push({
                    path: `/users`
                })
            } else if (decoded.role === 'sale') {
                this.$router.push({
                    path: `/task/sale`

                })
            } else {
                alert('บัญชีของคุณยังไม่ได้รับการอนุมัติจากผู้ดูแล กรุณารอการอัพเดทจากผู้ดูแล')
                this.$router.push({
                    path: `/logout`

                })
            }
        }
    }

}
</script>
