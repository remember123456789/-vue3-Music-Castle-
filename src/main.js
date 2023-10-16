import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as getApi from '@/api/server.js'
const app = createApp(App)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '/public/iconfont.css'

import { ElButton, ElContainer, ElInput,ElCard,ElImage,ElSkeleton } from 'element-plus'

app.config.globalProperties['$http']=getApi


app.use(ElementPlus)

app.use(router)

app.mount('#app')



