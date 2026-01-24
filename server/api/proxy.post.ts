import { parseSetCookie } from 'cookie-es'
import { got } from 'got'
import { CookieJar } from 'tough-cookie'

import type { TLSSocket } from 'node:tls'
import type { SetCookie } from 'cookie-es'
import type { PlainResponse } from 'got'

export default defineEventHandler(async (event) => {
  const { request } = await readBody(event)

  const allCookies: SetCookie[] = []
  const cookieJar = new CookieJar()

  const useCookies = (headers: PlainResponse['headers'], url?: URL) => {
    const setCookie = headers['set-cookie']

    if (!setCookie?.length) return
    const hostname = url?.hostname

    allCookies.push(
      ...setCookie.map((c) => ({
        httpOnly: false,
        secure: false,
        sameSite: 'lax' as const,
        path: '/',
        domain: hostname,
        ...parseSetCookie(c)
      }))
    )
  }

  try {
    const isPayloadMethod = !['GET', 'HEAD'].includes(request.method)
    const hasPayload = isPayloadMethod && request.body
    const jsonBody = hasPayload && typeof request.body === 'object' ? request.body : undefined
    const textBody = hasPayload && typeof request.body === 'string' ? request.body : undefined

    const response = await got(request.url, {
      method: request.method,
      headers: request.headers,
      json: jsonBody,
      body: textBody,
      cookieJar,
      responseType: 'buffer',
      followRedirect: true,
      maxRedirects: 10,
      throwHttpErrors: false,
      hooks: {
        beforeRedirect: [
          (options, response) => useCookies(response.headers, options.url)
        ]
      }
    })

    useCookies(response.headers, response.requestUrl)

    const requestHeadersSize = computeHeaderSize(request.headers)
    const requestBodySize = computeBodySize(request.body)
    const responseHeadersSize = computeHeaderSize(response.headers)
    const responseBodySize = computeBodySize(response.rawBody)
    const networkInfo = getNetworkInfo(response.request.socket as TLSSocket, response.httpVersion)

    const {
      wait = 0,
      dns = 0,
      tcp = 0,
      tls = 0,
      request: req = 0,
      firstByte = 0,
      download = 0,
      total = 0
    } = response.timings.phases

    return {
      response: {
        status: response.statusCode,
        statusText: response.statusMessage,
        headers: response.headers,
        cookies: allCookies.length ? allCookies : null,
        body: {
          content: Array.from(response.rawBody),
          mediaType: response.headers['content-type']
        },
        meta: {
          timimgs: {
            wait,
            dns,
            tcp,
            tls,
            request: req,
            firstByte,
            download,
            total
          },
          size: {
            headers: responseHeadersSize,
            body: responseBodySize,
            total: responseHeadersSize + responseBodySize
          },
          network: networkInfo
        }
      },
      request: {
        meta: {
          size: {
            headers: requestHeadersSize,
            body: requestBodySize,
            total: requestHeadersSize + requestBodySize
          }
        }
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Proxy Error',
      message: error.message || 'Unknown error'
    })
  }
})
