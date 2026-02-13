import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TokenView from '../views/PaginaToken.vue'
import PaginaVehiculo from '@/views/PaginaVehiculo.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/token',
    name: 'token',
    component: TokenView
  },
  {
    path: '/vehiculo',
    name: 'vehiculo',
    component: PaginaVehiculo
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
