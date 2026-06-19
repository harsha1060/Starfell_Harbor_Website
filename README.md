# Starfell_Harbor_Website

Welcome to the repository for **Starfell Harbor** — a personal blog dedicated to cybersecurity walkthroughs, tech insights, and personal reflections. 

[starfellharbor.mooo.com](https://starfellharbor.mooo.com)

![Starfell Harbor](home_page.png)

This project is built using a modern, lightning-fast Static Site Generator (SSG) architecture that compiles raw Markdown content into optimized static pages.

## Features

* **Blazing Fast Performance:** Built with Astro for zero-javascript frontend delivery.
* **Utility-First Styling:** Fully styled with Tailwind CSS for a responsive, modern UI.
* **Serverless Contact Form:** Integrated with Web3Forms to handle secure form submissions without a backend.
* **Automated CI/CD:** Fully containerized with Docker and deployed automatically to Oracle Cloud Infrastructure (OCI) via GitHub Actions.

## Tech Stack

* **Framework:** [Astro](https://astro.build/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Forms:** [Web3Forms](https://web3forms.com/)
* **Containerization:** Docker (Multi-stage Node.js + Caddy)
* **CI/CD:** GitHub Actions
* **Hosting:** Oracle Cloud Infrastructure (OCI)

## 📂 Project Structure

    /
    ├── public/                # Static assets (images, favicons, fonts)
    ├── src/
    │   ├── layouts/           # Astro layouts (MainLayout, BlogLayout)
    │   ├── pages/
    │   │   ├── blog/          # Markdown (.md) blog posts
    │   │   ├── cyber/         # Cyber category index
    │   │   ├── tech/          # Tech category index
    │   │   ├── personal/      # Personal category index
    │   │   └── index.astro    # The main homepage
    ├── Dockerfile             # Multi-stage build instructions
    ├── Caddyfile              # Web server routing configuration
    └── .github/workflows/     # CI/CD deployment pipelines

## Automated Deployment

This repository uses a fully automated CI/CD pipeline that triggers on every push to the master branch:
1. **GitHub Actions** boots up a runner and triggers the deployment workflow.
2. The **Dockerfile** builds the code in two stages:
   * **Stage 1 (Build):** Uses Node.js to compile the Astro Markdown files into high-performance, raw static assets.
   * **Stage 2 (Production):** Discards the heavy Node environment and copies the compiled assets into a lightweight, secure caddy:alpine web server image.
3. The production image is pushed to the **GitHub Container Registry (GHCR)**.
4. The workflow securely SSHs into the **Oracle Cloud (OCI)** server, pulls the fresh image, and gracefully restarts the container.

## 📄 License

&copy; 2026 Starfell Harbor. All Rights Reserved.
