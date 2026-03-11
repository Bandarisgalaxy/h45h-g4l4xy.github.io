---
layout: post
title: "Web Decode"
date: 2025-07-25
categories: [PicoCTF, Web Exploitation]
tags: [picoctf, webexploitation, base64, encoding, ctf, Easy]
author: Harshith
description: A PicoCTF web exploitation challenge involving base64 decoding of data embedded in the page source to extract the hidden flag.
toc: true
---



## Introduction

The **Web Decode** challenge on PicoCTF teaches Base64 decoding within the context of web application source inspection. The flag is embedded in the page source as a Base64 string — a common encoding scheme developers mistakenly treat as a form of obfuscation.

> **Challenge Description:** "Try to inspect the web. The flag is hidden somewhere in the page's source, encoded in a special way."

---

## Challenge Overview

| Field | Details |
|---|---|
| **Platform** | PicoCTF |
| **Category** | Web Exploitation |
| **Difficulty** | Easy |
| **Technique** | Source Inspection, Base64 Decoding |

---

## Environment Setup

**Required Tools:**
- A modern web browser (Chrome or Firefox)
- A terminal with `base64` utility (Linux/macOS) or an online decoder like [CyberChef](https://gchq.github.io/CyberChef/)

---

## Solution Walkthrough

### Step 1: Open the Challenge Website

Navigate to the provided URL and read the instructions on the page.

### Step 2: Inspect the Page Source

Press `F12` to open Developer Tools, or press `Ctrl + U` to view the raw page source.

### Step 3: Locate the Encoded String

Search the source code for a long alphanumeric string — this is the Base64-encoded flag.

### Step 4: Decode the Base64 String

Copy the encoded string and decode it in the terminal:

```bash
echo "<paste_encoded_string>" | base64 -d
```

The decoded output will reveal the flag.

---

## Key Concepts

**What is Base64?**

Base64 encodes binary data using 64 printable ASCII characters. It is a transport encoding, not an encryption scheme, and is trivially reversible.

```bash
# Decode a Base64 string in terminal
echo "cGljb0NURnt3ZWJfc3VjYzNzc2Z1bGx5X2QzYzBkM2RfZGYwZGE3Mjd9" | base64 -d
# Output: picoCTF{web_succ3ssfully_d3c0d3d_df0da727}
```

---

## Flag

```
picoCTF{web_succ3ssfully_d3c0ded_df0da727}
```

---

## Security Insights

- **Encoding is not encryption:** Base64 decoding is trivial and instantaneous for anyone with basic command-line knowledge.
- **Common attacker technique:** When encountering unknown encoded strings in web applications, Base64 is always the first encoding to try.
- **Real-world relevance:** Leaked Base64-encoded JWTs, API keys, and secrets in page source or JavaScript bundles are a frequent real-world web security finding.

---

## Conclusion

This challenge demonstrates that encoding data with Base64 provides no meaningful security. Security through obscurity is not a valid strategy. All sensitive data must be protected using proper cryptographic controls managed exclusively server-side.

---

## References

- [Base64 — Wikipedia](https://en.wikipedia.org/wiki/Base64)
- [CyberChef — Online Encoder/Decoder](https://gchq.github.io/CyberChef/)
- [PicoCTF Official Platform](https://picoctf.org)
