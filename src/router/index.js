import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
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
      name: 'playlist',
      component: () => import('@/views/playlist/playlist.vue')
    },
    {
      path: '/mv',
      name: 'mv',
      component: () => import('@/views/MV/mv.vue')
    },
    {
      path: '/mv/mvsong',
      name: 'mvsong',
      component: () => import('@/views/MV/mvsong.vue')
    },


    {
      path: '/singer',
      name: 'singer',
      component: () => import('@/views/Singer/singer.vue')
    },
    {
      path: '/song',
      name: 'song',
      component: () => import('@/views/song/song.vue')
    }

  ]
})

export default router
