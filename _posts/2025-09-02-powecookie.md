---
layout: post
title: "Powercookie"
date: 2025-09-02
categories: [PicoCTF, webexploitation]
tags: [picoctf, webexploitation,Medium]
---
### 🔎  Description: 
Can you get the flag?  
Go to the given website and see what you can discover.

---

### 🛠️ Approach:

1. **Open the Website**  
   - The site looks like an online grade book.
   - There’s a button: **"Continue as Guest"**.

2. **Check Guest Access**  
   - Clicking it shows:  
     *"We apologize, but we have no guest services at the moment."*  
   - This means guest access is blocked.

3. **Think About Admin Access**  
   - The challenge name is **Power Cookie**.  
   - This hints that cookies (small pieces of stored data in your browser) are important.  
   - Maybe the site decides permissions based on cookies.

4. **Inspect Cookies**  
   - Open **Developer Tools** in your browser (`F12` or `Ctrl+Shift+I`).  
   - Go to the **Application / Storage** tab.  
   - Look under **Cookies** for the website.

5. **Find the Key Cookie**  
   - There is a cookie called `isAdmin`.  
   - Its value is set to `false` (or `0`).

6. **Modify the Cookie**  
   - Change `isAdmin` from `false` → `true` (or from `0` → `1`).  
   - Refresh the page.

7. **Success 🎉**  
   - Now the page thinks you are **admin**.  
   - The flag will appear.

---

### 🚩 Flag
```
picoCTF{gr4d3_A_c00k13_5d2505be}
```

---

### 🧠 Learning Takeaways
- Always check cookies in **Web Exploitation challenges**.  
- Cookies can store **user roles** (e.g., guest vs admin).  
- Changing a cookie value can sometimes give **higher privileges**.  