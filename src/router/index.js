import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home/Home.vue'),
    },
    //排行榜
    {
      path: '/rank',
      name: 'Rank',
      component: () => import('@/views/Rank/rank.vue')
    },
    //歌单列表
    {
      path: '/playlist',
      name: 'playlist',
      component: () => import('@/views/playlist/playlist.vue')
    },
    //mv列表
    {
      path: '/mv',
      name: 'mv',
      component: () => import('@/views/MV/mv.vue')
    },
    //播放mv
    {
      path: '/mv/mvsong',
      name: 'mvsong',
      component: () => import('@/views/MV/mvsong.vue')
    },

    //歌手
    {
      path: '/singer',
      name: 'singer',
      component: () => import('@/views/Singer/singer.vue')
    },
    // 歌曲详情
    {
      path: '/song',
      name: 'song',
      component: () => import('@/views/song/song.vue')
    },
    // 我的音乐
    {
      path: "/my",
      name: 'my',
      component: () => import('../views/my.vue')
    }

  ],
  // 路由发生变化时回到页面顶部
  scrollBehavior(to, form, savedPosition) {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  if (to.path == '/my') {
    if (sessionStorage.getItem('token')) {
      next()
    } else {
      alert('请先登录')
      next(from)
    }
  } else {
    next()
  }
})


export default router



