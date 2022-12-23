import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite' //loadEnv方法获取对应的环境变量mode
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
// 开启按需加载及自动导入
import AutoImport from 'unplugin-auto-import/vite' //API自动引入插件
import Components from 'unplugin-vue-components/vite' // 组件自动引入插件
// 插件内置的解析器,像常用的组件库（element、antd 等）自动引入的一些配置都被内置了
import {
  ArcoResolver,
  VueUseComponentsResolver,
  VueUseDirectiveResolver
} from 'unplugin-vue-components/resolvers'
// icon 插件,基于 iconify(https://icones.js.org/) 图标库支持按需访问上万种图标,
import Icons from 'unplugin-icons/vite'
// icon 自动引入解析器
import IconsResolver from 'unplugin-icons/resolver'
// icon 加载 loader
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  // mode参数运行脚本命令时传入的 mode 值
  const viteEnv = loadEnv(mode, './')
  return {
    base: viteEnv.VITE_BASE, //公共基础路径
    server: {
      host: '0.0.0.0',
      port: 8080,
      open: true,
      // 端口占用直接退出
      strictPort: true
      // 本地服务 CORS 是否开启
      // cors: true,
      // proxy: {
      //   [viteEnv.VITE_BASE_URL]: {
      //     target: viteEnv.VITE_BASE_SERVER_URL,
      //     // 允许跨域
      //     changeOrigin: true,
      //     rewrite: path => path.replace(viteEnv.VITE_BASE_URL, '/')
      //   }
      // }
    },
    // 打包去除 console debugger
    esbuild: {
      pure: viteEnv.VITE_NODE_ENV === 'production' ? ['console.log', 'debugger'] : []
    },
    build: {
      outDir: 'dist',
      assetsDir: 'static/assets',
      // sourcemap: true,
      // 规定触发警告的 chunk 大小，消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      // 静态资源打包到dist下的不同目录
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    plugins: [
      vue(),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      AutoImport({
        // 需要去解析的文件
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        // imports 指定自动引入API的包名
        imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
        // 生成相应的自动导入json文件。
        resolvers: [ArcoResolver()]
      }),
      Components({
        // imports 指定组件所在目录，默认为 src/components
        dirs: ['src/components/', 'src/view/'],
        // 需要去解析的文件
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],

        resolvers: [
          ArcoResolver({
            sideEffect: true
          }),
          VueUseComponentsResolver(),
          VueUseDirectiveResolver(),
          // icon组件自动引入解析器使用
          IconsResolver({
            // icon自动引入的组件前缀 - 为了统一组件icon组件名称格式
            prefix: 'icon',
            // 自定义的icon模块集合
            customCollections: ['user', 'home']
          })
        ]
      }),
      // Icon 插件配置
      Icons({
        compiler: 'vue3',
        customCollections: {
          // user图标集，给svg文件设置 fill="currentColor" 属性，使图标的颜色具有适应性
          user: FileSystemIconLoader('src/assets/svg/user', svg =>
            svg.replace(/^<svg /, '<svg fill="currentColor" ')
          ),
          // home 模块图标集
          home: FileSystemIconLoader('src/assets/svg/home', svg =>
            svg.replace(/^<svg /, '<svg fill="currentColor" ')
          )
        },
        autoInstall: true
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
