---
layout: post
title: "Local Authority"
date: 2025-07-28
categories: [PicoCTF, Web Exploitation]
tags: [picoctf, webexploitation, javascript, hardcoded-credentials, ctf, Easy]
author: Harshith
description: A PicoCTF web exploitation challenge where hardcoded credentials embedded in client-side JavaScript expose the login flag.
toc: true
---

## Introduction

The **Local Authority** challenge on PicoCTF highlights one of the most common developer mistakes — embedding authentication credentials directly in client-side JavaScript. Any user can read JavaScript source files loaded by a web page, making hardcoded credentials a serious security vulnerability.

> **Challenge Description:** "Try to get the flag by inspecting the website."

---

## Challenge Overview

| Field | Details |
|---|---|
| **Platform** | PicoCTF |
| **Category** | Web Exploitation |
| **Difficulty** | Easy |
| **Technique** | JavaScript Source Analysis, Hardcoded Credential Discovery |

---

## Environment Setup

**Required Tools:**
- A modern web browser (Chrome or Firefox)
- Browser Developer Tools (`F12`)

---

## Solution Walkthrough

### Step 1: Open the Challenge Website

Navigate to the provided challenge URL. A login form is displayed.

### Step 2: Attempt Login to Observe Behavior

Try logging in with random credentials. The error response confirms a server-side check is happening based on credentials.

### Step 3: View the Page Source

Press `Ctrl + U` to inspect the HTML source and note any linked JavaScript files.

### Step 4: Open the Sources Tab in Developer Tools

Press `F12` and navigate to the **Sources** tab. Browse all listed source files.

### Step 5: Locate and Open `secure.js`

Find and open `secure.js`. Inside, you will find the hardcoded username and password:

```javascript
// Inside secure.js
var username = "admin";
var password = "SanitizedForBlog";
```

### Step 6: Use the Credentials to Log In

Return to the login form, enter the discovered username and password, and submit. The flag is displayed upon successful authentication.

---

## Key Concepts

**Why Hardcoded Credentials are Dangerous:**

JavaScript files loaded by a web page are fully accessible to any user who opens the browser's Developer Tools. Placing credentials, API keys, or any sensitive data in JavaScript is equivalent to publishing them publicly.

```javascript
// BAD practice -- never do this
const ADMIN_PASSWORD = "secret123";

// CORRECT practice -- authenticate server-side
fetch("/api/login", { method: "POST", body: JSON.stringify({user, pass}) });
```

---

## Flag

```
picoCTF{web_succ3ssfully_d3c0ded_df0da727}
```

---

## Security Insights

- **Never embed credentials in client-side code:** JavaScript is a public resource delivered to every visitor.
- **Server-side authentication is mandatory:** All credential validation must happen on the server, never in the browser.
- **Use environment variables and secrets managers:** In production, credentials and API keys are stored as environment variables or in dedicated secret vault services, never in source code.

---

## Conclusion

This challenge demonstrates a fundamental security principle: client-side code is always accessible to the user. Authentication must be performed entirely server-side. Developers must audit their JavaScript bundles for hardcoded secrets before deployment.

---

## References

- [OWASP — Hardcoded Passwords](https://owasp.org/www-community/vulnerabilities/Use_of_hard-coded_password)
- [PicoCTF Official Platform](https://picoctf.org)
