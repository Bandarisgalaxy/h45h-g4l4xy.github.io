---
layout: post
title: "ReadMyCert"
date: 2025-08-24
categories: [PicoCTF, cryptography]
tags: [picoctf, cryptography,ctf,Medium]
---

## 🔐 ReadMyCert

### 📌 Challenge Description
How about we take you on an adventure on exploring certificate signing requests?  
Take a look at this CSR file here.

---

### 🧑‍💻 Prerequisites
Before solving this challenge, you should be familiar with:

1. **What is a CSR (Certificate Signing Request)?**
   - A CSR is a block of encoded text sent to a Certificate Authority (CA) when applying for an SSL certificate.  
   - It contains information like:
     - **Common Name (CN)** → domain or identifier
     - **Organization (O)**
     - **Country (C)**
     - **Public Key**
     - **How it is Working?**
   ![CA-Works](https://www.eetimes.com/wp-content/uploads/media-1121045-2011-12-05-crh-arora-freescale-encryption-fig2.gif)

2. **What is OpenSSL?**
   - OpenSSL is an open-source toolkit for **TLS/SSL protocols**.
   - It allows you to:
     - Generate private keys
     - Create CSRs
     - Decode/inspect certificates
     - Encrypt/Decrypt data

3. **Linux Command Line Basics**
   - Familiarity with `wget`, `ls`, and running commands in a terminal.

---

### 🚀 Approach
1. Copy the CSR file link and download it:
   ```bash
   wget https://artifacts.picoctf.net/c/425/readmycert.csr
   ```

2. List files to confirm:
   ```bash
   ls
   ```
   You’ll see `readmycert.csr`.

3. Use OpenSSL to read the CSR contents:
   ```bash
   openssl req -in readmycert.csr -noout -text
   ```

   **Explanation of flags:**
   - `req` → process certificate requests
   - `-in readmycert.csr` → input file is the CSR
   - `-noout` → do not output the encoded CSR
   - `-text` → display the CSR in human-readable text

4. Look under the **Subject → CN (Common Name)** field.  
   You’ll find the flag inside.

---

### 🏁 Final Flag
```
picoCTF{read_mycert_693f7c03}
```

---

### 📝 Key Takeaways
- A **CSR** is used to request a certificate from a Certificate Authority and contains identifying information.  
- The **CN (Common Name)** is often the hostname or unique identifier – here, it hid the PicoCTF flag.  
- The `openssl` tool is essential for working with cryptography challenges involving certificates.  
- Important command breakdown:
  - `openssl req` → work with certificate requests
  - `-text` → decode into human-readable format
  - `-noout` → prevents printing encoded version  

👉 **How to Handle Certificate-Based CTF Challenges**  
When you encounter `.csr`, `.crt`, `.pem`, or `.key` files in CTF challenges:  
1. **Identify the file type**  
   - `.csr` → Certificate Signing Request  
   - `.crt` / `.pem` → Certificate file  
   - `.key` → Private key  
   - `.p12` / `.pfx` → PKCS#12 archive (may contain private key + certificate)  

2. **Inspect the file with OpenSSL**  
   - For CSR:  
     ```bash
     openssl req -in file.csr -noout -text
     ```
   - For Certificate:  
     ```bash
     openssl x509 -in file.crt -noout -text
     ```
   - For Private Key:  
     ```bash
     openssl rsa -in file.key -check
     ```

3. **Look for hidden clues in fields like:**  
   - **CN (Common Name)**  
   - **OU (Organizational Unit)**  
   - **O (Organization)**  
   - **Email Address**  
   - **Subject Alternative Names (SANs)**  

4. **Check for anomalies**  
   - Strange values or strings in these fields often contain the flag.  

👉 In summary:  
Whenever you see certificate-related files in a CTF, **decode them with OpenSSL** and **read all metadata fields carefully**. The flag is usually hidden in **CN, OU, or SAN** fields.