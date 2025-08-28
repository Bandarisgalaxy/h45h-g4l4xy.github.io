---
layout: post
title: "Some Assembly Required 1"
date: 2025-08-28
categories: [PicoCTF, webexploitation]
tags: [picoctf,webexploitation,Medium]
---
🧮**Challenge Name:** Some Assembly Required 1\
**URL:** http://mercury.picoctf.net:15472/index.html

------------------------------------------------------------------------

## 📌 Prerequisites

Before solving this challenge, let's understand some basics:

### 1. What is assembly in websites?

In websites, when we talk about *assembly*, we usually mean
**WebAssembly (Wasm)**.\
It is a low-level binary format that runs in browsers, similar to how
assembly works close to the machine.

### 2. On seeing assembly what can we understand?

When you see `.wasm` files in a website, it means the site is using
WebAssembly.\
You can guess that some important logic or data (sometimes even the flag
in CTFs) might be hidden there.

### 3. What is a `.wasm` file?

It's a **WebAssembly binary file** that browsers can run.\
You can convert it into human-readable form (`.wat`) to study it.

### 4. Importance of `.wasm` files for developers

-   Run heavy tasks faster than JavaScript.
-   Reuse C, C++, or Rust code on the web.
-   Make apps like games, video editors, or simulations run smoothly in
    browsers.

### 5. As a security person how to consider `.wasm` files?

-   They can hide secrets (like flags or API keys).
-   Everything on the client can be reversed, so secrets should
    **never** be stored in Wasm.
-   Wasm should be checked for vulnerabilities, just like any other
    binary.

------------------------------------------------------------------------

## 🚀 Approach (Step by Step)

1.  Open the website: `http://mercury.picoctf.net:15472/index.html`
2.  View source code (`Ctrl+U`) → check if any `.js` or `.wasm` files
    are loaded.
3.  Open DevTools (`F12`) → **Sources tab** → look under the domain for
    `.wasm` files.
4.  Click on the `.wasm` file. Scroll through it.
    At the bottom of the file, you will often find readable strings.
5.  In this challenge, the **flag** is visible at the bottom of the
    `.wasm` file.

------------------------------------------------------------------------

## 🎯 Final Flag

    picoCTF{c733fda95299a16681f37b3ff09f901c}

------------------------------------------------------------------------

## 📝 Learning Takeaways

-   WebAssembly is like assembly for the web.
-   `.wasm` files can hide important strings, but they can always be
    inspected.
-   As a beginner, practice opening `.wasm` files in DevTools and
    searching for readable data.
-   From a security view: **never trust client-side code to hide
    secrets**.

