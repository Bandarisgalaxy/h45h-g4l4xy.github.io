---
layout: post
title: "Substitution1"
date: 2025-08-25
categories: [PicoCTF, cryptography]
tags: [picoctf, cryptography,ctf,Medium]
---
## 🔎 Description

We received another encoded message, similar to the previous
substitution challenge. Maybe the same solution method works again.

## 🛠️ Approach

1.  Copy the file link in picoctf:

        https://artifacts.picoctf.net/c/182/message.txt

2.  Open terminal and run:

    ``` bash
    wget https://artifacts.picoctf.net/c/182/message.txt
    ```

3.  This downloads `message.txt`. Open the file, and you'll see an
    encrypted message.

4.  The message looks like a **substitution cipher** (each letter
    replaced with another).

5.  Use an online substitution solver tool like
    [Quipqiup](https://quipqiup.com/).

6.  Paste the text, click solve, and it will automatically decrypt it.

7.  The decrypted text reveals the flag:

        picoCTF{FR3QU3NCY_4774CK5_4R3_C001_7AA384BC}

## 🏆 Flag

    picoCTF{FR3QU3NCY_4774CK5_4R3_C001_7AA384BC}

## 🧠 Takeaways

-   The message was encrypted with a **substitution cipher**.\
-   Solvers like Quipqiup use **frequency analysis** (common letters
    like E, T, A show up more often in English) to crack it.\
-   We learned that substitution ciphers are weak and can be easily
    broken using frequency patterns.

👉 In simple words: **If each letter is replaced by another, we can
still break it by looking at which letters appear most often.**