import Vue from 'vue'
import Router from 'vue-router'
import DApp from '@/components/DApp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Deliverchain',
      component: DApp
    }
  ]
})
