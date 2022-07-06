<template>
  <div class="flex justify-center mt-5">
    <div class="alert alert-success p-10 rounded-lg border" role="alert">
      <h4 class="alert-heading text-2xl">ลงทะเบียนเสร็จสิ้น</h4>
      <p class="text-lg mb-2">กรุณารอการอัพเดทจากผู้ดูแล</p>
      <hr />
      <p class="mt-2">คุณสามารถออกจากหน้านี้ได้ทันที</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterSuccess',
  mounted() {
    console.log('Coming');
  },
  data() {
    return {
      form: {
        name: '',
        tel: '',
        password: null,
        lineUid: '',
      },
    };
  },
};
</script>
