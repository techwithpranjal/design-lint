# DesignLint – UI Design Scoring Browser Extension

DesignLint is a lightweight browser extension that analyzes any webpage for **design quality signals** such as accessibility, readability, layout density, and visual hierarchy — and presents the results in a clean, developer-friendly interface.


### 1. Empty state (no scans yet)
<img src="/extension/src/assets/asset1.png" width="360" alt="Empty state" />

### 2. New scan – metric selection
<img src="/extension/src/assets/asset2.png" width="360" alt="Metric selection" />

### 3. Scan in progress (loading state)
<img src="/extension/src/assets/asset3.png" width="360" alt="Loading state" />

### 4. Results overview
<img src="/extension/src/assets/asset4.png" width="360" alt="Results overview" />

### 5. Accessibility – detailed view
<img src="/extension/src/assets/asset5.png" width="360" alt="Accessibility details" />

### 7. Layout density – detailed view
<img src="/extension/src/assets/asset6.png" width="360" alt="Layout density details" />

### 7. Readability – detailed view
<img src="/extension/src/assets/asset7.png" width="360" alt="Readability details" />

### 8. Visual hierarchy – detailed view
<img src="/extension/src/assets/asset8.png" width="360" alt="Visual hierarchy details" />


## Why DesignLint Exists

Most UI issues are not visual bugs — they are **structural, cognitive, or accessibility problems**.

DesignLint answers one simple question:

> *“Is this page usable, readable, and visually structured — and why?”*

The project was built to:
- Explore how UI quality can be **measured heuristically**
- Demonstrate **Chrome Extension (Manifest v3) architecture**
- Show the intersection of **design, accessibility, and frontend engineering**
- Serve as a **portfolio-grade systems demo**, not a toy app



## How DesignLint Works

When you start a scan on the current tab, DesignLint:

1. Reads the live DOM of the active page
2. Runs selected design metric analyzers
3. Scores each metric independently
4. Aggregates results into a unified report
5. Allows drilling down into metric-specific details

All analysis runs **locally inside the browser**.  
No data is sent to any backend or external service.



## Metrics Explained

DesignLint treats design quality as **four distinct dimensions**.  
Each metric answers a different usability question and is backed by concrete, inspectable signals.



### 1. Accessibility  
**Can people with different abilities use this page?**

Accessibility measures whether a page is usable by screen reader users, keyboard users, and people with visual or cognitive impairments.  
This metric focuses on **standards compliance and semantic correctness**, not visual styling.

**What this metric represents**
- Whether the page follows accessibility best practices
- Whether assistive technologies can interpret the structure correctly
- Whether critical barriers exist for disabled users

**Sub-metrics analyzed**
- Semantic HTML usage
- ARIA roles and labels
- WCAG violations detected via automated rules
- Severity distribution of issues

**Output**
- Accessibility score (0–100)
- Total issue count
- Severity breakdown (critical, serious, moderate, minor)
- Top accessibility issues detected



### 2. Readability  
**How easy is the content to read and mentally process?**

Readability evaluates the **cognitive effort required to consume the text** on a page.  
It focuses on structure and density, not grammar or tone.

**What this metric represents**
- How quickly users can understand the content
- Whether text blocks feel overwhelming
- Whether sentence and paragraph structure supports scanning

**Sub-metrics analyzed**
- Flesch Reading Ease score
- Average sentence length
- Average paragraph length
- Number of overly long paragraphs
- Reading difficulty classification

**Output**
- Readability score (0–100)
- Difficulty level (Easy / Standard / Hard)
- Text structure statistics
- Key readability findings



### 3. Layout Density  
**How organized and scannable is the page structure?**

Layout Density measures how content is **distributed spatially**.  
It evaluates structure and spacing, not visual aesthetics.

**What this metric represents**
- Whether the page feels balanced or crowded
- Whether sections are clearly separated
- Whether structural complexity increases cognitive load

**Sub-metrics analyzed**
- Visible section count
- Vertical spacing between elements
- Average and maximum DOM nesting depth
- Structural density classification

**Output**
- Layout density score
- Structural metrics
- Contextual layout assessment findings



### 4. Visual Hierarchy  
**What stands out at a glance?**

Visual Hierarchy evaluates whether the page clearly communicates **what matters most** when users first look at it.

**What this metric represents**
- Whether attention is guided intentionally
- Whether multiple elements compete for focus
- Whether calls-to-action stand out appropriately

**Sub-metrics analyzed**
- Font size and weight contrast
- Heading scale variance
- Primary focus competition
- Call-to-action prominence

**Output**
- Visual hierarchy score
- Emphasis and contrast metrics
- Visual hierarchy findings explaining attention conflicts




## Tech Stack

### Frontend
- TypeScript
- React
- Vite
- Tailwind CSS

### Browser APIs
- Chrome Extension (Manifest v3)
- Content scripts
- Background service worker
- Message passing
- `chrome.storage.local`

### Analysis Libraries
- axe-core (accessibility analysis)



## Who This Is For

- Frontend engineers
- UI / UX designers
- Accessibility advocates
- QA engineers
- Product teams
- Recruiters reviewing frontend systems and architecture work



## Installation (Demo)

DesignLint is provided as an **unpacked demo extension**.

Download the latest build zip folder named Design-Lint-Extension-latest-version.zip from GitHub Releases:  
👉 https://github.com/techwithpranjal/design-lint/releases

### Install (Chrome / Edge / Chromium)

1.  Unzip the folder downloaded from release section
2.  Open `chrome://extensions`
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the extracted build folder



## Local Development

```bash
git clone https://github.com/techwithpranjal/design-lint
cd design-lint/extension
npm install
npm run build
