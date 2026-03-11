---
layout: post
title: "HTTP Headers Cheatsheet"
date: 2025-09-12
categories: [CTF Tips & Tricks]
tags: [http, headers, cheatsheet, curl, web, ctf, guide]
author: Harshith
description: A comprehensive HTTP headers reference guide covering 22 headers with CTF relevance, security implications, and practical curl examples.
toc: true
---

## Introduction

HTTP headers are the metadata layer of every web request and response. In CTF web exploitation challenges, manipulating or inspecting headers is often the key to bypassing access controls, revealing hidden information, or understanding server behavior. This cheatsheet covers the 22 most relevant headers with their CTF use cases, security implications, and practical `curl` examples.

![Http-Headers](/images/http-headers-diagram.jpg)

---

## Request Headers

### 1. Host

**Purpose:** Specifies the target domain that the client is requesting.

```
Host: example.com
```

**CTF Relevance:** Virtual host routing — different `Host` values can route to different applications on the same IP address. Changing it may reveal hidden admin panels or staging environments.

```bash
curl -H "Host: admin.internal" http://10.10.10.10/
```

---

### 2. User-Agent

**Purpose:** Identifies the client software (browser name, version, OS).

```
User-Agent: Mozilla/5.0 (X11; Linux x86_64) ...
```

**CTF Relevance:** Challenges may require a specific UA string (e.g., `Googlebot`, `PicoBrowser`, or a custom string) to access restricted content.

```bash
curl -H "User-Agent: PicoBrowser" http://target.com/
curl -H "User-Agent: Googlebot/2.1" http://target.com/
```

---

### 3. Referer

**Purpose:** Indicates the originating page URL of the current request.

```
Referer: https://www.google.com/
```

**CTF Relevance:** Some pages only load if accessed "from" a specific page or domain. Setting the Referer header bypasses these checks.

```bash
curl -H "Referer: http://target.com/login" http://target.com/admin
```

---

### 4. Cookie

**Purpose:** Sends stored cookies to the server for session management.

```
Cookie: session_id=abc123; isAdmin=false
```

**CTF Relevance:** Cookie manipulation is one of the most common CTF web exploitation techniques — change values, forge session tokens, or set unexpected flags.

```bash
curl -H "Cookie: isAdmin=true; session=abc123" http://target.com/
```

---

### 5. Authorization

**Purpose:** Provides credentials for HTTP authentication.

```
Authorization: Basic dXNlcjpwYXNz
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**CTF Relevance:** Basic auth is Base64-encoded (not encrypted). Bearer tokens (JWTs) can be decoded and sometimes forged with weak keys.

```bash
# Basic auth
curl -u admin:password http://target.com/
# OR
curl -H "Authorization: Basic YWRtaW46cGFzc3dvcmQ=" http://target.com/

# Bearer token
curl -H "Authorization: Bearer <jwt_token>" http://target.com/api/flag
```

---

### 6. X-Forwarded-For

**Purpose:** Added by proxies to preserve the original client IP address.

```
X-Forwarded-For: 203.0.113.195
```

**CTF Relevance:** Servers that trust this header for IP-based geolocation or access control can be fooled by spoofing a different IP (e.g., an internal IP or country-specific address).

```bash
curl -H "X-Forwarded-For: 127.0.0.1" http://target.com/admin
curl -H "X-Forwarded-For: 31.3.152.55" http://target.com/  # Swedish IP
```

---

### 7. Content-Type

**Purpose:** Indicates the media type of the request body.

```
Content-Type: application/json
Content-Type: application/x-www-form-urlencoded
Content-Type: multipart/form-data
```

**CTF Relevance:** Changing the Content-Type header can trick servers into processing data differently, enable file upload bypass tricks, or trigger alternative code paths.

```bash
curl -X POST -H "Content-Type: application/json"      -d '{"username":"admin","password":"pass"}' http://target.com/login
```

---

### 8. Content-Length

**Purpose:** Specifies the size (in bytes) of the request body.

```
Content-Length: 42
```

**CTF Relevance:** Request smuggling attacks exploit inconsistencies between `Content-Length` and `Transfer-Encoding` headers. Also used in file upload bypass scenarios.

---

### 9. Accept-Language

**Purpose:** Specifies the preferred language(s) for the response.

```
Accept-Language: en-US,en;q=0.9
Accept-Language: sv,en;q=0.9
```

**CTF Relevance:** Geolocation or locale checks in challenges may require matching a specific language/country code.

```bash
curl -H "Accept-Language: sv,en;q=0.9" http://target.com/
```

---

### 10. Origin

**Purpose:** Indicates the origin (scheme+host+port) of a cross-origin request.

```
Origin: https://attacker.com
```

**CTF Relevance:** CORS misconfiguration testing — if the server reflects arbitrary `Origin` values in `Access-Control-Allow-Origin`, it may enable cross-origin data theft.

```bash
curl -H "Origin: https://evil.com" http://target.com/api/data
```

---

### 11. DNT (Do Not Track)

**Purpose:** Signals the user's tracking preference.

```
DNT: 1   (Do Not Track enabled)
DNT: 0   (Do Not Track disabled)
```

**CTF Relevance:** Some challenge servers check for this header as part of identity verification.

```bash
curl -H "DNT: 1" http://target.com/
```

---

### 12. Date

**Purpose:** Specifies the date and time at which the message was sent.

```
Date: Wed, 27 Jun 2018 03:05:00 GMT
```

**CTF Relevance:** Some challenge servers check the request date, requiring a date in the past or a specific historical date.

```bash
curl -H "Date: Wed, 27 Jun 2018 03:05:00 GMT" http://target.com/
```

---

### 13. X-Requested-With

**Purpose:** Often used to identify AJAX requests.

```
X-Requested-With: XMLHttpRequest
```

**CTF Relevance:** Servers may return different content for AJAX vs. normal requests, revealing additional data in JSON format.

```bash
curl -H "X-Requested-With: XMLHttpRequest" http://target.com/api/
```

---

### 14. X-Api-Key

**Purpose:** API authentication token passed as a header.

```
X-Api-Key: abc123secretkey
```

**CTF Relevance:** API keys may be hardcoded in JavaScript source, leaked in git history, or forced through wordlist attacks.

---

## Response Headers

### 15. Access-Control-Allow-Origin

**Purpose:** CORS response header specifying which origins can access the resource.

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Origin: https://trusted-site.com
```

