<template>
<div class="container d-flex justify-content-center">
    <div class="mt-5 col-10 ">
        <h1 class="mb-5 text-center">Resgiter</h1>
        <div>
            <form action="localhost:3000/users" method="POST">
                <div class="mb-3">
                    <label for="name" class="form-label">ชื่อ-นามสกุล</label>
                    <input type="text" class="form-control" id="name" name="name">
                    
                </div>
                <div class="mb-3">
                    <label for="tel" class="form-label">เบอร์โทรศัพท์</label>
                    <input type="tel" class="form-control" id="tel" name="tel">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">รหัสผ่าน</label>
                    <input type="password" class="form-control" id="password" name='password'>
                </div>
                                
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>

    </div>

</div>
</template>

<script>
export default {
    name: 'Register'

}
</script>
