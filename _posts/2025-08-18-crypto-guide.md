---
layout: post
title: "Cryptography-Introduction"
date: 2025-08-18
categories: [PicoCTF, cryptography, cryptography-guide]
tags: [picoctf, cryptography, ctf]
---

# Beginner’s Guide to Cryptography (for picoCTF)

Cryptography is the science of **hiding and protecting information** so only the right person can read it. It protects things like:

- Your **passwords**
- Your **private messages**
- Sensitive **bank or personal data**

In CTFs like **picoCTF**, many challenges are based on simple forms of cryptography. This guide will walk you through the basics.

---

## 🔑 Key Terms (Super Important!)

- **Encryption** → Scrambling text with a *key* so that only the right person can unscramble it.  
  (Plaintext → Ciphertext → back to Plaintext with a key)

- **Encoding** → Just changing the format, not for secrecy (examples: Base64, ASCII, Morse).  

- **Hashing** → A one-way transformation into a fixed-length code (e.g., SHA-256). Cannot be reversed.  
  Used for **checking integrity** and storing passwords.

💡 *Tip: Encoding ≠ Encryption ≠ Hashing. Don’t mix them up!*

---

## 1. Substitution Ciphers

Here, each letter is replaced with another.

---

### 1.1 Caesar Cipher (Shift Cipher)

Shift each letter by a number.  
Example (Shift = 3):

```
Plaintext : ATTACK AT DAWN
Ciphertext: DWWDFN DW GDZQ
```

- Encryption → shift letters forward.  
- Decryption → shift letters backward.  

💡 *Only 25 possible shifts → brute force is easy.*

---

### 1.2 ROT13 (Caesar with shift = 13)

A special Caesar cipher with shift **13**.  
If you apply ROT13 **twice**, you get the original text.

Example:  
`HELLO` → `URYYB` → `HELLO`

![ROT13 Example](https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/ROT13_table_with_example.svg/1024px-ROT13_table_with_example.svg.png)

---

### 1.3 Monoalphabetic Substitution

Each letter is replaced with another **random letter**.

Example mapping:

```
Plain : ABCDEFGHIJKLMNOPQRSTUVWXYZ
Cipher: QWERTYUIOPASDFGHJKLZXCVBNM
```

Text: `DEFEND THE WALL`  
Cipher: `RTYBRT ZIT VQKK`

💡 *Weakness: Frequency analysis (letters like "E" appear a lot).*

---

### 1.4 Vigenère Cipher (Polyalphabetic Substitution)

Instead of one alphabet, it uses multiple alphabets based on a **keyword**.

Example:

```
Plaintext : BIMANDO
Key       : LINUX
Ciphertext: MQZUKOW
```
![Vigenere cipher](https://linuxhint.com/wp-content/uploads/2023/12/image8-3.png)

💡 *Stronger than Caesar because same letter can encrypt differently.*

---

## 2. Transposition Ciphers

Here, we don’t change letters — we **rearrange them**.

---

### 2.1 Rail Fence Cipher

Write message in zig-zag pattern on “rails”.

Example: Message = `GeeksforGeeks`, Rails = 3

Cipher = `GsGsekfrek eoe`

![Rail Fence Example](https://media.geeksforgeeks.org/wp-content/uploads/Untitled1.jpg)

---

### 2.2 Columnar Transposition Cipher

Write text in rows under a keyword, then read column by column.

Example with keyword `ZEBRA`:

![Columnar Transposition Example](https://media.geeksforgeeks.org/wp-content/uploads/columnar-transposition-cipher1.png)

---

## 3. Encoding Example: Morse Code

Morse code uses **dots (`.`) and dashes (`-`)**.

Example:  
`..-. .-.. .- --.` → `FLAG`

![Morse code Example](https://www.wikihow.com/images/thumb/e/e5/453382-Summary.jpg/v4-460px-453382-Summary.jpg)

💡 *Remember: Encoding is not encryption.*

---

## 4. Modern Cryptography Basics

Now let’s peek at some real-world crypto ideas.

---

### 4.1 Diffie–Hellman Key Exchange

Lets two people agree on a **shared secret key** without others knowing.

Example (tiny numbers):

- Public: `p = 23`, `g = 5`  
- Alice picks secret `a = 4` → sends `A = 5^4 mod 23 = 4`  
- Bob picks secret `b = 3` → sends `B = 5^3 mod 23 = 10`  
- They swap values.

Both compute the same shared key = **18** ✅

![Diffie Hellman](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/DiffieHellman.png/800px-DiffieHellman.png)

---

### 4.2 Modular Inverse

We want `x` such that:

```
(a * x) ≡ 1 (mod m)
```

Example: Inverse of 7 mod 26 = 15  
Because `7 * 15 = 105 ≡ 1 (mod 26)` ✅

💡 Used in RSA and affine ciphers.

---

## 📝 Final Notes

- **Substitution** → Replace letters (Caesar, ROT13, Vigenère).  
- **Transposition** → Shuffle letters (Rail Fence, Columnar).  
- **Encoding** → Just representation (Morse, Base64).  
- **Modern** → Math-based (Diffie–Hellman, Modular Inverse).  

💡 In picoCTF, always first ask:  
👉 Is it **substitution, transposition, encoding, or hashing**?

---