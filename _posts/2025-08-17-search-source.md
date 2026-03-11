---
layout: post
title: "Search Source"
date: 2025-08-17
categories: [PicoCTF, Web Exploitation]
tags: [picoctf, webexploitation, source-review, wget, css, reconnaissance, ctf, Medium]
author: Harshith
description: A PicoCTF web exploitation challenge where the flag is hidden inside a CSS file, discovered by mirroring the entire website with wget and performing a recursive search.
toc: true
---

## Introduction

The **Search Source** challenge on PicoCTF demonstrates that flags and sensitive data can be hidden in **non-HTML resources** like CSS stylesheets, JavaScript files, and images. Instead of manually clicking through every linked file, this challenge teaches an efficient technique — mirroring the entire website locally and then using fast search tools to scan every file at once.

> **Challenge Description:** "The developer of this website accidentally left an important clue in the website source. Your task is to find it and get the flag."
>
> **Hint:** "How could you mirror (download) the website on your local machine so you can search it more easily?"

---

## Challenge Overview

| Field | Details |
|---|---|
| **Platform** | PicoCTF |
| **Category** | Web Exploitation |
| **Difficulty** | Medium |
| **Technique** | Website Mirroring with wget, Recursive File Search |

---

## Environment Setup

**Required Tools:**
- Terminal with `wget` and `rg` (ripgrep) installed
- Alternatively: `grep -r` as a fallback for `rg`

```bash
# Install ripgrep if needed
sudo apt install ripgrep
```

---

## Solution Walkthrough

### Step 1: Open the Website

Navigate to the challenge URL. The page looks like a standard website.

### Step 2: Search the Main Page Source

Press `Ctrl + U` to view the source. Search for common keywords:
- `flag`
- `pico`

You will find a comment in the HTML:

```html
<!-- The flag is not here but keep digging :) -->
```

This means the flag is embedded in one of the additional resource files (CSS, JS, etc.), not the main HTML.

### Step 3: Mirror the Entire Website

Instead of manually opening each linked file, use `wget` to download the complete website:

```bash
wget -m -p -E -k -np http://saturn.picoctf.net:52685/
```

**Flag Explanation:**

| Flag | Meaning |
|---|---|
| `-m` | Mirror mode — download everything recursively |
| `-p` | Download all page requisites (CSS, images, JS) |
| `-E` | Adjust file extensions to `.html` for local browsing |
| `-k` | Rewrite links for offline use |
| `-np` | No-parent: stay within the starting URL |

A directory named `saturn.picoctf.net:52685/` will be created with all downloaded files.

### Step 4: Search All Files for the Flag

Navigate into the mirrored directory and search for the flag prefix:

```bash
cd saturn.picoctf.net:52685/
rg picoCTF
```

Or using standard `grep`:

```bash
grep -r "picoCTF" .
```

### Step 5: Locate the Flag

The search output will show:

```
css/style.css
328:/** banner_main picoCTF{1nsp3ti0n_0f_w3bpag3s_ec95fa49} **/
```

The flag was hidden inside a CSS comment on line 328 of `style.css`.

---

## Key Concepts

**Why CSS Files Can Contain Sensitive Data:**

CSS comments (`/** ... **/` or `/* ... */`) are not rendered visually in the browser but are included in the full HTTP response body. Any data embedded in comments is fully visible to anyone who downloads the CSS file or views the browser's Network tab.

**Efficient Search with ripgrep:**

```bash
rg picoCTF           # Search all files for flag prefix
rg -l picoCTF        # List only filenames containing the match
rg -n picoCTF        # Show line numbers with matches
```

---

## Flag

```
picoCTF{1nsp3ti0n_0f_w3bpag3s_ec95fa49}
```

---

## Security Insights

- **CSS/JS comments are not private:** Any comment in a stylesheet or script is delivered verbatim to every browser that loads the page.
- **Strip debug artifacts before deployment:** Remove all developer comments, `console.log()` statements, and debug markers before pushing to production.
- **Use file linting in CI/CD:** Automated pipeline checks can scan for patterns like `TODO`, `FIXME`, or credential-like strings in CSS and JS before deployment.
- **Source map security:** Never deploy `.map` files to production — they expose the full original pre-minified source code.

---

## Conclusion

This challenge reinforces that web source inspection extends beyond the main HTML document. Flags, credentials, and debug information can be hidden in any file served by the web application. Tools like `wget` and `rg` (ripgrep) enable efficient bulk analysis across every file in a web application's asset tree.

---

## References

- [GNU wget Manual](https://www.gnu.org/software/wget/manual/wget.html)
- [ripgrep GitHub](https://github.com/BurntSushi/ripgrep)
- [OWASP — Information Exposure Through Comments](https://owasp.org/www-community/vulnerabilities/Information_exposure_through_query_strings_in_url)
- [PicoCTF Official Platform](https://picoctf.org)
