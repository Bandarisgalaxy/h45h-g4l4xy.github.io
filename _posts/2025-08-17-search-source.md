---
layout: post
title: "Search Source"
date: 2025-08-17
categories: [PicoCTF]
tags: [picoctf, webexploitation,Medium]
---
## 🔍 Challenge Name: Search Source

### 📌 Challenge Description
The developer of this website accidentally left an important clue in the **website source**. Your task is to find it and get the flag.

**Hint:**  
How could you mirror (download) the website on your local machine so you can search it more easily?

---

## 🛠️ Approach

#### 1. Open the Website
Go to the challenge link in your browser.

---

#### 2. Check the Page Source
Right-click → **View Page Source** or press `Ctrl + U`.  
Then search (`Ctrl + F`) for common keywords like:
- `flag`
- `pico`

You’ll see a comment in the code:
```
The flag is not here but keep digging :)
```
This means the flag is not in the main HTML file.

---

#### 3. Look Into Other Files
Flags are sometimes hidden inside other files such as:
- `.css` files (stylesheets)  
- `.js` files (scripts)  
- Hidden pages  

But checking them one by one is slow.

---

#### 4. Use the Hint (Mirror the Website)
Instead of searching manually, we can **download the whole website** to our computer and search all files at once.

Run this command in your terminal:
```bash
wget -m -p -E -k -np http://saturn.picoctf.net:52685/
```

This will:
- `-m` → Mirror the website (download everything).  
- `-p` → Get all files needed to view pages (images, CSS, etc.).  
- `-E` → Convert file extensions to `.html` for local browsing.  
- `-k` → Rewrite links so they work offline.  
- `-np` → No parent (don’t go above the starting URL).  

Now a folder named `saturn.picoctf.net:52685/` will be created with all files.

---

#### 5. Search for the Flag
Go into the folder:
```bash
cd saturn.picoctf.net:52685/
```

Search inside all files for “picoCTF”:
```bash
rg picoCTF
```

---

#### 6. Find the Flag
You’ll get output like:
```
css/style.css
328:/** banner_main picoCTF{1nsp3ti0n_0f_w3bpag3s_ec95fa49} **/
```

#### 🏁 Final Answer
**picoCTF{1nsp3ti0n_0f_w3bpag3s_ec95fa49}**

---

## 📖 Command Explanations

### `wget`
`wget` is used to **download files from the web**.
- `-m` → Mirror website (download everything).  
- `-p` → Download all necessary resources.  
- `-E` → Adjust file extensions to `.html`.  
- `-k` → Fix links for offline browsing.  
- `-np` → Prevent downloading parent directories.

### `cd`
`cd` = Change Directory → move into the downloaded folder.

### `rg` 
- `rg` stands for **ripgrep**, a fast search tool.  
- It searches through all files and shows lines containing the word.
Here we used:
```bash
rg picoCTF
```
to find any line containing “picoCTF”.

---
