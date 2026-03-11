---
layout: post
title: "Bookmarklet"
date: 2025-07-25
categories: [PicoCTF, Web Exploitation]
tags: [picoctf, webexploitation, javascript, ctf, Easy]
author: Harshith
description: A PicoCTF web exploitation challenge where a JavaScript bookmarklet is used to execute hidden code and reveal the flag from the page source.
toc: true
---

## Introduction

The **Bookmarklet** challenge on PicoCTF introduces web exploitation through JavaScript bookmarklets. A bookmarklet is a small JavaScript program stored as a browser bookmark. In this challenge, the developer embedded a flag-revealing script directly in the page source, expecting only authorized users to execute it.

> **Challenge Description:** "Why search for the flag when I can make a bookmarklet to print it for me?"

---

## Challenge Overview

| Field | Details |
|---|---|
| **Platform** | PicoCTF |
| **Category** | Web Exploitation |
| **Difficulty** | Easy |
| **Technique** | JavaScript Execution, Page Source Inspection |

---

## Environment Setup

**Required Tools:**
- A modern web browser (Chrome or Firefox recommended)
- Browser Developer Tools (`F12`)

No additional software installation is required for this challenge.

---

## Solution Walkthrough

### Step 1: Open the Challenge Website

Navigate to the challenge URL provided on the PicoCTF platform.

### Step 2: Read the Page Content

Read the instructions on the page — it mentions creating or using a bookmarklet.

### Step 3: View the Page Source

Press `Ctrl + U` to open the raw page source in a new tab.

### Step 4: Locate the JavaScript Bookmarklet

Search the page source for a JavaScript snippet that resembles the following pattern:

```javascript
javascript:(function() { ... })()
```

### Step 5: Execute in the Browser Console

1. Copy the entire JavaScript bookmarklet code.
2. Press `F12` to open Developer Tools.
3. Navigate to the **Console** tab.
4. If your browser blocks pasting, type the following and press Enter first:

```
allow pasting
```

5. Paste the copied JavaScript code and press Enter.

### Step 6: Retrieve the Flag

A browser alert pop-up will appear displaying the flag.

---

## Key Concepts

**What is a Bookmarklet?**

A bookmarklet is a browser bookmark containing JavaScript code instead of a URL. When executed, it runs in the context of the currently active page.

```javascript
javascript:(function() {
  alert("Flag: picoCTF{...}");
})()
```

**Why Does This Work?**

Browsers expose a JavaScript execution environment to all users. When a developer embeds sensitive logic client-side, any visitor can access and run it directly from the Console — no special tools needed.

---

## Flag

```
picoCTF{p@g3_turn3r_6bbf8953}
```

---

## Security Insights

- **Never trust the client:** Sensitive logic placed in client-side JavaScript is accessible to every user who can view the page source.
- **Bookmarklets are a legitimate attack surface:** JavaScript embedded directly in a page can be extracted and run independently of the UI.
- **Source inspection is a standard first step:** Reviewing HTML, JS, and CSS source should be the first step in any web exploitation challenge or security assessment.

---

## Conclusion

This challenge demonstrates that embedding sensitive operations in client-side JavaScript is a critical security flaw. Authentication, authorization, and flag generation must always be performed server-side. A simple `Ctrl + U` is all an attacker needs when developers rely on client-side security.

---

## References

- [MDN Web Docs — JavaScript in the Browser](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [PicoCTF Official Platform](https://picoctf.org)


