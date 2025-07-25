---
layout: post
title: "Web Decode"
date: 2025-07-25
categories: [PicoCTF]
tags: [picoctf, webexploitation, ctf]
---

## 🕸️ Challenge Description

Try to inspect the web. The flag is hidden somewhere in the page’s source, encoded in a special way.

---

## 🧭 Step-by-Step Approach

1. Open the challenge website.  
2. Read the page and follow the instructions it gives.  
3. Eventually, the website asks you to inspect the page.  
4. Right-click and choose “Inspect” or press `F12`.  
5. Alternatively, press `Ctrl + U` to view the source code.  
6. Look through the code — you’ll find a long string of random letters and numbers (this is base64 encoded).  
7. Copy that string.  
8. Open a terminal (`Ctrl + Alt + T`) and run the following command:  
   ```bash
   echo [paste_the_string_here] | base64 -d
   ```
✅ The decoded output will reveal the flag.

🎯 Final Flag
<pre> picoCTF{web_succ3ssfully_d3c0ded_df0da727} <pre>
