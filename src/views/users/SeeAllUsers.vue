<template>
  <div>
    <div class="flex justify-center items-center">
      <div class="mt-5 w-full px-5">
        <h1 class="mb-5 text-center">All Users</h1>
        <div class="flex items-center">
          <label class="col mb-1" for="">ค้นหา</label>
          <input
            class="block px-4 py-2 ml-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            type="text"
            placeholder="Default input"
            aria-label="default input example"
          />
        </div>

        <div class="flex justify-end px-2">
          <div>
            <b>Page</b> <span>{{ currentPage }}</span>
          </div>
        </div>

        <div v-for="(user, i) in users" :key="i" class="mobile-table">
          <div class="flex justify-between my-1">
            <div class="title-mobile">ชื่อ</div>
            <div>
              {{ user.name }}
            </div>
          </div>
          <div class="flex justify-between my-1">
            <div class="title-mobile">เบอร์โทรศัพท์</div>
            <div>
              {{ user.tel }}
            </div>
          </div>
          <div class="flex justify-between my-1">
            <div class="title-mobile">อีเมล</div>
            <div>
              {{ user.email }}
            </div>
          </div>
          <div class="flex justify-between my-1">
            <div class="title-mobile">ตำแหน่ง</div>
            <div>
              {{ user.role }}
            </div>
          </div>
          <div class="flex justify-between my-1">
            <div class="title-mobile">จัดการ</div>
            <div>
              <button
                type="button"
                @click="updateUser(i)"
                class="btn mx-1 btn-sm btn-outline-secondary"
              >
                Edit
              </button>
              <button
                type="button"
                @click="deleteUser(i)"
                class="btn mx-1 btn-sm btn-outline-danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <table class="table w-full rounded-sm">
          <thead>
            <tr class="border-b-2 border-gray-600 dark:bg-gray-800">
              <th class="py-3 px-3">ชื่อ</th>
              <th class="py-3 px-3">เบอร์โทรศัพท์</th>
              <th class="py-3 px-3">อีเมล</th>
              <th class="py-3 px-3">ตำแหน่ง</th>
              <th class="py-3 px-3"></th>
              <th class="py-3 px-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, i) in users"
              :key="i"
              class="border-b border-gray-600 dark:bg-gray-700"
            >
              <td class="p-3">{{ user.name }}</td>
              <td class="p-3">{{ user.tel }}</td>
              <td class="p-3">{{ user.email }}</td>
              <td class="p-3">{{ user.role }}</td>
              <td class="p-3">
                <button
                  type="button"
                  @click="updateUser(i)"
                  class="px-2 py-1 text-sm tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                >
                  Edit
                </button>
              </td>
              <td class="p-3">
                <button
                  type="button"
                  @click="deleteUser(i)"
                  class="px-2 py-1 text-sm tracking-wide text-white transition-colors duration-200 transform bg-red-500 rounded-md hover:bg-red-400 focus:outline-none focus:bg-red-400 focus:ring focus:ring-red-300 focus:ring-opacity-50"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          class="my-5 flex justify-center"
          role="group"
          aria-label="Second group"
        >
          <div>
            <button
              type="button"
              @click="changePage(i)"
              class="border py-1 px-3 bg-gray-600 hover:bg-gray-800 rounded-sm"
              v-for="(page, i) in allPages"
              :key="i"
            >
              {{ i + 1 }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
<script>
import axios from 'axios';

export default {
  name: 'SeeTask',
  data() {
    return {
      users: '',
      allPages: '',
      currentPage: '1',
      size: '',
    };
  },
  async mounted() {
    if (!localStorage.token) {
      return this.$router.push('/login');
    }
    this.getUsers();
    // this.checkLogin()
  },

  methods: {
    async getUsers() {
      try {
        const allUsers = await axios({
          method: 'get',
          url: `${process.env.VUE_APP_API}/users/?page=${this.currentPage}&size=10`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (allUsers.data.message === 'Role Unauthorized') {
          alert('คุณไม่ได้รับอุณญาติให้เข้าถึงข้อมูลนี้');
          this.$router.push({
            path: `/login`,
          });
        } else if (
          allUsers.data.message === 'token require' ||
          allUsers.data.message === 'token expired'
        ) {
          this.$router.push({
            path: `/login`,
          });
        }

        this.users = allUsers.data.data;
        this.allPages = parseInt(allUsers.data.allPages);
        this.currentPage = allUsers.data.currentPage;
      } catch (error) {
        console.error('error', error);
      }
    },
    async changePage(index) {
      const data = await axios({
        method: 'get',
        url: `${process.env.VUE_APP_API}/users?page=${index + 1}&size=10`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      this.users = data.data.data;
      this.currentPage = data.data.currentPage;
    },
    async deleteUser(index) {
      confirm(`คุณต้องการลบ ${this.users[index].name} หรือไม่`);
      await axios({
        method: 'delete',
        url: `${process.env.VUE_APP_API}/users/${this.users[index].userId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      await this.getUsers();
    },
    async updateUser(index) {
      this.$router.push({
        path: `/updateuser/${this.users[index].userId}`,
      });
      console.log(index);
    },
    // checkLogin() {
    //     if (!this.$store.getters.loggedIn) {
    //         this.$router.push({
    //             path: `/login`
    //         })
    //     } else {
    //         return null
    //     }
    // }
  },
};
</script>

<style scoped>
.mobile-table {
  border-top: 1px solid;
  padding-top: 5px;
  padding-bottom: 5px;
}

.title-mobile {
  font-weight: 600;
}

@media only screen and (max-width: 600px) {
  .table {
    display: none;
  }
}

@media only screen and (min-width: 600px) {
  .mobile-table {
    display: none;
  }
}
</style>
