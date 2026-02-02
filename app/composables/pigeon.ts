import { FetchError } from 'ofetch'

import type { InternalApi } from 'nitropack'

export function usePigeon() {
  const isLoading = ref(false)
  const response = ref<InternalApi['/api/proxy']['post'] | null>(null)
  const error = ref<FetchError | null>(null)
  let abortController: AbortController | null = null

  const send = async (data: any) => {
    isLoading.value = true
    abortController = new AbortController()

    try {
      const json = await $fetch('/api/proxy', {
        method: 'POST',
        body: {
          request: {
            body: data.body,
            headers: {
              'user-agent': 'Pigeon/0.0.1',
              ...data.headers
            },
            method: data.method,
            url:
              data.url +
              (data.params
                ? `?${new URLSearchParams(data.params).toString()}`
                : '')
          }
        },
        signal: abortController.signal
      })

      response.value = json
      error.value = null
    } catch (err) {
      if (err instanceof FetchError) {
        error.value = err.data
      }
    } finally {
      isLoading.value = false
      abortController = null
    }
  }

  const abort = () => {
    abortController?.abort()
  }

  return {
    isLoading,
    response,
    error,
    send,
    abort
  }
}
