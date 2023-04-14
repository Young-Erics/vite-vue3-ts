<template>
  <div>scrollX {{ scrollX }}</div>
  <div>scrollY {{ scrollY }}</div>
  <a-button type="primary" :loading="loading" @click="handleClick">
    <template #icon>
      <icon-plus />
    </template>
    {{ buttonText }}
  </a-button>
  <a-select v-bind="selectBind" :style="{ width: '300px' }" size="large" />
</template>

<script setup lang="ts">
import useTitle from '@/hooks/useTitle'
import useScrollPosition from '@/hooks/useScrollPosition'
import { IconPlus } from '@arco-design/web-vue/es/icon'
import { useButtonLoading } from '@/hooks/buttonLoading'
import { useSelectOptions } from '@/hooks/useSelectOptions'
import { submitApi, getRemoteData } from '@/api/index'
const title = useTitle('yc')
setTimeout(() => {
  title.value = '周杰伦'
}, 2000)
// 获取滚动条偏移
const { scrollX, scrollY } = useScrollPosition()
// ------下拉选择框----------
const selectBind = useSelectOptions({ apiFun: getRemoteData })
// ------点击提交按钮的 loading状态------
const buttonText = ref('Click Me')
// 选项参数，这里可以定义 接口调用成功后的回调函数来特定的处理一些数据
const options = {
  loading: false,
  onSuccess: function (res: any) {
    let reg = /\w+/
    if (reg.test(res.text)) {
      buttonText.value = res.text.replace(reg, 'abc')
    } else {
      buttonText.value = 'Click Me'
    }
  }
}
const [loading, submit] = useButtonLoading(submitApi, options)
function handleClick() {
  submit(buttonText.value).then((res: any) => {
    console.log('res', res)
  })
}
</script>

<style lang="scss" scoped></style>
