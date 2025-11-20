export const buildFullURL = (
  baseURL: string | undefined,
  url: string | undefined,
  params?: any,
  paramsSerializer?: any
): string => {
  let full = ''

  if (baseURL) full += baseURL.replace(/\/+$/, '')
  if (url) full += '/' + url.replace(/^\/+/, '')

  if (params) {
    const query =
      paramsSerializer?.(params) ??
      new URLSearchParams(params).toString()

    if (query) full += `?${query}`
  }

  return full
}
