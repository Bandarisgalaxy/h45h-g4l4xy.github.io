---
layout: post
title: "Cryptography-Introduction"
date: 2025-08-18
categories: [PicoCTF, cryptography, cryptography-guide]
tags: [picoctf, cryptography, ctf]
---

# Beginner’s Guide to Cryptography (for picoCTF)

Cryptography is the science of securing information so that only the intended recipient can understand it. It protects passwords, private messages, and sensitive data — and in CTFs like **picoCTF**, it’s a core skill for solving challenges.

---

## Key Terms

- **Encryption**  
  Transforming readable text (**plaintext**) into scrambled text (**ciphertext**) using a key. Reversible with the correct key.

- **Encoding**  
  Converting data into another format (Base64, ASCII, Morse). Not meant for secrecy.

- **Hashing**  
  A one-way transformation into a fixed-length string (e.g., SHA-256, MD5). Used for integrity and passwords. Not reversible.

---

## 1. Substitution Ciphers

Substitution ciphers replace letters with other letters or symbols.

### 1.1 Caesar Cipher (Shift Cipher)

Each letter is shifted by a fixed number in the alphabet.

**Example (Shift = 3):**

```
Plaintext : ATTACK AT DAWN
Ciphertext: DWWDFN DW GDZQ
```

- Encrypt: shift forward by 3.  
- Decrypt: shift backward by 3.  

💡 **picoCTF tip**: Only 25 possible shifts. Brute force is easy.

---

### 1.2 ROT13 (Special Caesar Cipher)

A special case of Caesar cipher where the shift = 13.  
Applying ROT13 twice gives back the original message.

**Example:**

```
Plaintext : FLAG
Ciphertext: SYNT
```

💡 Often used to obfuscate text, but not secure.

---

### 1.3 Monoalphabetic Substitution

Each letter is mapped to a different random letter. Stronger than Caesar, but still crackable with **frequency analysis**.

**Example mapping:**

```
Plain : ABCDEFGHIJKLMNOPQRSTUVWXYZ
Cipher: QWERTYUIOPASDFGHJKLZXCVBNM
```

**Plaintext**: DEFEND THE WALL  
**Ciphertext**: RTYBRT ZIT VQKK

---

### 1.4 Vigenère Cipher (Polyalphabetic Substitution)

Uses multiple alphabets based on a **key word**.

**Example (Key = "KEY"):**

```
Plaintext : HELLO
Key       : KEYKE
Ciphertext: RIJVS
```

- H(7)+K(10) → R  
- E(4)+E(4)  → I  
- L(11)+Y(24)=35→ J (mod 26)  
- L(11)+K(10)=21→ V  
- O(14)+E(4)=18 → S  

**Ciphertext**: `RIJVS`

💡 Stronger than monoalphabetic, since same letters encrypt differently.

---

## 2. Transposition Ciphers

Here, letters are not changed but **rearranged**.

### 2.1 Rail Fence Cipher

Message is written in zig-zag pattern across rails.

**Example (3 rails):**

```
Plaintext : HELLOWORLD
Rails:
Rail 0: H . . . L . . . O . .
Rail 1: . E . L . W . R . . D
Rail 2: . . L . . O . . . . .

Ciphertext: HOLELWRDLO
```

---

### 2.2 Columnar Transposition Cipher

Plaintext is written in rows under a keyword, then read column by column.

**Example (Keyword = "HACK"):**

```
Plaintext : DEFENDTHEWALL
Keyword   : H A C K
Order     : 3 1 2 4

Grid:
D E F E
N D T H
E W A L
L X X X   (X = padding)
```

Read columns in order (A, C, H, K):

```
Ciphertext: EDWXFTAXDNELEHLX
```

---

## 3. Encoding Example: Morse Code

Morse code represents letters as dots (`.`) and dashes (`-`).

**Examples:**

```
A → .-
B → -...
HELLO → .... . .-.. .-.. ---
```

**Decode** by mapping symbols back to letters.  

💡 Note: Morse is **encoding, not encryption**.

---

## 4. Modern Cryptography Concepts

### 4.1 Diffie–Hellman Key Exchange

Allows two parties to agree on a shared secret over an insecure channel.

**Example (small numbers):**

- Public: `p = 23`, `g = 5`
- Alice picks secret `a = 6` → A = 5^6 mod 23 = 8  
- Bob picks secret `b = 15` → B = 5^15 mod 23 = 19  
- Exchange A, B

Shared secret:  
- Alice: 19^6 mod 23 = 2  
- Bob: 8^15 mod 23 = 2  

Both share the key = **2**.

---

### 4.2 Modular Inversion

Find `x` such that:

```
(a * x) ≡ 1 (mod m)
```

**Example: Inverse of 7 mod 26**

- Using Extended Euclidean Algorithm → inverse = 15  
- Check: `7 * 15 = 105 ≡ 1 (mod 26)` ✅

💡 Used in RSA and Affine ciphers.

---

## 5. Quick Practice Problems

1. Caesar (Shift 5): `FLAG` → **KQFL**  
2. ROT13: `PICO` → **CVPB**  
3. Vigenère (Key = CAT): `ATTACKATDAWN` → **CTTCENCTTCTP**  
4. Rail Fence (3 rails): `SECRETMESSAGE` → **SCSGERTMAESEE**  
5. Columnar (Keyword ZEBRA): `WEAREDISCOVERED` → **EVLNEACDTXESEAOFEDEOR**  
6. Morse: `..-. .-.. .- --.` → **FLAG**  
7. Modular inverse: `3 mod 26` → **9**

---

## Final Notes

- **Substitution**: replace letters (Caesar, ROT13, Monoalphabetic, Vigenère).  
- **Transposition**: shuffle letters (Rail Fence, Columnar).  
- **Encoding**: representation (Morse).  
- **Modern**: math-based (Diffie–Hellman, modular inverse).  

💡 In picoCTF: always check whether you’re dealing with **substitution, transposition, encoding, or hashing**.