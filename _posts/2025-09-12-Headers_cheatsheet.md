---
layout: post
title: "HTTP Headers"
date: 2025-09-12
categories: [CTF Tips & Tricks]
tags: [picoctf, webexploitation, ctf]
---

## 📡HTTP Headers Cheatsheet for CTFs

A beginner-friendly, easy-to-read cheatsheet. Each header is separated and highlighted using bold and backticks for clarity.
![Http-Headers](https://kodekloud.com/kk-media/image/upload/v1752882465/notes-assets/images/Nginx-For-Beginners-HTTP-Headers/http-headers-request-response-diagram.jpg)

### 1. **Host**

📌 **What it is:** Identifies the domain the request is targeting.

🕵️ **CTF Relevance:** Virtual host challenges often require modifying `Host` to access hidden admin panels.

🔑 **Keywords/Phrases:** `virtual host`, `vhost fuzzing`, `subdomain access`

```
Host: admin.ctf.com
```

### 2. **User-Agent**

📌 **What it is:** Identifies the browser or tool making the request.

🕵️ **CTF Relevance:** Spoofing `User-Agent` (Googlebot, curl) may reveal hidden content or bypass restrictions.

🔑 **Keywords/Phrases:** `spoofing User-Agent`, `crawler only`, `mobile-only site`

```
User-Agent: Googlebot/2.1 (+http://www.google.com/bot.html)
```

### 3. **Referer**

📌 **What it is:** It is a request type header. This is use to hold the previous page link where this new page come, that the back button of the browsers can work.

🕵️ **CTF Relevance:** Can bypass referer-based access control.

🔑 **Keywords/Phrases:** `referer check`, `came from`, `Referer bypass`

```
Referer: https://example.com/admin
```

### 4. **Cookie**

📌 **What it is:** It is a request type header. A cookie used in the requests sent by the user to the server.

🕵️ **CTF Relevance:** Editing cookies may reveal session tokens or escalate privileges.

🔑 **Keywords/Phrases:** `session cookie`, `Cookie tampering`, `auth cookie`

```
Cookie: session=eyJ1c2VyIjoiYWxpY2UifQ==
```

### 5. **Authorization**

📌 **What it is:** Authentication credentials (Basic, Bearer/JWT).

🕵️ **CTF Relevance:** Decoding or replaying tokens can bypass auth.

🔑 **Keywords/Phrases:** `Basic Auth`, `Bearer token`, `Authorization header`

```
Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
```

### 6. **X-Forwarded-For**

📌 **What it is:** Original client IP via proxy.

🕵️ **CTF Relevance:** Spoofing IP to bypass restrictions.

🔑 **Keywords/Phrases:** `XFF`, `spoof IP`, `bypass IP restriction`

```
X-Forwarded-For: 127.0.0.1
```

### 7. **Content-Type**

📌 **What it is:** It is a entity type header. It is used to indicate the media type of the resource. The media type is a string sent along with the file indicating the format of the file.

🕵️ **CTF Relevance:** Change to bypass file upload validation or API parsing.

🔑 **Keywords/Phrases:** `MIME type`, `Content-Type trick`, `file upload`

```
Content-Type: application/json
```

### 8. **Content-Length**

📌 **What it is:** Size of request body in bytes.

🕵️ **CTF Relevance:** Key in HTTP request smuggling/desync attacks.

🔑 **Keywords/Phrases:** `request smuggling`, `CL-TE`, `desync`

```
Content-Length: 349
```

### 9. **Accept / Accept-Language**

📌 **What it is:** Preferred response format and language.

🕵️ **CTF Relevance:** May reveal hidden content by changing language or format.

🔑 **Keywords/Phrases:** `Accept header`, `language-based content`, `hidden language flag`

```
Accept-Language: fr-FR
```

### 10. **Origin**

📌 **What it is:** Scheme + host + port of request origin (CORS).

🕵️ **CTF Relevance:** Forging `Origin` may expose CORS misconfigurations.

🔑 **Keywords/Phrases:** `CORS`, `Origin header`, `Access-Control-Allow-Origin`

```
Origin: http://evil.example
```

### 11. **Access-Control-Allow-Origin**

📌 **What it is:** Response header that specifies allowed origins.

🕵️ **CTF Relevance:** `*` or reflected origins can leak sensitive responses.

🔑 **Keywords/Phrases:** `CORS misconfiguration`, `ACA0`, `Access-Control`

```
Access-Control-Allow-Origin: *
```

### 12. **Content-Security-Policy (CSP)**

📌 **What it is:** It is response-type header that is used to allows web site administrators to control resources.

🕵️ **CTF Relevance:** Weak CSP or allowed nonce/hash values help bypass XSS.

🔑 **Keywords/Phrases:** `CSP`, `unsafe-inline`, `nonce`

```
Content-Security-Policy: default-src 'self'; script-src 'nonce-abc123'
```

### 13. **X-Frame-Options**

📌 **What it is:** Controls framing (`DENY`, `SAMEORIGIN`, `ALLOW-FROM`).

🕵️ **CTF Relevance:** Clickjacking protection; missing header may allow framing attacks.

🔑 **Keywords/Phrases:** `clickjacking`, `iframe`, `X-Frame-Options`

```
X-Frame-Options: DENY
```

### 14. **Cache-Control / Pragma**

📌 **What it is:** Instructions for caching.

🕵️ **CTF Relevance:** Cache poisoning or stale responses can reveal sensitive info.

🔑 **Keywords/Phrases:** `cache poisoning`, `Vary`, `stale-while-revalidate`

```
Cache-Control: public, max-age=3600
```

### 15. **Location**

📌 **What it is:** Redirect URL.

🕵️ **CTF Relevance:** Open redirects can be abused in phishing or auth-bypass scenarios.

🔑 **Keywords/Phrases:** `open redirect`, `redirect`, `Location header`

```
Location: https://example.com/next
```

### 16. **Range**

📌 **What it is:** Request a specific byte range of a resource.

🕵️ **CTF Relevance:** Can leak partial file contents if server mishandles.

🔑 **Keywords/Phrases:** `byte range`, `partial response`, `Range header`

```
Range: bytes=0-1023
```

### 17. **Accept-Encoding**

📌 **What it is:** Supported compression algorithms.

🕵️ **CTF Relevance:** Enables compression-based attacks (BREACH/CRIME) or response-size oracles.

🔑 **Keywords/Phrases:** `compression oracle`, `gzip`, `BREACH`

```
Accept-Encoding: gzip, deflate
```

### 18. **X-Requested-With**

📌 **What it is:** AJAX request indicator (`XMLHttpRequest`).

🕵️ **CTF Relevance:** Some endpoints respond only to AJAX requests.

🔑 **Keywords/Phrases:** `XHR`, `AJAX only`, `X-Requested-With`

```
X-Requested-With: XMLHttpRequest
```

### 19. **X-Api-Key / X-Auth-Token**

📌 **What it is:** Developer-defined headers for API keys or tokens.

🕵️ **CTF Relevance:** Hardcoded or leaked keys provide API access or reveal flags.

🔑 **Keywords/Phrases:** `X-Api-Key`, `X-Auth-Token`, `custom header`

```
X-Api-Key: abc123
```

### 20. **Server / Via / X-Powered-By**

📌 **What it is:** Reveals server/proxy/framework info.

🕵️ **CTF Relevance:** Fingerprinting helps identify known vulnerabilities.

🔑 **Keywords/Phrases:** `fingerprint`, `server info`, `nginx, Apache, Express`

```
Server: nginx/1.22.0
```


---

### 21. **Date**

📌 **What it is:** Indicates the date and time at which the response was generated by the server (usually in GMT/UTC).

🕵️ **CTF Relevance:**  Can help in timing attacks, checking server timezone, or debugging request/response sequences. Sometimes used to detect cached or stale content.

🔑 **Keywords/Phrases:**
- "server date"
- "response time"
- "GMT/UTC timestamp"

```
Date: Fri, 12 Sep 2025 18:45:00 GMT
```

### 22. **DNT**

📌 **What it is:** A request header that signals the user's tracking preference to the server.  
`DNT: 1` means the user does not want to be tracked; `DNT: 0` means tracking is allowed.

🕵️ **CTF Relevance:** Rarely affects CTF challenges directly, but in privacy or web-security challenges, checking or bypassing DNT settings can reveal how the server handles user tracking or analytics scripts. It can also help in flagging misconfigured privacy controls.

🔑 **Keywords/Phrases:**
- "Do Not Track"
- "DNT"
- "tracking preference"

```
DNT: 1
```


![response-header](https://cdn.prod.website-files.com/5ff66329429d880392f6cba2/6720dff9eada99162c95b2ec_6720d2c58ff16c446d5835c4_4%2520-%252029.10-min.jpeg)

## Quick Usage Tips (copyable)

- Change `Host` with curl:

```bash
curl -s -H "Host: admin.example.com" https://1.2.3.4/
```

- Spoof Referer & User-Agent:

```bash
curl -s -H "Referer: https://example.com/allowed" -A "Googlebot/2.1" https://example.com/secret
```

- Pretend to be localhost (XFF):

```bash
curl -s -H "X-Forwarded-For: 127.0.0.1" https://example.com/admin
```

- Edit cookies in Burp: send request to Repeater, modify `Cookie:` header, resend.
