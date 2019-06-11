import Vue from 'vue'
import Router from 'vue-router'
// import addUser from '../pages/main/components/add'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/addUser',
      name: 'addUser',
      component: ()=> import('../pages/main/components/addUser.vue')
    },
    {
      path: '/listUsers',
      name: 'listUsers',
      component: ()=> import('../pages/main/components/listUsers.vue')
    },
    {
      path: '/addIvg',
      name: 'addIvg',
      component: ()=> import('../pages/main/components/addIvg.vue')
    },
    {
      path: '/listIvgs',
      name: 'listIvgs',
      component: ()=> import('../pages/main/components/listIvgs.vue')
    },
    {
      path: '/setUserIvg',
      name: 'setUserIvg',
      component: ()=> import('../pages/main/components/setUserIvg.vue')
    },
    {
      path: '/addTask',
      name: 'addTask',
      component: ()=> import('../pages/main/components/addTask.vue')
    },
    {
      path: '/listTasks',
      name: 'listTasks',
      component: ()=> import('../pages/main/components/listTasks.vue')
    },
    {
      path: '/modifyMyInfo',
      name: 'modifyMyInfo',
      component: ()=> import('../pages/main/components/modifyMyInfo.vue')
    },
    {
      path: '/checkMyIvgInfo',
      name: 'checkMyIvgInfo',
      component: ()=> import('../pages/main/components/checkMyIvgInfo.vue')
    },
    {
      path: '/submitTask',
      name: 'submitTask',
      component: ()=> import('../pages/main/components/submitTask.vue')
    },
    {
      path: '/checkIsSubmitedTasks',
      name: 'checkIsSubmitedTasks',
      component: ()=> import('../pages/main/components/checkIsSubmitedTasks.vue')
    },
    {
      path: '/checkOtherSubmitedTasks',
      name: 'checkOtherSubmitedTasks',
      component: ()=> import('../pages/main/components/checkOtherSubmitedTasks.vue')
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
