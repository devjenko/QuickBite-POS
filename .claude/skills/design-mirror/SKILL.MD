---
name: design-mirror
description: Reskins an existing landing page to match the design system of the surrounding project. Use this skill whenever the user has dropped a pre-made landing page into their project and wants it redesigned to match their app's actual colors, fonts, spacing, and content. Trigger on phrases like "redesign my landing page to match the project", "apply my project's design to the landing page", "make the landing page look like the rest of the app", "update the landing page colors/fonts", or any time the user has a landing page file and an existing codebase and wants the two to match.
---

# Design Mirror Skill

The user has placed a pre-made landing page inside their existing project. Your job is to transform it so it looks like it was built by the same person who built the rest of the app — same colors, same fonts, same spacing rhythm, same component style — and with copy that reflects what the project actually does.

You are **restyling and rewriting an existing page**, not building a new one. Keep the page's structure and sections intact. Change the skin and the words.

---

## Step 1: Orient yourself

Run `ls` and get a feel for the project structure. You're looking for two things:

**A) The landing page to transform**
- Could be `landing.html`, `index.html`, `src/app/page.tsx`, `src/pages/index.tsx`, or wherever the user placed it
- If it's not obvious, ask the user which file it is

**B) The project's design system**
Search in this order — stop when you have enough:
- `tailwind.config.js` / `tailwind.config.ts` — colors, fonts, spacing (richest source)
- `src/styles/globals.css` or any root CSS file — look for `:root { }` CSS variable blocks
- `src/styles/theme.*`, `design-tokens.json`, `variables.css`
- Existing UI components — `src/components/ui/Button.*`, `Card.*`, `Badge.*` etc.
- `src/app/layout.tsx` or `src/pages/_app.tsx` — font loading, root classnames
- `package.json` — look for `@fontsource/*` packages or UI libraries

Read these files. Do not ask the user to describe their design system — go find it.

---

## Step 2: Extract the design system

From what you've read, document the following precisely. Use exact values, not descriptions.

**Colors** (pull hex/hsl values directly from config or CSS variables)
- Background(s): main page bg, card/surface bg, subtle section bg
- Brand / primary color
- Text: primary, muted/secondary
- Accent / highlight
- Border color
- Dark mode or light mode? Both?

**Typography**
- Heading font: exact name, weights used
- Body font: exact name, weights used
- Any monospace font?
- How are fonts loaded? (Tailwind config, `next/font`, `@fontsource`, Google Fonts link)

**Spacing & shape**
- Border-radius: what value is used on cards, buttons, inputs?
- Buttons: pill-shaped, rounded-rect, or sharp? Filled/outline/ghost style?
- Cards: border only, shadow only, or both?
- Layout max-width and section padding rhythm

**Tone** (read existing copy from the app — labels, empty states, onboarding text)
- Formal or casual?
- Technical or plain-language?
- Short/punchy or descriptive?

Write a one-paragraph design summary before moving on. Example:
> "Dark mode. Near-black bg (#0F0F12), zinc-800 surfaces. Brand: violet #7C3AED. Body: Inter 400/500, headings: Inter 700/800 tight tracking. 12px border-radius throughout, pill CTAs, subtle card borders. Copy tone: clean and direct, no fluff."

---

## Step 3: Understand what the project does

Read enough of the codebase to answer:
- What is this product? (POS system, SaaS tool, marketplace, etc.)
- Who uses it?
- What are the 3–5 core things it does?
- Is there a product name? A tagline anywhere?

Check: `README.md`, `package.json` name/description, any existing marketing strings in the code, route names, component names. Don't guess — read.

If you still can't tell what it does after looking, ask the user one question.

---

## Step 4: Restyle the landing page

Now open the landing page file and transform it. **Keep every section. Keep the layout structure. Change the design and the words.**

### Design changes
- Replace every color with the project's exact values
- Replace every font with the project's fonts, loaded the same way the project loads them
- Match border-radius, button shape, card style, shadow style to what the rest of the app uses
- Match spacing density — if the app is tight and dense, tighten the landing page; if it's airy, open it up
- Remove any decorative elements (gradients, illustrations, background shapes) that clash with the project's visual language; add ones that match it

### Copy changes
- Rewrite the headline and subheadline to describe what this product actually does
- Rewrite feature descriptions to match the real features you found in the codebase
- Rewrite CTAs to match the product's actual actions (e.g. "Start your shift", "Open the register", "Manage your store")
- Rewrite any testimonials or social proof to sound plausible for this type of product
- Remove any placeholder names, lorem ipsum, or copy that belongs to the template's original product

### Output format
- If the landing page is `.html` — keep it `.html`, use `<style>` with CSS variables matching the project
- If it's `.tsx`/`.jsx` — use Tailwind classes from the project's actual config, no arbitrary values
- Match whatever the landing page file already is; don't convert formats

Save the transformed file back to the same path (or ask if they want it saved elsewhere).

---

## Step 5: Report what you changed

After saving, give the user a short summary:
- The design values you pulled (colors, fonts, radius — the actual values)
- What copy you rewrote and why
- Anything you couldn't find and had to approximate (e.g. "couldn't find a heading font so used the body font at heavier weight")
- Any design inconsistencies you noticed in the project itself worth flagging

Keep it tight — 5–8 bullet points. The goal is to give them enough to evaluate the output and give precise feedback.