import Vue from 'vue'
import VueRouter from 'vue-router'
import Diary from '../views/Diary'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'diary',
        component: Diary,
        props:true
    },
    {
        path: '/dmark',
        name: 'dmark',
        component: () => import('../views/Dmark.vue'),
        props:true
    },
    {
        path: '/cuttime',
        name: 'cuttime',
        component: () => import('../views/Cuttime.vue')
    },
    {
        path: '/visitor',
        name: 'visitor',
        component: () => import('../views/Visitor.vue'),
        props:true
    },
    {
        path: '/editdiary',
        name: 'editdiary',
        component: () => import('../views/Editdiary.vue'),
        props:true
    },
    {
        path: '/adiary',
        name: 'adiary',
        component: () => import('../views/Adiary.vue'),
        props:true
    },
    {
        path: '/share',
        name: 'share',
        component: () => import('../views/Share.vue'),
        props:true
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    linkActiveClass: 'active'
})

export default router
