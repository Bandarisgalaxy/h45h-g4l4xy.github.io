---
layout: post
title: "Picobrowser"
date: 2025-08-27
categories: [PicoCTF, Web Exploitation]
tags: [picoctf, webexploitation, user-agent, http-headers, curl, ctf, Easy]
author: Harshith
description: A PicoCTF web exploitation challenge requiring User-Agent header spoofing to impersonate the PicoBrowser and access the restricted page containing the flag.
toc: true
---

## Introduction

The **Picobrowser** challenge on PicoCTF demonstrates **User-Agent spoofing** — a technique where an HTTP client presents a different `User-Agent` header than its actual identity. The server grants access to restricted content only when the `User-Agent` value matches `picobrowser`, making this a classic header manipulation challenge.

> **Challenge Description:** "This website can only be rendered by **picobrowser**. Go and catch the flag!"

---

## Challenge Overview

| Field | Details |
|---|---|
| **Platform** | PicoCTF |
| **Category** | Web Exploitation |
| **Difficulty** | Easy |
| **Technique** | HTTP User-Agent Header Spoofing |

---

## Environment Setup

**Required Tools:**
- Linux terminal with `curl`
- Optional: Browser extension (ModHeader, Requestly) for GUI approaches

---

## Understanding the Challenge

### What the Server Does

When you click the Flag button in a regular browser, the server responds with:

```
You're not picobrowser! Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36
```

The server reads your `User-Agent` request header and compares it against `picobrowser`. If it doesn't match, access is denied.

### The User-Agent Header

The `User-Agent` request header identifies the client software making the HTTP request:

```
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 ...
```

This is sent automatically by every browser. Importantly, **any client can set any User-Agent value it wants** — the server has no way to verify the claim.

---

## Solution Walkthrough

### Step 1: Use curl with a Custom User-Agent

The `-A` flag (or `--user-agent`) in `curl` sets the `User-Agent` header:

```bash
curl -A "picobrowser" "https://jupiter.challenges.picoctf.org/problem/26704/flag"
```

This sends:

```
GET /problem/26704/flag HTTP/1.1
User-Agent: picobrowser
```

### Step 2: Search the Response for the Flag

Optionally, save the response and search for the flag:

```bash
curl -A "picobrowser" "https://jupiter.challenges.picoctf.org/problem/26704/flag" > response.html
grep -i "pico" response.html
```

The flag will appear embedded in the HTML response.

---

## Key Concepts

**curl -A (User-Agent) Flag:**

```bash
# Set User-Agent to any string
curl -A "CustomBrowserName/1.0" https://example.com/

# View the default curl User-Agent
curl -v https://example.com/ 2>&1 | grep "User-Agent"

# Other useful curl header options
curl -H "X-Custom-Header: value" https://example.com/
curl -H "Referer: https://trusted.com" https://example.com/
```

**Browser User-Agent Spoofing (DevTools Method):**

In Chrome/Firefox Developer Tools:
1. Open DevTools (`F12`) → Network conditions tab
2. Uncheck "Use browser default"
3. Type `picobrowser` in the User-Agent field
4. Reload the flagged page

---

## Flag

```
picoCTF{p1c0_s3cr3t_ag3nt_e9b160d0}
```

---

## Security Insights

- **User-Agent checks provide no real security:** Any HTTP client can set any User-Agent value. Never use User-Agent as an access control mechanism.
- **User-Agent is useful for analytics, not security:** Tracking browser/device adoption through User-Agent is valid, but restricting content based on it is easily bypassed.
- **Read error messages carefully:** The server's error message revealed exactly what value it expected (`You're not picobrowser!`). Error messages are often the most valuable reconnaissance data.
- **Header-based access controls:** Security-sensitive access controls must use cryptographically verifiable authentication (tokens, certificates) — not easily spoofed headers like User-Agent or Referer.

---

## Conclusion

Picobrowser demonstrates that HTTP header values are entirely client-controlled. The `User-Agent` header is a hint, not a verifiable identity. The one-liner `curl -A "picobrowser" URL` completes this challenge instantly, illustrating why User-Agent-based access control is a consistently bypassed security anti-pattern.

---

## References

- [MDN — User-Agent Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent)
- [curl Manual — -A flag](https://curl.se/docs/manpage.html#-A)
- [OWASP — Improper Access Controls](https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control)
- [PicoCTF Official Platform](https://picoctf.org)
