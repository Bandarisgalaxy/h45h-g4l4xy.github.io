---
categories:
- CTF Tips & Tricks
date: 2025-09-01
layout: post
tags:
- picoctf
- cryptography
- ctf
title: Tips On Cryptography-1
---

## 🔐 Unlocking Cryptography:

Cryptography challenges are one of the most common (and fun) parts of
Capture The Flag (CTF) competitions.\
If you're just starting out, this guide will walk you through the
**essential tools, common encodings, and beginner-friendly tricks** to
help you solve your first crypto problems.

------------------------------------------------------------------------

## 🚀 Before You Start (Setup Guide)

First things first: let's make sure your system is ready.

### 1. Open a Terminal

This is where you'll run all commands: - **Linux (Ubuntu/Debian):**
search for *"Terminal"*\
- **Windows:** install **Git Bash** or enable **WSL (Windows Subsystem
for Linux)**\
- **Mac:** open *"Terminal"* from Applications

------------------------------------------------------------------------

### 2. Install Basic Tools (Linux/WSL/Mac)

Run the following commands to install useful crypto/CTF tools:

``` bash
# Update your system
sudo apt update && sudo apt upgrade -y

# Install crypto tools
sudo apt install -y hashid john netcat openssl xxd
```

🛠️ These tools will help you detect hashes, crack passwords, work with
hex, and much more.

### 3. Test Your Setup

Try a simple Base64 encode/decode:

``` bash
# Encode "hello" in Base64
echo "hello" | base64
# Output: aGVsbG8K

# Decode it back
echo "aGVsbG8K" | base64 -d
# Output: hello
```

✅ If this works, your environment is ready!

------------------------------------------------------------------------

## 🧩 Common Crypto Techniques for CTFs

### 🔎 Step 1: Always Check for Encodings

**Encoding** = a way of representing data (not encryption, just
transformation).

-   **Base64:** Converts binary data into readable letters/numbers.\
-   **Hexadecimal (Hex):** Represents bytes as 0-9 and A-F.\
-   **Binary:** Uses only 0 and 1.

Example (Base64):

``` bash
echo "aGVsbG8=" | base64 -d
# Output: hello
```

### 💡 Step 2: Don't Panic at Extra Characters

Sometimes you'll see weird formats like:

``` bash
b'aGVsbG8='
```

That `b''` just means it's a Python byte string. Decode the text inside:

``` bash
echo "aGVsbG8=" | base64 -d
# Output: hello
```

### 🔄 Step 3: Classical Ciphers (Caesar / ROT)

**Cipher** = a method of hiding text by transforming it.

-   **Caesar Cipher:** Each letter is shifted by a fixed number (e.g.,
    A→C with a shift of 2).\
-   **ROT13:** Special case of Caesar with a shift of 13.

Examples:

``` bash
# ROT13
echo "uryyb" | tr 'A-Za-z' 'N-ZA-Mn-za-m'
# Output: hello

# Caesar Cipher (shift by 8)
echo "rovvy" | tr 'A-Za-z' 'I-ZA-Hi-za-h'
# Output: hello
```

👉 If you don't know the key, brute-force all 26 possible shifts.

### 🔑 Step 4: Vigenère Cipher

**Vigenère Cipher**: Like Caesar, but uses a repeating key word to shift
letters differently.

Harder to spot than Caesar because patterns don't repeat as clearly.

Example:

``` vbnet
Ciphertext: RIJVSUYVJN
Key: KEY
Plaintext: HELLOWORLD
```

Try online tools like [dcode.fr](https://www.dcode.fr/vigenere-cipher)
if you don't want to decode manually.

### 🧾 Step 5: Hashes (MD5, SHA)

**Hash** = a one-way function that scrambles data into a fixed-length
string.
Used for passwords, file checks, and integrity verification.

Example:

``` bash
hashid d8578edf8458ce06fbc5bb76a58c5ca4
# Output: Possible Hashes → MD5
```

You cannot "decode" a hash (one-way function).
Instead, you try to crack it using tools like **John the Ripper** or
online databases.

### 🔍 Step 6: Hex and Binary

-   **Hexadecimal (Hex):** Numbers in base 16, often used in file
    contents.
-   **Binary:** Raw 0s and 1s, the lowest-level representation of data.

Examples:

**Hex → ASCII**

``` bash
echo 68656c6c6f | xxd -r -p
# Output: hello
```

**Binary → ASCII**

``` bash
echo 01101000 01100101 01101100 01101100 01101111 | perl -lpe '$_=pack"B*",@F'
# Output: hello
```

### 📜 Step 7: Certificates & Keys

-   **Certificates (.pem / .crt):** Prove identity on the web (used in
    HTTPS).
-   **Keys (.key):** Private/secret cryptographic material.

Inspect details with OpenSSL:

``` bash
openssl -req -in <certificate file> -text -noout
```

### 🛠 Step 8: Automate with Scripts

You can write your own brute-force scripts in Bash or Python.
Example: Caesar brute-force in bash:

``` bash
for i in {1..25}; do
  echo "EncryptedText" | tr 'A-Za-z' "$(echo {A..Z} | sed -E "s/ //g" | cut -c$((i+1))-26)$(echo {A..Z} | sed -E "s/ //g" | cut -c1-$i)$(echo {a..z} | sed -E "s/ //g" | cut -c$((i+1))-26)$(echo {a..z} | sed -E "s/ //g" | cut -c1-$i)"
done
```

------------------------------------------------------------------------

### ✅ Quick Checklist for CTF Crypto Challenges

-   Base64 / Hex / Binary? → Try decoding.
-   Shifted letters? → Try Caesar/ROT.
-   Repeating patterns? → Try Vigenère.
-   Long random string? → Likely a hash.
-   Got a file? → Run `file` or `strings`.
-   Certificates/keys? → Use OpenSSL.