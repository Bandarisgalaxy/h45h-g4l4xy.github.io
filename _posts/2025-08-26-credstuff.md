---
layout: post
title: "Credstuff"
date: 2025-08-26
categories: [PicoCTF, cryptography]
tags: [picoctf, cryptography, ctf, Medium]
---

### 🔒Description
We found a leak of a blackmarket website's login credentials. The task is to find the password of the user `cultiris` and successfully decrypt it.

---

### Approach (Step by Step)

#### 1. Download the leak file
```bash
wget https://artifacts.picoctf.net/c/151/leak.tar
```
- `wget` downloads files from a given URL.  
- Here, we download the archive `leak.tar`.

---

#### 2. Extract the `.tar` archive
```bash
tar -xvf leak.tar
```
- `tar` is used for archiving/extracting files.  
- Options:  
  - `x` → extract  
  - `v` → verbose (show progress)  
  - `f` → specify filename  

After extraction, a folder named `leak` is created.

---

#### 3. Go inside the folder and list contents
```bash
cd leak
ls
```

Output:
```
passwords.txt  usernames.txt
```
We have two files: one for usernames and one for passwords.

---

#### 4. Find the line number of the user `cultiris`
```bash
grep -n "cultiris" usernames.txt
```
- `grep` searches for the keyword in the file.  
- `-n` shows the line number where it occurs.  

Output:
```
378:cultiris
```
→ `cultiris` is on **line 378**.

---

#### 5. Extract the corresponding password
Since usernames and passwords align line by line, the password is also on line 378 of `passwords.txt`.

```bash
head -n 378 passwords.txt | tail -n 1
```
- `head -n 378` → prints the first 378 lines.  
- `tail -n 1` → takes only the last line from that output.  

Output:
```
cvpbPGS{P7e1S_54I35_71Z3}
```

---

#### 6. Decrypt the password (ROT13)
- The text looks suspicious because `cvpbPGS` resembles `picoCTF`.  
- This hints at a **ROT13 cipher** (each letter shifted by 13).  

We can decode it using an online tool (like [dcode ROT13](https://www.dcode.fr/rot-13-cipher)) or directly in Linux with the `tr` command:

```bash
echo "cvpbPGS{P7e1S_54I35_71Z3}" | tr 'A-Za-z' 'N-ZA-Mn-za-m'
```

**Explanation of the command:**
- `echo "..."` → prints the text to standard output.  
- `|` (pipe) → sends that output into the next command.  
- `tr` → translates characters.  
  - `'A-Za-z'` → match all uppercase (`A-Z`) and lowercase (`a-z`) letters.  
  - `'N-ZA-Mn-za-m'` → shift letters by 13 positions (ROT13).  

Output:
```
picoCTF{C7r1F_54V35_71M3}
```

---

### ✅ Final Flag
```
picoCTF{C7r1F_54V35_71M3}
```

---

### 🔑 Learning Takeaways
- **Archiving**: Extract `.tar` files using `tar -xvf`.  
- **File inspection**: Use `grep -n` to find exact line numbers.  
- **Line mapping**: When two files correspond line by line, you can use `head | tail` to pick exact lines.  
- **Cryptography basics**: ROT13 is a substitution cipher where letters are shifted by 13.  
- **Linux trick**: You can use `tr` to perform text transformations like ROT13 directly in the terminal.  

---
