import Vue from "vue"
import VueRouter from "vue-router"

import Register from "../views/register/Register.vue"
import CreateTask from "../views/task/CreateTask.vue"
import Login from "../views/Login.vue"
import SeeAllTaskSupervior from "../views/task/SeeAllTaskSupervisor.vue"
import RegisterSuccess from "../views/register/RegisterSuccess.vue"
import CreateTaskSuccess from "../views/task/CreateTaskSuccess.vue"
import SeeAllusers from "../views/users/SeeAllUsers.vue"
import UpdateUser from "../views/users/UpdateUser.vue"
import PageNotFound from "../views/NotFound.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Register",
    component: Register,
  },
  {
    path: "/users",
    name: "SeeAllUsers",
    component: SeeAllusers,
  },
  {
    path: "/updateuser/:id",
    name: "UpdateUsers",
    component: UpdateUser,
  },
  {
    path: "/task/supervisor",
    name: "SeeAllTaskSupervisor",
    component: SeeAllTaskSupervior,
  },

  {
    path: "/createtasksuccess",
    name: "CreateTaskSuccess",
    component: CreateTaskSuccess,
  },
  {
    path: "/registersuccess",
    name: "RegisterSuccess",
    component: RegisterSuccess,
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/task",
    name: "Task",
    component: CreateTask,
  },
  {
    path: "*",
    name: "NotFound",
    component: PageNotFound,
  },
]

const router = new VueRouter({
  mode: "history",
  routes,
})

export default router
