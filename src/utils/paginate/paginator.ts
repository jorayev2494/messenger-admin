import { ref, type Ref } from 'vue'
import type { QueryParamsInterface } from './entities/contracts/QueryParamsInterface'
import type { PaginateInterface } from './entities/contracts/PaginateInterface'

export function usePaginator<T>() {
  const page: Ref<number> = ref(1)
  const perPage: Ref<number> = ref(10)
  const lastPage: Ref<number | null> = ref(1)
  const to: Ref<number> = ref(0)
  const total: Ref<number> = ref(0)
  const perPageOptions: number[] = [2, 10, 25, 50, 75, 100]

  const toQueryParams = (): QueryParamsInterface => ({
    page: page.value,
    per_page: perPage.value,
  })

  const setMetaData = (data: PaginateInterface<T>) => {
    const { current_page, last_page, per_page, to: dTo, total: dTotal } = data

    page.value = current_page
    perPage.value = per_page
    lastPage.value = last_page
    to.value = dTo
    total.value = dTotal
  }

  const isLastPage = (): boolean => lastPage.value === 1

  const serverPaginate = (data: {
    change_type: string
    current_page: number
    pagesize: number
  }) => {
    if (['page', 'pagesize'].includes(data.change_type)) {
      page.value = data.current_page ?? page.value
      perPage.value = data.pagesize ?? perPage.value
    }
  }

  return {
    page,
    perPage,
    lastPage,
    to,
    total,
    perPageOptions,

    setMetaData,
    serverPaginate,
    toQueryParams,
    isLastPage,
  }
}
