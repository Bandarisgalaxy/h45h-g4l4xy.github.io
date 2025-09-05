---
layout: post
title: "SQL Direct"
date: 2025-09-05
categories: [PicoCTF, webexploitation]
tags: [picoctf, webexploitation, Medium]
---

### 🐘Challenge Recap
We need to connect to a **remote PostgreSQL database** and grab the flag.  

**Details provided:**  
- 🌍 Host: `saturn.picoctf.net`  
- 🔌 Port: (example `50666`)  
- 👤 User: `postgres`  
- 📂 Database: `pico`  
- 🔑 Password: `postgres`  

💡 **Hint:** Databases contain **tables**.  

---

### Why PostgreSQL Matters in Web Security
Databases power almost every web app.  
- Store **users, passwords, sessions, flags**  
- If exposed → attackers can **dump sensitive data**  
- CTFs simulate this: connect → enumerate → extract  

👉 Learning PostgreSQL helps understand **SQL exploitation and defense**.  

---

### 🛠️ Step 1: Installing the PostgreSQL Client  
We need the `psql` client.  

##### Ubuntu / Debian  
```bash
sudo apt update && sudo apt install postgresql-client
```  

##### macOS (Homebrew)  
```bash
brew install postgresql
```  

##### Windows  
- Download from [PostgreSQL Official Site](https://www.postgresql.org/download/windows/).  
- During installation, check **Command Line Tools**.  

✅ Verify:  
```bash
psql --version
```  

---

### 🛠️ Step 2: Connecting to the Remote Database  
Command:  
```bash
psql -h saturn.picoctf.net -p 50666 -U postgres pico
```  

📌 **Explanation:**  
- `-h` → host (server address)  
- `-p` → port number  
- `-U` → username  
- `pico` → database name  

When prompted:  
```
Password: postgres
```  

If successful:  
```
pico=#
```  

🎉 You are inside the PostgreSQL shell.  

---

### 🛠️ Step 3: Finding the Tables  
Command:  
```sql
\dt
```  

📌 **Explanation:**  
- `\dt` is a **psql meta-command** (not standard SQL).  
- It lists all the **tables** in the current database.  

Output:  
```
 Schema | Name  | Type  |  Owner   
--------+-------+-------+----------
 public | flags | table | postgres
```  

✅ Found **table: flags**  

---

### 🛠️ Step 4: Extracting Data  
Query:  
```sql
SELECT * FROM flags;
```  

📌 **Explanation:**  
- `SELECT` is used to **retrieve data** from a table.  
- `*` means “all columns”.  
- `FROM flags` → choose the `flags` table.  

Result:  
```
 id | firstname | lastname  |                address                 
----+-----------+-----------+----------------------------------------
  1 | Luke      | Skywalker | picoCTF{L3arN_S0m3_5qL_t0d4Y_31fd14c0}
  2 | Leia      | Organa    | Alderaan
  3 | Han       | Solo      | Corellia
```  

---

### 🏁 Step 5: Capturing the Flag  
🎯 Found in Luke Skywalker’s row:  
**picoCTF{L3arN_S0m3_5qL_t0d4Y_31fd14c0}**

---

### ✅ Final Flag
```
picoCTF{L3arN_S0m3_5qL_t0d4Y_31fd14c0}
```  

---

### 📌 Key Security Takeaways  
🔑 Direct database exposure = **high risk**  
🔑 `\dt` (list tables) + `SELECT` (fetch data) = core exploration tools  
🔑 Look for “odd” entries → often the flag  
🔑 PostgreSQL knowledge = better **SQLi hunting**  

---

## ⚔️ PostgreSQL vs MySQL (For Hackers)  

| Feature         | PostgreSQL 🐘                         | MySQL 🐬                          |
|-----------------|--------------------------------------|-----------------------------------|
| **Use Case**    | Complex queries, enterprise security | Simple web apps, CMS, startups    |
| **Data Types**  | JSONB, arrays, custom types          | Limited JSON support              |
| **Security**    | Role-based + row-level security      | Basic role model                  |
| **CTF Relevance** | Seen in DB exploitation challenges | Common in web SQLi challenges     |  

👉 Learn both → more confident in **web exploitation**.  

---

### 🎯 Final Thoughts  
This challenge was not just about finding the flag—it was a **mini lesson in web security**.  

🚀 Next time you face a DB challenge:  
1. Connect with `psql`.  
2. List tables with `\dt`.  
3. Dump data with `SELECT`.  
4. Spot the flag.  

Happy hacking! 🏴‍☠️  

---