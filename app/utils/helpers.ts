export const STATUS_DESCRIPTIONS: Record<number, string> = {
  // 1xx: Informational
  100: 'This interim response indicates that the client should continue the request or ignore the response if the request is already finished.',
  101: 'This code is sent in response to an [`Upgrade`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Upgrade) request header from the client and indicates the protocol the server is switching to.',
  102: 'This code was used in [`WebDAV`](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV) contexts to indicate that a request has been received by the server, but no status was available at the time of the response.',
  103: 'This status code is primarily intended to be used with the [`Link`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Link) header, letting the user agent start [preloading](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preload) resources while the server prepares a response or [preconnect](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preconnect) to an origin from which the page will need resources.',

  // 2xx: Success
  200: 'The request succeeded. The result and meaning of "success" depends on the HTTP method:\n\n- [`GET`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/GET): The resource has been fetched and transmitted in the message body.\n- [`HEAD`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/HEAD): Representation headers are included in the response without any message body.\n- [`PUT`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/PUT) or [`POST`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/POST): The resource describing the result of the action is transmitted in the message body.\n- [`TRACE`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/TRACE): The message body contains the request as received by the server.',
  201: 'The request succeeded, and a new resource was created as a result. This is typically the response sent after [`POST`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/POST) requests, or some [`PUT`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/PUT) requests.',
  202: 'The request has been received but not yet acted upon. It is noncommittal, since there is no way in HTTP to later send an asynchronous response indicating the outcome of the request. It is intended for cases where another process or server handles the request, or for batch processing.',
  203: 'This response code means the returned metadata is not exactly the same as is available from the origin server, but is collected from a local or a third-party copy. This is mostly used for mirrors or backups of another resource. Except for that specific case, the [`200 OK`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/200) response is preferred to this status.',
  204: 'There is no content to send for this request, but the headers are useful. The user agent may update its cached headers for this resource with the new ones.',
  205: 'Tells the user agent to reset the document which sent this request.',
  206: 'This response code is used in response to a [range request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests) when the client has requested a part or parts of a resource.',
  207: 'Conveys information about multiple resources, for situations where multiple status codes might be appropriate.',
  208: 'Used inside a `<dav:propstat>` response element to avoid repeatedly enumerating the internal members of multiple bindings to the same collection.',
  226: 'The server has fulfilled a [`GET`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/GET) request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.',

  // 3xx: Redirection
  300: 'In [agent-driven content negotiation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Content_negotiation#agent-driven_negotiation), the request has more than one possible response and the user agent or user should choose one of them. There is no standardized way for clients to automatically choose one of the responses, so this is rarely used.',
  301: 'The URL of the requested resource has been changed permanently. The new URL is given in the response.',
  302: 'This response code means that the URI of requested resource has been changed temporarily. Further changes in the URI might be made in the future, so the same URI should be used by the client in future requests.',
  303: 'The server sent this response to direct the client to get the requested resource at another URI with a [`GET`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/GET) request.',
  304: 'This is used for caching purposes. It tells the client that the response has not been modified, so the client can continue to use the same [cached](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Caching) version of the response.',
  305: 'Defined in a previous version of the HTTP specification to indicate that a requested response must be accessed by a proxy. It has been deprecated due to security concerns regarding in-band configuration of a proxy.',
  306: 'This response code is no longer used; but is reserved. It was used in a previous version of the HTTP/1.1 specification.',
  307: 'The server sends this response to direct the client to get the requested resource at another URI with the same method that was used in the prior request. This has the same semantics as the `302 Found` response code, with the exception that the user agent must not change the HTTP method used: if a [`POST`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/POST) was used in the first request, a `POST` must be used in the redirected request.',
  308: 'This means that the resource is now permanently located at another URI, specified by the [`Location`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Location) response header. This has the same semantics as the `301 Moved Permanently` HTTP response code, with the exception that the user agent must not change the HTTP method used: if a [`POST`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/POST) was used in the first request, a `POST` must be used in the second request.',

  // 4xx: Client Error
  400: 'The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
  401: 'Although the HTTP standard specifies "unauthorized", semantically this response means "unauthenticated". That is, the client must authenticate itself to get the requested response.',
  402: 'The initial purpose of this code was for digital payment systems, however this status code is rarely used and no standard convention exists.',
  403: "The client does not have access rights to the content; that is, it is unauthorized, so the server is refusing to give the requested resource. Unlike `401 Unauthorized`, the client's identity is known to the server.",
  404: 'The server cannot find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid but the resource itself does not exist. Servers may also send this response instead of `403 Forbidden` to hide the existence of a resource from an unauthorized client. This response code is probably the most well known due to its frequent occurrence on the web.',
  405: 'The [`request method`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods) is known by the server but is not supported by the target resource. For example, an API may not allow `DELETE` on a resource, or the `TRACE` method entirely.',
  406: "This response is sent when the web server, after performing [server-driven content negotiation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Content_negotiation#server-driven_content_negotiation), doesn't find any content that conforms to the criteria given by the user agent.",
  407: 'This is similar to `401 Unauthorized` but authentication is needed to be done by a proxy.',
  408: 'This response is sent on an idle connection by some servers, even without any previous request by the client. It means that the server would like to shut down this unused connection. This response is used much more since some browsers use HTTP pre-connection mechanisms to speed up browsing. Some servers may shut down a connection without sending this message.',
  409: 'This response is sent when a request conflicts with the current state of the server. In [WebDAV](https://developer.mozilla.org/en-US/docs/Glossary/WebDAV) remote web authoring, `409` responses are errors sent to the client so that a user might be able to resolve a conflict and resubmit the request.',
  410: 'This response is sent when the requested content has been permanently deleted from server, with no forwarding address. Clients are expected to remove their caches and links to the resource. The HTTP specification intends this status code to be used for "limited-time, promotional services". APIs should not feel compelled to indicate resources that have been deleted with this status code.',
  411: 'Server rejected the request because the [`Content-Length`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Length) header field is not defined and the server requires it.',
  412: 'In [conditional requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Conditional_requests), the client has indicated preconditions in its headers which the server does not meet.',
  413: 'The request body is larger than limits defined by server. The server might close the connection or return a [`Retry-After`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Retry-After) header field.',
  414: 'The URI requested by the client is longer than the server is willing to interpret.',
  415: 'The media format of the requested data is not supported by the server, so the server is rejecting the request.',
  416: "The [ranges](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Range_requests) specified by the `Range` header field in the request cannot be fulfilled. It's possible that the range is outside the size of the target resource's data.",
  417: 'This response code means the expectation indicated by the [`Expect`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Expect) request header field cannot be met by the server.',
  418: 'The server refuses the attempt to brew coffee with a teapot.',
  421: 'The request was directed at a server that is not able to produce a response. This can be sent by a server that is not configured to produce responses for the combination of scheme and authority that are included in the request URI.',
  422: 'The request was well-formed but was unable to be followed due to semantic errors.',
  423: 'The resource that is being accessed is locked.',
  424: 'The request failed due to failure of a previous request.',
  425: 'Indicates that the server is unwilling to risk processing a request that might be replayed.',
  426: 'The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol. The server sends an [`Upgrade`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Upgrade) header in a 426 response to indicate the required protocol(s).',
  428: "The origin server requires the request to be [conditional](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Conditional_requests). This response is intended to prevent the 'lost update' problem, where a client [`GET`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/GET)s a resource's state, modifies it and [`PUT`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/PUT)s it back to the server, when meanwhile a third party has modified the state on the server, leading to a conflict.",
  429: 'The user has sent too many requests in a given amount of time ([rate limiting](https://developer.mozilla.org/en-US/docs/Glossary/Rate_limit)).',
  431: 'The server is unwilling to process the request because its header fields are too large. The request may be resubmitted after reducing the size of the request header fields.',
  451: 'The user agent requested a resource that cannot legally be provided, such as a web page censored by a government.',

  // 5xx: Server Error
  500: 'The server has encountered a situation it does not know how to handle. This error is generic, indicating that the server cannot find a more appropriate `5XX` status code to respond with.',
  501: 'The request method is not supported by the server and cannot be handled. The only methods that servers are required to support (and therefore that must not return this code) are [`GET`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/GET) and [`HEAD`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/HEAD).',
  502: 'This error response means that the server, while working as a gateway to get a response needed to handle the request, got an invalid response.',
  503: 'The server is not ready to handle the request. Common causes are a server that is down for maintenance or that is overloaded. Note that together with this response, a user-friendly page explaining the problem should be sent. This response should be used for temporary conditions and the [`Retry-After`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Retry-After) HTTP header should, if possible, contain the estimated time before the recovery of the service. The webmaster must also take care about the caching-related headers that are sent along with this response, as these temporary condition responses should usually not be cached.',
  504: 'This error response is given when the server is acting as a gateway and cannot get a response in time.',
  505: 'The HTTP version used in the request is not supported by the server.',
  506: 'The server has an internal configuration error: during content negotiation, the chosen variant is configured to engage in content negotiation itself, which results in circular references when creating responses.',
  507: 'The method could not be performed on the resource because the server is unable to store the representation needed to successfully complete the request.',
  508: 'The server detected an infinite loop while processing the request.',
  510: 'The client request declares an HTTP Extension ([`RFC 2774`](https://datatracker.ietf.org/doc/html/rfc2774)) that should be used to process the request, but the extension is not supported.',
  511: 'Indicates that the client needs to authenticate to gain network access.'
}

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
