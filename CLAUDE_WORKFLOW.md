# CLAUDE_WORKFLOW.md — Working on biotrax-web

> **For future Claude sessions (or any AI assistant) working on this repo.**
> Read this file in full before making any changes. It captures the project state, conventions, and workflow established with the repo owner.

---

## 1. Quick orientation

**What this is:** The marketing website for **BioTrax Sense** — an iOS + Apple Watch app that quietly tracks stress, sleep, social connection, and location to give the people who care about you an early-warning signal before mental health declines.

**Live at:** https://biotrax.se
**Repo:** https://github.com/mreid80289/biotrax-web
**Owner:** mreid80289

**Tech stack:**
- **React 18** + **Vite 5** (single-page app)
- **react-router-dom** for routing
- No CSS framework — all styles are inline `style={{ ... }}` objects in JSX
- A handful of `@keyframes` animations live in `index.html` `<style>` block
- Fonts loaded from Google Fonts: **Cormorant Garamond** (display/italic), **Inter** (body), **JetBrains Mono** (mono)

**Deployment:** Cloudflare Pages, auto-deploys from GitHub.
- Pushes to `main` → deploys to **biotrax.se**
- Pushes to any other branch → deploys to a preview URL like `<branch-name>.biotrax-web.pages.dev`

---

## 2. Repo structure

```
biotrax-web/
├── index.html              ← thin shell, loads /src/main.jsx + has <style> for keyframes
├── package.json            ← React 18, Vite 5, react-router-dom 6
├── vite.config.js
├── public/
│   ├── biotrax-logo.png    ← logo bitmap used in nav & footer
│   └── assets/             ← screenshots: home, sleep, social, location, etc.
├── src/
│   ├── main.jsx            ← React entry — just renders <App/>
│   ├── App.jsx             ← THE WHOLE SITE — Nav, Hero, all sections, Footer (~1400 lines)
│   └── pages/
│       ├── FAQ.jsx
│       ├── PageLayout.jsx
│       ├── PrivacyPolicy.jsx
│       ├── Support.jsx
│       └── Terms.jsx
├── chats/                  ← old chat transcripts (Claude Design handoffs)
├── project/                ← old HTML design exploration files
└── CLAUDE_WORKFLOW.md      ← this file
```

**Where the design lives:** `src/App.jsx`. It's one big file with components in order: `Nav`, `Hero`, `Tracks`, `HowItWorks`, `StressSection`, `CoachSection`, `WeeklyReport`, `Caregivers`, `ScorePlayground`, `Privacy`, `Waitlist`, `Footer`. Plus a `HEADLINES` constant near the bottom for hero copy variants.

---

## 3. Design system

Defined at the top of `src/App.jsx`:

### Colors (`const C`)
- `bg: '#0a0d0c'` — main dark background
- `bgAlt: '#0f1413'` — slightly lighter dark
- `ink: '#ffffff'` — primary text
- `inkDim: 'rgba(255,255,255,0.66)'` — secondary text
- `inkMuted: 'rgba(255,255,255,0.42)'` — tertiary text
- **`green: '#34d399'`** — brand accent (used for `Sense` italic, score, status dots)
- `greenDeep: '#10b981'` — deeper green
- `blue: '#3b82f6'` — stress chip accent
- `amber: '#fbbf24'` — warnings
- `coral: '#fb923c'` — alerts
- `border: 'rgba(255,255,255,0.08)'`
- `borderStrong: 'rgba(255,255,255,0.14)'`
- `paper: '#f5f3ef'` / `paperInk: '#0a0d0c'` — light sections

### Fonts
- `fontDisplay` = **Cormorant Garamond** — used for italic emphasis only (e.g. *"the quietest."*, *"Sense"*)
- `fontBody` = **Inter** — all body text, headlines, UI
- `fontMono` = **JetBrains Mono** — labels, kickers, status, technical bits

### Typography conventions
- **Headlines:** Inter, weight 600-700, tight letter-spacing
- **Emphasis (italic words):** Cormorant Garamond, weight 400-500, `fontStyle: 'italic'`, often in `C.green` for the accent
- **Kickers / labels:** JetBrains Mono, uppercase, letter-spacing ~1.5, in `C.inkMuted`

### Tone & voice
- Quiet, observant, gentle. "Quietly tracks", "subtle nudges", "never an alarm".
- Avoid clinical jargon in user-facing copy.
- Avoid hype. The app is presented as a calm presence in the background.

---

## 4. Branding rules: "BioTrax" vs "BioTrax Sense"

**Brand name (formal):** BioTrax Sense
**Product name (in flowing copy):** BioTrax

### Use "BioTrax Sense" in:
- Browser `<title>`
- Nav wordmark (with italic green "Sense")
- Footer wordmark (with italic green "Sense")
- Footer copyright line (uppercase: `© 2026 BIOTRAX SENSE`)
- Hero sub-copy opening line
- Any "official" mention (legal, store listings, social)

### Keep as "BioTrax" in:
- In-body flowing copy ("BioTrax pulls sleep data...", "BioTrax surfaces a check-in...")
- CSS class names — never rename `.biotrax-breath`, `.biotrax-chip`, etc. They're internal and changing them risks breaking animations.
- ARIA labels and alt text (just "BioTrax" reads cleaner)
- Logo file name (`biotrax-logo.png`)

### The italic "Sense" treatment

When adding "Sense" next to "BioTrax" in a wordmark, use this exact JSX pattern so it matches the existing design language:

