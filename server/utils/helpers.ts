import { Buffer } from 'node:buffer'

import type { TLSSocket } from 'node:tls'

export function computeHeaderSize(headers: Record<string, any>) {
  let size = 0

  for (const [key, value] of Object.entries(headers || {})) {
    const valStr = Array.isArray(value) ? value.join(', ') : String(value)
    const line = `${key}: ${valStr}\r\n`

    size += Buffer.byteLength(line, 'utf-8')
  }

  return size + 2
}

export function computeBodySize(body: any) {
  if (!body) return 0

  if (typeof body === 'string') {
    return Buffer.byteLength(body, 'utf-8')
  }

  if (Buffer.isBuffer(body)) {
    return body.length
  }

  if (typeof body === 'object') {
    return Buffer.byteLength(JSON.stringify(body), 'utf-8')
  }

  return 0
}

export function getNetworkInfo(socket: TLSSocket, httpVersion: string) {
  const baseInfo = {
    httpVersion,
    localAddress: socket.localAddress,
    remoteAddress: socket.remoteAddress || '',
    tlsProtocol: null,
    cipherName: null,
    certificate: null
  }

  if (!socket?.encrypted) return baseInfo
  const cert = socket.getPeerCertificate(true)
  const cipher = socket.getCipher()

  return {
    ...baseInfo,
    tlsProtocol: socket.getProtocol(),
    cipherName: cipher?.name || null,
    certificate: cert.subject
      ? {
          cn: cert.subject.CN,
          issuer: cert.issuer.CN,
          validUntil: cert.valid_to
        }
      : null
  }
}

const NODE_CONNECTION_ERRORS: Record<string, string> = {
  ECONNREFUSED:
    'No connection could be made because the target machine actively refused it. This usually results from trying to connect to a service that is inactive on the foreign host.',
  ECONNRESET:
    'A connection was forcibly closed by a peer. This normally results from a loss of the connection on the remote socket due to a timeout or reboot. Commonly encountered via the [http](https://nodejs.org/api/http.html) and [net](https://nodejs.org/api/net.html) modules.',
  ENOTFOUND:
    'Indicates a DNS failure of either `EAI_NODATA` or `EAI_NONAME`. This is not a standard POSIX error.',
  ETIMEDOUT:
    'A connect or send request failed because the connected party did not properly respond after a period of time. Usually encountered by [http](https://nodejs.org/api/http.html) or [net](https://nodejs.org/api/net.html). Often a sign that a `socket.end()` was not properly called.',
  ERR_UNSUPPORTED_PROTOCOL:
    '`http.connect()` was passed a URL that uses any protocol other than `http:` or `https:`.'
}

export function getErrorDescription(code: string) {
  return NODE_CONNECTION_ERRORS[code] || 'An unknown network error occurred.'
}
