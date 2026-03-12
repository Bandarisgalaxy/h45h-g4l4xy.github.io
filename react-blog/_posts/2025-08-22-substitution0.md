---
layout: post
title: "Substitution0"
date: 2025-08-22
categories: [PicoCTF, Cryptography]
tags: [picoctf, cryptography, substitution-cipher, classical-crypto, ctf, Medium]
author: Harshith
description: A PicoCTF cryptography challenge solving a monoalphabetic substitution cipher by using the provided cipher key to map and decrypt the scrambled message.
toc: true
---

## Introduction

The **Substitution0** challenge on PicoCTF introduces monoalphabetic substitution ciphers — one of the oldest and most well-known classical cryptographic techniques. A substitution cipher replaces each letter of the plaintext with a different letter according to a fixed mapping. While simple to implement, it is trivially broken using frequency analysis or when the key is provided.

---

## 🔎 Challenge Description
A message has come in but it seems to be all scrambled. Luckily it seems to have the key at the beginning. Can you crack this substitution cipher?  

**Hint:** Try a frequency attack. An online tool might help.

---

## 🛠️ Approach

1. Download the given file:
   ```bash
   wget https://artifacts.picoctf.net/c/152/message.txt
   ```

2. Open the file and check its contents:
   ```
   DECKFMYIQJRWTZPXGNABUSOLVH 

   Ifnfuxpz Wfyndzk dnpaf, oqbi d yndsf dzk abdbfwv dqn, dzk enpuyib tf bif effbwf
   mnpt d ywdaa cdaf qz oiqci qb oda fzcwpafk. Qb oda d efdubqmuw acdndedfua, dzk, db
   bidb bqtf, uzrzpoz bp zdbundwqaba—pm cpunaf d ynfdb xnqhf qz d acqfzbqmqc xpqzb
   pm sqfo. Bifnf ofnf bop npuzk ewdcr axpba zfdn pzf flbnftqbv pm bif edcr, dzk d
   wpzy pzf zfdn bif pbifn. Bif acdwfa ofnf flcffkqzywv idnk dzk ywpaav, oqbi dww bif
   dxxfdndzcf pm eunzqaifk ypwk. Bif ofqyib pm bif qzafcb oda sfnv nftdnrdewf, dzk,
   bdrqzy dww biqzya qzbp cpzaqkfndbqpz, Q cpuwk idnkwv ewdtf Juxqbfn mpn iqa pxqzqpz
   nfaxfcbqzy qb.

   Bif mwdy qa: xqcpCBM{5UE5717U710Z_3S0WU710Z_59533D2F}
   ```

3. The first line (`DECKFMYIQJRWTZPXGNABUSOLVH`) looks like the **substitution key**.

4. The challenge hint suggests **frequency analysis**. A great tool for solving such ciphers is **[Quipqiup](https://quipqiup.com/)**.

5. Copy the ciphertext and paste it into Quipqiup, then click **Solve**.

6. The tool successfully decodes the message into proper English, revealing the flag.

## 🎯 Final Flag
**picoCTF{SUBSTITUTION_EVOLUTION_59533A2E}**

---

---

## 🔑 Understanding the Substitution Key

The substitution key tells us how letters are scrambled.  
Example mapping:  

```
Plain : ABCDEFGHIJKLMNOPQRSTUVWXYZ
Cipher: DECKFMYIQJRWTZPXGNABUSOLVH
```

- So **A → D**, **B → E**, **C → C**, etc.  
- This was used to encrypt the long scrambled text.  
- To decrypt, we invert the mapping.  

👉 The key is only used for the **ciphertext message**, not the flag itself.

---

## 🔡 The Flag Encoding Trick

The flag part:
```
xqcpCBM{5UE5717U710Z_3S0WU710Z_59533D2F}
```

is not encrypted with the substitution key. Instead, it uses **leet-speak** (numbers representing letters):  

- 5 → S  
- 7 → T  
- 0 → O  
- 1 → I  
- 3 → E  
- 2 → Z  

So the decoded flag is:  
```
picoCTF{SUBSTITUTION_EVOLUTION_59533A2E}
```

---

## ✅ Key Takeaway
The substitution key was used for the ciphertext message, **but not for the flag part**.  
The flag used **leet-speak obfuscation**, which is a separate trick.  

---