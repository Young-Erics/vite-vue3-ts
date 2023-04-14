import * as echarts from 'echarts'
import dayjs from 'dayjs'
export default {
  install(app: any, options: any) {
    app.config.globalProperties.$name = '杨陈chen'
    app.config.globalProperties.$echarts = echarts
    app.config.globalProperties.$dayjs = dayjs
    // console.log('options=>', options)
  }
}
