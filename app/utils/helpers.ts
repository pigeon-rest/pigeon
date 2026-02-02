export function getStatusDescription(code: number) {
  if (STATUS_DESCRIPTIONS[code]) {
    return STATUS_DESCRIPTIONS[code]
  }

  if (code >= 100 && code < 200)
    return 'This is a 1xx response. The request was received, continuing process.'
  if (code >= 200 && code < 300)
    return 'This is a 2xx response. The request was successfully received, understood, and accepted.'
  if (code >= 300 && code < 400)
    return 'This is a 3xx response. Further action needs to be taken in order to complete the request.'
  if (code >= 400 && code < 500)
    return 'This is a 4xx error. The request contains bad syntax or cannot be fulfilled.'
  if (code >= 500)
    return 'This is a 5xx response. The server failed to fulfill an apparently valid request.'

  return 'Unknown Status.'
}

export function getStatusIcon(code: number) {
  if ((code >= 100 && code < 200) || (code >= 300 && code < 400))
    return 'i-ph-info'
  if (code >= 200 && code < 300) return 'i-ph-check'
  if (code >= 400 && code < 500) return 'i-ph-x'
  if (code >= 500) return 'i-ph-x'

  return 'i-ph-question-mark'
}

export function getStatusColor(code: number) {
  if ((code >= 100 && code < 200) || (code >= 300 && code < 400)) return 'info'
  if (code >= 200 && code < 300) return 'success'
  if (code >= 400 && code < 500) return 'error'
  if (code >= 500) return 'error'

  return 'neutral'
}

export function mimeToLang(contentType: string) {
  const mime = contentType.split(';')[0]!.trim().toLowerCase()

  return MIME_TYPES[mime] || 'txt'
}

export function isImageMimeType(mimeType: string) {
  return mimeType.startsWith('image/') && mimeType !== 'image/svg+xml'
}

export function isPDFMimeType(mimeType: string) {
  return mimeType === 'application/pdf'
}

export function isHTMLMimeType(mimeType: string) {
  return mimeType.startsWith('text/html')
}

export function isSVGMimeType(mimeType: string) {
  return mimeType === 'image/svg+xml'
}

export function isAudioMimeType(mimeType: string) {
  return mimeType.startsWith('audio/')
}

export function isVideoMimeType(mimeType: string) {
  return mimeType.startsWith('video/')
}
