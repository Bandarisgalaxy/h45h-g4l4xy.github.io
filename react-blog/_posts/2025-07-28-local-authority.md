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

---

## 📄 Description  
Try to get the flag by inspecting the website.

---

## 🧭 Approach  

1. Open the challenge website.
2. You’ll see a login form appear.
3. View the source code of the login page (Right-click → "View Page Source" or press `Ctrl+U`).
4. Try to understand what happens when correct credentials are submitted.
5. Attempt logging in with some random username and password.
6. An error page will be displayed saying credentials are incorrect.
7. Now, open Developer Tools (`F12`), go to the **Sources** tab.
8. Explore each file listed under the source files.
9. Locate and open `secure.js`.
10. Inside `secure.js`, you’ll find the hardcoded username and password.
11. Go back to the login page and use these credentials.
12. Upon successful login, the flag will be displayed.

---

## 🎯 Final Flag  
<pre>picoCTF{web_succ3ssfully_d3c0ded_df0da727}</pre>

---

💡 **Learning Outcome:**  
Inspecting the client-side JavaScript files can reveal hidden credentials or logic flaws if the developer has insecurely embedded sensitive information.

