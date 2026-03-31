# 🛡️ UZYNTRA UI — Operator Control Console

<p align="center">
  <img src="public/UZYNTRA-logo-mark.png" alt="UZYNTRA Logo" width="120"/>
</p>

<p align="center">
  <b>Modern SaaS Control Plane for API Security</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/UI-Next.js-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/Backend-Rust-orange?style=for-the-badge&logo=rust" />
  <img src="https://img.shields.io/badge/Status-Production Ready-success?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Security-Focused-blue?style=for-the-badge" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/contributions-welcome-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/PRs-welcome-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/open--source-yes-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/CI-passing-brightgreen?style=for-the-badge" />
</p>

---

## 🚀 Overview

**UZYNTRA UI** is a modern control plane that provides real-time visibility, threat intelligence, and operational control over API security systems.

It enables security teams to:

* 📊 Monitor live security telemetry
* 🚨 Investigate attack events
* 🛡️ Manage mitigations
* 🧠 Track source reputation
* 📜 Review audit logs
* ⚙️ Control security policies

---

## 🚀 Why UZYNTRA?

UZYNTRA is a SaaS-ready API security platform combining a high-performance Rust security engine with a modern operator control console.

It is built for:

* Real-time threat detection
* Scalable API protection
* Security-first system design
* Full observability & control

---

## 🏗️ Platform Architecture

```
Client → UZYNTRA Firewall (Rust)
              ↓
       Detection Engine
              ↓
       Mitigation System
              ↓
         Admin API
              ↓
        UZYNTRA UI (Next.js)
```

---

## 🔗 Backend (Required)

👉 https://github.com/UsamaMatrix/uzyntra-api-firewall

> ⚠️ Backend must be running for full functionality

---

## ✨ Features

* 📊 Dashboard (metrics, activity)
* 🔍 Events Explorer (search, filtering)
* 🛡️ Mitigation Control (block, TTL)
* 🧠 Reputation System
* 📜 Audit Trail
* ⚙️ Policy Management

---

## 🎬 UI Preview

<p align="center">
  <img src="https://media.giphy.com/media/13HgwGsXF0aiGY/giphy.gif" width="700"/>
</p>

---

## 📸 Screenshots

(keep your screenshots section as-is)

---

## 🧰 Tech Stack

* Next.js (App Router)
* Tailwind CSS
* REST API integration
* Security-first UI design

---

## 🐳 Docker Support

```bash
docker build -t uzyntra-ui .
docker run -p 3000:3000 uzyntra-ui
```

---

## ⚙️ CI/CD

This project includes GitHub Actions for automated builds.

---

## 📦 Installation

```bash
git clone https://github.com/UsamaMatrix/uzyntra-ui.git
cd uzyntra-ui
npm install
```

---

## ▶️ Running

```bash
npm run dev
```

---

## 🧪 Development Notes

* Fixed sidebar layout
* Independent scroll panels
* Optimized for operator workflows

---

## 🧭 Roadmap

* 🔐 Authentication & RBAC
* 📊 Analytics dashboards
* 🌐 Multi-tenant SaaS support
* 🔔 Alerts & notifications

---

## 🤝 Contributing

We welcome contributions!

### 🟢 Good First Issues

Check issues labeled `good first issue`

### 💡 Steps

1. Fork repo
2. Create branch
3. Commit changes
4. Open PR

---

## 💼 Use Cases

* API Security Platforms
* DevSecOps pipelines
* SaaS backend protection
* Threat monitoring systems

---

## 👨‍💻 Author

[Muhammad Usama](https://www.linkedin.com/in/usamamatrix/)
Cyber Security Analyst & Rust Engineer

---

## ⭐ Support

If you like this project, give it a ⭐

---

## 🛡️ UZYNTRA

> Control. Observe. Defend.
