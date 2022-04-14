import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children:[
        {
          path:'dashboard',
          name:'dashboard',
          component:()=>import('@/components/Dashboard.vue')
        },
        {
          path:'goods',
          name:'goods',
          component:()=>import('@/components/Goods.vue')
        },
        {
          path:'cogetory',
          name:'cogetory',
          component:()=>import('@/components/Cogetory.vue')
        },
        {
          path:'order',
          name:'order',
          component:()=>import('@/components/Order.vue')
        },
        {
          path:'users',
          name:'users',
          component:()=>import('@/components/Users.vue')
        },
        {
          path:'editor',
          name:'edtior',
          component:()=>import('@/components/Editor.vue')
        },
        {
          path:'editorid',
          name:'edtiorid',
          component:()=>import('@/components/Editorid.vue')
        },
      ]
    },
    
  ]       
})


export default router
