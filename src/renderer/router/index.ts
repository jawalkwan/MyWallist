import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'image-gallery',
    component: () => import('@/components/ImageGallery.vue')
  },
  {
    path: '/landing',
    name: 'landing-page',
    component: () => import('@/components/LandingPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
