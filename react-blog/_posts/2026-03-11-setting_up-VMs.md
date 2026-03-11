---
layout: post
title: "AI-Assisted Network Attack Lab: Kali vs Windows"
date: 2026-03-11
categories: [Projects, SOC]
tags: [network-monitoring, nmap, intrusion-detection, cybersecurity, virtualbox, windows, kali-linux]
author: Harshith
description: A step-by-step beginner-friendly lab where Kali Linux attacks a Windows machine using ping and Nmap, with AI helping you understand the results. No prior experience needed.
toc: true
---

## What Are We Building?

In this lab, we pretend that **Kali Linux is the attacker** and **Windows is the victim**. The Ubuntu machine is the host (your physical computer running everything).

We will:

1. Connect Kali and Windows on the same private network
2. Try to ping Windows from Kali (it will fail at first)
3. Fix the Windows firewall so ping works
4. Scan Windows ports using a tool called **Nmap**
5. Fix Windows settings so Nmap can see the ports
6. Use AI to understand what the scan results mean

> **Why learn this?** Real attackers do exactly this — they first check if a machine is alive (ping), then they find what services are running (Nmap). As a cybersecurity student, you need to understand both sides.

---

## The Setup

| Role | Machine | IP Address |
|---|---|---|
| 🖥️ **Host** | Ubuntu (your physical PC) | — |
| 🗡️ **Attacker** | Kali Linux VM | `192.168.67.128` |
| 🎯 **Victim** | Windows VM | `192.168.67.129` |
| 🌐 **Network** | Host-Only (isolated, no internet) | `192.168.67.0/24` |

> Your IP addresses may be slightly different. That is completely fine. Just use whichever IPs show up on your machines.

---

## How the Network Looks

```
┌────────────────────────────────────────────┐
│          Ubuntu Host (Your PC)             │
│                                            │
│  ┌──────────────────┐  ┌────────────────┐  │
│  │  Kali Linux VM   │  │   Windows VM   │  │
│  │  (Attacker) 🗡️   │  │  (Victim) 🎯  │  │
│  │  192.168.67.128  │  │ 192.168.67.129 │  │
│  └────────┬─────────┘  └──────┬─────────┘  │
│           │                   │            │
│           └──── Host-Only ────┘            │
│               192.168.67.0/24             │
└────────────────────────────────────────────┘
```

Both VMs are on the **same isolated network** — they can talk to each other, but cannot reach the internet. This keeps the lab safe.

---

## Step 1 — Create the Host-Only Network

First, tell VirtualBox to create a private network that both VMs will use.

### In VirtualBox

1. Open **VirtualBox → Tools → Network Manager**
2. Click **Create** to add a new Host-Only Network (it will be named something like `vboxnet0`)
3. Set the **IPv4 Address** to `192.168.67.1` and **Subnet Mask** to `255.255.255.0`
4. Turn on the **DHCP Server** so VMs get IPs automatically

### Connect Both VMs to This Network

Do this for **both** the Kali VM and the Windows VM:

1. Click on the VM → **Settings → Network**
2. Change **Adapter 1** to **Host-Only Adapter**
3. Pick `vboxnet0` from the Name dropdown
4. Click **OK**

![VirtualBox Host-Only Network Settings](/images/Hostonly.png)

---

## Step 2 — Find the IP Address of Each Machine

After starting both VMs, you need to know their IP addresses so they can talk to each other.

### On Kali Linux (Attacker)

Open a terminal and type:

```bash
ip a
```

![kali-ip](/images/kali-ip.png)

Look for a line that says `inet 192.168.67.xxx` — that number is your Kali IP.

```
inet 192.168.67.128/24
```

### On Windows (Victim)

Open **Command Prompt** and type:

```
ipconfig
```

![windows-ip](/images/windows-ip.png)

Look for a line that says `IPv4 Address` — that is your Windows IP.

```
IPv4 Address . . . . : 192.168.67.129
```

