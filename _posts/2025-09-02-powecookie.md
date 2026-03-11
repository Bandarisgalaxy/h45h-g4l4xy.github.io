---
layout: post
title: "Powercookie"
date: 2025-09-02
categories: [PicoCTF, Web Exploitation]
tags: [picoctf, webexploitation, cookies, javascript, privilege-escalation, ctf, Medium]
author: Harshith
description: A PicoCTF web exploitation challenge involving JavaScript console cookie manipulation to gain administrator access and reveal the hidden flag.
toc: true
---

## Introduction

The **Powercookie** challenge on PicoCTF demonstrates another variant of cookie-based privilege escalation. An online grade book application gates access based on an `isAdmin` cookie value — a pattern that mirrors real-world authorization vulnerabilities where client-controllable values determine server-side permissions.

> **Challenge Description:** "Can you get the flag? Go to the given website and see what you can discover."

---

## Challenge Overview

| Field | Details |
|---|---|
| **Platform** | PicoCTF |
| **Category** | Web Exploitation |
| **Difficulty** | Medium |
| **Technique** | Cookie Manipulation, Client-Side Authorization Bypass |

---

## Environment Setup

**Required Tools:**
- A modern web browser (Chrome or Firefox)
- Browser Developer Tools (`F12`) — Application tab

---

## Solution Walkthrough

### Step 1: Open the Website

Navigate to the challenge URL. The page appears to be an online grade book. There is a **"Continue as Guest"** button visible.

### Step 2: Attempt Guest Access

Click **"Continue as Guest"**. The server responds with:

```
We apologize, but we have no guest services at the moment.
```

Guest access is explicitly blocked. The challenge name "Power Cookie" strongly hints that cookie values control access levels.

### Step 3: Inspect Cookies

Open Developer Tools (`F12`). Navigate to:

```
Application → Storage → Cookies → [challenge URL]
```

You will find a cookie named `isAdmin` with the value `false` (or `0`).

### Step 4: Modify the Cookie Value

Change the `isAdmin` cookie:

1. Click on the cookie value field in the Application tab
2. Change `false` to `true` (or `0` to `1`)
3. Press Enter to save

**Alternative — JavaScript Console Method:**

```js
document.cookie = "isAdmin=true";
```

### Step 5: Refresh and Retrieve the Flag

Refresh the page. The server now reads `isAdmin=true` and grants administrative access, displaying the flag.

---

## Key Concepts

**Why `isAdmin=false` Stored in a Cookie Is Dangerous:**

```
// Server logic (simplified, vulnerable pattern):
if (req.cookies.isAdmin === "true") {
    res.render("admin_page_with_flag");
} else {
    res.send("We apologize, but we have no guest services...");
}
```

The server trusts the cookie value directly without any server-side verification. Since cookies are fully controlled by the client, changing `false` to `true` bypasses the check entirely.

**Comparison of Secure vs. Insecure Patterns:**

| Pattern | Security | Description |
|---|---|---|
| `isAdmin=true` in cookie | Insecure | Client-controlled — trivially bypassed |
| `session_id=random_token` in cookie | Secure | Server looks up permissions from database using the token |
| `Authorization: Bearer JWT` | Secure with signing | JWT is signed — tampering detected if signature is verified |

---

## Flag

```
picoCTF{gr4d3_A_c00k13_5d2505be}
```

---

## Security Insights

- **Never store authorization state in client cookies:** A cookie holding `isAdmin=true` is not access control — it is a suggestion the server must never trust.
- **Session-based authorization:** Use a server-side session store. The cookie holds only a random session ID; the server maps that ID to roles stored in a database.
- **JWT with proper signature verification:** If using JWTs, the server must verify the signature on every request — never skip signature validation.
- **Always test cookie values in web exploitation:** The first thing to check in any web challenge is whether cookies control access levels.

---

## Conclusion

Powercookie reinforces the fundamental lesson of client-side security: any data the client can read, it can modify. Cookie-based authorization — storing roles or permissions directly in a cookie — is a pattern that appears repeatedly in vulnerability disclosures and CTF challenges alike. The fix is always the same: move authorization state to the server.

---

## References

- [OWASP — Broken Access Control](https://owasp.org/www-project-top-ten/2017/A5_2017-Broken_Access_Control)
- [MDN Web Docs — HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [PortSwigger — Cookie Security](https://portswigger.net/web-security/authentication/other-mechanisms/lab-brute-forcing-a-stay-logged-in-cookie)
- [PicoCTF Official Platform](https://picoctf.org)
