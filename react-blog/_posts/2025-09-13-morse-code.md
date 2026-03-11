---
layout: post
title: "Morse-Code"
date: 2025-09-13
categories: [PicoCTF, Cryptography]
tags: [picoctf, cryptography, morse-code, audio, steganography, ctf, Medium]
author: Harshith
description: A PicoCTF cryptography challenge decoding a Morse code audio file using an adaptive online decoder to extract the hidden flag.
toc: true
---

## Introduction

The **Morse-Code** challenge on PicoCTF introduces audio-based encoding. Rather than a text file, the encoded message is embedded in a `.wav` audio file as Morse code tones. Your task is to decode the audio into the flag text.

> **Challenge Description:** "Morse code is well known. Can you decrypt this? Download the file here. Wrap your answer with picoCTF{}, put it in lowercase, and separate words with underscores."

---

## Challenge Overview

| Field | Details |
|---|---|
| **Platform** | PicoCTF |
| **Category** | Cryptography |
| **Difficulty** | Medium |
| **Technique** | Audio Morse Code Decoding |
| **File** | `morse_chal.wav` |

---

## Environment Setup

**Required Tools:**
- `wget` to download the audio file
- Online decoder: [morsecode.world](https://morsecode.world/international/decoder/audio-decoder-adaptive.html)
- Optional: `Audacity` for manual audio analysis

---

## Background: Morse Code

Morse Code encodes text as sequences of short (dot) and long (dash) signals separated by pauses:

| Signal | Meaning |
|---|---|
| `.` (short tone) | Dot |
| `-` (long tone) | Dash |
| Short pause | Letter separator |
| Medium pause | Word separator |

**Example:**

```
.... . .-.. .-.. ---   = HELLO
.-- --- .-. .-.. -..   = WORLD
```

In audio form, dots are short beeps and dashes are long beeps.

---

## Solution Walkthrough

### Step 1: Download the Audio File

```bash
wget https://artifacts.picoctf.net/c/235/morse_chal.wav
```

### Step 2: Listen to the File (Optional)

```bash
# Play with any audio player
aplay morse_chal.wav
# or
vlc morse_chal.wav
```

You will hear a series of beeps of varying lengths — classic Morse code timing.

### Step 3: Decode Using morsecode.world

1. Open [morsecode.world — Adaptive Audio Decoder](https://morsecode.world/international/decoder/audio-decoder-adaptive.html)
2. Click **Choose File** and upload `morse_chal.wav`
3. Click **Decode**
4. Wait for analysis to complete

Decoded output:

```
WH47 H47H 90D W20U9H7
```

### Step 4: Format the Flag

Per the challenge instructions:
- Convert to lowercase: `wh47 h47h 90d w20u9h7`
- Replace spaces with underscores: `wh47_h47h_90d_w20u9h7`
- Wrap with `picoCTF{}`:

```
picoCTF{wh47_h47h_90d_w20u9h7}
```

---

## Key Concepts

**Morse Code Reference Table (A-Z, 0-9):**

| Char | Code | Char | Code | Char | Code |
|---|---|---|---|---|---|
| A | `.-` | J | `.---` | S | `...` |
| B | `-...` | K | `-.-` | T | `-` |
| C | `-.-.` | L | `.-..` | U | `..-` |
| D | `-..` | M | `--` | V | `...-` |
| E | `.` | N | `-.` | W | `.--` |
| F | `..-.` | O | `---` | X | `-..-` |
| G | `--.` | P | `.--.` | Y | `-.--` |
| H | `....` | Q | `--.-` | Z | `--..` |
| I | `..` | R | `.-.` | 0-9 | `-----` to `.----` |

**Adaptive Decoding:**

The adaptive decoder at morsecode.world automatically detects the dot/dash ratio from the audio file, which is critical because different recordings use different speeds (words per minute). Manual decoders require knowing the exact WPM.

---

## Flag

```
picoCTF{wh47_h47h_90d_w20u9h7}
```

---

## Security Insights

- **Encoding is not encryption:** Morse code is an encoding scheme, not an encryption algorithm. It has no key and provides no confidentiality — anyone who knows Morse code can decode it instantly.
- **Audio steganography:** More sophisticated challenges embed secret data in audio files using techniques like LSB (Least Significant Bit) encoding in WAV samples, phase coding, or spread spectrum methods — these are invisible to casual listeners.
- **File format analysis:** When given an unknown file, always check its true type (`file morse_chal.wav`) and consider what tools are appropriate for that format (audio analyzers for WAV, image tools for PNG/JPG, etc.).

---

## Conclusion

The Morse-Code challenge introduces audio-based encoding CTF techniques. The key skill is recognizing the correct tool for the job: uploading the WAV to an adaptive decoder rather than manually transcribing dots and dashes. Audio challenges frequently appear in CTFs and may involve Morse, DTMF tones, spectrograms hidden in audio, or LSB steganography.

---

## References

- [morsecode.world — Adaptive Audio Decoder](https://morsecode.world/international/decoder/audio-decoder-adaptive.html)
- [Wikipedia — Morse Code](https://en.wikipedia.org/wiki/Morse_code)
- [Audacity — Free Audio Editor](https://www.audacityteam.org/)
- [PicoCTF Official Platform](https://picoctf.org)
