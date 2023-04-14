<template>
  <div>
    <h2>我是父组件</h2>
    <child @child-clik="childCli" msg="hello" ref="son" :read="readOnlyInfo">
      <!-- 作用域插槽 -->
      <template v-slot:default="slotscope">
        <h2>插槽:{{ slotscope.data }}</h2>
      </template>
    </child>
    <grand-son />
    <Suspense>
      <!-- 异步组件 -->
      <!-- 允许我们的应用程序在等待异步组件时渲染一些后备内容，可以让我们创建一个平滑的用户体验 -->
      <template #default>
        <asynCom :time="3000" />
      </template>
      <!-- 后备内容，异步组件没渲染之前要显示的 -->
      <template v-slot:fallback>
        <h1>Loading.....</h1>
      </template>
    </Suspense>
    <!-- 动态组件 -->
    <div>动态组件</div>
    <Dynamic />
    <!-- 内置组件transition -->
    <tran />
    <a-button type="primary" @click="changeSRef">修改sRef:{{ sRef.name }}</a-button>
    <a-input
      :style="{ width: '320px' }"
      v-model="inputVal"
      placeholder="Please enter something"
      allow-clear
    />
    <p>fullName:{{ fullName }}</p>
    <a-input v-model="fullName2" />
    <a-button type="primary" @click="changeFullName">停止侦听watchEffect:{{ fullName }}</a-button>
    <a-button type="primary" @click="changeFurit">改变fruit的值</a-button>
    <a-button type="primary" @click="changeToolAndPhone">changeToolAndPhone</a-button>
    <hr />
    <vModel />
    <hr />
    <div>2秒后改变网页标签标题</div>
    <useHooks />
    <!-- h函数 -->
    <render />
    <!-- 格式化时间戳 -->
    <div v-formatTimestamp="'YYYY-MM-DD'">{{ timeStamp }}</div>
    <!-- 全局name -->
    <!-- <div>{{ $name }}</div> -->
    <!-- <div>测试{{ $name }}</div> -->
    <!-- 全局组件 -->
    <hello-world />
    <h2 @click="changeMessage" ref="h2dom">{{ message }}</h2>
    <cookies />
    <piniaStore></piniaStore>
  </div>
</template>

<script setup lang="ts">
import child from './child.vue'
import GrandSon from './GrandSon.vue'
import Dynamic from './dynamic.vue'
import tran from './transition.vue'
import vModel from './v-model.vue'
import useHooks from './useHooks.vue'
import render from './render.vue'
import debounceRef from '@/hooks/useDebounceRef'
import cookies from './cookie.vue'
import piniaStore from './Pinia.vue'
const childCli = (val: any) => {
  console.log('childCli', val)
}
const son = ref(null as any)
console.log('son的ref', son)
const state = reactive({
  name: '张三',
  title: '标题'
})
// const {name,title} = state // 这样的es6解构不是响应式的
const { name, title } = toRefs(state) // 这样才是响应式的
// 只想转换reactive对象中的某个属性为响应式的
const uname = toRef(state, 'name')
/*
 * shallowRef 创建一个浅层的ref对象；
 */
const sRef = shallowRef({ name: 'yc' })
const changeSRef = () => {
  sRef.value.name = 'cyyy' //单独这样是修改不了的
  triggerRef(sRef) //加上这个能成功修改
}
//  -------------customRef-------------
// 对双向绑定的属性进行debounce(防抖)的操作
let inputVal = debounceRef('Hello World')
let info
// 获取组件值，必需要挂载完成之后才能获取
onMounted(() => {
  setTimeout(() => {
    // 1. 获取组件对外暴露接口，采用 son._value 方式
    // 2. 必需定义成动态响应式的(toRefs或toRef转换)，否则暴露的数据为只读
    info = { ...toRefs(son._value) }
    console.log('info', info)
    // 改变子组件的值，也会同步更新到组件
    info.name.value = '李四'
  }, 3000)
})
// 跨组件（父孙）传值
const color = ref('red')
provide('color', color)
provide('state', state)

