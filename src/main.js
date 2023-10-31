import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as getApi from '@/api/server.js'
const app = createApp(App)
import COMMON from './assets/js/common'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '/public/iconfont.css'
import UTILS from './utlis/index.js'
import { ElButton, ElContainer, ElInput, ElCard, ElImage, ElSkeleton, ElMessage, ElTable, ElAffix, ElRow, ElCol } from 'element-plus'
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
app.config.globalProperties['$utlis'] = UTILS
app.use(ElementPlus)

app.use(router)

app.mount('#app')



