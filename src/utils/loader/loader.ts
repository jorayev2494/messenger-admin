import { ref, type Ref } from 'vue'

export function useLoader() {
  const value: Ref<boolean> = ref(false)

  const start = (): void => {
    value.value = true
  }

  const stop = (): void => {
    value.value = false
  }

  const toggle = (): void => {
    value.value = !value.value
  }

  return {
    value,

    start,
    stop,
    toggle,
  }
}
