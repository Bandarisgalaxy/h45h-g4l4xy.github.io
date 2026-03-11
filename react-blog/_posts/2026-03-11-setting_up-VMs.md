---
layout: post
title: "Setting up VMs"
date: 2026-03-11
categories: [Projects, SOC]
tags: [network-monitoring, nmap, intrusion-detection, cybersecurity, nmap, virtualbox, windows, linux]
author: Harshith
description: A beginner-friendly project walkthrough setting up a host-only virtual lab network, scanning with Nmap, and using AI to interpret and triage network scan results for SOC monitoring.
toc: true
---

## Project Overview

This project demonstrates how to build a **minimal virtual lab environment** and leverage AI tooling to assist with network monitoring decisions. You will:

- Configure an isolated host-only network between a Linux attacker/analyst VM and a Windows target VM
- Validate connectivity with `ping`
- Perform network discovery and port scanning with `nmap`

This type of workflow mirrors what a **Tier 1 SOC analyst** might do when investigating an unknown host in the environment — enumerate the asset, assess exposure, and escalate findings with context.

> **Why this matters:** Modern SOC teams increasingly use AI copilots to reduce alert fatigue and accelerate triage. Understanding how to operationalize a tool like this — even in a homelab — is a marketable SOC skill.

---

## Lab Environment

| Component | Details |
|---|---|
| **Hypervisor** | Oracle VirtualBox |
| **Analyst VM** | Kali Linux (or Ubuntu) |
| **Target VM** | Windows 10 / Windows Server |
| **Network Mode** | Host-Only Adapter |
| **Analyst VM IP** | `192.168.67.128` (example) |
| **Target VM IP** | `192.168.67.129` (example) |

> Your IP addresses may differ. Run `ip a` on Linux or `ipconfig` on Windows to confirm your assigned addresses.

---

## Network Topology

```
┌──────────────────────────────────────────┐
│              VirtualBox Host             │
│                                          │
│  ┌─────────────────┐  ┌───────────────┐  │
│  │  Kali Linux VM  │  │  Windows VM   │  │
│  │  192.168.67.128 │  │ 192.168.67.129│  │
│  └────────┬────────┘  └──────┬────────┘  │
│           │                  │           │
│           └──── Host-Only ───┘           │
│              192.168.67.0/24             │
└──────────────────────────────────────────┘
```

Both virtual machines are connected through a **Host-Only** virtual network adapter. This means:
- The two VMs can communicate with each other
- Neither VM has access to the internet (important for isolated lab safety)
- The host machine can also communicate with both VMs

---

## Step 1 — Configure Host-Only Network

### In VirtualBox

1. Open **VirtualBox → Tools → Network Manager**
2. Click **Create** to add a new Host-Only Network (e.g., `vboxnet0`)
3. Set the **IPv4 Address** to `192.168.67.1` and **Mask** to `255.255.255.0`
4. Enable the **DHCP Server** on this adapter (auto-assigns IPs to VMs) or assign static IPs manually

### Assign the Adapter to Each VM

1. Select your VM → **Settings → Network**
2. Set **Adapter 1** to **Host-Only Adapter**
3. Select `vboxnet0` from the Name dropdown
4. Repeat for both VMs

![VirtualBox Network Settings](/images/Hostonly.png)

### Verify IP Addresses

On **Kali Linux**:

```bash
ip a
```
![kali-ip](/images/kali-ip.png)

Expected output (look for `eth0` or `enp0s3`):

```
inet 192.168.67.128/24
```

On **Windows** (Command Prompt):

```
ipconfig
```
![windows-ip](/images/windows-ip.png)

Expected output:

```
IPv4 Address . . . . : 192.168.67.129
Subnet Mask  . . . . : 255.255.255.0
```

---

## Step 2 — Test Connectivity Using Ping

From the **Kali Linux VM**, test if you can reach the Windows VM:

```bash
ping 192.168.67.129
```

### Expected Outcomes

**Success:**

```
PING 192.168.67.129 (192.168.67.129) 56(84) bytes of data.
64 bytes from 192.168.67.129: icmp_seq=1 ttl=128 time=0.543 ms
64 bytes from 192.168.67.129: icmp_seq=2 ttl=128 time=0.612 ms
```

**Failure (ICMP blocked):**

```
PING 192.168.67.129 (192.168.67.129) 56(84) bytes of data.
Request timeout for icmp_seq 1
```

If `ping` fails, proceed to Step 3 to allow ICMP through the Windows Firewall.

> **Why ping first?** ICMP connectivity is the most basic test of network reachability. If ping fails, scanning tools like Nmap may either fail or produce incorrect results.

