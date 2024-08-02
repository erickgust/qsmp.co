import { APIError } from "./errors/api-error"

type Options = {
  body?: Record<string, unknown>
} & Omit<RequestInit, 'body'>

async function request (path: string, options?: RequestInit) {
  const baseUrl = ':)'

  const url = new URL('api' + path, baseUrl)

  const response = await fetch(url, {
    ...options,
  })

  const contentType = response.headers.get('Content-Type')

  if (response.status === 204) {
    return
  }

  if (!contentType?.includes('application/json')) {
    throw new APIError(response)
  }

  const body = await response.json()

  if (response.ok) {
    return body
  }

  throw new APIError(response, body)
}

type Path = `/${string}`

function createRequest (method: string) {
  return (path: string, options?: Options) => {
    return request(path, {
      method,
      body: JSON.stringify(options?.body),
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      signal: options?.signal,
    })
  }
}

async function get (path: Path, options?: Options) {
  return request(path, {
    headers: options?.headers,
    signal: options?.signal,
  })
}

async function post (path: Path, options?: Options) {
  const request = createRequest('POST')
  return request(path, options)
}

const api = {
  get,
  post,
}

export default api
