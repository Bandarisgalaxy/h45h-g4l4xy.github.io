---
layout: post
title: "HashCrack"
date: 2025-08-29
categories: [PicoCTF, Cryptography]
tags: [picoctf, cryptography, hashing, md5, sha1, sha256, password-cracking, ctf, Easy]
author: Harshith
description: A PicoCTF cryptography challenge cracking weak MD5, SHA-1, and SHA-256 hashed passwords from a breached server to retrieve a stored secret flag.
toc: true
---

## Introduction

The **HashCrack** challenge on PicoCTF simulates a real-world scenario: gaining access to a breached server that used weak, unsalted password hashes. By connecting to the server and cracking three progressively stronger hash algorithms (MD5, SHA-1, SHA-256), we demonstrate why unsalted common-word hashes are trivially reversed using precomputed rainbow table databases.

> **Challenge Description:** "A company stored a secret message on a server which got breached due to the admin using weakly hashed passwords. Can you gain access to the secret stored within the server?"

---

## Challenge Overview

| Field | Details |
|---|---|
| **Platform** | PicoCTF |
| **Category** | Cryptography |
| **Difficulty** | Easy |
| **Technique** | Hash Identification, Unsalted Hash Reversal via Rainbow Tables |

---

## Environment Setup

**Required Tools:**
- Linux terminal with `nc` (netcat)
- Tool: `hashid` for hash algorithm identification
- Online lookup: [10015.io Hash Tools](https://10015.io/)

```bash
# Install hashid if needed
sudo apt install hashid
```

---

## Solution Walkthrough

### Step 1: Connect to the Server

```bash
nc verbal-sleep.picoctf.net 54649
```

`nc` (netcat) is a networking utility for establishing TCP/UDP connections. It connects to the challenge server on port `54649`, which presents an interactive hash-cracking challenge.

### Step 2: Crack the MD5 Hash

The server presents:
```
482c811da5d5b4bc6d497ffa98491e38
```

**Identify the hash type:**

```bash
hashid 482c811da5d5b4bc6d497ffa98491e38
```

Output: `MD5`

**Lookup in rainbow table:**

Go to [10015.io MD5 Decrypt](https://10015.io/tools/md5-encrypt-decrypt) and paste the hash.

Result: `password123`

Submit `password123` to the server.

### Step 3: Crack the SHA-1 Hash

The server presents:
```
b7a875fc1ea228b9061041b7cec4bd3c52ab3ce3
```

**Identify:**

```bash
hashid b7a875fc1ea228b9061041b7cec4bd3c52ab3ce3
```

Output: `SHA-1`

**Lookup:** [10015.io SHA1 Decrypt](https://10015.io/tools/sha1-encrypt-decrypt)

Result: `letmein`

Submit `letmein` to the server.

### Step 4: Crack the SHA-256 Hash

The server presents:
```
916e8c4f79b25028c9e467f1eb8eee6d6bbdff965f9928310ad30a8d88697745
```

**Identify:**

```bash
hashid 916e8c4f79b25028c9e467f1eb8eee6d6bbdff965f9928310ad30a8d88697745
```

Output: `SHA-256`

**Lookup:** [10015.io SHA256 Decrypt](https://10015.io/tools/sha256-encrypt-decrypt)

Result: `qwerty098`

Submit `qwerty098` to the server. The flag is revealed.

---

## Key Concepts

**Hash Algorithm Comparison:**

| Algorithm | Output Length | Status | Use Case |
|---|---|---|---|
| MD5 | 128-bit (32 hex chars) | Broken (collision attacks) | Legacy/checksums only |
| SHA-1 | 160-bit (40 hex chars) | Weak (collision attacks) | Deprecated |
| SHA-256 | 256-bit (64 hex chars) | Secure (without salting) | Still used but salt needed |
| bcrypt | 184-bit + salt | Secure | Password storage |
| Argon2 | Variable | Most secure | Modern password storage |

**Why Unsalted Hashes Are Crackable:**

```
# Without salt:
"password123" → always → 482c811da5d5b4bc6d497ffa98491e38

# Attack via rainbow table:
hash_db["482c811da5d5b4bc6d497ffa98491e38"] = "password123"  ← already computed!

# With salt:
"password123" + "$abc123" → f5d1278e8109edd94e1e4197e04873bf
# This hash is unique — no precomputed table exists for this salt+password combo
```

**Identifying Hashes by length:**

```bash
hashid <hash>          # Auto-identify by format
echo -n "text" | md5sum    # Compute MD5
echo -n "text" | sha1sum   # Compute SHA-1
echo -n "text" | sha256sum # Compute SHA-256
```

---

## Flag

```
picoCTF{UseStr0nG_h@shEs_&PaSswDs!_6965e43b}
```

---

## Security Insights

- **Use adaptive hashing for passwords:** Algorithms explicitly designed for password storage (bcrypt, Argon2, PBKDF2) are intentionally slow and include salt automatically.
- **Never use MD5 or SHA-1 for password storage:** Both are cryptographically broken and have massive precomputed rainbow table databases.
- **Salt is mandatory:** Even SHA-256 passwords are crackable via rainbow tables if no unique salt is used. Salting ensures each hash is unique even for identical passwords.
- **Common password lists:** Passwords like `password123`, `letmein`, and `qwerty098` appear in every major wordlist (RockYou, etc.) and are instantly reversed by any hash lookup database.

---

## Conclusion

HashCrack demonstrates the practical weakness of unsalted weak-password hashes. Despite MD5, SHA-1, and SHA-256 being one-way functions, massive precomputed rainbow table databases make reversing common passwords trivial in seconds. This challenge directly motivates the security community's shift toward adaptive, salted password hashing algorithms.

---

## References

- [OWASP — Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [Have I Been Pwned — Pwned Passwords](https://haveibeenpwned.com/Passwords)
- [10015.io Hash Tools](https://10015.io/)
- [PicoCTF Official Platform](https://picoctf.org)
