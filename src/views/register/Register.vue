<template>
<div class="container d-flex justify-content-center">
    <div class="mt-5 col-10 ">
        <div class="mb-5">
            <h1 class=" text-center">Register</h1>
            <p class='text-danger fs-3 text-center'>{{isUsers}}</p>
        </div>
        <div>
            <form @submit.prevent="validate()">
                <div class="mb-3">
                    <label for="name" class="form-label">ชื่อ-นามสกุล</label>
                    <input type="text" class="form-control" id="name" v-model="form.name">

                </div>
                <div class="mb-3">
                    <label for="tel" class="form-label">เบอร์โทรศัพท์</label>
                    <input type="tel" class="form-control" id="tel" v-model="form.tel">
                    <p class='text-danger fs-6'>{{isTelTure}}</p>

                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">รหัสผ่าน</label>
                    <input type="password" class="form-control" id="password" v-model="form.password">

                </div>

                <button type="submit" class="btn btn-primary">Submit</button>
            </form>

        </div>

    </div>

</div>
</template>

<script charset="utf-8" src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script><script>
import axios from 'axios'

export default {
    name: 'Register',
    data() {
        return {
            form: {
                name: '',
                tel: '',
                password: null,
                lineUid: ''
            },
            isTelTure: '',
            isUsers: ''
        }
    },
    mounted() {
        this.getLineUid()
    },
    methods: {
        async createUser() {

            try {
                await axios.post('https://task-mangement-api.herokuapp.com/users', {
                    name: this.form.name,
                    tel: this.form.tel,
                    password: this.form.password,
                    lineUid: this.form.lineUid
                })
                alert('Create Success!!')
                this.$router.push({
                    path: '/registersuccess'
                })
            } catch (err) {
                console.error(err)
            }

        },
        getLineUid() {
            liff.init({
                liffId: "1656467289-2Mq017bP"
            }, () => {
                if (liff.isLoggedIn()) {
                    liff.getProfile().then(profile => {

                        this.form.lineUid = profile.userId;

                    }).catch(
                        err => console.error(err)
                    );
                } else {
                    liff.login();
                }
            }, err => console.error(err.code, error.message));
        },
        async validate() {
            this.isTelTure = ''
            this.isUsers = ''
            const checkUsers = await axios.get(`https://task-mangement-api.herokuapp.com/users/check/lineuid/${this.form.lineUid}`)
            const checkTel = await axios.get(`https://task-mangement-api.herokuapp.com/users/check/tel/${this.form.tel}`)
            const phone = /[0]{1}[0-9]{9}/

            const isTel = phone.exec(this.form.tel)
            if (!isTel) {
                return this.isTelTure = 'หมายเลขโทรศัทพ์ไม่ถูกต้อง'

            } else if (checkUsers.data.data !== null || checkTel.data.data !== null) {
                return this.isUsers = 'คุณมีบัญชีอยู่ในระบบเรียบร้อยแล้ว'
            } else {
                this.isTelTure = ''
                this.isUsers= ''
                this.createUser()
            }

        }
    }

}
</script>