**CTF Relevance:** `*` or reflected origin allows cross-site data theft via malicious JavaScript.

---

### 16. Content-Security-Policy (CSP)

**Purpose:** Defines allowed content sources to prevent XSS and injection attacks.

```
Content-Security-Policy: default-src 'self'; script-src 'nonce-abc123'
```

**CTF Relevance:** Weak CSP policies (e.g., `unsafe-inline`, wildcard `*`, or allowed CDN domains with JSONP) enable XSS exploitation even when CSP is present.

---

### 17. X-Frame-Options

**Purpose:** Controls whether the page can be embedded in iframes.

```
X-Frame-Options: DENY
X-Frame-Options: SAMEORIGIN
```

**CTF Relevance:** Missing or permissive X-Frame-Options enables clickjacking attacks.

---

### 18. Cache-Control

**Purpose:** Directives for caching behavior by browsers and proxies.

```
Cache-Control: no-store, no-cache
Cache-Control: public, max-age=3600
```

**CTF Relevance:** Sensitive responses without `no-store` may be cached and accessible from cache endpoints.

---

### 19. Location

**Purpose:** Redirect URL — used with 3xx responses.

```
Location: /dashboard
```

**CTF Relevance:** Some challenges hide content accessible only when following redirects. Use `curl -L` to follow.

```bash
curl -L http://target.com/redirect-to-flag
```

---

### 20. Server / Via / X-Powered-By

**Purpose:** Discloses server software and version.

```
Server: Apache/2.4.41 (Ubuntu)
X-Powered-By: PHP/7.4.3
```

**CTF Relevance:** Version information enables targeted exploit research for known CVEs.

---

### 21. Range

**Purpose:** Requests a specific byte range of a resource (partial content).

```
Range: bytes=0-999
```

**CTF Relevance:** Some challenges require fetching specific byte offsets of a file to reveal hidden data appended at unusual offsets.

```bash
curl -H "Range: bytes=100-200" http://target.com/file.txt
```

---

### 22. Accept-Encoding

**Purpose:** Acceptable content encodings for the response.

```
Accept-Encoding: gzip, deflate, br
```

**CTF Relevance:** Disabling compression can clarify response content for analysis; some server-side compression logic has had exploitable vulnerabilities (e.g., CRIME, BREACH attacks).

---

## Quick Reference: curl Header Syntax

```bash
# Single header
curl -H "Header-Name: value" URL

# Multiple headers
curl -H "Header1: val1" -H "Header2: val2" URL

# POST with JSON body
curl -X POST -H "Content-Type: application/json" -d '{"key":"value"}' URL

# Follow redirects
curl -L URL

# Show response headers
curl -I URL
curl -v URL
```

---

## Conclusion

Mastery of HTTP headers is a force multiplier in web exploitation CTF challenges. Most header-based vulnerabilities share a common root cause: servers trust client-supplied data without validation. Keeping this cheatsheet handy and systematically trying header manipulations when stuck on web challenges will consistently reveal new attack surfaces.

---

## References

- [MDN Web Docs — HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [OWASP — Testing for HTTP Security Headers](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/01-Testing_for_Reflected_Cross_Site_Scripting)
- [curl Documentation](https://curl.se/docs/manpage.html)
- [PortSwigger — HTTP Request Smuggling](https://portswigger.net/web-security/request-smuggling)
