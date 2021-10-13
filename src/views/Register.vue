<template>
<div class="container d-flex justify-content-center">
    <div class="mt-5 col-10 ">
        <h1 class="mb-5 text-center">Register</h1>
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
                <p id='lineUid'></p>

                <button type="submit" class="btn btn-primary" @click="createUser()">Submit</button>
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
            }
        }
    },
    mounted() {
        this.getLineUid()
    },
    methods: {
        async createUser() {
            await axios.post('http://localhost:3000/users', {
                name: this.form.name,
                tel: this.form.tel,
                password: this.form.password,
                lineUid: this.form.lineUid
            })
            await alert('Create Success!!')
            return this.$router.push({ path: '/registersuccess'})
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
        }
    }

}
</script>
