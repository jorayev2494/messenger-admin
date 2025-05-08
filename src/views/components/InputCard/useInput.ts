import { onMounted, ref, toRefs, getCurrentInstance } from 'vue'

export default function useInput({ props }) {
  const clientSupportedLocales = ref([])

  const { form, inputs, values } = toRefs(props)

  const loadClientSupportedLocales = () => {
    clientSupportedLocales.value =
      getCurrentInstance().appContext.config.globalProperties.$clientSupportedLocales
  }

  const makeTranslates = () => {
    if (Array.isArray(form.value.translations)) {
      form.value.translations = {}
    }

    clientSupportedLocales.value.forEach((locale) => {
      const res = {}

      inputs.value.forEach((input) => {
        res[input.field] =
          Object.hasOwn(values.value, locale) && Object.hasOwn(values.value[locale], input.field)
            ? values.value[locale][input.field]
            : ''
        // res[input.field] = Object.hasOwn(form.value.translations[locale], input.field) ? form.value.translations[locale][input.field] : '';
      })

      form.value.translations[locale] = { ...res }
    })
  }

  onMounted(() => {
    loadClientSupportedLocales()
    // makeTranslates()
  })

  return {
    inputs,
    clientSupportedLocales,
  }
}
