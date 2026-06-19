---
layout: ../../layouts/BlogLayout.astro
title: "picoCTF Walkthrough: Scan Surprise"
date: "JAN 05, 2026"
readTime: "5 MIN READ"
author: "Harsha"
category: "cyber"
image: "/assets/images/scan-surprise/1.webp"
---

QR codes are everywhere, but handling them purely within a command-line environment can be tricky. In **Scan Surprise**, I had to deal with remote file transfers, broken protocols, and terminal-based image scanning. Here is how I solved it.

## 💻 Step 1: The Noisy Login

I started by logging into the challenge machine using the provided SSH credentials. As soon as I connected, a massive QR code splashed across my terminal screen as part of the welcome banner.

I saw a `flag.png` in the directory. Being thorough, I decided to ignore the messy terminal output for a moment and grab the actual file to analyze it properly.

## 🚧 Step 2: The Protocol Failure

My first instinct was to download the file to my local machine using `scp`.

```bash
scp -P PORT ctf-player@atlas.picoctf.net:flag.png .
```

Failed. ❌ The `scp` command kept erroring out. I realized the issue: that "opening message" (the big ASCII/QR banner) was messing up the SSH protocol's data stream. I couldn't transfer files the normal way.

## 📦 Step 3: The Base64 Smuggle

When the front door is stuck, we use the back door. Since I couldn't transfer the binary image file directly, I decided to convert it into text.

On the remote machine, I encoded the image:

```bash
base64 flag.png
```

I copied the giant block of Base64 text and pasted it into my local terminal, reversing the process:

```bash
echo "PASTED_BASE64_HERE" | base64 -d > local_flag.png
```

Success! I had the image on my local machine. 📦

## 🔍 Step 4: Scanning in the Terminal

I opened the image and realized... it was just the same QR code from the SSH banner! I could have just scanned my screen, but now I wanted to solve this the "hacker" way—without pulling out my phone.

I wondered if there was a way to scan the image directly inside the terminal. By the grace of Kali Linux, I found `zbarimg`.

I ran the command on my local file:

```bash
zbarimg local_flag.png
```

## 🚩 Conclusion

The tool instantly read the QR code and printed the decoded text right to the console: `picoCTF{...}`.

This challenge was a fun reminder that even when standard tools like `scp` fail, simple text encoding can save the day—and that Linux has a tool for **everything**, even reading QR codes! 🐧✨