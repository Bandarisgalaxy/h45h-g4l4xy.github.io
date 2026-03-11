---
layout: post
title: "SQL Direct"
date: 2025-09-05
categories: [PicoCTF, Web Exploitation]
tags: [picoctf, webexploitation, postgresql, sql, database, ctf, Medium]
author: Harshith
description: A PicoCTF web exploitation challenge directly connecting to a PostgreSQL database, enumerating tables, and extracting the flag using standard SQL queries.
toc: true
---

## Introduction

The **SQL Direct** challenge on PicoCTF moves beyond vulnerable web forms and into direct database interaction. Instead of exploiting an injection flaw, you are provided with direct credentials to connect to a live PostgreSQL database. The task is database navigation: discover the schema, locate the flags table, and extract the data.

> **Challenge Description:** "Connect to this PostgreSQL server and find the flag! The database contains a table with flag data."

---

## Challenge Overview

| Field | Details |
|---|---|
| **Platform** | PicoCTF |
| **Category** | Web Exploitation |
| **Difficulty** | Medium |
| **Technique** | Direct Database Connection, SQL Query, Table Enumeration |
| **DBMS** | PostgreSQL |

---

## Environment Setup

**Required Tools:**
- `psql` PostgreSQL command-line client

**Install on Debian/Ubuntu:**

```bash
sudo apt install postgresql-client
```

**Connection Details:**

| Parameter | Value |
|---|---|
| Host | `saturn.picoctf.net` |
| Port | `50666` (varies per instance) |
| Username | `postgres` |
| Password | `postgres` |
| Database | `pico` |

---

## Solution Walkthrough

### Step 1: Connect to the Database

```bash
psql -h saturn.picoctf.net -p 50666 -U postgres pico
```

Enter password `postgres` when prompted. You will see the `psql` prompt:

```
pico=#
```

### Step 2: List All Tables

Use the `\dt` meta-command to list all tables in the current database:

```sql
\dt
```

Output:

```
         List of relations
 Schema | Name  | Type  |  Owner
--------+-------+-------+----------
 public | flags | table | postgres
```

A table named `flags` is present.

### Step 3: Inspect the Table Structure

```sql
\d flags
```

Output (example):

```
    Column    |  Type   |
--------------+---------+
 id           | integer |
 firstname    | text    |
 lastname     | text    |
 flag         | text    |
```

### Step 4: Query All Data from the Flags Table

```sql
SELECT * FROM flags;
```

Output:

```
 id | firstname | lastname  |                flag
----+-----------+-----------+----------------------------------------
  1 | Luke      | Skywalker | picoCTF{L3arN_S0m3_5qL_t0d4Y_31fd14c0}
  2 | Leia      | Organa    | [empty or null]
  3 | Han       | Solo      | [empty or null]
```

The flag is in the first row under Luke Skywalker's entry.

### Step 5: Exit psql

```bash
\q
```

---

## Key Concepts

**Essential `psql` Meta-Commands:**

| Command | Description |
|---|---|
| `\l` | List all databases |
| `\c dbname` | Connect to a database |
| `\dt` | List all tables in current database |
| `\d tablename` | Describe table structure (columns, types) |
| `\q` | Quit psql |
| `\?` | Help for meta-commands |
| `\h SELECT` | Help for SQL commands |

**Useful SQL for Enumeration:**

```sql
-- List all tables (SQL standard, works across DBMS)
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';

-- List all columns in a table
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'flags';

-- Retrieve all data
SELECT * FROM flags;

-- Filter for non-null flags
SELECT * FROM flags WHERE flag IS NOT NULL;
```

---

## Flag

```
picoCTF{L3arN_S0m3_5qL_t0d4Y_31fd14c0}
```

---

## Security Insights

- **Default credentials are a critical risk:** Using `postgres/postgres` as the database superuser password is one of the most common database misconfigurations encountered in penetration testing.
- **Never expose database ports publicly:** PostgreSQL's default port (5432) should never be directly accessible from the internet. Use firewall rules or VPC security groups to restrict access.
- **Principle of least privilege:** The application database user should only have SELECT/INSERT/UPDATE on the specific tables it needs — never full superuser access.
- **Connection string secrets management:** Database passwords should be stored in environment variables or secret management systems (Vault, AWS Secrets Manager), never hardcoded.

---

## Conclusion

SQL Direct demonstrates that database enumeration skills extend beyond web form exploitation. Knowing how to connect to a DBMS directly, navigate schemas, and extract data is fundamental to both database administration and penetration testing. The challenge reinforces the standard enumeration flow: connect, list databases, list tables, describe structure, query data.

---

## References

- [PostgreSQL Documentation — psql](https://www.postgresql.org/docs/current/app-psql.html)
- [OWASP — Database Security](https://cheatsheetseries.owasp.org/cheatsheets/Database_Security_Cheat_Sheet.html)
- [HackTricks — PostgreSQL Pentesting](https://book.hacktricks.xyz/network-services-pentesting/pentesting-postgresql)
- [PicoCTF Official Platform](https://picoctf.org)
