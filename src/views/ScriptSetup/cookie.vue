<template>
  <div>
    <hr />
    cookie
  </div>
</template>

<script setup lang="ts">
const proxy = getCurrentInstance()?.proxy
/* 设置cookie */
document.cookie = 'myName=yc'
document.cookie = 'age=25'
/* 读取cookie */
console.log('读取cookie', document.cookie)
let date = new Date()
let getDates = date.getDate()
let setDate = date.setDate(17) //setDate 会改变 date的日期,返回值是设置目的日期之后的时间戳
let format = proxy?.$dayjs(setDate).format('YYYY-MM-DD HH:mm:ss')
console.log('date', date)
console.log('getDate', getDates) // 17,返回日期 几号
console.log('setDate', setDate, format)
/* 给cookie设置过期时间,10秒后失效过期 */
var date2 = new Date('2023-1-17 14:53:12')
console.log('date2', date2)
setTimeout(() => {
  document.cookie = `age=25;expires=${date2}`
  console.log('过期cookie', document.cookie)
}, 2000)
/* 删除cookie，只需要给expires设置一个以前的时间 */
</script>

<style lang="scss" scoped></style>
