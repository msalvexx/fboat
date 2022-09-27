type Page = { size: number, number: number }

export type PageResult<T> = {
  items: Array<Partial<T>>
  page: Page
}
