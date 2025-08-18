---
layout: post
title: "Cookie-Monster"
date: 2025-07-25
categories: [PicoCTF, webexploitation]
tags: [picoctf, webexploitation,Easy]
---


## 🍪 Challenge Description

Cookie Monster has hidden his top-secret cookie recipe somewhere on his website. As an aspiring cookie detective, your mission is to uncover this delicious secret. Can you outsmart Cookie Monster and find the hidden recipe?

---

## 🧭 Step-by-Step Approach

1. Open the website provided in the challenge.  
2. Right-click and select "View Page Source" (`Ctrl + U`) to check for any hidden information.  
3. If nothing useful is found, press `F12` to open Developer Tools and go to the "Application" tab.  
4. Look under the "Storage > Cookies" section for any cookies set by the website.  
5. If no cookies are found, try refreshing the page.  
6. Still nothing? Try logging in with random or fake credentials.  
7. After logging in, go back to the Cookies section — now you should see a base64-encoded cookie.  
8. Copy the cookie value and open a terminal (`Ctrl + Alt + T`).  
9. Run the command:  
   ```bash
   echo [paste_cookie_here] | base64 -d
   ```
✅ This will extract and reveal the hidden flag from the cookie!

🎯 Final Flag
<pre> picoCTF{c00k1e_m0nster_l0ves_c00kies_771D5EB0}</pre>
