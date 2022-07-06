import Vue from 'vue'
import VueRouter from 'vue-router'

import Register from '../views/register/Register.vue'
import CreateTask from '../views/task/CreateTask.vue'
import Login from '../views/Login.vue'
import Logout from '../views/auth/Logout.vue'
import SeeAllTaskSupervior from '../views/task/SeeAllTaskSupervisor.vue'
import SeeAllTaskSale from '../views/task/SeeAllTaskSale.vue'
import SeeAllTaskEngineer from '../views/task/SeeAllTaskEngineer.vue'
import RegisterSuccess from '../views/register/RegisterSuccess.vue'
import CreateTaskSuccess from '../views/task/CreateTaskSuccess.vue'
import SeeAllusers from '../views/users/SeeAllUsers.vue'
import UpdateUser from '../views/users/UpdateUser.vue'
import PageNotFound from '../views/NotFound.vue'
import UpdateTaskSupervisor from '../views/task/UpdateTaskSupervisor.vue'
import UpdateTaksSale from '../views/task/UpdateTaskSale.vue'
import UpdateTaskEngineer from '../views/task/UpdateTaskEngineer.vue'
import Calendar from '../views/task/calendar.vue'
import Dashboard from '../views/dash-board/view/dash-board.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
    },
    {
        path: '/calendar/:userId',
        name: 'Calendar',
        component: Calendar,
    },
    {
        path: '/',
        name: 'Register',
        component: Register,
    },
    {
        path: '/users',
        name: 'SeeAllUsers',
        component: SeeAllusers,
    },
    {
        path: '/updateuser/:id',
        name: 'UpdateUsers',
        component: UpdateUser,
    },
    {
        path: '/task/supervisor/edit/:taskId',
        name: 'UpdateTaskSupervisor',
        component: UpdateTaskSupervisor,
    },
    {
        path: '/task/engineer/edit/:taskId',
        name: 'UpdateTaskEngineer',
        component: UpdateTaskEngineer,
    },
    {
        path: '/task/sale/edit/:taskId',
        name: 'UpdateTaskSale',
        component: UpdateTaksSale,
    },
    {
        path: '/task/supervisor',
        name: 'SeeAllTaskSupervisor',
        component: SeeAllTaskSupervior,
    },
    {
        path: '/task/engineer',
        name: 'SeeAllTaskEngineer',
        component: SeeAllTaskEngineer,
    },
    {
        path: '/task/sale',
        name: 'SeeAllTaskSale',
        component: SeeAllTaskSale,
    },

    {
        path: '/createtasksuccess',
        name: 'CreateTaskSuccess',
        component: CreateTaskSuccess,
    },

    {
        path: '/registersuccess',
        name: 'RegisterSuccess',
        component: RegisterSuccess,
    },

    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/logout',
        name: 'Logout',
        component: Logout,
    },
    {
        path: '/task',
        name: 'Task',
        component: CreateTask,
    },
    {
        path: '*',
        name: 'NotFound',
        component: PageNotFound,
    },
]

const router = new VueRouter({
    mode: 'history',
    routes,
})

export default router