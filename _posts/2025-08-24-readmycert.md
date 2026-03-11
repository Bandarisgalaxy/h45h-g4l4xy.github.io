---
layout: post
title: "ReadMyCert"
date: 2025-08-24
categories: [PicoCTF, Cryptography]
tags: [picoctf, cryptography, PKI, CSR, openssl, certificates, ctf, Medium]
author: Harshith
description: A PicoCTF cryptography challenge extracting a hidden flag embedded inside a Certificate Signing Request (CSR) file using OpenSSL command-line tools.
toc: true
---

## Introduction

The **ReadMyCert** challenge on PicoCTF introduces X.509 Certificate Signing Requests (CSRs) and the OpenSSL toolkit. CSRs are standard components of Public Key Infrastructure (PKI) used to apply for SSL/TLS certificates. In this challenge, a flag is hidden inside the metadata fields of a `.csr` file, demonstrating how certificate metadata can contain arbitrary strings.

> **Challenge Description:** "How about we take you on an adventure on exploring certificate signing requests? Take a look at this CSR file here."

---

## Challenge Overview

| Field | Details |
|---|---|
| **Platform** | PicoCTF |
| **Category** | Cryptography |
| **Difficulty** | Medium |
| **Technique** | PKI/CSR Inspection with OpenSSL |

---

## Environment Setup

**Required Tools:**
- Linux terminal
- `openssl` command-line toolkit (pre-installed on most Linux distributions)
- `wget` for downloading the file

---

## Background: Understanding CSRs

A **Certificate Signing Request (CSR)** is a structured, base64-PEM encoded file submitted to a Certificate Authority (CA) to request a signed SSL/TLS certificate. It contains:

- **Subject fields:** Common Name (CN), Organization (O), Country (C), etc.
- **Public Key:** The applicant's public key
- **Signature:** Signed with the applicant's private key to prove ownership

| File Extension | Description |
|---|---|
| `.csr` | Certificate Signing Request |
| `.crt` / `.pem` | Signed certificate |
| `.key` | Private key |
| `.p12` / `.pfx` | PKCS#12 (certificate + private key bundle) |

---

## Solution Walkthrough

### Step 1: Download the CSR File

```bash
wget https://artifacts.picoctf.net/c/425/readmycert.csr
```

### Step 2: Inspect the Downloaded File

```bash
ls
# readmycert.csr
```

### Step 3: Decode the CSR with OpenSSL

```bash
openssl req -in readmycert.csr -noout -text
```

**Flag breakdown:**

| Flag | Purpose |
|---|---|
| `req` | Work with certificate requests (CSRs) |
| `-in readmycert.csr` | Specify the input CSR file |
| `-noout` | Do not print the encoded (PEM) representation |
| `-text` | Output the CSR in human-readable text format |

### Step 4: Find the Flag in the Output

The command outputs all CSR fields in readable format. Look in the **Subject** section for the **Common Name (CN)** field:

```
Certificate Request:
    Data:
        Version: 1 (0x0)
        Subject: CN=picoCTF{read_mycert_693f7c03},
                 C=US, ST=PA, L=Pittsburgh,
                 O=Carnegie Mellon University,
                 OU=Networking Lab
```

The CN field contains the flag directly.

---

## Key Concepts

**How to Handle Certificate Files in CTFs:**

For different certificate-related files, use these OpenSSL commands:

```bash
# Inspect a CSR:
openssl req -in file.csr -noout -text

# Inspect a signed certificate:
openssl x509 -in file.crt -noout -text

# Inspect a private key:
openssl rsa -in file.key -check

# Extract all fields from a certificate:
openssl x509 -in file.crt -noout -subject -issuer -dates
```

**Fields to Look For in CTF Challenges:**

- `CN` (Common Name) — often contains the flag or a path to it
- `OU` (Organizational Unit) — can contain encoded data
- `SAN` (Subject Alternative Names) — extended field, often checked
- `emailAddress` — sometimes contains encoded strings

---

## Flag

```
picoCTF{read_mycert_693f7c03}
```

---

## Security Insights

- **CSR metadata is fully controlled by the requester:** Any string can be placed in the CN, O, or OU fields. CAs may or may not verify the accuracy of these fields.
- **Never trust CN for security decisions:** Using CN for authentication (e.g., matching hostnames) without proper certificate chain validation and SANs is a well-known vulnerability.
- **Certificate transparency logs are public:** All issued certificates are logged in public Certificate Transparency (CT) logs — making certificate metadata permanently public and searchable.
- **Inspect certificates during penetration testing:** Certificate metadata often reveals internal hostnames, organizational structure, and development environment details.

---

## Conclusion

ReadMyCert teaches the fundamentals of X.509 PKI infrastructure and demonstrates OpenSSL as an essential forensic tool for certificate inspection. In real-world security engagements, certificate metadata frequently reveals information about internal infrastructure — making OpenSSL certificate inspection a standard reconnaissance technique.

---

## References

- [OpenSSL Documentation](https://www.openssl.org/docs/)
- [RFC 5280 — X.509 Certificate Profile](https://tools.ietf.org/html/rfc5280)
- [Certificate Transparency — Google](https://certificate.transparency.dev/)
- [PicoCTF Official Platform](https://picoctf.org)
