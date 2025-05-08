export interface PaginateInterface<T> {
  current_page: number
  data: T[]
  next_page: number | null
  next_page_url: string | null
  last_page: number | null
  last_page_url: string | null
  per_page: number
  to: number
  total: number
}
