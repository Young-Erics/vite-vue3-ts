<template>
  <div>
    <h2 @click="sonClick">子组件</h2>
    <h3>消息{{ props.msg }}</h3>
    <h4>student{{ student.name }}</h4>
    <h5>$parent的state.name:{{}}</h5>
    <slot :data="props.msg" />
    <p>readonly:{{ props.read?.a }}</p>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['childClik'])
const props = defineProps({
  msg: String,
  read: Object
})
const sonClick = () => emit('childClik', '来自子组件')
// setup语法糖下，父组件要获取子组件实例ref ，子组件的数据要通过 defineExpose导出
var student = reactive({
  name: '张三',
  age: 15,
  contact: {
    phone: '18714896998',
    qq: '103422412',
    email: 'wm218@qq.com'
  }
})

var studentNumber = ref(20)
const parent = getCurrentInstance()?.parent
console.log('parent', parent)

defineExpose({
  // ...student, 如果采用这种方式展开，暴露出的数据将不会同步
  ...toRefs(student), // 必需要通过toRefs数据才能同步
  studentNumber // 这里的数据可以同步
})
/*
 * readonly
 */
// props?.read = {} // 会警告，因为read对象是 被readonly定义的
</script>

<style scoped lang="scss"></style>
