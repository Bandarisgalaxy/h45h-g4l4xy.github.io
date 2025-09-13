---
layout: post
title: "Morse-Code"
date: 2025-09-13
categories: [PicoCTF, cryptography]
tags: [picoctf, cryptography, ctf, Medium]
---

## 🎹 Description:
This challenge gives us a `.wav` file that contains Morse code.We need to decode it to find the flag.Wrap decoded text with picoCTF{}, put underscores in place of pauses, and use all lowercase.
For more details on [Morsecode](https://www.geeksforgeeks.org/techtips/morse-code-tutorial/)
---

## 📝 Steps to Solve

### 1. Download the Challenge File
The challenge provides a link. Open your terminal and run:

```bash
wget https://artifacts.picoctf.net/c/79/morse_chal.wav
```

This will save the file **morse_chal.wav** to your system.

---

### 2. Decode the Morse Audio
Instead of decoding manually, we can use an online tool:

👉 Go to: [MorseCode World Decoder](https://morsecode.world/international/decoder/audio-decoder-adaptive.html)

- Upload the file `morse_chal.wav`  
- Click **Play**  
- The tool will decode the Morse code into text.

Output received:

```
WH47 H47H 90D W20U9H7
```

---

### 3. Format According to Challenge Rules
The challenge says:
- Use **all lowercase**  
- Replace **pauses/spaces** with underscores `_`  

So:

```
wh47 h47h 90d w20u9h7
```

becomes:

```
wh47_h47h_90d_w20u9h7
```

---

### 4. Wrap with picoCTF{}
Finally, put the result inside the flag format:

```
picoCTF{wh47_h47h_90d_w20u9h7}
```

✅ That’s the flag!

---

## 🎯 Final Answer

**Flag:** `picoCTF{wh47_h47h_90d_w20u9h7}`

---

## 🔑 Key Takeaways
- Morse code is often hidden in audio files during CTF challenges.  
- Online tools like **morsecode.world** make decoding fast and easy.  
- Always follow flag format rules (lowercase, underscores, braces).  