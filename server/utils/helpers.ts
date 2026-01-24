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
