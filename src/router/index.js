import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
  {
    path: '/',
  	meta: {
      title: 'Index',
      requireAuth: false
    },
    component: () => import('@/components/Index'),
    children: [
      {
          path: '/',
          meta: {
              title: 'SystemAnnocuncements',
          },
          component: () => import('@/components/componentTest/Sys-Announce'),
      },
      {
          path:'newForm',
          meta: {
            title: 'newForm',
          },
          component: () => import('@/components/componentTest/New Announce'),
      }
    ]
  }]
})
