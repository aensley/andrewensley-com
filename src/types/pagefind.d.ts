interface PagefindUIOptions {
  element: HTMLElement | string
  showImages?: boolean
  resetStyles?: boolean
  bundlePath?: string
  pageSize?: number
  excerptLength?: number
  autofocus?: boolean
  debounceTimeoutMs?: number
  openFilters?: string[]
}

interface Window {
  PagefindUI?: new (options: PagefindUIOptions) => object
}
