import { ref } from 'vue'
export function useButtonLoading(fun: any, options: any) {
  const { loading = false, onSuccess } = options || { loading: false }
  const requestLoading = ref(loading)
  const run = (...params: any) => {
    requestLoading.value = true
    return fun(...params)
      .then((res: any) => {
        // onSuccess表示接口调用成功之后的回调
        onSuccess && onSuccess(res)
        return res
      })
      .finally(() => {
        requestLoading.value = false
      })
  }
  return [requestLoading, run]
}
