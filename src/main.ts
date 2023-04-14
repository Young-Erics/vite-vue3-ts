import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
// 引入清除html默认样式的 css文件
import '@/styles/normalize.css'
import 'animate.css'
import * as directives from '@/directive'
import plugins from '@/plugins'
import component from '@/components'
import App from './App.vue'
import router from './router'
const app = createApp(App)
const pinia = createPinia()
// 注册所有的 自定义指令
Object.keys(directives).forEach(key => {
  app.directive(key, directives[key])
})
pinia.use(piniaPluginPersist) //pinia开启数据缓存
app.use(component) //注册全局组件
app.use(plugins)
app.use(pinia)
app.use(router)
app.mount('#app')
