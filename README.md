# DesignLint – UI Design Scoring Browser Extension

A lightweight browser extension that analyzes any webpage for **design quality signals** like accessibility, readability, layout density, and visual hierarchy — and presents actionable insights in a clean, developer-friendly UI.

DesignLint is intentionally built as a **design-linting demo**, not a production SaaS.  
Its goal is to demonstrate **frontend architecture, browser extension fundamentals, DOM analysis, and UX reasoning**.



## Why DesignLint Exists

Most UI issues are not visual bugs — they’re **structural, cognitive, and accessibility problems**.

DesignLint answers one simple question:

> *“Is this page usable, readable, and visually structured — and why?”*

This project was built to:
- Explore how UI quality can be **measured heuristically**
- Demonstrate **browser extension architecture**
- Show how design, accessibility, and frontend engineering intersect
- Serve as a **portfolio-grade demo**, not a toy app



## What DesignLint Does

When you run a scan on the current page, DesignLint:

1. Reads the live DOM of the active tab
2. Analyzes selected design metrics
3. Scores each metric independently
4. Produces a summarized results view
5. Allows drilling into metric-level details

All analysis runs **locally in the browser**.  
No data is sent to any backend.



## Metrics Analyzed

### 1. Accessibility
**Who can use this page?**

- WCAG-related checks via axe-core
- Semantic structure and ARIA usage
- Accessibility violations by severity

**Outputs**
- Score (0–100)
- Issue count
- Severity breakdown
- Top accessibility issues



### 2. Readability
**How easy is the content to read and understand?**

- Flesch Reading Ease score
- Sentence and paragraph analysis
- Dense content detection

**Outputs**
- Score (0–100)
- Reading difficulty level
- Text structure statistics
- Key findings



### 3. Layout Density
**How organized is the page structure?**

- Visible section count
- Vertical spacing analysis
- DOM depth and nesting

**Outputs**
- Density score
- Structural metrics
- Layout assessment findings



### 4. Visual Hierarchy
**What stands out at a glance?**

- Font size and weight contrast
- Heading scale variance
- CTA prominence
- Primary focus competition

**Outputs**
- Hierarchy score
- Emphasis metrics
- Visual hierarchy findings


## Screenshots

_Add screenshots here:_
1. Empty state
2. Metric selection
3. Loading state
4. Results overview
5. Metric detail views



## Tech Stack

### Frontend
- TypeScript
- React
- Vite
- Tailwind CSS

### Browser APIs
- Chrome Extension Manifest v3
- Content scripts
- Background service worker
- Message passing
- chrome.storage.local

### Analysis
- axe-core (accessibility)



## Who Is This For

- Frontend engineers
- UI / UX designers
- Accessibility advocates
- QA engineers
- Product teams
- Recruiters reviewing frontend systems work



## Installation (Demo)


Download the built extension archive from GitHub Releases.

https://github.com/techwithpranjal/design-lint/releases/tag/v1.0.0

### Install (Chrome / Edge)

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the extracted build folder



## Local Development

```bash
git clone https://github.com/techwithpranjal/design-lint
cd design-lint/extension
npm install
npm run build
```

Load the `dist/` folder as an unpacked extension.

---

