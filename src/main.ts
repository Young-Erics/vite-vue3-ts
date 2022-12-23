import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 引入 清楚 html默认样式的 css文件
import '@/styles/normalize.css'
import 'animate.css'
import App from './App.vue'
import router from './router'
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
