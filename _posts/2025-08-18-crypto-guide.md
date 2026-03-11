---
layout: post
title: "Cryptography Introduction"
date: 2025-08-18
categories: [Guides, Cryptography]
tags: [cryptography, caesar, vigenere, rail-fence, morse, rsa, guide, beginner]
author: Harshith
description: A beginner's comprehensive guide to cryptography covering classical ciphers, transposition techniques, encoding schemes, and an introduction to modern cryptographic concepts.
toc: true
---

## Introduction

Cryptography is the science of securing information by transforming it into an unreadable format for anyone without the means to reverse the transformation. In CTF competitions, cryptography challenges range from classical hand ciphers to modern asymmetric encryption. This guide introduces the most frequently encountered cipher types with practical examples.

---

## Key Terminology

| Term | Definition |
|---|---|
| **Plaintext** | The original, readable message |
| **Ciphertext** | The encrypted, unreadable output |
| **Key** | The secret parameter controlling encryption/decryption |
| **Cipher** | The algorithm used to encrypt/decrypt |
| **Encoding** | Reversible transformation with no secret key (not encryption) |
| **Encryption** | Transformation using a key (only keyholders can reverse it) |
| **Hashing** | One-way transformation — cannot be reversed |

---

## Substitution Ciphers

Substitution ciphers replace each letter with a different letter (or symbol) according to a fixed rule or key.

### Caesar Cipher

The simplest substitution cipher: shift every letter in the alphabet by a fixed number of positions.

**Formula:**

$$E(x) = (x + k) \mod 26$$
$$D(x) = (x - k) \mod 26$$

where $x$ is the letter position (A=0, Z=25) and $k$ is the shift key.

**Example (shift = 3):**

```
Plaintext:  HELLO
Ciphertext: KHOOR
```

**Alphabet mapping (shift = 3):**

```
Plain:  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
Cipher: D E F G H I J K L M N O P Q R S T U V W X Y Z A B C
```

