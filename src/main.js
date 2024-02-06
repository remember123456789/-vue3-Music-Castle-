import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as getApi from '@/api/server.js'
const app = createApp(App)
import COMMON from './assets/js/common'
// import UTILS from './utlis/index.js'
// pinia

import { createPinia } from 'pinia'
const pinia = createPinia()
app.use(pinia)
// Element plu
import { ElButton, ElContainer, ElHeader, ElInput, ElCard, ElImage, ElSkeleton, ElMessage, ElTable, ElAffix, ElRow, ElCol } from 'element-plus'
import { vLoading } from 'element-plus/es/components/loading/src/directive' // 按需引入loading组件
import 'element-plus/theme-chalk/dark/css-vars.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '/public/iconfont.css'
//引入element UI图表
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css
app.use(vue3videoPlay)
// 引入字体
import './assets/fonts/iconfont.css'

app.config.globalProperties['$http'] = getApi
app.config.globalProperties['$mes'] = ElMessage
app.config.globalProperties['$common'] = COMMON
//工具
app.use(ElementPlus)
app.directive('load', vLoading) // 自定义load指令

app.use(router)

app.mount('#app')



