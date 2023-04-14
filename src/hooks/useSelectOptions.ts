import { ref, onMounted, reactive } from 'vue'
export function useSelectOptions(props: any) {
  const loading = ref(false)
  const options = ref([])
  const { apiFun } = props
  const loadData = () => {
    loading.value = true
    options.value = []
    return apiFun().then(
      (res: any) => {
        loading.value = false
        options.value = res
        return res
      },
      (err: any) => {
        loading.value = false
        options.value = []
        return Promise.reject(err)
      }
    )
  }
  onMounted(loadData)
  return reactive({
    options,
    loading
  })
}
