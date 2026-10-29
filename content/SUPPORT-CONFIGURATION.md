# Support delivery configuration

The Help Center form posts to `/api/support`. It validates name, email, category,
message length, request origin and a honeypot. It does not report delivery until
the configured inbox integration explicitly acknowledges it.

Set these server-only environment variables for an existing, real inbox service:

- `SUPPORT_WEBHOOK_URL`: an HTTPS endpoint that delivers to `arine.soem@gmail.com`.
- `SUPPORT_WEBHOOK_TOKEN`: optional bearer token accepted by that service.

The endpoint receives JSON with `to`, `name`, `email`, `category` and `message`.
After actual inbox delivery, it must return a successful HTTP response with
`{"delivered":true}`. A receipt for queueing alone must not be represented as
completed delivery by that service.

The public submit button stays disabled while configuration is absent; email and
WhatsApp remain available. Rebuild/restart after configuring the endpoint.

Direct requests with missing configuration return HTTP 503 and tells the visitor their message was
not sent. Failed, timed-out or unacknowledged delivery returns HTTP 502. No
requests are stored or silently discarded with a success message. Until a real
endpoint is connected, use the working email and WhatsApp links.

No provider was installed, account created, message sent, or delivery credential
invented. Only `APP_WEBSITE` was present in the starting environment.
