---
layout: post
title: "Tips On Cryptography-1"
date: 2025-09-01
categories: [CTF Tips & Tricks]
tags: [picoctf, cryptography, ctf, beginner-guide, ciphers, encoding, hashing]
author: Harshith
description: A practical guide to tackling CTF cryptography challenges, covering classical ciphers, Base64 encoding, ROT13, hashing, and essential online tools for crypto analysis.
toc: true
---

## Introduction

Cryptography is one of the most rewarding categories in CTF competitions — once you build pattern recognition for common encoding and cipher types, most beginner-to-intermediate challenges become straightforward. This guide covers the essential techniques, tools, and mental models to solve CTF crypto challenges efficiently.

---

## Environment Setup

Install the essential Cryptography tools on Linux:

```bash
# Update system and install tools
sudo apt update && sudo apt upgrade -y

# Install crypto utilities
sudo apt install -y hashid john netcat openssl xxd

# Test your setup
echo "hello" | base64
# Output: aGVsbG8K

echo "aGVsbG8K" | base64 -d
# Output: hello
```

---

## Identification Flowchart

When you receive a challenge, ask these questions in order:

1. **Does it end with `==` or `=`?** → Likely Base64
2. **Are only hex digits (0-9, a-f)?** → Likely hex-encoded data or a hash
3. **32 chars?** → MD5 hash. **40 chars?** → SHA-1. **64 chars?** → SHA-256
4. **Are letters shifted (e.g., `pico` → `cvpb`)?** → ROT13 or Caesar cipher
5. **Letters shifted differently in patterns?** → Vigenere cipher
6. **Letters rearranged but not changed?** → Transposition cipher (Rail Fence, Columnar)
7. **Only dots and dashes?** → Morse code

---

## Classical Ciphers

### Caesar Cipher (ROT-N)

Each letter is shifted by a fixed number:

```bash
# ROT13 (shift 13)
echo "uryyb" | tr 'A-Za-z' 'N-ZA-Mn-za-m'
# Output: hello

# ROT8 (shift 8)
echo "rovvy" | tr 'A-Za-z' 'I-ZA-Hi-za-h'
# Output: hello

# Brute force all 25 shifts
for i in $(seq 1 25); do
    echo -n "Shift $i: "
    echo "CIPHERTEXT" | tr 'A-Za-z' "$(python3 -c "
import string
shift=$i
u = string.ascii_uppercase
l = string.ascii_lowercase
print(u[shift:]+u[:shift]+l[shift:]+l[:shift])")"
done
```

**Quick Identification:** All PicoCTF flags start with `picoCTF`. If the ciphertext starts with a known prefix, calculate the shift directly from the first letter.

### ROT13 Specifically

ROT13 is self-inverse — applying it twice returns the original:

```bash
echo "cvpbPGS{...}" | tr 'A-Za-z' 'N-ZA-Mn-za-m'
```

### Vigenere Cipher

Uses a repeating keyword to shift each letter differently:

```bash
# Use dCode online tool:
# https://www.dcode.fr/vigenere-cipher
# Paste ciphertext + enter keyword → Decrypt
```

---

## Encoding Schemes

### Base64

```bash
# Decode
echo "aGVsbG8=" | base64 -d
# Output: hello

# Encode
echo "hello" | base64
# Output: aGVsbG8K

# Multi-layer: decode twice if output still looks Base64
echo "OUTER_B64" | base64 -d | base64 -d
```

**Strip Python byte notation:** If you see `b'...'`, just decode the string inside — the `b'` is Python syntax, not part of the data.

### Hexadecimal

```bash
# Hex to ASCII
echo "68656c6c6f" | xxd -r -p
# Output: hello

# ASCII to Hex
echo "hello" | xxd -p
# Output: 68656c6c6f0a
```

### Binary

```bash
# Binary to ASCII
echo "01101000 01100101 01101100 01101100 01101111"   | perl -lpe '$_=pack"B*",@F'
# Output: hello
```

---

## Hash Identification and Cracking

### Identify Hash Type

```bash
hashid 482c811da5d5b4bc6d497ffa98491e38
# Output: MD5

hashid b7a875fc1ea228b9061041b7cec4bd3c52ab3ce3
# Output: SHA1
```

| Hash Length | Algorithm |
|---|---|
| 32 hex chars | MD5 |
| 40 hex chars | SHA-1 |
| 64 hex chars | SHA-256 |
| 128 hex chars | SHA-512 |

### Crack Weak Hashes

For common passwords, use online rainbow table lookups:
- [10015.io Hash Tools](https://10015.io/)
- [CrackStation](https://crackstation.net/)

For wordlist-based cracking:

```bash
# Using John the Ripper
echo "482c811da5d5b4bc6d497ffa98491e38" > hash.txt
john --format=raw-md5 --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
john --show --format=raw-md5 hash.txt
```

---

## Certificates and Keys

Inspect certificate files with OpenSSL:

```bash
# Certificate Signing Request (CSR)
openssl req -in file.csr -noout -text

# Signed Certificate
openssl x509 -in file.crt -noout -text

# Private Key
openssl rsa -in file.key -check

# Look for the flag in: CN, OU, emailAddress, SAN fields
```

---

## CTF Crypto Quick Checklist

| Observation | Technique |
|---|---|
| Ends with `==` or `=` | Base64 decode |
| Only hex characters | Hex decode |
| 32/40/64 hex chars (no flag format) | Hash — crack with lookup |
| Letters shifted uniformly | Caesar/ROT — try all 25 shifts |
| `b'...'` wrapping | Python bytes — decode inner string |
| `picoCTF` → `cvpbPGS` | ROT13 specifically |
| Zig-zag pattern, scrambled order | Rail Fence transposition |
| Audio file with beeps | Morse code |
| `.csr` / `.crt` / `.key` file | OpenSSL inspection |
| JSON with `alg`, `typ` fields | JWT token — decode at jwt.io |

---

## Essential Online Tools

| Tool | URL | Use |
|---|---|---|
| dCode | https://www.dcode.fr | Classical ciphers, ROT, Vigenere |
| CyberChef | https://gchq.github.io/CyberChef | Multi-format decode chain |
| CrackStation | https://crackstation.net | Hash lookup |
| Quipqiup | https://quipqiup.com | Substitution cipher solver |
| jwt.io | https://jwt.io | JWT token decoder |
| MorseCode World | https://morsecode.world | Audio Morse decoding |

---

## Conclusion

CTF cryptography rewards pattern recognition above all else. Build a mental checklist for each challenge: What encoding is this? What cipher type does this structure suggest? Once you identify the technique, the decoding usually takes seconds with the right tool. Start simple — encoding before encryption, classical before modern.

---

## References

- [dCode — Cipher Identifier](https://www.dcode.fr/cipher-identifier)
- [CyberChef — The Cyber Swiss Army Knife](https://gchq.github.io/CyberChef)
- [John the Ripper Documentation](https://www.openwall.com/john/)
- [PicoCTF Official Platform](https://picoctf.org)
