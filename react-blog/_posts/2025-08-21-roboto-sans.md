---
layout: post
title: "Roboto Sans"
date: 2025-08-21
categories: [PicoCTF, Web Exploitation]
tags: [picoctf, webexploitation, robots-txt, base64, reconnaissance, ctf, Medium]
author: Harshith
description: A PicoCTF web exploitation challenge where a base64-encoded flag is hidden inside the robots.txt file, discoverable through standard web reconnaissance.
toc: true
---

## Introduction

The **Roboto Sans** challenge on PicoCTF highlights the importance of checking `robots.txt` during web reconnaissance. The `robots.txt` file is a standard web file used to communicate with web crawlers — but it frequently leaks internal file paths, directory structure, and in this case, an encoded flag.

> **Challenge Description:** "The flag is hidden somewhere on this web application, but not necessarily on the visible website."

---

## Challenge Overview

| Field | Details |
|---|---|
| **Platform** | PicoCTF |
| **Category** | Web Exploitation |
| **Difficulty** | Medium |
| **Technique** | robots.txt Reconnaissance, Base64 Decoding |

---

## Environment Setup

**Required Tools:**
- A modern web browser (Chrome or Firefox)
- Terminal with `base64` command (or any online Base64 decoder)

---

## Reconnaissance

### Step 1: Open the Website

Navigate to the challenge URL. The challenge name **"Roboto Sans"** is a strong hint — it sounds like **robots.txt**.

### Step 2: Check `robots.txt`

Navigate to:

```
http://saturn.picoctf.net:50318/robots.txt
```

The file contains:

```
ZmxhZzEudHh0;anMvbXlmaW
anMvbXlmaWxlLnR4dA==
svssshjweuiwl;oiho.bsvdaslejg
```

---

## Decoding the Flag Path

### Step 3: Identify Base64 Encoding

The string `anMvbXlmaWxlLnR4dA==` ends with `==` — a characteristic padding indicator of **Base64 encoding**.

### Step 4: Decode the Base64 String

```bash
echo "anMvbXlmaWxlLnR4dA==" | base64 -d
```

**Output:**

```
js/myfile.txt
```

This is a file path hidden inside the `robots.txt` via Base64 encoding.

### Step 5: Access the Hidden File

Navigate to the decoded path on the server:

```
http://saturn.picoctf.net:50318/js/myfile.txt
```

The full flag is displayed in the file contents.

---

## Key Concepts

**What is `robots.txt`?**

`robots.txt` is placed at the root of a web server to instruct web crawlers (like Googlebot) which paths they are allowed or disallowed from indexing:

```
User-agent: *
Disallow: /admin/
Disallow: /private/
```

**Security Implications:**

- `robots.txt` is a **public file** — anyone can read it, not just crawlers.
- Paths listed in `Disallow` are not hidden from humans — they often become a roadmap for attackers.
- Sensitive paths should be protected by authentication, not just excluded from `robots.txt`.

**Base64 Quick Reference:**

```bash
# Encode
echo "js/myfile.txt" | base64
# Output: anMvbXlmaWxlLnR4dAo=

# Decode
echo "anMvbXlmaWxlLnR4dA==" | base64 -d
# Output: js/myfile.txt
```

---

## Flag

```
picoCTF{Who_D03sN7_L1k5_90B0T5_718c9043}
```

---

## Security Insights

- **`robots.txt` is not an access control mechanism:** Any path listed in `robots.txt` is publicly visible and becomes a list of interesting targets for attackers.
- **Encode != Encrypt:** Base64 encoding is trivially reversible. It is NOT a security measure for protecting file paths.
- **Authentication first:** Sensitive endpoints must require valid authentication. Obscuring the path is insufficient.
- **Audit your `robots.txt`:** Never list internal admin panels, backup directories, or sensitive paths in `robots.txt`.

---

## Conclusion

Roboto Sans demonstrates that reconnaissance is often as simple as navigating to `/robots.txt`. Web developers who list sensitive directories in `robots.txt` (or obscure them with trivial encodings like Base64) are inadvertently providing attackers with a roadmap to hidden content. Proper access control — not obscurity — is the only reliable protection.

---

## References

- [Google — robots.txt Introduction](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [OWASP — robots.txt Testing](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/01-Conduct_Search_Engine_Discovery_Reconnaissance_for_Information_Leakage)
- [Base64 Decode Online](https://www.base64decode.org/)
- [PicoCTF Official Platform](https://picoctf.org)
