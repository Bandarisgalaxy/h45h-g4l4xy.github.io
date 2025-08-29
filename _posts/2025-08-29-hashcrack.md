---
layout: post
title: "HashCrack"
date: 2025-08-29
categories: [PicoCTF, cryptography]
tags: [picoctf, cryptography, ctf, Easy]
---

## 📝 Challenge Description
A company stored a secret message on a server which got breached due to the admin using weakly hashed passwords. Can you gain access to the secret stored within the server?  

We are asked to connect to the server and crack the weakly hashed passwords to retrieve the flag.  

Access the server with:  
```bash
nc verbal-sleep.picoctf.net 54649
```

---

## 🔎 Approach

### 1. Connect to the server
We use the `nc` (netcat) command to establish a connection with the server.  
```bash
nc verbal-sleep.picoctf.net 54649
```
- **`nc`**: a networking utility used to connect to servers and services via TCP/UDP.  
- Here, it connects us to the remote server running on port `54649`.  

The server then provides us with a hash.

---

### 2. Identify the hash type
The first hash received is:
```
482c811da5d5b4bc6d497ffa98491e38
```

We can identify the hash type using the `hashid` command:
```bash
hashid 482c811da5d5b4bc6d497ffa98491e38
```
- **`hashid`**: a tool that identifies the algorithm used to create a given hash (MD5, SHA1, SHA256, etc.).  

This tells us it’s an **MD5 hash**.

---

### 3. Crack the MD5 hash
Open the online tool [10015.io MD5 Decrypt](https://10015.io/tools/md5-encrypt-decrypt), paste the hash, and decrypt it.  
It reveals the password:  
```
password123
```

Enter this password back into the server.  

---

### 4. Crack the SHA1 hash
The server now gives another hash:
```
b7a875fc1ea228b9061041b7cec4bd3c52ab3ce3
```

Check the hash type:
```bash
hashid b7a875fc1ea228b9061041b7cec4bd3c52ab3ce3
```
It’s identified as **SHA1**.

Decrypt the hash using [10015.io SHA1 Decrypt](https://10015.io/tools/sha1-encrypt-decrypt).  
It reveals the password:
```
letmein
```

Enter this password into the server.

---

### 5. Crack the SHA256 hash
The server now gives another hash:
```
916e8c4f79b25028c9e467f1eb8eee6d6bbdff965f9928310ad30a8d88697745
```

Check the type:
```bash
hashid 916e8c4f79b25028c9e467f1eb8eee6d6bbdff965f9928310ad30a8d88697745
```
It’s identified as **SHA256**.

Decrypt it using [10015.io SHA256 Decrypt](https://10015.io/tools/sha256-encrypt-decrypt).  
It reveals the password:
```
qwerty098
```

Enter this password into the server.

---

### 6. Retrieve the flag
After entering all the correct passwords, the server reveals the flag:  

```
picoCTF{UseStr0nG_h@shEs_&PaSswDs!_6965e43b}
```

---

## 🛠️ Key Commands Explained
- **`nc <host> <port>`** → Connects to a remote server using netcat.  
- **`hashid <hash>`** → Identifies which hashing algorithm was used to generate the hash.  

---

## 🎯 Learning Takeaways
- Weakly hashed passwords (like MD5, SHA1, SHA256 without salting) can be cracked easily using online databases.  
- Tools like `hashid` help to quickly recognize which hashing algorithm was used.  
- Always use strong hashing algorithms (bcrypt, Argon2, PBKDF2) with salting for secure password storage.  