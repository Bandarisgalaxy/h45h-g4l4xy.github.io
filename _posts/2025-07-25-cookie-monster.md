---
layout: post
title: "Cookie-Monster"
date: 2025-07-25
categories: [PicoCTF, Web Exploitation]
tags: [picoctf, webexploitation, cookies, base64, ctf, Easy]
author: Harshith
description: A PicoCTF web exploitation challenge involving base64-encoded cookies that reveal a hidden flag when decoded using the terminal.
toc: true
---


## Introduction

The **Cookie-Monster** challenge on PicoCTF explores how websites store sensitive data in cookies — and how those cookies can be decoded to reveal hidden secrets. This challenge is an excellent entry point into understanding web session management and cookie-based security flaws.

> **Challenge Description:** "Cookie Monster has hidden his top-secret cookie recipe somewhere on his website. As an aspiring cookie detective, your mission is to uncover this delicious secret."

---

## Challenge Overview

| Field | Details |
|---|---|
| **Platform** | PicoCTF |
| **Category** | Web Exploitation |
| **Difficulty** | Easy |
| **Technique** | Cookie Inspection, Base64 Decoding |

---

## Environment Setup

**Required Tools:**
- A modern web browser (Chrome or Firefox recommended)
- Browser Developer Tools (`F12`)
- A terminal with `base64` utility (available by default on Linux/macOS)

---

## Solution Walkthrough

### Step 1: Open the Challenge Website

Navigate to the provided challenge URL and observe the landing page.

### Step 2: Inspect the Page Source

Press `Ctrl + U` to view the page source. Look for any hidden data or embedded clues.

### Step 3: Open Developer Tools

Press `F12` to open Developer Tools, then navigate to the **Application** tab.

### Step 4: Check the Cookies Section

Under **Storage → Cookies**, inspect all cookies set by the website. If none appear initially, try refreshing the page.

### Step 5: Trigger Cookie Generation

Attempt to log in with test credentials. After the login attempt, return to the Cookies section — a new Base64-encoded cookie should now appear.

### Step 6: Decode the Cookie

Copy the cookie value and open a terminal. Run the following command to decode it:

```bash
echo "<paste_cookie_value_here>" | base64 -d
```

The decoded output will contain the hidden flag.

---

## Key Concepts

**Base64 Encoding:**

Base64 is an encoding scheme (not encryption) that converts binary data to a text-safe ASCII format. It is commonly used for cookie values and tokens.

```bash
# Encode a string
echo "picoCTF{flag}" | base64

# Decode a Base64 string
echo "cGljb0NURntmbGFnfQ==" | base64 -d
```

> **Important:** Base64 is not encryption — it is trivially reversible by anyone who sees the encoded value.

---

## Flag

```
picoCTF{c00k1e_m0nster_l0ves_c00kies_771D5EB0}
```

---

## Security Insights

- **Sensitive data in cookies:** Storing plaintext or lightly encoded sensitive information in cookies is a serious vulnerability.
- **Base64 ≠ Security:** Encoding is not encryption. Any user can decode a Base64 value instantly.
- **Proper cookie security:** Real applications use server-side session management with `HttpOnly`, `Secure`, and `SameSite` flags on cookies to prevent tampering and interception.

---

## Conclusion

This challenge highlights how cookies are a prime target in web security assessments. Base64-encoded cookies offer zero real security. Developers should store only non-sensitive session identifiers in cookies, with actual data kept securely server-side.

---

## References

- [MDN Web Docs — HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [Base64 Encoding — Wikipedia](https://en.wikipedia.org/wiki/Base64)
- [PicoCTF Official Platform](https://picoctf.org)
