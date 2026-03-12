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

---

## 🔖 Challenge Description

Why search for the flag when I can make a bookmarklet to print it for me?

---

## 🧭 Step-by-Step Approach

1. Open the challenge website.  
2. Read the content shown on the page.  
3. Press `Ctrl + U` to open the page source code.  
4. Look for a JavaScript snippet that starts with something like: `javascript:(function() { ... })`
5. Copy that entire JavaScript code.  
6. Open Developer Tools by pressing `F12` and go to the Console tab.  
7. If your browser does not allow pasting, type: `allow pasting`
8. Then paste the copied JavaScript code into the console and press Enter.  
9. ✅ A pop-up alert will appear showing the flag.

---

## 🎯 Final Flag
<pre> picoCTF{p@g3_turn3r_6bbf8953} </pre>


