<template>
<div class="container d-flex justify-content-center mt-5">
    <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">ลงทะเบียนเสร็จสิ้น</h4>
        <p>กรุณารอการอัพเดทจากผู้ดูแล</p>
        <hr>
        <p class="mb-0">คุณสามารถออกจากหน้านี้ได้ทันที</p>
    </div>

</div>
</template>

<script>
export default {
    name: 'RegisterSuccess',
    mounted() {
console.log('Coming')
    },
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

}
</script>
