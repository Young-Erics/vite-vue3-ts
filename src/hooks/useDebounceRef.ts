import { customRef } from 'vue'
// 自定义ref
// 创建一个自定义的ref，并对其依赖项跟踪和更新触发进行显示控制
export default function (value, delay = 300) {
  let timer: number | null | undefined = null
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}
