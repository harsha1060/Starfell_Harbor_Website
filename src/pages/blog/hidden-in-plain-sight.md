---
layout: ../../layouts/BlogLayout.astro
title: "PicoCTF Write-up: Hidden in Plain Sight"
date: "JAN 07, 2026"
readTime: "3 MIN READ"
author: "Harsha"
category: "cyber"
image: "/assets/images/hidden-in-plain-sight/1.webp"
---

> **Challenge Description**
> 
> Sometimes the best place to hide something is right in front of your eyes. Look closely at the provided file to find the hidden flag.

## 🛠 Tools Used

* **ExifTool:** For reading file metadata.
* **Steghide/Binwalk:** For extracting hidden data from images.

## 🚩 Solution Walkthrough

### 1. Initial File Analysis

First, we check the file type and basic metadata to see if any obvious comments or headers have been tampered with.

```bash
file hidden.jpg
exiftool hidden.jpg
```

*Note: Look specifically for the "Comment" or "Artist" fields in the metadata. And decode it using `base64 -d`.*

### 2. Steganography Check

Many "Hidden in Plain Sight" challenges use **LSB (Least Significant Bit)** steganography. You can use an online tool or a command-line tool like `steghide`. The steghide password is still a base64 coded data. Upon decoding it we get a password for the file that is hidden using steghide.

```bash
steghide extract -sf hidden.jpg
```

Using the above command we can access the hidden data by entering the password.

---

This might be a simple or very easy challenge but something is better than nothing, I will solve some difficult challenges for now on. Happy Hacking!