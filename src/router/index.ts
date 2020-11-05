/*
 * @Description:
 * @Version: 2.0
 * @Autor: wangyaju
 * @Date: 2020-10-29 15:40:58
 * @LastEditors: wangyaju
 * @LastEditTime: 2020-11-05 15:18:30
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Input from '../views/input.vue'
import Select from '../views/select'
import Form from '../views/form'
import Table from '../views/table'

const routes: Array<RouteRecordRaw> = [

  {
    path: '/input',
    name: 'input',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Input,
  },
  {
    path: '/select',
    name: 'select',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Select,
  },
  {
    path: '/form',
    name: 'form',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Form,
  },
  {
    path: '/table',
    name: 'table',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Table,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
