---
layout: post
title: "Scavenger Hunt"
date: 2025-07-27
categories: [PicoCTF, Web Exploitation]
tags: [picoctf, webexploitation, reconnaissance, robots-txt, htaccess, ctf, Easy]
author: Harshith
description: A PicoCTF web exploitation challenge requiring multi-source reconnaissance across HTML, CSS, JS, robots.txt, .htaccess, and .DS_Store to piece together the hidden flag.
toc: true
---

## Introduction

The **Scavenger Hunt** challenge on PicoCTF simulates a real web reconnaissance scenario. The flag is scattered across six different location types, each representing a common web asset that developers often overlook from a security perspective.

> **Challenge Description:** "Find the flag hidden across multiple files on the website."

---

## Challenge Overview

| Field | Details |
|---|---|
| **Platform** | PicoCTF |
| **Category** | Web Exploitation |
| **Difficulty** | Easy |
| **Technique** | Web Reconnaissance, robots.txt, .htaccess, .DS_Store |

---

## Environment Setup

**Required Tools:**
- A modern web browser (Chrome or Firefox)
- Browser Developer Tools (`F12`)

No additional software installation is required.

---

## Solution Walkthrough

### Step 1: View the HTML Source (Part 1)

Press `Ctrl + U` to view the page source. The **first part** of the flag is hidden in the HTML source.

### Step 2: Open the CSS File (Part 2)

Find the linked `style.css` file in the source. Open it directly in the browser — it contains the **second part** of the flag.

### Step 3: Open the JavaScript File and Follow the Hint (Part 3)

Find and open `script.js`. It contains the **third part** of the flag and leaves a hint:

> *"How can I keep Google from indexing my website?"*

This refers to `robots.txt`.

### Step 4: Check `/robots.txt` (Part 3 Confirmed + Hint for Part 4)

Navigate to:

```
<challenge_url>/robots.txt
```

This contains the **third part** of the flag and another hint about Apache server configuration:

> *"I think this is an apache server... can you Access the next flag?"*

### Step 5: Access `/.htaccess` (Part 4)

Apache servers use `.htaccess` for configuration. Navigate to:

```
<challenge_url>/.htaccess
```

This reveals the **fourth part** of the flag and hints at macOS file storage.

### Step 6: Access `/.DS_Store` (Part 5)

`.DS_Store` is a macOS-generated directory metadata file. Navigate to:

```
<challenge_url>/.DS_Store
```

The **fifth and final part** of the flag is embedded inside.

### Step 7: Combine All Parts

Concatenate all five parts to form the complete flag.

---

## Key Concepts

**Common Sensitive Web Files:**

| File | Description | Security Risk |
|---|---|---|
| `robots.txt` | SEO instructions for crawlers | May expose hidden paths |
| `.htaccess` | Apache server configuration | Can leak server config |
| `.DS_Store` | macOS folder metadata | Can expose directory structure |
| `.git/config` | Git repository config | May expose remote URLs |
| `backup.zip` | Backup archives | May contain source code |

---

## Flag

```
picoCTF{th4ts_4_l0t_0f_pl4c3s_2_lO0k_f7ce8828}
```

---

## Security Insights

- **Deployment hygiene matters:** Files like `.DS_Store`, `.htaccess`, and `.git/` should always be excluded from public web deployments.
- **`robots.txt` is public:** It is readable by anyone, attacker or crawler. Never put sensitive path names there.
- **Apache misconfiguration** via exposed `.htaccess` files can reveal server-side rules and authentication bypass opportunities.
- **Use `.gitignore` and CI/CD checks** to prevent sensitive system files from being deployed to production.

---

## Conclusion

This challenge demonstrates the breadth of information leakage possible through standard web file types. Real attackers routinely probe these locations during web reconnaissance. Security teams should implement automated checks to ensure no sensitive files are publicly accessible on their web servers.

---

## References

- [OWASP — Information Exposure Through Directory Listing](https://owasp.org/www-community/attacks/Directory_traversal)
- [Apache .htaccess Documentation](https://httpd.apache.org/docs/current/howto/htaccess.html)
- [PicoCTF Official Platform](https://picoctf.org)
