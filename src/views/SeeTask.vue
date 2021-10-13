<template>
<div class="container d-flex justify-content-center">
    <div class="mt-5 col-10 ">
        <h1 class="mb-5 text-center">All Task</h1>
        <div class='mb-3'> 
            <label class="col" for="">ค้นหางาน</label>
            <input class="form-control col" type="text" placeholder="Default input" aria-label="default input example">
        </div>

        <div class=" d-flex justify-content-center">
            
                <table class=" table card-body">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ชื่องาน</th>
                            <th scope="col">ประเภทงาน</th>
                            <th scope="col">สถานะ</th>
                            <th scope="col">กำหนดส่ง</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                            <td>@mdo</td>
                        </tr>
                    </tbody>
                </table>

           

        </div>

    </div>

</div>
</template>

<script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script><script>
import axios from 'axios'

export default {
    name: 'SeeTask',
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
        async seeTask() {
            await axios.get('http://localhost:3000/task/:id', {
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