// 跨组件通信
// pnpm add mitt
// 异步组件
const asynCom = defineAsyncComponent(() => import('./AsyncComponent.vue'))
// readonly API, readonly会返回原生对象的只读代理,只能使用不能修改
const r = reactive({
  a: 'b',
  c: 'a'
})
const readOnlyInfo = readonly(r)
//  ------------计算属性computed-------------
/*
 * 方式一：接收一个getter函数，并为 getter 函数返回的值，返回一个不变的 ref 对象；
 * 方式二：接收一个具有 get 和 set 的对象，返回一个可变的（可读写）ref 对象；
 */
let firstName = ref('杨')
let lastName = ref('陈')
let fullName = computed(() => {
  return firstName.value + lastName.value
})
const fullName2 = computed({
  get: () => {
    return firstName.value + lastName.value
  },
  // 改变计算属性的值
  set: newValue => {
    firstName.value = newValue.substring(0, 1)
    lastName.value = newValue.substring(1)
  }
})
//  ------------侦听器 watch watchEffect-------------
/*
 *  1.watchEffect会自动侦听函数中收集的依赖，初始化的时候默认执行一次，并且收集依赖
 *  2.返回值是一个函数，调用函数就会停止侦听
 *  3.onInvalidate清楚副作用
 * 什么是清除副作用呢？
  比如在开发中我们需要在侦听函数中执行网络请求，但是在网络请求还没有达到的时候，我们停止了侦听器，
  或者侦听器侦听函数被再次执行了。
  那么上一次的网络请求应该被取消掉，这个时候我们就可以清除上一次的副作用
 */
const stopWatch = watchEffect(onInvalidate => {
  console.log('watchEffect执行了fullName2', fullName2.value)
  const timer = setTimeout(() => {
    console.log('watchEffect两秒后执行的操作')
  }, 2000)
  // 当副作用即将重新执行 或者 侦听器被停止 时会执行onInvalidate传入的回调函数
  onInvalidate(() => {
    clearTimeout(timer)
  })
})
const changeFullName = () => {
  if (fullName.value != '杨陈') {
    stopWatch()
  }
}
// 改变watchEffect的执行时机
watchEffect(
  () => {
    console.log('son组件的打印', son.value) // 只是这样的话，会打印两次：null 和 元素
  },
  {
    flush: 'post' // 这一行代码就只会打印出元素；flush的默认值是pre，它会在元素 挂载或者 更新 之前执行
  }
)
//  ------------侦听器 watch -------------
/*
   1.懒执行，第一次页面加载不会执行，除非设置 immediate:true
   2.可访问侦听状态更新前后的值
   3.第一个参数是 被侦听的对象，第二个参数是回调函数，第三个参数是配置项
*/
const fruit = ref('苹果')
watch(
  fruit,
  (newValue, oldValue) => {
    console.log('侦听fruit', newValue)
  },
  { immediate: true, deep: false }
)
const changeFurit = () => {
  fruit.value = '桃子'
}
// 侦听多个数据源，使用数组的形式
let tool = ref('鼠标')
let phone = ref('iPhone')
watch([tool, phone], (n, o) => {
  console.log('侦听多个', n) //打印的值是 数组形式 ['键盘'，'三星'']
})
const changeToolAndPhone = () => {
  tool.value = '键盘'
  phone.value = '三星'
}
// 对非响应式数据进行侦听，第1个参数要使用回调函数的形式
const cup = reactive({
  one: '马克杯',
  two: '普通杯子'
})
watch(
  () => ({ ...cup }), //直接展开cup，数据不是响应式的，所以要用回调函数
  (n, o) => console.log('非响应式数据', n) //打印出的是个对象的形式
)
setTimeout(() => {
  cup.one = '保温杯'
}, 1000)
/*
  自定义指令
*/
// 格式化时间戳
const timeStamp = ref(+new Date())
/**
 *  nextTick
 */
let message = ref('恰似一江春水向东流')
let h2dom = ref(null)
const changeMessage = () => {
  message.value = '今朝有酒今朝醉'
  nextTick(() => {
    console.log('h2dom', h2dom)
  })
}
</script>

<style scoped lang="scss">
// 渲染 h函数创造h2标签的类名
.render {
  color: red;
}
</style>
