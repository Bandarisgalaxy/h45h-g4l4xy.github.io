---
layout: post
title: "Roboto sans"
date: 2025-08-21
categories: [PicoCTF, webexploitation]
tags: [picoctf,webexploitation,Medium]
---

# Roboto sans

## 🔎 Challenge Description
The flag is hidden somewhere on this web application, but not necessarily on the visible website.

---

## 🛠️ Approach (Step by Step)

1. I opened the given website.  
2. The challenge name **"roboto sans"** gave me a clue – it sounds like **robots.txt** (a file often used to tell web crawlers which directories they can or can’t access).
![roboto-sans](https://www.keycdn.com/img/support/robots.txt-file-lg.webp)  
3. I checked the file at:  
   ```
   http://saturn.picoctf.net:50318/robots.txt
   ```  
4. The file showed some rules for crawlers. Inside it, I also found some suspicious text:  
   ```
   ZmxhZzEudHh0;anMvbXlmaW
   anMvbXlmaWxlLnR4dA==
   svssshjweuiwl;oiho.bsvdaslejg
   ```  
5. I noticed `==` at the end, which usually means **Base64 encoding**.  
6. I decoded the string `anMvbXlmaWxlLnR4dA==` using:  
   ```bash
   echo "anMvbXlmaWxlLnR4dA==" | base64 -d
   ```  
   This gave the result:  
   ```
   js/myfile.txt
   ```  
7. I visited the file on the server:  
   ```
   http://saturn.picoctf.net:50318/js/myfile.txt
   ```  
8. Inside that file, I found the flag:  
   ```
   picoCTF{Who_D03sN7_L1k5_90B0T5_718c9043}
   ```

---

## 🏁 Flag
```
picoCTF{Who_D03sN7_L1k5_90B0T5_718c9043}
```

---

## 💡 Takeaway
Always check **robots.txt** when a challenge hints at "robots" or when the description says the flag is not directly on the visible site. Sometimes hidden directories or encoded strings lead you to the flag.