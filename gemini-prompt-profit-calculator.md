# 🚀 Gemini Prompt — Profit Margin Calculator v2.0 Upgrade

---

## YOUR ROLE

You are a **senior world-class software mentor** and full-stack developer with 15+ years of experience building and selling SaaS products. You build clean, production-ready code. You explain every step like teaching a smart beginner. You do not skip steps. You do not rush. You treat this project like it is going to real paying customers — because it is.

---

## FULL PROJECT CONTEXT

I have already built **Version 1** of a Profit Margin Calculator using the following tech stack:

- **React with TypeScript** — for type-safe interactive components
- **Vite** — for fast development and production builds
- **Tailwind CSS v4** — for utility-first styling

### What Version 1 already has:
- Instant real-time calculations (Net Profit + Gross Margin update as user types)
- Interactive "What-If" price slider to explore profitability scenarios
- Visual color feedback — Emerald Green when margin is above 40% target, Amber when below
- Professional dashboard aesthetic — clean, minimal UI with soft grays and sharp typography
- Fully responsive design
- Simple component structure with no unnecessary overhead

### How to run (already working):
```
npm install
npm run dev
→ Opens at http://localhost:5173
```

---

## THE PROBLEM WITH VERSION 1

Version 1 is a **generic calculator**. It competes with dozens of free tools online.

To sell this tool to real paying customers — Shopify sellers, Etsy sellers, Amazon FBA sellers, dropshippers, and freelancers in the US, Canada, Australia, and Europe — it needs to become a **niche-specific, professional-grade tool** that free tools do not offer.

---

## YOUR MISSION — BUILD VERSION 2

Upgrade the existing project by adding the following **7 new features**. Do not break anything that already works. Build on top of Version 1.

---

## NEW FEATURES TO ADD

### Feature 1 — Platform Fee Selector
Add a dropdown menu that lets the user select their selling platform. When selected, the platform fee is automatically applied to the calculation.

Platforms to include:
| Platform | Fee |
|---|---|
| None / Custom | 0% (user enters their own %) |
| Shopify Basic | 2.9% + $0.30 per transaction |
| Etsy | 6.5% transaction fee |
| Amazon FBA | 15% referral fee |
| eBay | 13.25% final value fee |
| TikTok Shop | 8% commission |
| Gumroad | 10% flat fee |

The platform fee must be **automatically deducted** from the profit calculation and shown as a separate line item so the user can clearly see how much the platform is taking.

---

### Feature 2 — Shipping Cost Field
Add an input field where the user enters their shipping cost per unit in dollars.

- This cost must be deducted from the profit automatically
- Show it as a separate line item in the results breakdown
- Label it clearly: "Shipping Cost per Unit"

---

### Feature 3 — Currency Switcher
Add a currency selector dropdown at the top of the page. Support the following currencies:

| Symbol | Currency |
|---|---|
| $ USD | US Dollar |
| $ AUD | Australian Dollar |
| $ CAD | Canadian Dollar |
| £ GBP | British Pound |
| € EUR | Euro |
| AED | UAE Dirham |

When the user switches currency, all dollar signs and labels update instantly. No conversion needed — just symbol switching. This makes the tool feel international and professional.

---

### Feature 4 — Full Cost Breakdown Panel
Replace the simple result display with a detailed, itemized breakdown panel. Show every number clearly:

```
Selling Price:          $XX.XX
─────────────────────────────────
Cost of Goods (COGS):  -$XX.XX
Platform Fee:          -$XX.XX
Shipping Cost:         -$XX.XX
─────────────────────────────────
Net Profit:             $XX.XX
Gross Margin:           XX.XX%
Markup:                 XX.XX%
```

Each line item should be its own row. Use subtle divider lines between sections. Green color for profit, red for loss.

---

### Feature 5 — Industry Benchmark Badge
After the margin is calculated, show a small badge or indicator that tells the user if their margin is healthy compared to industry standards:

| Margin Range | Badge | Color |
|---|---|---|
| Above 40% | 🟢 Excellent — Top performer | Green |
| 20%–40% | 🟡 Good — Healthy margin | Amber |
| 10%–20% | 🟠 Low — Review your costs | Orange |
| Below 10% | 🔴 Danger — Not sustainable | Red |

Show a one-sentence tip below the badge. Example: "Most Shopify sellers target 30–40% margin. You are above average."

---

### Feature 6 — Export / Copy Results Button
Add two buttons at the bottom of the results panel:

1. **"Copy Summary"** — copies a formatted plain-text summary to the clipboard so the user can paste it into a spreadsheet, WhatsApp, or email
2. **"Download CSV"** — downloads a simple CSV file with all the numbers labeled

The copied/downloaded text should look like this:
```
Profit Margin Calculator — Results
-----------------------------------
Selling Price: $50.00
COGS: $20.00
Platform Fee (Shopify): $1.75
Shipping: $5.00
Net Profit: $23.25
Gross Margin: 46.5%
Markup: 116.25%
-----------------------------------
Generated by Profit Margin Calculator
```

---

### Feature 7 — Minimum Viable Price Calculator (Bonus Feature)
Add a small section titled **"What's my minimum price?"**

The user enters:
- Their COGS
- Their desired margin %
- Their platform + shipping costs

The tool automatically calculates and displays:
**"To achieve a 40% margin, you must sell at minimum: $XX.XX"**

This is extremely useful for new sellers who do not know how to price from scratch. This feature alone makes the tool worth paying for.

---

## UI & DESIGN RULES

- Keep the existing clean dashboard aesthetic — do not change the overall style
- All new fields must feel native to the existing design — same font, same spacing
- Use Tailwind CSS v4 classes only — no inline styles, no extra CSS files
- Keep the layout fully responsive — must work perfectly on mobile and desktop
- No page reloads — everything updates in real time using React state
- TypeScript types must be defined for all new data (platforms, currencies, results)
- Keep all components clean and separated — one component per major section

---

## CODE QUALITY RULES

- Write clean, readable TypeScript — no `any` types
- Add a short comment above each new component explaining what it does
- Keep each component under 100 lines — split if needed
- All constants (platform fees, currencies, benchmarks) must go in a separate `constants.ts` file
- Do not hardcode magic numbers anywhere — use the constants file

---

## HOW TO DELIVER

Build and deliver in this exact order:

1. First, show me the updated **file structure** of the project
2. Then build and show me **`constants.ts`** first (all platform fees, currencies, benchmarks)
3. Then update the **main calculator component** step by step
4. Then show me any **new sub-components** you create
5. After every file, tell me exactly **which file to replace or create** and where it goes
6. Do not show me all files at once — go **one file at a time** so I can follow along

---

## AFTER FINISHING THE CODE

Once all features are built and working, write a **User Manual** for me in super simple steps.

The User Manual must:
- Be written like explaining to someone who has never used a calculator tool before
- Use numbered steps with clear headings
- Include screenshots descriptions (describe what the user will see at each step)
- Cover: how to open the tool, how to enter numbers, how to use each new feature, how to copy/export results
- End with a section: **"How to share your demo link with potential buyers"**
- Use simple English — no technical words

Format the User Manual as a separate clean document I can copy and share.

---

## FINAL REMINDER

You are my senior mentor. Do not just give me code. After each file:
- Tell me what you just built and why
- Tell me what to do next (exact command or action)
- If there is a risk of breaking something, warn me first
- Encourage me — this is a real product going to real customers

Let's build Version 2. Start with Step 1: show me the updated file structure.
