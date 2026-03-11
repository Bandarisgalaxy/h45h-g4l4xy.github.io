---
layout: post
title: "Credstuff"
date: 2025-08-26
categories: [PicoCTF, Cryptography]
tags: [picoctf, cryptography, caesar-cipher, rot13, credential-leak, ctf, Medium]
author: Harshith
description: A PicoCTF cryptography challenge finding and cracking a ROT13-encoded password from a leaked credential database dump.
toc: true
---

## Introduction

The **Credstuff** challenge on PicoCTF simulates a real-world credential database leak scenario. Given a pair of leaked credential files, the objective is to locate a specific user's password and decode it — revealing that the victim site stored passwords using ROT13, a trivially reversible encoding masquerading as security.

> **Challenge Description:** "We found a leak of a blackmarket website's login credentials. The task is to find the password of the user `cultiris` and successfully decrypt it."

---

## Challenge Overview

| Field | Details |
|---|---|
| **Platform** | PicoCTF |
| **Category** | Cryptography |
| **Difficulty** | Medium |
| **Technique** | Credential Enumeration, ROT13 Decryption |

---

## Environment Setup

**Required Tools:**
- Linux terminal with `wget`, `tar`, `grep`, `head`, `tail`, `tr`

---

## Solution Walkthrough

### Step 1: Download the Credential Leak Archive

```bash
wget https://artifacts.picoctf.net/c/151/leak.tar
```

### Step 2: Extract the Archive

```bash
tar -xvf leak.tar
```

**Flags explained:**

| Flag | Meaning |
|---|---|
| `-x` | Extract files |
| `-v` | Verbose output (show file names) |
| `-f` | Specify the archive filename |

After extraction, a `leak/` directory is created.

### Step 3: Explore the Files

```bash
cd leak
ls
```

Output:
```
passwords.txt  usernames.txt
```

The two files are aligned line-by-line: line `N` in `usernames.txt` corresponds to line `N` in `passwords.txt`.

### Step 4: Find the Line Number for `cultiris`

```bash
grep -n "cultiris" usernames.txt
```

**Flag:** `-n` shows the line number.

Output:
```
378:cultiris
```

`cultiris` is on **line 378**.

### Step 5: Extract the Corresponding Password

```bash
head -n 378 passwords.txt | tail -n 1
```

**How it works:**

- `head -n 378` — print the first 378 lines
- `| tail -n 1` — from those, take only the last line (line 378)

Output:
```
cvpbPGS{P7e1S_54I35_71Z3}
```

### Step 6: Identify the Encoding

The password `cvpbPGS{...}` looks similar to `picoCTF{...}`. Comparing:

```
cvpb  →  pico
```

Each letter is shifted by 13 — this is **ROT13**.

### Step 7: Decode with ROT13

```bash
echo "cvpbPGS{P7e1S_54I35_71Z3}" | tr 'A-Za-z' 'N-ZA-Mn-za-m'
```

**How `tr` performs ROT13:**
- `A-Za-z` — match all alphabetic characters
- `N-ZA-Mn-za-m` — shift each by 13 positions in the alphabet

Output:
```
picoCTF{C7r1F_54V35_71M3}
```

---

## Key Concepts

**ROT13 Cipher:**

ROT13 (Rotate by 13) is a special case of the Caesar cipher where the shift is exactly 13 — which means applying it twice returns the original text:

```
Encrypt:  picoCTF → cvpbPGS
Decrypt:  cvpbPGS → picoCTF  (apply ROT13 again)
```

**Linux `tr` Command:**

```bash
tr 'A-Za-z' 'N-ZA-Mn-za-m'
```

This maps:
- `A → N`, `B → O`, ..., `M → Z`, `N → A`, ..., `Z → M` (uppercase)
- Same logic for lowercase

**Line-Aligned File Lookups:**

When two files are aligned line-by-line (common in database exports), you can cross-reference them with `grep -n` and `head | tail`.

---

## Flag

```
picoCTF{C7r1F_54V35_71M3}
```

---

## Security Insights

- **ROT13 is not a security measure:** It is a trivially reversible encoding, not encryption. Storing passwords in ROT13 provides zero protection.
- **Password hashing requirements:** Real applications must store passwords using adaptive, salted, one-way hashing algorithms: **bcrypt**, **Argon2**, or **PBKDF2**.
- **Credential stuffing is a real-world attack:** Leaked credentials from one breach are tested on other services (credential stuffing). This challenge simulates that reconnaissance phase.
- **Audit leaked credential datasets:** Tools like `grep` allow rapid analysis of large credential dumps during incident response or threat intelligence work.

---

## Conclusion

Credstuff simulates the first step of a real credential-stuffing attack: finding a target user in a leaked database and recovering their password. The ROT13 "encoding" of the password makes this a cryptography challenge, while the file manipulation techniques (`grep`, `head`, `tail`) reflect real incident response and OSINT workflows.

---

## References

- [Wikipedia — ROT13](https://en.wikipedia.org/wiki/ROT13)
- [OWASP — Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [Have I Been Pwned](https://haveibeenpwned.com/) — real-world credential leak database
- [PicoCTF Official Platform](https://picoctf.org)
