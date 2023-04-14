// 这个文件负责管理所有的自定义指令
import dayjs from 'dayjs'
// 格式化时间戳
export const formatTimestamp = {
  created(bindings: any) {
    // 默认的格式
    bindings.formatString = 'YYYY-MM-DD HH:mm:ss'
  },
  mounted(el: any, bindings: any) {
    // bindings是指令传入的参数，el代表绑定的元素
    // 传入的参数值就代表要指定格式化日期
    if (bindings.value) {
      console.log('bindings.value', bindings.value)
      bindings.formatString = bindings.value
    }
    // 拿到元素的text
    const textContent = el.textContent
    let timestamp = parseInt(textContent)
    if (textContent.length === 10) {
      timestamp = timestamp * 1000
    }
    el.textContent = dayjs(timestamp).format(bindings.formatString)
  }
}
