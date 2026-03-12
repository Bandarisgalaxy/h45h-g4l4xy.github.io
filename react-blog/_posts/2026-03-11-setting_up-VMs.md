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

## 🧭 Introduction

In this lab, we perform a **basic AI-assisted network monitoring attack
simulation** to understand how attackers scan and identify systems on a
network.

This setup uses **virtual machines** to simulate a small network
environment.

### 🖥️ Lab Environment

  System       Role
  ------------ ------------------
  Kali Linux   Attacker Machine
  Windows      Victim Machine
  Ubuntu       Host Machine

The goal is to observe how **network monitoring systems detect
suspicious activities such as ping scans and port scans**.

------------------------------------------------------------------------

## 🧪 Lab Setup

After setting up the virtual machines, we must configure the network so
that **Kali and Windows can communicate with each other**.

### 1️⃣ Configure Network Mode

Set both **Kali Linux and Windows VM network adapters** to:

    Host-Only Adapter

This ensures that both machines are on the **same isolated network**.
![VirtualBox Host-Only Network Settings](/images/Hostonly.png)

### 2  Find the IP Address of Each Machine

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
------------------------------------------------------------------------

## 📡 Step 1 -- Ping Test

From **Kali Linux**, run:

``` bash
ping 192.168.67.129
```

Initially, **no response will be received**.

### ❗ Why?

The **Windows Defender Firewall blocks ICMP packets**, which are used by
the `ping` command.\
Because of this, the **ICMP Echo Requests are dropped by default**.

------------------------------------------------------------------------

## 🔓 Step 2 -- Allow ICMP in Windows Firewall

### Steps

1.  Go to **Start Menu**
2.  Search **Windows Defender Firewall**
3.  Click **Advanced Settings**
4.  Open **Inbound Rules**
5.  Find the rule:

```{=html}
<!-- -->
```
    File and Printer Sharing (Echo Request – ICMPv4-In)

6.  Enable the rule for the **Private profile**.

```{=html}
<!-- -->
```
![Windows Defender Firewall Advanced Settings](/images/icmp-allow1.png)
![Enable ICMP Rule](/images/icmp-allow2.png)

------------------------------------------------------------------------

### ✅ Result

Run the ping again:

``` bash
ping 192.168.67.129
```

You should now receive **ICMP replies from the Windows machine**.

![ping-success](/images/ping.png)

------------------------------------------------------------------------

## 🔍 Step 3 -- Port Scanning with Nmap

From Kali Linux:

``` bash
nmap 192.168.67.129
```

Initially, **the scan may not reveal useful results** because Windows
still restricts certain network responses.

------------------------------------------------------------------------

## 🔓 Step 4 -- Enable Network Discovery in Windows

### Steps

1.  Open **Control Panel**
2.  Go to **Network and Internet**

![Network and Sharing Center](/images/tcp-allow1.png)

3.  Click **Network and Sharing Center**
4.  Select **Change Advanced Sharing Settings**

![Advanced Sharing Settings link](/images/tcp-allow2.png)

5.  Under **Guest or Public Profile**, enable:

![Public Profile section](/images/tcp-allow3.png)

-   Turn on **Network Discovery**
-   Turn on **File and Printer Sharing**

![network-discovery-section](/images/tcp-allow4.png)

------------------------------------------------------------------------

## 🔁 Step 5 -- Run Nmap Again

``` bash
nmap 192.168.67.129
```

### Expected Output

You will now see:

    PORT     STATE SERVICE
    135/tcp  open  msrpc
    139/tcp  open  netbios-ssn
    445/tcp  open  microsoft-ds

![Public Profile section](/images/nmap-run.png)

------------------------------------------------------------------------

## 🧠 Learning Outcomes

1.  Built an **attacker--victim lab environment** using VMs.
2.  Learned why **ICMP traffic is blocked by default in Windows**.
3.  Enabled **ICMP echo rules in Windows Firewall**.
4.  Performed **network discovery using ping**.
5.  Used **Nmap for port scanning and service enumeration**.
6.  Understood the importance of **firewall configuration** in
    preventing reconnaissance attacks.
7.  Observed how monitoring tools can detect **scanning activity**.

------------------------------------------------------------------------

## 🏁 Conclusion

This experiment demonstrates the **reconnaissance phase of cyber
attacks**.

Attackers typically:

-   Discover live hosts using **ICMP scans**
-   Identify open ports using **Nmap**
-   Gather service information from **banners**

Understanding these techniques helps security professionals design
**better detection systems and defensive strategies**.

---

## References

- [Nmap Official Documentation](https://nmap.org/docs.html)
- [CVE-2017-0144 — EternalBlue / WannaCry (NIST)](https://nvd.nist.gov/vuln/detail/CVE-2017-0144)
- [Microsoft — SMB Security Best Practices](https://docs.microsoft.com/en-us/windows-server/storage/file-server/smb-security)
- [VirtualBox Host-Only Networking Guide](https://www.virtualbox.org/manual/ch06.html#network_hostonly)