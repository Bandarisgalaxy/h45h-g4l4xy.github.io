---
layout: post
title: "Picobrowser"
date: 2025-08-27
categories: [PicoCTF, webexploitation]
tags: [picoctf, webexploitation, Easy]
---

## 📝 Challenge Description

The challenge says:  
> This website can only be rendered by **picobrowser**. Go and catch the flag!

That means the website expects a special browser called **picobrowser** instead of a normal Chrome or Firefox user-agent.

---

## 🚀 Step-by-Step Approach

### 1.Open the Website

When you click the **Flag** button, the site replies something like:

```
You're not picobrowser! Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36
```

This shows the website is checking your **User-Agent** (a header that tells the server which browser you’re using).

---

### 2.🧩 What is curl?

`curl` is a command-line tool used to make HTTP requests. It can **download files**, **fetch webpages**, and **interact with APIs**.  
By default it sends a header like: `User-Agent: curl/7.x.x`.

But here, the website wants us to pretend we are using **picobrowser**.

---

### 3.📌 Set the User-Agent in curl

Use `-A` (or `--user-agent`) to change the **User-Agent** string.

**Command:**

```bash
curl -A "picobrowser" "https://jupiter.challenges.picoctf.org/problem/26704/flag"
```

If you want to save the response and then search for the flag:

```bash
# Step 1: Request the flag page with a custom User-Agent and save it
curl -A "picobrowser" "https://jupiter.challenges.picoctf.org/problem/26704/flag" > urlinfo.txt

# Step 2: Search the saved file for the flag pattern
grep -i "pico" urlinfo.txt
```

### Final Flag

```
picoCTF{p1c0_s3cr3t_ag3nt_e9b160d0}
```

---

## ✅ Learning Takeaways

- Websites often check headers like **User-Agent** to allow or block access.
- With `curl -A "..."` you can **spoof** the user-agent to match what the site expects.
- Error messages on the page usually contain **useful hints**—read them carefully!