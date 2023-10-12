import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home/Home.vue'),
    
    },
    {
      path: '/rank',
      name: 'Rank',
      component: () => import('@/views/Rank/rank.vue')
    },
    {
      path: '/playlist',
      name:'playlist',
      component: () => import('@/views/playlist/playlist.vue')
    },
    {
      path: '/mv',
      component: () => import('@/views/MV/mv.vue')
    },
    {
      path: '/singer',
      component: () => import('@/views/Singer/singer.vue')
    }

  ]
})

export default router
