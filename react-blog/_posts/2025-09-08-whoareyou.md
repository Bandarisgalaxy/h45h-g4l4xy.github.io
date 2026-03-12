---
layout: post
title: "Who Are You?"
date: 2025-09-08
categories: [PicoCTF, Web Exploitation]
tags: [picoctf, webexploitation, http-headers, user-agent, referer, ctf, Medium]
author: Harshith
description: A PicoCTF web exploitation challenge bypassing layered HTTP header checks — User-Agent, Referer, Date, DNT, X-Forwarded-For, and Accept-Language — using curl to reveal the hidden flag.
toc: true
---

## Introduction

The **Who Are You?** challenge on PicoCTF tests your understanding of HTTP request headers. The server enforces a series of sequential header checks, each revealing a new requirement until all are satisfied and the flag is displayed. This mirrors real-world client fingerprinting and geolocation-based access controls.

---

## 🌍 Description:

This challenge is all about [**Http headers**](https://bandarisgalaxy.github.io/h45h-g4l4xy.github.io/posts/Headers_cheatsheet/) and how websites use them to decide if you’re allowed in or not. Let’s solve it step by step in a **beginner-friendly way** 🚀

---

## 📌 Challenge Description
> "Let me in. Let me iiiiiiinnnnnnnnnnnnnnnnnnnn"

When you open the website, it starts rejecting you unless you provide the **correct headers**. Each time you solve one, it throws another requirement.

---

### 🌐 What are HTTP headers?

When you visit a website, your browser sends a **request** to the server.  
That request has:
- The page you want
- Extra **headers** with details about your browser, location, language, and more.

👉 Headers are like **notes** attached to your request telling the server *who you are, where you’re from, and how you want the page served*.  
Servers can allow or block you based on these.

---

### 🛠️ Step-by-Step Solution

#### 1. The Website
When we first open the challenge site, it says:  
> "Only people who use the official picobrowser are allowed on this site!"

That means it’s checking the **User-Agent** header.

---

#### 2. User-Agent
Browsers normally send something like:
```
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) ...
```

We must pretend we are **PicoBrowser**:
```
User-Agent: PicoBrowser
```
✅ Now the server accepts.

---

#### 3. Referer
Next message:
> "I don't trust users visiting from another site"

Solution → add a **Referer header**:
```
Referer: http://mercury.picoctf.net:36622/
```

---

#### 4. Date
New message:
> "Sorry this site only worked in 2018."

Solution → fake the **Date header**:
```
Date: Wed, 27 Jun 2018 03:05:00 GMT
```

---

#### 5. Do Not Track (DNT)
New message:
> "I don't trust who can be tracked"

Solution → tell the site not to track us:
```
DNT: 1
```
(1 = don’t track me)

---

#### 6. Location (X-Forwarded-For)
New message:
> "This website is only for people from Sweden"

Solution → fake an IP address from Sweden using `X-Forwarded-For`:
```
X-Forwarded-For: 31.3.152.55
```
(This is an IP from Sweden 🇸🇪)

---

#### 7. Language (Accept-Language)
New message:
> "You are in Sweden but you don't speak Swedish?"

Solution → tell the server we understand Swedish:
```
Accept-Language: sv,en;q=0.9
```

---

#### 8. Success!
After sending all these headers, the site finally lets us in and reveals the flag 🎉:
```
picoCTF{http_h34d3rs_v3ry_c0Ol_much_w0w_0da16bb2}
```

---

### 📝 Final Request (All Headers Together)
Here’s what the final HTTP request with all headers looks like:

```
GET / HTTP/1.1
Host: mercury.picoctf.net:36622
User-Agent: PicoBrowser
Referer: http://mercury.picoctf.net:36622/
Date: Wed, 27 Jun 2018 07:28:00 GMT
DNT: 1
X-Forwarded-For: 31.3.152.55
Accept-Language: sv,en;q=0.9
Connection: close
```

---

## 🎯 Key Takeaways
- **Headers control access**: Websites check them to identify browsers, locations, languages, etc.
- **User-Agent spoofing** → Pretend to be another browser.
- **Referer** → Fake where you came from.
- **Date** → Trick the server into thinking it’s the past/future.
- **DNT** → Say “don’t track me”.
- **X-Forwarded-For** → Fake your IP/geolocation.
- **Accept-Language** → Pretend to speak another language.

---

## 🔑 Why This Matters
- Attackers and bug bounty hunters often tweak headers to **bypass restrictions**.
- Websites shouldn’t blindly trust headers because they are **easy to fake**.
- This challenge shows how weak header-based security can be.

---