> Write these numbers down. You will need them in every step.

---

## Step 3 — Try to Ping Windows from Kali

Ping is like knocking on a door. You send a small message ("are you there?") and wait for a reply.

On **Kali Linux**, open a terminal and type:

```bash
ping 192.168.67.129
```

### What Happens?

You will most likely see this:

```
PING 192.168.67.129 (192.168.67.129) 56(84) bytes of data.
Request timeout for icmp_seq 1
Request timeout for icmp_seq 2
```

**No reply!** This is expected. Windows Firewall is quietly **dropping your ping packets** before they reach Windows.

> **What is an ICMP packet?** Ping works by sending ICMP (Internet Control Message Protocol) packets. Think of it like shouting — but Windows has its ears covered. We need to tell Windows to listen.

![Ping timeout screenshot](/images/ping.png)

---

## Step 4 — Allow Ping Through Windows Firewall

We need to go into Windows and tell its firewall: "Hey, it is okay to respond to pings."

There is already a rule built into Windows for this — we just need to **enable** it.

### Steps

1. Click **Start** and search for **Windows Defender Firewall**
2. Click **Advanced Settings** on the left side
3. Click **Inbound Rules** in the left panel

![Windows Defender Firewall Advanced Settings](/images/icmp-allow1.png)

4. Scroll through the list and find the rule called:

   ```
   File and Printer Sharing (Echo Request - ICMPv4-In)
   ```

5. You will see two versions of this rule — one for **Private** and one for **Domain**. Right-click the one that says **Private** and click **Enable Rule**

   > We are enabling the Private profile because our Host-Only network counts as a private network. We are **not** enabling the Domain profile for now.

![Enable ICMP Rule](/images/icmp-allow2.png)

6. The rule is now enabled. Go back to Kali and try ping again.

---

## Step 5 — Ping Works! ✅

Go back to your **Kali terminal** and run ping again:

```bash
ping 192.168.67.129
```

This time you should see:

```
PING 192.168.67.129 (192.168.67.129) 56(84) bytes of data.
64 bytes from 192.168.67.129: icmp_seq=1 ttl=128 time=0.543 ms
64 bytes from 192.168.67.129: icmp_seq=2 ttl=128 time=0.612 ms
64 bytes from 192.168.67.129: icmp_seq=3 ttl=128 time=0.598 ms
```

**Windows is replying!** This means the two machines can now see each other. Press `Ctrl + C` to stop ping.

> **What this tells us:** The victim machine (Windows) is **alive** and reachable. In a real attack, the attacker now knows they have a live target.

---

## Step 6 — Scan Windows Ports Using Nmap

Now that we can reach Windows, let us find out **what services are running** on it. We use a tool called **Nmap** (Network Mapper) for this.

On **Kali Linux**, run:

```bash
nmap 192.168.67.129
```

### What Happens?

You will likely see very few open ports, or none at all:

```
Starting Nmap 7.94
Nmap scan report for 192.168.67.129
Host is up (0.00052s latency).
All 1000 scanned ports on 192.168.67.129 are in filtered state
```

**Filtered** means Windows is blocking the TCP connection probes from Nmap. The firewall is dropping Nmap's packets the same way it dropped ping before.

> **What is a port?** Think of a Windows machine like a building. Ports are the different doors into that building — one door for web traffic, one for file sharing, one for remote desktop, etc. Nmap is trying to check which doors are open.

---

## Step 7 — Allow Nmap Through Windows (Network Discovery)

We need to tell Windows to allow TCP connections so Nmap can scan properly. We do this through **Network and Sharing Center**.

### Steps

1. Open **Control Panel**
2. Click **Network and Internet**
3. Click **Network and Sharing Center**

![Network and Sharing Center](/images/tcp-allow1.png)

4. Click **Change advanced sharing settings** on the left

![Advanced Sharing Settings link](/images/tcp-allow2.png)

5. Look for the **Guest or Public** profile section and expand it

![Public Profile section](/images/tcp-allow3.png)

