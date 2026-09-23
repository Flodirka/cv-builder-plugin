# CV Builder plugin privacy policy

Effective date: September 23, 2026.

The CV Builder plugin is account-free. Its skills run in the host product and do not send data
to the plugin developer. When an agent calls `open_builder`, the public relay receives only the
canonical `cv-builder/v1` Markdown needed to hand the document to CV Builder.

## Relay data and retention

- One Markdown payload is held in one short-lived relay session for at most five minutes.
- The payload is deleted when the Builder acknowledges the import or when the session expires.
- The relay stores no account, resume history, PDF, ATS report, or analytics profile.
- Application logs contain no resume content, capability, URL, IP address, header, filename, or
  raw error. Cloudflare may process ordinary infrastructure metadata under its own policies.

The returned capability travels in a URL fragment. The Builder removes it from the visible URL
before the first relay request and keeps it in `sessionStorage` only until acknowledgement or
expiry. Editing, browser draft storage, ATS checks, PDF export, and finished-PDF inspection stay
in the browser.

The host product in which the plugin runs may process conversation data under its own terms and
privacy policy. CV Builder does not control that processing.

For support, see [SUPPORT.md](SUPPORT.md).
