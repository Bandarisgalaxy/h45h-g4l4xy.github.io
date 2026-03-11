---
layout: post
title: "Interencdec"
date: 2025-08-20
categories: [PicoCTF, Cryptography]
tags: [picoctf, cryptography, base64, caesar, encoding, ctf, Easy]
author: Harshith
description: A PicoCTF cryptography challenge involving multiple sequential encoding layers — base64 and Caesar cipher — that must be decoded in order to extract the hidden flag.
toc: true
---

## Introduction

The **Interencdec** challenge on PicoCTF demonstrates **layered encoding** — a technique where data is encoded multiple times using different schemes. Solving it requires recognizing each encoding layer in sequence: Base64 twice, then a Caesar cipher shift.

> **Challenge Description:** "Can you find the real meaning from this mysterious file?"

---

## Challenge Overview

| Field | Details |
|---|---|
| **Platform** | PicoCTF |
| **Category** | Cryptography |
| **Difficulty** | Easy |
| **Technique** | Base64 Decoding (2 layers) + Caesar Cipher |

---

## Environment Setup

**Required Tools:**
- Linux terminal with `base64` and `echo` commands
- Optional: [dCode Caesar Cipher](https://www.dcode.fr/caesar-cipher)

---

## Solution Walkthrough

### Step 1: Download the File

After downloading, open the file to inspect its contents. The file contains:

```
YidkM0JxZGtwQlRYdHFhR3g2YUhsZmF6TnFlVGwzWVROclgyZzBOMm8yYXpZNWZRPT0nCg==
```

### Step 2: Recognize Base64 (Layer 1)

The string ends with `==` — a classic indicator of **Base64 padding**. Decode it:

```bash
echo "YidkM0JxZGtwQlRYdHFhR3g2YUhsZmF6TnFlVGwzWVROclgyZzBOMm8yYXpZNWZRPT0nCg==" | base64 -d
```

**Output:**

```
b'd3BqdkpBTXtqaGx6aHlfazNqeTl3YTNrX2g0N2o2azY5fQ=='
```

### Step 3: Strip Python Byte Notation

The outer `b'...'` wrapper is Python's byte string notation — not part of the actual data. The real encoded string is:

```
d3BqdkpBTXtqaGx6aHlfazNqeTl3YTNrX2g0N2o2azY5fQ==
```

### Step 4: Decode Base64 Again (Layer 2)

```bash
echo "d3BqdkpBTXtqaGx6aHlfazNqeTl3YTNrX2g0N2o2azY5fQ==" | base64 -d
```

**Output:**

```
wpjvJAM{jhlzhy_k3jy9wa3k_h47j6k69}
```

### Step 5: Identify the Caesar Cipher

The decoded text looks similar to the flag format `picoCTF{...}`, but shifted. Compare:

```
wpjvJAM  →  picoCTF
```

The letter `w` should be `p`. Counting the alphabet: `w` is position 23, `p` is position 16. The shift is **7** positions backward.

### Step 6: Decrypt the Caesar Cipher

Use [dCode's Caesar Cipher tool](https://www.dcode.fr/caesar-cipher) with key **7** and decrypt:

```
wpjvJAM{jhlzhy_k3jy9wa3k_h47j6k69}  →  picoCTF{caesar_d3cr9pt3d_a47c6d69}
```

---

## Key Concepts

**Recognizing Encoding Layers:**

| Indicator | Encoding Type |
|---|---|
| Ends with `==` or `=` | Base64 |
| Ends with `=` but looks random | Base64 or Base32 |
| Prefix `b'...'` | Python bytes representation (strip it) |
| Flag format shifted (e.g., `wpjv` instead of `pico`) | Caesar/ROT cipher |

**Base64 Decoding (Linux):**

```bash
echo "ENCODED_STRING" | base64 -d
```

**Caesar Cipher (Linux `tr`):**

```bash
# Shift of 7 backward
echo "wpjvJAM{...}" | tr 'A-Za-z' 'T-ZA-St-za-s'
```

---

## Flag

```
picoCTF{caesar_d3cr9pt3d_a47c6d69}
```

---

## Security Insights

- **Encoding is not encryption:** Base64 is a reversible encoding, not a security mechanism. Anyone who sees Base64 data can instantly decode it.
- **Layered encoding adds no security:** Encoding something twice in Base64 is no harder to reverse than encoding it once.
- **Classical ciphers are trivially broken:** Caesar cipher with any key is broken in at most 25 attempts (or zero attempts with frequency analysis).
- **Recognize patterns:** In CTF challenges and real-world data, recognizing `==` padding, `b'...'` notation, and flag format shifts are critical skills.

---

## Conclusion

Interencdec builds pattern-recognition skills for multi-layer encoding. Each layer requires recognizing the encoding type, applying the correct decoding tool, and inspecting the output for the next layer. These skills transfer directly to real-world scenarios like analyzing obfuscated malware payloads, reading encoded API tokens, or decoding network captures.

---

## References

- [Base64 Explained — MDN](https://developer.mozilla.org/en-US/docs/Glossary/Base64)
- [dCode — Caesar Cipher](https://www.dcode.fr/caesar-cipher)
- [PicoCTF Official Platform](https://picoctf.org)
