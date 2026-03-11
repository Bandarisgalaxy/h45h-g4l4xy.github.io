---
layout: post
title: "Some Assembly Required 1"
date: 2025-08-28
categories: [PicoCTF, Web Exploitation]
tags: [picoctf, webexploitation, webassembly, wasm, reverse-engineering, ctf, Medium]
author: Harshith
description: A PicoCTF web exploitation challenge reverse engineering a WebAssembly (WASM) binary to extract a hardcoded flag string from the compiled bytecode.
toc: true
---

## Introduction

The **Some Assembly Required 1** challenge on PicoCTF introduces WebAssembly (Wasm) — a binary instruction format designed for execution in modern web browsers. This challenge reinforces a fundamental security principle: **client-side code cannot keep secrets**, regardless of whether it is JavaScript, WebAssembly, or any other format that executes in the browser.

> **Challenge URL:** `http://mercury.picoctf.net:15472/index.html`

---

## Challenge Overview

| Field | Details |
|---|---|
| **Platform** | PicoCTF |
| **Category** | Web Exploitation |
| **Difficulty** | Medium |
| **Technique** | WebAssembly Binary Inspection, Client-Side Reverse Engineering |

---

## Background: WebAssembly

### What is WebAssembly?

WebAssembly (Wasm) is a **low-level binary format** executed by web browsers. It is like machine code for the web — compiled from languages like C, C++, and Rust for high-performance browser execution.

### Security Implications of `.wasm` Files

| Perspective | Implication |
|---|---|
| **Developer** | Faster execution, reuse of native code in browsers |
| **Security Researcher** | Client-side — fully inspectable; can hide strings but not secrets |
| **Attacker** | Extract hardcoded secrets, API keys, or logic from Wasm binaries |

### Key Rule

> **Never store secrets (flags, API keys, passwords) in client-side code — including WebAssembly.**

---

## Solution Walkthrough

### Step 1: Open the Website

Navigate to `http://mercury.picoctf.net:15472/index.html`. The page appears as a simple interface.

### Step 2: View Page Source

Press `Ctrl + U` to view the page source. Check for linked JavaScript or `.wasm` files.

### Step 3: Open Developer Tools

Press `F12` to open DevTools. Navigate to:

```
Sources tab → [domain] → look for .wasm files
```

### Step 4: Inspect the WASM File

Click on the `.wasm` file in the Sources panel. The browser decompiles it to human-readable WebAssembly Text Format (`.wat`).

**Scroll to the bottom** of the decompiled Wasm file. Strings and data segments are typically stored at the end of the binary — and in many CTF challenges, the flag is stored as a plaintext string in the data section.

### Step 5: Extract the Flag

The flag appears as a readable string in the data section of the Wasm binary:

```
picoCTF{c733fda95299a16681f37b3ff09f901c}
```

---

## Key Concepts

**Wasm Binary Structure (simplified):**

```
WebAssembly Module
├── Type Section       (function signatures)
├── Function Section   (function definitions)
├── Memory Section     (linear memory setup)
├── Export Section     (exported functions/memory)
├── Code Section       (compiled bytecode)
└── Data Section       (string literals, hardcoded data ← flag is here)
```

**Browser Wasm Decompilation:**

Modern browsers automatically decompile `.wasm` files into readable `.wat` (WebAssembly Text Format) in the DevTools Sources panel. No additional tools are required for basic inspection.

**Alternative: `wasm2wat` Command-Line Tool:**

```bash
# Install wabt (WebAssembly Binary Toolkit)
sudo apt install wabt

# Convert binary .wasm to text .wat
wasm2wat file.wasm -o file.wat

# Search for strings
grep -a "picoCTF" file.wat
```

---

## Flag

```
picoCTF{c733fda95299a16681f37b3ff09f901c}
```

---

## Security Insights

- **WebAssembly provides obfuscation, not security:** Wasm is harder to read than JavaScript but is still fully reversible by anyone with DevTools.
- **Data sections are string goldmines:** Hardcoded strings in Wasm data sections are trivially extracted — no decompilation expertise required.
- **Client-side validation is bypassable:** Any check performed in Wasm (password validation, license checks) can be bypassed by inspecting and patching the Wasm binary.
- **Recommended pattern:** Perform validation server-side. The client should only receive a token after the server verifies authenticity — never embed the secret in client code.

---

## Conclusion

Some Assembly Required 1 demonstrates that WebAssembly is not a security boundary. Despite being binary and appearing opaque, the browser's built-in DevTools can display Wasm content in a human-readable format. The flag hardcoded in the data section is trivially visible — reinforcing that secrets must never reside in any code or data downloaded to the user's browser.

---

## References

- [WebAssembly Official Site](https://webassembly.org/)
- [MDN — WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly)
- [WABT — WebAssembly Binary Toolkit](https://github.com/WebAssembly/wabt)
- [PicoCTF Official Platform](https://picoctf.org)