**CTF Tools:**
- `tr 'A-Za-z' 'D-ZA-Cd-za-c'` (ROT3 in bash)
- [dCode Caesar Cipher](https://www.dcode.fr/caesar-cipher)
- [CyberChef ROT13/ROT-N](https://gchq.github.io/CyberChef/)

**Brute-force (26 possible shifts max):**

```python
ciphertext = "KHOOR"
for shift in range(26):
    decrypted = ''.join(
        chr((ord(c) - ord('A') - shift) % 26 + ord('A'))
        if c.isalpha() else c
        for c in ciphertext.upper()
    )
    print(f"Shift {shift:2d}: {decrypted}")
```

---

### ROT13

A special case of the Caesar cipher with shift = 13. Because the alphabet has 26 letters, ROT13 is its own inverse — applying it twice returns the original text.

```bash
echo "uryyb jbeyq" | tr 'A-Za-z' 'N-ZA-Mn-za-m'
# Output: hello world
```

---

### Monoalphabetic Substitution

A generalization where each letter maps to a unique but arbitrary other letter. There are $26!$ possible keys — brute force is infeasible, but **frequency analysis** breaks it reliably.

**English Letter Frequency (most to least common):**

```
E T A O I N S H R D L C U M W F G Y P B V K J X Q Z
```

**Attack approach:**
1. Count letter frequencies in ciphertext
2. Map the most frequent ciphertext letter to `E`, second to `T`, etc.
3. Use common bigrams (`TH`, `HE`, `IN`, `ER`) and trigrams (`THE`, `AND`, `ING`) to refine the mapping

**Tools:**
- [dCode — Monoalphabetic Cipher](https://www.dcode.fr/monoalphabetic-substitution)
- [quipqiup — Automatic Solver](https://quipqiup.com/)

---

### Vigenere Cipher

A polyalphabetic substitution cipher using a repeating keyword. Each letter of the keyword specifies the Caesar shift for the corresponding plaintext letter, defeating simple frequency analysis.

**Encryption formula:**

$$C_i = (P_i + K_{i \mod m}) \mod 26$$

where $P_i$ is plaintext position, $K_i$ is key position, $m$ is key length.

**Example (key = `KEY`):**

```
Plaintext:  H  E  L  L  O
Key:        K  E  Y  K  E   (repeating)
Shift:      10 4  24 10 4
Ciphertext: R  I  J  V  S
```

**Key length discovery:** Use the **Kasiski test** or **Index of Coincidence** to determine key length before breaking each Caesar shift independently.

**Tools:**
- [dCode — Vigenere Cipher](https://www.dcode.fr/vigenere-cipher)
- [CyberChef Vigenere Decode](https://gchq.github.io/CyberChef/)

---

## Transposition Ciphers

Transposition ciphers rearrange the order of letters without changing them. The letters remain the same but their positions change.

### Rail Fence Cipher

The plaintext is written diagonally across N "rails", then read row by row.

**Example — 3 rails, plaintext `HELLOWORLD`:**

```
Rail 1: H . . . O . . . L .
Rail 2: . E . L . W . R . D
Rail 3: . . L . . . O . . .
```

Reading rail by rail: `HOL` + `ELWRD` + `LO` = `HOLLELWRDLO`

**CTF approach:** Try rail counts 2–10; the correct count produces readable plaintext.

**Tools:**
- [Cryptii Rail Fence](https://cryptii.com/pipes/rail-fence-cipher)
- [dCode Rail Fence](https://www.dcode.fr/rail-fence-cipher)

---

### Columnar Transposition

The plaintext is written in rows under a keyword. Columns are then read in alphabetical order of the keyword letters.

**Example (key = `ZEBRAS`, plaintext = `WEAREDISCOVEREDGOTORUN`):**

```
Key:   Z E B R A S
Order: 6 3 2 5 1 4

W E A R E D
I S C O V E
R E D G O T
O R U N

Column read order (1,2,3,4,5,6):
Col 1(A): E V O     = EVO
Col 2(B): A C D     = ACD
...
```

**Tools:**
- [dCode Columnar Transposition](https://www.dcode.fr/columnar-transposition-cipher)

---

## Encoding Schemes

Encoding is **not** encryption — it uses no secret key and is entirely reversible by anyone. It is used for data representation, not confidentiality.

### Base64

Encodes binary data as ASCII text using 64 characters (`A-Z`, `a-z`, `0-9`, `+`, `/`). Recognized by trailing `=` padding.

```bash
echo "hello world" | base64
# aGVsbG8gd29ybGQ=

echo "aGVsbG8gd29ybGQ=" | base64 -d
# hello world
```

### Hex Encoding

Represents each byte as two hexadecimal digits.

```bash
echo "hello" | xxd
# 68 65 6c 6c 6f

echo "68656c6c6f" | xxd -r -p
# hello
```

### URL Encoding

Replaces special characters with `%XX` format for safe transmission in URLs.

```
hello world  -->  hello%20world
<script>     -->  %3Cscript%3E
```

---

## Morse Code

Morse Code encodes letters as sequences of dots (short) and dashes (long).

**Quick reference:**

```
A .-    B -...  C -.-.  D -..   E .
F ..-.  G --.   H ....  I ..    J .---
K -.-   L .-..  M --    N -.    O ---
P .--.  Q --.-  R .-.   S ...   T -
U ..-   V ...-  W .--   X -..-  Y -.--
Z --..
```

**Tools:**
- [morsecode.world](https://morsecode.world/) — text and audio decoding

---

## Introduction to Modern Cryptography

### Symmetric Encryption

The same key is used for both encryption and decryption.

| Algorithm | Key Size | Notes |
|---|---|---|
| AES-128 | 128 bits | Industry standard, very fast |
| AES-256 | 256 bits | Higher security margin |
| DES | 56 bits | Broken — do not use |
| 3DES | 112/168 bits | Legacy, being phased out |

### Asymmetric (Public-Key) Encryption

Two mathematically linked keys: a **public key** (shareable) and a **private key** (secret). 

- **RSA:** Based on the difficulty of factoring large integers ($N = p 	imes q$). Public key exponent $e$, private key exponent $d$ such that $e \cdot d \equiv 1 \pmod{\phi(N)}$.
- **ECC (Elliptic Curve):** Based on the discrete logarithm problem on elliptic curves — smaller keys for equivalent security.

### Diffie-Hellman Key Exchange

Allows two parties to establish a shared secret over an insecure channel:

$$g^a \mod p \quad 	ext{(Alice sends to Bob)}$$
$$g^b \mod p \quad 	ext{(Bob sends to Alice)}$$

Both compute: $(g^a)^b \mod p = (g^b)^a \mod p = g^{ab} \mod p$

The shared secret $g^{ab} \mod p$ is computationally infeasible to derive from the public values alone.

### Hashing

One-way functions — given output $H(m)$, finding input $m$ should be infeasible.

| Algorithm | Output Size | Notes |
|---|---|---|
| MD5 | 128 bits | Broken for security, use for checksums only |
| SHA-1 | 160 bits | Deprecated |
| SHA-256 | 256 bits | Widely used, secure |
| bcrypt | 184 bits | Purpose-built for passwords, slow by design |

---

## CTF Cryptography Quick Reference

| Observation | Likely Cipher |
|---|---|
| Only uppercase letters, no spaces | Caesar / ROT-N |
| Frequency distribution flat, repeating key pattern | Vigenere |
| Letters preserved but shuffled positions | Rail Fence / Columnar |
| `-----BEGIN PGP` or large numbers | RSA |
| `==` suffix in base64 | Base64 encoded |
| `%xx` in text | URL encoding |
| Dots and dashes | Morse Code |
| All letters unique (bijective mapping) | Monoalphabetic substitution |

---

## Conclusion

Classical cryptography forms the foundation of modern security concepts. CTF cryptography challenges regularly revisit these ciphers because they demonstrate the core principles that drive modern cryptographic design: confusion (substitution), diffusion (transposition), and key management. Mastering the classical cipher toolkit — Caesar, Vigenere, Rail Fence, frequency analysis — and understanding modern asymmetric primitives (RSA, Diffie-Hellman) covers the majority of CTF cryptography challenges.

---

## References

- [CyberChef — The Cyber Swiss Army Knife](https://gchq.github.io/CyberChef/)
- [dCode — Cipher Encyclopedia](https://www.dcode.fr/en)
- [Cryptii — Modular Codec](https://cryptii.com/)
- [Wikipedia — Classical Cipher](https://en.wikipedia.org/wiki/Classical_cipher)
- [Crypto101 — Free Beginner Cryptography Book](https://crypto101.io/)
- [PicoCTF Official Platform](https://picoctf.org)
