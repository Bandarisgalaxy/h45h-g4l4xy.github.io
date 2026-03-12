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

## 🔎 Challenge Description
Can you find the real meaning from this mysterious file?

---

## 🛠️ Step-by-Step Approach

### 1. Download the file
After downloading, we notice the file contains the following encoded text:

```
YidkM0JxZGtwQlRYdHFhR3g2YUhsZmF6TnFlVGwzWVROclgyZzBOMm8yYXpZNWZRPT0nCg==
```

---

### 2. Spotting Base64
The text ends with `==`.  
👉 This is a **common hint** that the content is Base64 encoded.  

So, let’s try to decode it.

---

### 3. First Base64 decode
Run the following command in Linux:

```bash
echo "YidkM0JxZGtwQlRYdHFhR3g2YUhsZmF6TnFlVGwzWVROclgyZzBOMm8yYXpZNWZRPT0nCg==" | base64 -d
```

**Output:**
```
b'd3BqdkpBTXtqaGx6aHlfazNqeTl3YTNrX2g0N2o2azY5fQ=='
```

---

### 4. Understanding the output
We again see something ending with `==`.  
👉 That means it’s **again Base64 encoded**!  

But wait – notice the extra **`b'...'`**?  
That’s **Python notation** for bytes (not part of the actual message). We just need to ignore/remove it.

So the real encoded string is:

```
d3BqdkpBTXtqaGx6aHlfazNqeTl3YTNrX2g0N2o2azY5fQ==
```

---

### 5. Second Base64 decode
Now decode it again:

```bash
echo "d3BqdkpBTXtqaGx6aHlfazNqeTl3YTNrX2g0N2o2azY5fQ==" | base64 -d
```

**Output:**
```
wpjvJAM{jhlzhy_k3jy9wa3k_h47j6k69}
```

---

### 6. Recognizing the flag format
We know all picoCTF flags look like this:

```
picoCTF{...}
```

But here we see:
```
wpjvJAM{...}
```

👉 That means the text is **shifted (Caesar Cipher)**. The `w` should have been `p`.

---

### 7. Decoding Caesar Cipher
Since `w → p`, that’s a shift of **7 backwards**.  
Let’s use an online Caesar cipher decoder: [dCode Caesar Cipher](https://www.dcode.fr/caesar-cipher)

- Paste the text:  
  ```
  wpjvJAM{jhlzhy_k3jy9wa3k_h47j6k69}
  ```
- Key: **7**
- Click **Decrypt**

---

### 8.🏁 Final Answer
You’ll get:

```
picoCTF{caesar_d3cr9pt3d_a47c6d69}
```

---

## ✅ Key Takeaways for Beginners
1. **Look for patterns** – `==` is a big clue for Base64.
2. **Don’t panic if you see extra characters** like `b'...'` – that’s just Python showing bytes.
3. **Multiple layers of encoding** are common – try decoding again if the output looks encoded.
4. **Know the flag format** – if something doesn’t match, think of substitution ciphers (like Caesar).
5. **Use online tools** like dCode for quick decoding.

---