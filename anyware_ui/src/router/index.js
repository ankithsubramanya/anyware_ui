
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import FindSpace from '@/components/FindSpace'
import Warehouses from '@/components/MyWarehouses'
import Containers from '@/components/MyContainers'
import User from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/find',
      name: 'FindSpace',
      component: FindSpace
    },
    {
      path: '/warehouse',
      name: 'Warehouse',
      component: Warehouses
    },
    {
      path: '/container',
      name: 'Container',
      component: Containers
    },
    {
      path: '/user',
      name: 'User',
      component: User
    }
  ]
})
