---
layout: post
title: "Picobrowser"
date: 2025-07-31
categories: [PicoCTF, webexploitation]
tags: [picoctf, webexploitation,Easy]
---
## 📝 Challenge Description

The challenge says:\
\> This website can only be rendered by **picobrowser**. Go and catch
the flag!

That means the website expects a special browser called **picobrowser**
instead of normal Chrome or Firefox.

------------------------------------------------------------------------

## 🚀 Step-by-Step Approach (Beginner Friendly)

### 1. Open the Website

When you click the **Flag** button, the site replies:

    You're not picobrowser! Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36

This message shows that the website is checking your **User-Agent** (a
string that tells the server which browser you are using).

------------------------------------------------------------------------

### 2. 🧩 What is curl?

`curl` is a simple command-line tool used to request web pages.\
- It can **download files**, **fetch data from websites**, or **interact
with APIs**.\
- By default, curl tells the server:\
`User-Agent: curl/7.68.0`

But here, the website wants us to pretend we are using **picobrowser**.

------------------------------------------------------------------------

### 3. 📌 Setting User-Agent in curl

We can use the `-A` option in curl to change the **User-Agent**.

Example command:

``` bash
curl -A "picobrowser" "https://jupiter.challenges.picoctf.org/problem/26704/flag"
```

Explanation of each part:

  Part                 Meaning
  -------------------- ---------------------------------------------
  `curl`               The tool making the request
  `-A "picobrowser"`   Tells the server we are using "picobrowser"
  URL                  The website we are visiting

------------------------------------------------------------------------

### 4. 🖥️ Full Steps to Get the Flag

``` bash
# Step 1: Request the flag page with custom User-Agent
curl -A "picobrowser" "https://jupiter.challenges.picoctf.org/problem/26704/flag" >> urlinfo.txt  

# Step 2: Open the saved file and search for the flag
cat urlinfo.txt | grep "pico"
```

This will print the flag.

------------------------------------------------------------------------

## 🎉 Final Flag

    picoCTF{p1c0_s3cr3t_ag3nt_e9b160d0}

------------------------------------------------------------------------

## ✅ Learning Takeaway

-   Websites often check **headers** like `User-Agent`.\
-   Using `curl` with custom headers is a powerful way to debug and
    solve web challenges.\
-   Always look carefully at what the website tells you --- error
    messages are often hints!