6. Enable both of these options:
   - ✅ **Turn on network discovery**
   - ✅ **Turn on file and printer sharing**

![Turn on network discovery and file sharing](/images/tcp-allow4.png)

7. Click **Save changes**

---

## Step 8 — Run Nmap Again ✅

Go back to **Kali Linux** and run Nmap again:

```bash
nmap 192.168.67.129
```

This time you will see all the open ports and what services are running on them:

```
Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for 192.168.67.129
Host is up (0.00052s latency).
Not shown: 993 closed tcp ports (reset)

PORT      STATE SERVICE       VERSION
135/tcp   open  msrpc         Microsoft Windows RPC
139/tcp   open  netbios-ssn   Microsoft Windows netbios-ssn
445/tcp   open  microsoft-ds  Windows 10 microsoft-ds
3389/tcp  open  ms-wbt-server Microsoft Terminal Services
5040/tcp  open  unknown
7680/tcp  open  pando-pub?
49664/tcp open  msrpc         Microsoft Windows RPC

Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
| smb2-security-mode:
|   3:1:1:
|_    Message signing enabled but not required
| smb2-time:
|   date: 2026-03-11T09:00:05
|_  start_date: N/A
```

![Nmap scan output](/images/nmap-run.png)

---

## Step 9 — Understand the Results with AI

Now copy the Nmap output and paste it into an AI tool like **ChatGPT**, **Claude**, or any AI assistant you like. Use this prompt:

```
You are a cybersecurity teacher helping a beginner student.
I ran an Nmap scan on a Windows machine in my home lab.
Here are the results:

[PASTE YOUR NMAP OUTPUT HERE]

Please explain in simple English:
1. What each open port does
2. Which ports are risky and why
3. What an attacker could do with this information
4. What I should do to make this machine more secure
```

### What the AI Will Tell You

Here is a quick reference for the ports we found:

| Port | Service | What It Does | Risk Level |
|---|---|---|---|
| `135/tcp` | MSRPC | Windows internal communication | 🟡 Medium |
| `139/tcp` | NetBIOS | Old-style Windows file sharing | 🟡 Medium |
| `445/tcp` | SMB | File sharing between computers | 🔴 **High** — was used in WannaCry ransomware |
| `3389/tcp` | RDP | Remote Desktop — lets you control Windows remotely | 🔴 **High** — common brute-force target |
| `49664/tcp` | MSRPC (dynamic) | Windows background services | 🟢 Low |

> **The two ports to remember:** Port **445 (SMB)** and **3389 (RDP)** are the most dangerous. The WannaCry and NotPetya ransomware attacks both targeted port 445. If you ever see these open on a real machine facing the internet, it is a serious problem.

---

## What You Just Learned

Congratulations — you just performed a basic network recon attack! Here is what you did, and why each step matters:

| Step | What You Did | Why It Matters |
|---|---|---|
| ✅ Set up Host-Only network | Connected Kali and Windows privately | Safe isolated lab |
| ✅ Ran ping | Confirmed Windows is alive | First thing any attacker checks |
| ✅ Fixed ICMP firewall rule | Allowed ping to get through | Understand how firewall rules work |
| ✅ Ran Nmap | Found all open ports and services | Attackers use this to find weak points |
| ✅ Fixed network discovery | Allowed Nmap to scan properly | Understand what makes a machine visible |
| ✅ Used AI to interpret results | Got plain English explanations | Real SOC analysts use AI for triage |

---

## References

- [Nmap Official Documentation](https://nmap.org/docs.html)
- [CVE-2017-0144 — EternalBlue / WannaCry (NIST)](https://nvd.nist.gov/vuln/detail/CVE-2017-0144)
- [Microsoft — SMB Security Best Practices](https://docs.microsoft.com/en-us/windows-server/storage/file-server/smb-security)
- [VirtualBox Host-Only Networking Guide](https://www.virtualbox.org/manual/ch06.html#network_hostonly)