```jsx
<span style={{ fontFamily: fontBody, fontSize: 17, fontWeight: 600, color: C.ink }}>
  BioTrax{' '}
  <em style={{
    fontFamily: fontDisplay,
    fontStyle: 'italic',
    fontWeight: 500,
    color: C.green,
    letterSpacing: 0,
  }}>
    Sense
  </em>
</span>
```

This makes "Sense" feel native to the design system — same Cormorant Garamond italic + green that's already used for emphasis like *"the quietest."* in the hero headline.

---

## 5. The workflow (how we ship changes)

**Branch strategy:**
- `main` — production. Pushes auto-deploy to **biotrax.se**.
- `backup-pre-burnout-pivot` — historical safety backup. **Don't touch.**
- `pre-pivot` — earlier state. **Don't touch.**
- Feature branches — short-lived, named descriptively (`add-sense-branding`, `fix-mobile-nav`, etc.)

**Standard workflow for any change:**

1. **Clone + check out main**
   ```bash
   git clone https://${TOKEN}@github.com/mreid80289/biotrax-web.git
   cd biotrax-web
   git checkout main && git pull
   ```

2. **Create a descriptive feature branch**
   ```bash
   git checkout -b descriptive-branch-name
   ```

3. **Make the changes** — surgical edits to `src/App.jsx` or `index.html`. Use Python heredocs with `assert old in code` to verify the replacement target exists before substituting, so silent partial edits can't happen.

4. **Show the diff to the owner BEFORE committing**
   ```bash
   git diff
   ```
   Wait for explicit approval.

5. **Commit with a thorough message**
   - Subject line: short and specific
   - Body: list each change as a bullet, explain the *why* if non-obvious

6. **Push to the feature branch (NOT main)**
   ```bash
   git push -u origin descriptive-branch-name
   ```

7. **Tell the owner the preview URL**
   ```
   https://<branch-name>.biotrax-web.pages.dev
   ```
   Wait for review.

8. **Once approved, merge to main with `--no-ff`** (preserves history of the feature branch)
   ```bash
   git checkout main && git pull
   git merge feature-branch --no-ff -m "Merge: <description>"
   git push origin main
   ```

9. **Tell the owner** the commit hash on `main` (for easy rollback if needed) and that biotrax.se will auto-deploy in ~1-2 min.

10. **Offer to delete the feature branch** once merged (or leave for history if the owner prefers).

---

## 6. Auth & security

**GitHub access:** Claude does NOT have persistent access. The owner provides a **fresh Personal Access Token** at the start of each session.
- Token scope needed: `repo` (full control of repositories)
- Token format: `ghp_...`
- Get one at: https://github.com/settings/tokens/new

**At session end, remind the owner to revoke the token** at https://github.com/settings/tokens — even if it wasn't shared anywhere risky, rotation is good hygiene.

**Never store the token in committed files.** Use it only inline in git URLs (`https://${TOKEN}@github.com/...`) for the duration of the session.

---

## 7. Things to NEVER do

1. **❌ Never push directly to `main`** without an approved diff and explicit approval. Always feature branch first.
2. **❌ Never push the standalone HTML files** from canvas exploration sessions. The live site is a React/Vite app — replacing `index.html` with a standalone HTML file would break the Vite build.
3. **❌ Never rename CSS animation class names** (`.biotrax-breath`, `.biotrax-chip`, `.biotrax-chip-score`, etc.). They're referenced from `index.html` `<style>` and `src/App.jsx`, and the hero relies on them.
4. **❌ Never change the green color** (`#34d399`) — it's the brand accent.
5. **❌ Never delete the `backup-pre-burnout-pivot` or `pre-pivot` branches.**
6. **❌ Never commit `.env` files, tokens, or anything that looks like a secret.**
7. **❌ Never edit `.gitignore`, `package.json`, or `vite.config.js`** unless explicitly asked. They affect the build.
8. **❌ Never bulk-replace "BioTrax" with "BioTrax Sense"** in body copy. The owner intentionally wants "BioTrax" in flowing prose. Only formal/brand placements use "BioTrax Sense".

---

## 8. Context history (for continuity)

**The Sense branding rollout (commit `ff72fc2`, merged from `add-sense-branding`):**
The product is being positioned as part of a portfolio. The existing iOS app "BioTrax Depression Coach" stays in the App Store as a separate product. The new broader-market app is **BioTrax Sense** — same parent brand, distinct product, broader positioning (mental wellness generally, not just depression).

The 5 changes that introduced Sense to the site:
1. `<title>` in `index.html`
2. Nav wordmark in `src/App.jsx` (line ~338)
3. Hero sub-copy `HEADLINES.warm.sub` in `src/App.jsx`
4. Footer wordmark in `src/App.jsx` (line ~1243)
5. Footer copyright in `src/App.jsx` (line ~1287)

Future expansions to consider (NOT yet done — discuss with owner first):
- Update OG meta tags in `index.html` (`og:title`, `og:description`) to include "Sense"
- Update `chats/` README references if they mention the old name
- Update legal pages (FAQ, Terms, Privacy) — separate conversation

---

## 9. Starting a new session — paste this prompt

> *I'm working on the biotrax-web repo (https://github.com/mreid80289/biotrax-web). Please fetch and read `CLAUDE_WORKFLOW.md` from the repo before doing anything else. Here's my fresh GitHub token: `ghp_...`. Today I want to [describe what you want to change].*

That's it. Claude gets the full briefing, knows the workflow, and can get to work.

---

*Last updated: 2026-05-22 — initial creation after Sense branding rollout (commit `ff72fc2`).*
