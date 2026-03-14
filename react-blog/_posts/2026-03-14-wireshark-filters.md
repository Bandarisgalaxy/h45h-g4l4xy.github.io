---
layout: post
title: "Wireshark Basic Display Filters Cheat Sheet"
date: 2026-03-14
categories: [SOC, Network Analysis]
tags: [wireshark, packet-analysis, soc, cybersecurity, network-monitoring]
author: Harshith
description: A practical Wireshark display filter cheat sheet for SOC analysts and cybersecurity beginners to quickly analyze network traffic.
toc: true
---

## 🧭 Introduction

**Wireshark** is one of the most important tools used by **SOC analysts, DFIR investigators, and network engineers** to analyze network traffic.

During packet analysis, large captures may contain **thousands or millions of packets**.  
To efficiently analyze traffic, Wireshark provides **Display Filters**.

Display filters help analysts:

- Isolate suspicious traffic
- Investigate security incidents
- Detect malware communication
- Analyze protocols quickly

This cheat sheet provides **commonly used Wireshark display filters** useful for cybersecurity investigations.

---

# 🧪 Basic Address Filters

## MAC Address Filters

Filter packets based on **MAC addresses**.

```wireshark
eth.addr == 23:23:23:ab:ab:ab
```

Show packets where MAC address appears as **source or destination**.

```wireshark
eth.src == aa:bb:cc:dd:ee:ff
```

Show packets sent **from a specific device**.

```wireshark
eth.dst == 11:22:33:44:55:66
```

Show packets **destined for a specific device**.

---

## IP Address Filters

Filter traffic using **IP addresses**.

```wireshark
ip.addr == 192.168.1.1
```

Show packets where the IP appears as **source or destination**.

```wireshark
ip.src == 192.168.1.2
```

Show packets sent **from a specific IP**.

```wireshark
ip.dst == 192.168.1.0/24
```

Filter packets for a **specific subnet**.

---

## 🌐 Protocol Filters

Protocol filters help analysts isolate **specific network protocols**.

### TCP

```wireshark
tcp.port == 80
```

Traffic on port **80 (HTTP)**.

```wireshark
tcp.srcport == 80
```

Packets where **source port** is 80.

```wireshark
tcp.dstport == 80
```

Packets where **destination port** is 80.

---

### UDP

```wireshark
udp.port == 53
```

Show **DNS traffic**.

```wireshark
udp.srcport == 123
```

Show **NTP traffic**.

```wireshark
udp.dstport == 161
```

Show **SNMP traffic**.

---

### ICMP

```wireshark
icmp
```

Show all **ICMP packets**.

```wireshark
icmp.type == 11
```

ICMP **TTL Exceeded** messages (often seen in traceroute).

---

## 📡 Common Protocol Filters

### DNS

```wireshark
dns
```

Display all **DNS packets**.

---

### DHCP

```wireshark
dhcp
```

Display all **DHCP traffic**.

---

### SMB

```wireshark
smb
```

Used to analyze **Windows file sharing traffic**.

---

### SMTP

```wireshark
smtp
```

Filter **email transfer traffic**.

---

### FTP

```wireshark
ftp && ftp-data
```

Display **FTP control and data traffic**.

---

### SIP

```wireshark
sip
```

Filter **VoIP signaling traffic**.

---

### ARP

```wireshark
arp
```

Display **ARP requests and responses**.

---

## ⚙️ Filter Operators

Wireshark supports logical operators to combine filters.

| Operator | Symbol | Example |
|--------|--------|--------|
| equals | == | ip.addr == 192.168.1.1 |
| not equal | != | dns.flags.rcode != 0 |
| and | && | tcp.port == 80 && ip.addr == 10.0.0.5 |
| or | \|\| | tcp.port == 80 \|\| tcp.port == 443 |
| not | ! | !icmp |

These operators allow analysts to create **powerful search queries**.

---

## 🔎 Useful Investigation Filters

### Traffic Between Two Networks

```wireshark
ip.addr == 192.168.1.0/24 and ip.addr == 192.168.2.0/24
```

Shows communication **between two subnets**.

---

### Find Specific Text in Packets

```wireshark
tcp.segment_data contains "microsoft"
```

Useful when searching for **suspicious payload content**.

---

### Detect Credentials

```wireshark
tcp contains "password"
```

Search for plaintext **password strings**.

Case-insensitive search:

```wireshark
tcp matches "password"
```

---

## 🌍 HTTP Analysis

### HTTP Requests

```wireshark
http.request
```

Show all HTTP requests.

---

### HTTP GET Requests

```wireshark
http.request.method == "GET"
```

Display **web page retrieval requests**.

---

### HTTP POST Requests

```wireshark
http.request.method == "POST"
```

Often used to analyze **login submissions or form data**.

---

### HTTP Errors

```wireshark
http.response.code > 200
```

Shows **redirects and errors**.

---

## 🔐 TLS / SSL Analysis

### TLS Client Hello

```wireshark
tls.handshake.type == 1
```

Shows **TLS client hello packets**.

---

### TLS Server Hello

```wireshark
tls.handshake.type == 2
```

Shows **server responses during TLS handshake**.

---

### TLS Certificates

```wireshark
tls.handshake.type == 11
```

Displays **certificate exchange packets**.

---

### TLS Troubleshooting

```wireshark
(tls.record.content_type || tls.handshake.type || tls.alert_message.level) && tls.record.content_type !=23
```

Useful for debugging **TLS handshake problems**.

---

## 🧠 DHCP Security Investigation

### DHCP NAK

```wireshark
dhcp.option.dhcp == 6
```

Server **rejects client configuration**.

---

### DHCP DECLINE

```wireshark
dhcp.option.dhcp == 4
```

Client **rejects assigned IP**.

These filters help detect **rogue DHCP servers**.

---

## 🧪 Frame Analysis Filters

### Packets After Certain Number

```wireshark
frame.number > 1500
```

Show packets **after packet 1500**.

---

### Packets After Certain Time

```wireshark
frame.time_relative > 50
```

Display packets **after 50 seconds of capture**.

---

### Frames With Comments

```wireshark
frame.comment
```

Shows packets containing **analyst comments**.

---

## 🌐 DNS Investigation

### Specific DNS Query

```wireshark
dns.qry.name == "www.example.com"
```

Shows DNS queries for a **specific domain**.

---

### DNS Errors

```wireshark
dns.flags.rcode != 0
```

Indicates **DNS resolution failures**.

This is useful for detecting:

- Malware beacon failures
- DNS misconfiguration
- Suspicious domains

---

## 🧠 Learning Outcomes

After practicing these filters you will:

- Navigate large packet captures easily
- Detect suspicious network behavior
- Investigate malware traffic
- Perform SOC-level packet analysis
- Understand protocol-level communication

---

## 🏁 Conclusion

Mastering **Wireshark display filters** is a critical skill for:

- SOC Analysts
- Incident Responders
- Threat Hunters
- Network Security Engineers

These filters significantly **reduce investigation time** and allow analysts to quickly focus on **relevant packets**.

---
