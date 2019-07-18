import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Editor from './views/ScheduleEditor.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/',
      name: 'editor',
      component: Editor // () => import('./views/ScheduleEditor.vue')
    },
    {
      path: '/editor/:schedule_id',
      name: 'editor-params',
      component: () => import('./views/ScheduleEditor.vue')
    },
    { path: '*', redirect: { name: 'editor' }}
  ]
})