![Ping Success Screenshot](/images/ping.png)

---

## Step 3 — Allow ICMP in Windows Firewall

By default, Windows blocks ICMP echo requests (ping). This must be enabled for the lab to function.

### Method 1: Windows Firewall GUI

1. Open **Windows Defender Firewall** → **Advanced Settings**
![icmp-allow1](/images/icmp-allow1.png)
2. Click **Inbound Rules** → **New Rule...**
3. Select **Custom** → **All Programs** → **ICMPv4** → **Echo Request**
4. Set **Action: Allow the connection**
5. Apply to **Private** and **Public** profiles
6. Name: `Allow ICMPv4 Echo (Lab)`
![icmp-allow2](/images/icmp-allow2.png)

---

## Step 4 — Run Nmap Scan

Nmap (`Network Mapper`) is the industry standard for network discovery and port scanning. With connectivity confirmed, perform a basic scan against the Windows VM.

### 4a. Quick Ping Scan (Host Discovery)

```bash
nmap -sn 192.168.67.0/24
```

This sends ICMP and ARP probes to all 254 hosts in the subnet to identify which are online — without scanning ports.

```
Nmap scan report for 192.168.67.128 [host]
Nmap scan report for 192.168.67.129
Host is up (0.00050s latency).
```

### 4b. Default Port Scan (Top 1000 Ports)

```bash
nmap 192.168.67.129
```

This scans the top 1000 most common ports using a TCP SYN scan (requires root; falls back to TCP connect if non-root).

### 4c. Service + Version Detection (Recommended)

```bash
nmap -sV -sC 192.168.67.129
```

| Flag | Description |
|---|---|
| `-sV` | Probe open ports to detect service name and version |
| `-sC` | Run default Nmap scripts (banner grabbing, vulnerability checks) |

### 4d. OS Detection + Aggressive Scan

```bash
nmap -A 192.168.67.129
```

`-A` enables OS detection, service version detection, script scanning, and traceroute. Requires root/sudo.

```bash
sudo nmap -A 192.168.67.129
```
---

## Step 5 — Enable Network Discovery on Windows

For Nmap's OS fingerprinting and script scanning to work correctly, ensure the Windows VM responds normally to probes.

### Enable Network Discovery

1. Open **Control Panel → Network and Sharing Center**
![tcp-allow1](/images/tcp-allow1.png)
![tcp-allow2](/images/tcp-allow2.png)
2. Click **Change advanced sharing settings**
![tcp-allow3](/images/tcp-allow3.png)
3. Under **Private** network profile, select:
   - **Turn on network discovery**
   - **Turn on file and printer sharing**
![tcp-allow4](/images/tcp-allow4.png)
4. Save changes

## Step 6 — Scan Results

After running `nmap -sV -sC 192.168.67.129`, you will see output similar to:

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

### Port Analysis Reference

| Port | Service | Security Relevance |
|---|---|---|
| `135/tcp` | MSRPC | Used by Windows services; exposed remotely — potential lateral movement vector |
| `139/tcp` | NetBIOS | Legacy Windows file/print sharing; disable if SMBv1 not needed |
| `445/tcp` | SMB | File sharing; critical — target of EternalBlue (MS17-010) |
| `3389/tcp` | RDP | Remote Desktop; must be protected with NLA and strong auth |
| `49664/tcp` | MSRPC (ephemeral) | Dynamic RPC endpoints; expected on Windows hosts |

> **Red flag:** Ports 445 (SMB) and 3389 (RDP) exposed on a Windows host are high-value targets in a real environment. Both have been exploited in major ransomware campaigns.

![Nmap Results Screenshot](/images/nmap-run.png)

---

## Learning Outcome

By completing this project, you have demonstrated the ability to:

| Skill | Description |
|---|---|
| **Lab Setup** | Configure an isolated virtual network environment for safe testing |
| **Network Connectivity** | Validate connectivity using ICMP / `ping` |
| **Firewall Management** | Modify Windows Defender Firewall rules via GUI and CLI |
| **Network Discovery** | Use Nmap for host discovery, port scanning, and service enumeration |

---

## References

- [Nmap Official Documentation](https://nmap.org/docs.html)
- [NIST NVD — CVE-2017-0144 (EternalBlue)](https://nvd.nist.gov/vuln/detail/CVE-2017-0144)
- [Microsoft Security Baseline — SMB Best Practices](https://docs.microsoft.com/en-us/windows-server/storage/file-server/smb-security)
- [VirtualBox Host-Only Networking Guide](https://www.virtualbox.org/manual/ch06.html#network_hostonly)
