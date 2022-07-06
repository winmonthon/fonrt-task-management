<template>
  <div class="container flex justify-center mt-5">
    <div class="alert alert-success border rounded-lg p-10" role="alert">
      <h4 class="alert-heading text-2xl">เพิ่มงานใหม่เรียบร้อบ</h4>

      <hr class="my-2" />
      <p class="mb-0 text-lg">คุณสามารถออกจากหน้านี้ได้ทันที</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateTaskSuccess',
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
