---
layout: post
title: "Scavenger Hunt"
date: 2025-07-27
categories: [PicoCTF]
tags: [picoctf, webexploitation, ctf]
---

## 💡 Challenge Description  
Find the flag hidden across multiple files on the website.

---

## 🧭 Step-by-Step Approach  

- Open the challenge website.  
- The homepage says that you should check HTML, CSS, and JavaScript files.  
- Press **Ctrl + U** to view the page source.  
- In the HTML source, you’ll find the **first part** of the flag.  
- Open the linked **CSS file (`style.css`)** — it contains the **second part** of the flag.  
- Open the linked **JavaScript file (`script.js`)** — it gives a hint:  
  > *"How can I keep Google from indexing my website?"*  
- This refers to the file **robots.txt**. Go to `/robots.txt` to find the **third part** of the flag.  
- robots.txt gives another hint:  
  > *"I think this is an apache server... can you Access the next flag?"*  
- Apache servers use `.htaccess` files — try visiting the hinted path and access **`/.htaccess`** for the **fourth part**.  
- This will show another clue:  
  > *"I love making websites on my Mac, I can Store a lot of information there."*  
- That refers to **`/.DS_Store`**, a macOS system file. Visit the hinted directory and open `.DS_Store` to find the **fifth and final part** of the flag.

---

## 🎯 Final Flag 
<pre> picoCTF{th4ts_4_l0t_0f_pl4c3s_2_lO0k_f7ce8828} </pre> 


---

> 🧠 **Learning Tip:**  
> This challenge teaches web reconnaissance techniques, like looking at `robots.txt`, `.htaccess`, `.DS_Store`, and inspecting static files. Always explore every corner of a web app during CTFs!

