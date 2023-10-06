import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '/public/iconfont.css'

import { ElButton, ElContainer, ElInput } from 'element-plus'



app.use(ElementPlus)

app.use(router)

app.mount('#app')
