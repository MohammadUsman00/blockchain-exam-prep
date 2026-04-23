# Blockchain & Its Applications — NPTEL Exam Prep Kit

**Course:** Blockchain and its Applications (NOC26_CS34) · **Institute:** IIT Kharagpur · **Exam:** NPTEL CBT Final · April 2026

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/blockchain-exam-prep)

---

## Live demo

**[View live →](https://blockchain-exam-prep.vercel.app)** (replace with your deployment URL after you connect your own repo.)

---

## What is this?

A **static**, **no-build** study site: practice questions by week, a 30-question mock test, formulas, comparison tables, attack summaries, a printable cheatsheet, and a **topic tracker** that saves to `localStorage`. Styling and behaviour are split into small files so you can edit data or logic without scrolling through one giant HTML file.

---

## Repository layout

```
BlockChain_NPTEL_Guide/
├── index.html              # Page shell + all markup (sections, questions, tables)
├── assets/
│   ├── css/
│   │   └── styles.css      # Theme, layout, cards, print rules
│   └── js/
│       ├── mock-questions.js   # Global MQ — 30 mock MCQs
│       ├── tracker-topics.js   # Global TOPICS — checklist rows per week
│       └── app.js              # Nav, pick/rv, mock UI, countdown, tracker persistence
├── vercel.json             # Static hosting + SPA-style fallback to index.html
├── DEPLOY.md               # Step-by-step deploy to Vercel / GitHub Pages
└── README.md
```

**Load order:** `mock-questions.js` → `tracker-topics.js` → `app.js` (see the bottom of `index.html`). The app expects globals `MQ` and `TOPICS`.

---

## Features

| Area | What you get |
|------|----------------|
| Practice | Question cards with clickable options and expandable explanations |
| Mock test | 30 questions, score bar, accuracy summary |
| Reference | Formulas, comparison tables, attack types, Stellar/Ripple/Ubin notes |
| Tracker | Mark topics Done / Weak; persists as JSON under key `bcTracker` |
| Countdown | Header + tracker tab; driven by `EXAM_AT` in `assets/js/app.js` |

---

## Topics covered (high level)

- **Weeks 1–3:** SHA-256, avalanche effect, Merkle trees, UTXO, mining  
- **Weeks 4–6:** Forks, 51% attack, Ethereum/gas, BFT `3f+1`, Paxos, PBFT  
- **Weeks 7–9:** Hyperledger Fabric (EOV), MSP, Algorand VRF, DIDs, SSI  
- **Weeks 10–12:** HTLC, atomic swaps, trilemma, attacks, use cases, interoperability  

---

## Quick start (local)

No `npm install` or build step is required.

Serve the **project root** over HTTP so relative assets (`assets/css/styles.css`, `assets/js/*.js`) and `localStorage` behave correctly.

### Windows PowerShell (Python)

```powershell
cd "C:\Users\usman\OneDrive\Desktop\BlockChain_NPTEL_Guide"
python -m http.server 3000
```

Open [http://localhost:3000/](http://localhost:3000/).

### Alternative (Node.js)

```powershell
cd "C:\Users\usman\OneDrive\Desktop\BlockChain_NPTEL_Guide"
npx --yes serve .
```

Use the localhost URL printed in the terminal (usually `http://localhost:3000`).

> Avoid opening `index.html` directly via `file://` if you want stable tracker persistence and browser-consistent behaviour.

---

## Deploy (quick)

- **Vercel:** import the repo; `vercel.json` already points at `index.html`. Optional: `npm i -g vercel` then `vercel` from the repo root.  
- **GitHub Pages:** deploy from branch `main`, folder `/` (root).  

More detail: [DEPLOY.md](DEPLOY.md).

---

## Customisation

- **Exam date/time:** edit `EXAM_AT` in [assets/js/app.js](assets/js/app.js).  
- **Mock questions:** edit [assets/js/mock-questions.js](assets/js/mock-questions.js) (`MQ` array).  
- **Tracker rows:** edit [assets/js/tracker-topics.js](assets/js/tracker-topics.js) (`TOPICS` array).  
- **Look and feel:** [assets/css/styles.css](assets/css/styles.css).  

---

## Recent fixes (maintenance notes)

- **JavaScript:** String building for the mock test and topic tracker had broken quote escaping (invalid syntax and broken `onclick` handlers). That is corrected in `app.js`.  
- **HTML:** Several question cards had been left **after** `</html>` (invalid document, so those cards never appeared in the live DOM). They are merged into the correct week sections inside `index.html`.  
- **Navigation:** Section buttons now call `S(id, this)` so the active tab does not rely on the non-standard global `event` object.  

---

## Disclaimer

Study aid based on public NPTEL materials (NOC26_CS34). Not affiliated with IIT Kharagpur or NPTEL.

---

## License

MIT — use, modify, and share freely.
