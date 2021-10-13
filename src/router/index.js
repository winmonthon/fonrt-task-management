import Vue from "vue"
import VueRouter from "vue-router"

import Register from "../views/Register.vue"
import Task from "../views/CreateTask.vue"
import Login from "../views/Login.vue"
import SeeTask from "../views/SeeTask.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "/",
    component: Register,
  },
  {
    path: "/task",
    name: "Task",
    component: Task,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/task/:id",
    name: "SeeTask",
    component: SeeTask,
  },
]

const router = new VueRouter({
  mode: "history",
  routes,
})

export default router
