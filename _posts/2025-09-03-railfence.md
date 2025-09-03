---
layout: post
title: "Railfence"
date: 2025-09-03
categories: [PicoCTF, cryptography]
tags: [picoctf, cryptography, ctf, Medium]
---

## 🔑Description  
We are given an encrypted message. The description says it was encoded with the **Rail Fence Cipher** using **4 rails**.  
Our goal is to decrypt it and recover the hidden flag.

---

## Step 1: What is a Rail Fence Cipher?  
The Rail Fence Cipher is a type of **transposition cipher**.  
That means it doesn’t change the letters themselves, but only rearranges their order.  

Here’s how it works:  
1. You choose the number of “rails” (rows). In this challenge, it’s 4.  
2. You write the message in a zig-zag pattern across those rails.  
3. Then you read the message row by row to create the ciphertext.  

To **decrypt**, we need to reverse this process.  

Example:  
Ciphertext = `HLOLELWRDLO`  
Decryption = `HELLO_WORLD`  

For detailed information: [Crypto Guide](https://bandarisgalaxy.github.io/h45h-g4l4xy.github.io/posts/crypto-guide/)

---

## Step 2: Download the message  
Open a terminal and run:  

```bash
wget https://artifacts.picoctf.net/c/188/message.txt
cat -A message.txt    # shows line breaks as $ so you know the exact format
```  

If needed, make the ciphertext a single line:  

```bash
tr -d '\n' < message.txt > message_oneline.txt
```

The file contains:  

```
Ta _7N6D49hlg:W3D_H3C31N__A97ef sHR053F38N43D7B i33___N6
```  

This is our encrypted text.

---

## Step 3: Decrypt the message  
We know it’s a Rail Fence Cipher with **4 rails**. Instead of coding, we can use an online tool.  

1. Go to [Cryptii](https://cryptii.com/pipes/rail-fence-cipher).  
2. Select **Decode**.  
3. Set the number of rails to **4**.  
4. Paste the encrypted text.  

The tool gives us:  

```
The flag is: WH3R3_D035_7H3_F3NC3_8361N_4ND_3ND_4A76B997
```  

---

## Step 4: Format the flag  
picoCTF requires the flag in the format:  

```
picoCTF{...}
```  

So the final flag is:  

```
picoCTF{WH3R3_D035_7H3_F3NC3_8361N_4ND_3ND_4A76B997}
```  

---

## Step 5: What did we learn?  
From this challenge, we learned:  
- What the Rail Fence Cipher is and how it works.  
- How to use Linux commands (`wget`, `cat`, `tr`) to fetch and clean files.  
- How to use the Cryptii website to decode ciphers without writing code.  
- How to properly format picoCTF flags.  

---

✅ Final Answer:  
**picoCTF{WH3R3_D035_7H3_F3NC3_8361N_4ND_3ND_4A76B997}**