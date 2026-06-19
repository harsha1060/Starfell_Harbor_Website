---
layout: ../../layouts/BlogLayout.astro
title: "Corporate Crisis"
date: "OCT 09, 2025"
readTime: "4 MIN READ"
author: "Harsha"
category: "cyber"
image: "/assets/images/corporate-crisis/1.webp"
---

Hey everyone, let’s dive into one of the biggest and most aggressive cybercrime events happening right now. A powerful hacking group called *ShinyHunters* (also tracked as `UNC6040`) has gone from just stealing data to launching a full-scale corporate extortion campaign. They’re publicly threatening and trying to force huge companies to pay enormous ransoms.

This information is based on detailed reporting from [KrebsOnSecurity](https://krebsonsecurity.com/). If you’re interested in all the deep, original details, you can find the article there.

## The Salesforce Attack: The Starting Point

The main wave of trouble began back in May 2025. ShinyHunters used a clever trick called `voice phishing`, which is like a scam phone call. They tricked employees at various companies into connecting a **malicious application** directly to their corporate **Salesforce portal**.

**The Damage:** Salesforce is a massive platform used by countless companies, including giants like *Toyota*, *FedEx*, *Disney/Hulu*, and *UPS*. By tricking those employees, the hackers were able to steal over a **billion records** of customer data from these firms. This is a staggering amount of sensitive information.

**The Extortion Threat:** To cash in, the group set up a public website they call *Scattered LAPSUS$ Hunters* (which is a name that links them to a mix of several hacking crews). Their demand was simple and scary: they told Salesforce, Inc., to **pay a huge ransom by October 10**, or they would leak all the customers’ stolen data for the world to see.

![Screenshot of the ShinyHunters extortion website](/assets/images/corporate-crisis/2.webp)
*This screenshot here shows the group’s new extortion website where they threaten to publish the stolen data unless Salesforce or individual victim companies pay up.*

Salesforce’s answer, thankfully, was a firm **NO** — they stated they will **not negotiate, engage with, or pay** the ransom demands.

## Broader Targets: Red Hat and Discord Hit

ShinyHunters isn’t focusing on just one target. They are proving they can hit almost anywhere:

* **Red Hat Data Theft:** In September, they claimed to have compromised a **GitLab server** used by enterprise software maker Red Hat. They stole over **28,000 code repositories**. This included vital documents like **Customer Engagement Reports (CERs)**, which had client secrets such as `access tokens` (digital keys) for other services like Azure and Docker.
* **Discord User Leak:** They also claimed responsibility for stealing data from **Discord** users. This happened by hacking into a **third-party customer service provider** that Discord uses. The stolen information included things like Discord usernames, emails, IP addresses, and even the last four digits of some stored payment cards.

## Highly Technical Tools: Zero-Days and Backdoors

These hackers are using more than just phone calls; they’re deploying high-level technical weapons:

**Oracle Zero-Day Exploit:** The group exposed and exploited a critical, unknown security flaw — known as a **zero-day vulnerability** — in **Oracle’s E-Business Suite** software. This flaw, labeled `CVE-2025–61882`, allowed them to take complete control of servers without needing a password (unauthenticated remote code execution). This is one of the most serious flaws you can find.

**The ASYNCRAT Trojan:** The group has also been sending out highly targeted, threatening emails, even to security reporters and firms. The file attached to these emails installs a dangerous program called `ASYNCRAT`. This is a **backdoor** that gives the hackers full remote access to a computer. Once it’s on your machine, it can:

* Record everything you type (keylogging).
* Take screenshots and record videos.
* Steal saved passwords and account logins from web browsers like Chrome and Firefox.

![Example of the phishing email sent by ShinyHunters](/assets/images/corporate-crisis/3.webp)
*An example of the threatening phishing email they send, linking to the malicious program.*

This shows [here](https://www.virustotal.com/gui/file/9abe847b497e68919143d4da1bb34e565a7fa9991f51c8f6bb7e5911cee01a24) what happens when that malicious file is scanned, confirming it is dangerous.

## The People Behind the Attacks

The group’s complex identity (*ShinyHunters*, `UNC6040`, *Scattered LAPSUS$ Hunters*) is because it’s actually an **amalgamation** — a mix — of several major cybercrime crews, including *Scattered Spider* and *Lapsus$*.

Many of these hackers are young, sometimes called “Advanced Persistent Teenagers” (APT), and they communicate and share tools in online criminal chat channels. While they are powerful, law enforcement is making progress. Authorities in the U.K. and U.S. have recently charged and sentenced several key members for their roles in these widespread extortion schemes.

## My Takeaway: Focus on Defense

This entire saga shows that major companies are in a state of constant, aggressive warfare against sophisticated hackers. Since we, as regular users, can’t directly fix a huge corporate security flaw, it highlights the need for us to be extra careful with our own security habits:

* **Don’t Click:** Treat **any** unexpected link or attachment with extreme suspicion.
* **Password Security:** Use unique, strong passwords for every account. If one company leaks your data, the hackers can’t easily jump to your other services.

The responsibility for protecting our data ultimately rests with the companies we trust, but staying informed about threats like ShinyHunters is the first step in our personal defense.