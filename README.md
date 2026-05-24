# Blockchain & Its Applications — Premium Study Guide

**Open-source** exam preparation for blockchain courses — practice questions, formulas, mock tests, cheatsheet, and a topic tracker. No course-specific dates or branding.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/blockchain-study-guide)

---

## What is this?

A **static**, **no-build** study site with a premium royal UI. Pick one of three themes, search across 150+ questions, run a 30-question mock test, and track topic confidence in your browser.

---

## Repository layout (modular)

```
BlockChain_NPTEL_Guide/
├── index.html                  # Page shell + all content sections
├── assets/
│   ├── css/
│   │   ├── themes.css          # Royal theme tokens + fonts
│   │   └── styles.css          # Layout & components (imports themes.css)
│   └── js/
│       ├── mock-questions.js   # Global MQ — 30 mock MCQs
│       ├── tracker-topics.js   # Global TOPICS — checklist per module
│       ├── theme.js            # Theme switcher (localStorage: bcTheme)
│       ├── nav.js              # Section tabs + back-to-top
│       ├── quiz.js             # Practice card pick / reveal
│       ├── mock.js             # Mock test UI + reset / reveal all
│       ├── tracker.js          # Progress ring + weak-topic list
│       ├── search.js           # Global question search
│       └── app.js              # Bootstrap
├── vercel.json
└── README.md
```

**Script load order** (bottom of `index.html`):

```
mock-questions.js → tracker-topics.js → theme.js → nav.js → quiz.js → mock.js → tracker.js → search.js → app.js
```

---

## Features

| Area | What you get |
|------|----------------|
| **Royal themes** | Noir (purple/gold), Velvet (burgundy/gold), Sapphire (blue/gold) — saved in `localStorage` |
| **Typography** | Cinzel headings, Source Sans 3 body, JetBrains Mono for code-style labels |
| **Practice** | 150+ MCQs across 12 modules with expandable explanations |
| **Mock test** | 30 questions, live score, reset, reveal-all |
| **Search** | Filter questions in the active section from the nav bar |
| **Tracker** | Mark topics Done / Weak; progress ring + header % |
| **Reference** | Formulas, comparison tables, attack cards, cheatsheet |
| **Print** | Print-friendly cheatsheet from the Tracker tab |

---

## Quick start (local)

No `npm install` or build step.

```powershell
cd "C:\Users\usman\OneDrive\Desktop\BlockChain_NPTEL_Guide"
python -m http.server 3000
```

Open [http://localhost:3000/](http://localhost:3000/).

> Serve over HTTP (not `file://`) so `localStorage` and assets load reliably.

---

## Customisation

| Change | File |
|--------|------|
| Mock questions | `assets/js/mock-questions.js` (`MQ`) |
| Tracker topics | `assets/js/tracker-topics.js` (`TOPICS`) |
| Theme colors | `assets/css/themes.css` |
| Layout / cards | `assets/css/styles.css` |
| New theme name | Add `[data-theme="…"]` in `themes.css` + button in `index.html` |

---

## Topics covered

- **Modules 1–3:** Cryptography, Bitcoin, Merkle trees  
- **Modules 4–6:** Forks, Ethereum, BFT, Paxos, PBFT  
- **Modules 7–9:** Fabric, Algorand, DIDs, SSI  
- **Modules 10–12:** HTLC, attacks, trilemma, interoperability, Stellar/Ripple  

---

## License

MIT — use, modify, and share freely.

---

## Disclaimer

Community study aid for blockchain and distributed-ledger topics. Not affiliated with any university or MOOC platform. Course content remains the property of respective instructors and institutions.
