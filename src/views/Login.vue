<template>
<div class="container d-flex justify-content-center">
  <div class="mt-5 col-10 ">
    <h1 class="mb-5 text-center">Login</h1>
    <p class='text-danger fs-3 text-center'>{{isUser}}</p>

    <div v-if="processing" class="justify-content-center d-flex mb-3">
      <div class="spinner-border " role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

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

        <button type="submit" :disabled="processing" class="btn btn-primary" @click="login()">Login</button>
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
      isUser: '',
      processing: false
    }
  },
  mounted() {
    localStorage.removeItem('token')
    localStorage.removeItem('user_info')
  },
  methods: {
    async validation() {
      const checked = await axios({
        method: 'get',
        url: `${process.env.VUE_APP_API}/users`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
    },
    async login() {
      try {
        this.processing = true
        const {
          data
        } = await axios({
          method: 'post',
          url: `${process.env.VUE_APP_API}/login`,
          data: {
            tel: this.form.tel,
            password: this.form.password,
          },
        })

        localStorage.setItem('token', data.data.token)
        localStorage.setItem('user_info', JSON.stringify(data.data.user) )
        this.$router.push('/dashboard')

        // const SECRET_KEY = `88ea517d4a88d955c828b22ac1eb6e226094e45e57994d4c683d21c3f05aa85b1a87fb590d208a9bc523d7355d99aec8a9bd42185e0a4e87852d8b014ff92ee7`
        // const decoded = JWT.decode(this.$store.state.token, SECRET_KEY)

        // if (data.data.user.role === 'admin') {
        //   localStorage.setItem('token', data.data.token)
        //   return this.$router.push({
        //     path: `/users`
        //   })
        // }

        // if (data.data.user.role === 'sale') {
        //   localStorage.setItem('token', data.data.token)
        //   return this.$router.push({
        //     path: `/task/sale`

        //   })
        // }

        // alert('บัญชีของคุณยังไม่ได้รับการอนุมัติจากผู้ดูแล กรุณารอการอัพเดทจากผู้ดูแล')
        // this.$router.push({
        //   path: `/logout`

        // })

        this.processing = false
      } catch (error) {
        this.isUser = error.response.data.msg
        this.processing = false

        setTimeout(() => {
          this.isUser = ''
        }, 5000)
      }

    }
  }

}
</script>
