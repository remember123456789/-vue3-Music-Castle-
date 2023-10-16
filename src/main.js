import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as getApi from '@/api/server.js'
const app = createApp(App)
import COMMON from './assets/js/common'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '/public/iconfont.css'

import { ElButton, ElContainer, ElInput,ElCard,ElImage,ElSkeleton ,ElMessage } from 'element-plus'

app.config.globalProperties['$http']=getApi
app.config.globalProperties['$mes']=ElMessage
app.config.globalProperties['$common']=COMMON
app.use(ElementPlus)

app.use(router)

app.mount('#app')



