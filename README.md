# 📊 Profit Margin & Pricing Engine v2.0
### *Enterprise-Grade E-Commerce Profitability Calculator & Analytics Tool*

[![React 19](https://img.shields.io/badge/React-19.2-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript v6](https://img.shields.io/badge/TypeScript-v6.0-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 🌟 Executive Overview

**Profit Margin Calculator v2.0** is a professional-grade, high-performance web application designed for e-commerce entrepreneurs, dropshippers, and digital product agencies. 

Unlike basic calculators, this engine features automatic platform fee resolution, multi-currency localization, real-time "What-If" pricing analysis, and strict, hardened freemium guards. It is engineered with robust environment detection, secure HTTP headers, and crash-resilient Error Boundaries to deliver a seamless client-facing experience.

### 🔗 Deployed Live Application
* **Production URL:** [https://price-profit-margin-calculator.vercel.app](https://price-profit-margin-calculator.vercel.app)
* **Custom White-Labeling Services:** [Hire on Fiverr](https://www.fiverr.com/salman_hassan86)

---

## ⚡ Key Engineered Features

### 🏦 Platform Auto-Fee Engine
Instantly resolves and applies transaction, listing, and referral fees for major e-commerce environments:
* **Shopify Basic:** 2.9% + $0.30 standard gateway charges
* **Amazon FBA:** 15% flat category-based referral fee
* **Etsy:** 6.5% flat listing transaction fee
* **eBay:** 13.25% standard final value fee
* **TikTok Shop:** 8% seller commission rate
* **Gumroad:** 10% flat digital distribution rate
* **Custom Config:** Define custom percentages on the fly for unlisted local platforms

### 🌍 Global Currency Localization
One-click toggling for global seller markets. The application changes all visual representation formatting and symbols dynamically:
* **USD** ($), **GBP** (£), **EUR** (€), **AUD** ($), **CAD** ($), **AED** (Dirhams)

### 🧪 "What-If" Price Simulation
An interactive slider allows sellers to slide their selling price and visualize the impact on their Net Profit, Gross Margin, and Markup in real time.

### 📐 Minimum Target Price Calculator
Tell the engine your desired target margin percentage (e.g., 30%), and it calculates the exact minimum price you need to charge to maintain that margin after accounting for COGS, shipping, and automated platform transaction fees.

### 📋 Enterprise Export & Reporting
* **Download CSV:** Exports structured calculation rows directly into Excel, Google Sheets, or Apple Numbers.
* **Copy Summary:** Copies formatted markdown/text summaries directly to the clipboard for sharing on Slack, email, or WhatsApp.

---

## 🛡️ Production & Security Hardening

This v2.0 release incorporates strict enterprise-grade security and reliability patterns:

* **Hardened Freemium Logic:** Employs obfuscated session storage keys (`_pmc_v2_sess`), dual-storage backup matching (using `Math.max` between `localStorage` and `sessionStorage`), and a persistent cookie timestamp trap (`_pmc_v2_ts` + `_pmc_v2_vis`) to block DevTools trial resets.
* **Environment Detection (`IS_DEV`):** Automatically detects `localhost` hostnames to disable freemium locks for developers while maintaining strict paywalls in production.
* **Strict Security Headers (`vercel.json`):** Deploys robust HTTP security headers including X-Frame-Options (DENY), X-Content-Type-Options (nosniff), Referrer-Policy, and a locked-down Content Security Policy (CSP).
* **React Error Boundaries:** Wraps the root component tree to catch rendering exceptions and present a clean recovery interface instead of a raw browser crash.

---

## 📂 Repository Blueprint

```
├── public/                 # Static assets
│   ├── favicon.svg         # Clean emerald dollar brand logo
│   └── icons.svg           # Application SVG icons
├── src/
│   ├── components/         # Modular React views
│   │   ├── ErrorBoundary.tsx # Crash catcher and fallback UI
│   │   ├── Calculator.tsx   # Core mathematical calculation engine
│   │   ├── PaywallModal.tsx # Freemium upsell interface
│   │   └── ...             # Inputs, selectors, dashboards
│   ├── utils/
│   │   └── environment.ts  # Localhost vs production detector
│   ├── constants.ts        # Platform fee structures and URLs
│   ├── main.tsx            # React virtual DOM renderer
│   ├── types.ts            # TypeScript interfaces
│   └── index.css           # Styling configuration
├── vercel.json             # Security headers configuration
├── index.html              # SEO markup and viewport configuration
└── USER_MANUAL.md          # Comprehensive user operation manual
```

---

## 🛠️ Installation & Local Setup

### System Prerequisites
Ensure you have **Node.js** (v18.0 or newer) and **npm** installed.

### Step 1: Clone the Repository
```bash
git clone https://github.com/waterprooffish99/profit-margin-calculator.git
cd profit-margin-calculator
```

### Step 2: Install Node Dependencies
```bash
npm install
```

### Step 3: Launch Local Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:5173`. In development mode, the freemium limit is completely bypassed automatically.

---

## 📦 Production Bundling & Deployment

### Build the Optimized Asset Bundle
To compile TypeScript and generate highly-optimized HTML, CSS, and JS chunks, run:
```bash
npm run build
```
The compiled output is outputted to the `dist/` directory.

### Deploys
This project is configured for one-click deployment on **Vercel** with integrated security headers. Connect your repository to Vercel and it will build and deploy instantly using default Vite settings.

---

## 📄 License
This project is licensed under the **MIT License** - see the LICENSE file for details.

---
<p align="center">
  Generated by <b>Profit Margin Calculator v2.0</b> — Pricing for the Pros.
</p>
