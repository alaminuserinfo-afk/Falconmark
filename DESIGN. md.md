# DESIGN.md: alamincore site spec (v1)

This file tells any AI assistant how to update this website. Read all of it before making changes.

## Working rules (read first)

1. Work on a git branch named `redesign-v1`. Never push to `main`. Push only the branch.
2. Change one thing at a time. After each task, list the files you changed.
3. Never invent statistics, client names, logos, testimonials, certificates, case studies or years of experience. If content is missing, keep the section hidden and say so.
4. Do not add tracking IDs, webhook URLs, phone numbers or social links that were not given to you.
5. Keep the stack: static HTML, CSS and JavaScript (index.html, style.css, script.js). No framework, no build step.
6. Do not rename or delete existing files unless the task says so.
7. Any text written as [EDIT: ...] in this file must NOT appear on the website. Leave that part out until the user provides it.

## Purpose and voice

- The site has one job: get a visitor to request a free audit.
- Audience: owners and marketing leads of small and mid-size businesses abroad who run, or plan to run, Google and Meta ads.
- Voice: first person ('I'), brand name alamincore. Never mix 'I' and 'we'. Plain verbs, sentence case, no hype words.
- The call to action always reads 'Request a free audit'. The confirmation page heading is 'Audit requested'.

## Colors: Spruce and Brass

Put these in `:root` in style.css and use only the variables. No hardcoded colors anywhere else.

```css
:root {
  --spruce-900: #082421;
  --spruce-800: #0E3A33;
  --spruce-700: #1B524A;
  --chalk-50: #F2F5F0;
  --chalk-100: #E4EBE5;
  --white: #FFFFFF;
  --line: #C9D4CC;
  --ink-900: #0F1F1B;
  --ink-600: #4A5B55;
  --on-dark: #F2F5F0;
  --on-dark-muted: #A9BDB6;
  --brass-300: #DDBB72;
  --brass-400: #D2AC5C;
  --brass-700: #7E5F16;
  --error: #B3261E;
  --font-display: 'Bricolage Grotesque', 'Helvetica Neue', Arial, sans-serif;
  --font-text: 'Newsreader', Georgia, serif;
  --radius-sm: 6px;
  --radius-md: 12px;
  --container: 1180px;
}
```

Usage:

- Dark sections (hero, final CTA, footer) use Spruce 800 or 900 with On dark text. Light sections use Chalk 50 and Chalk 100, alternating among the visible sections, with Ink 900 text.
- Brass is the only accent. Brass 400 only on dark backgrounds. On light backgrounds use Brass 700 for links, icons and focus rings.
- Muted text: Ink 600 on light, On dark muted on dark.
- Inputs have a 1px Ink 600 border. `--line` is for hairline dividers only.
- No gradients, glows, colored shadows or decorative overlays. Flat color blocks and hairlines only.
- Contrast already checked: Ink 900 on Chalk 50 15.5:1; Ink 600 on Chalk 50 6.5:1; On dark on Spruce 800 11.4:1; Brass 400 on Spruce 800 5.9:1; Spruce 900 on Brass 400 7.6:1; Brass 700 on Chalk 50 5.4:1.

## Typography

Add to the `<head>` of every page:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700&family=Newsreader:wght@400&display=swap">
```

- Headings and UI text (nav, buttons, labels): Bricolage Grotesque. Headings 700, UI 600. Letter-spacing -0.02em on h1 and h2.
- Paragraphs: Newsreader 400, 18px, line-height 1.65, `max-width: 68ch`.
- Scale: h1 `clamp(2.5rem, 5.5vw, 4.5rem)` / 1.04; h2 `clamp(1.75rem, 3.5vw, 2.75rem)` / 1.1; h3 1.375rem / 1.25; small 0.875rem; UI 0.9375rem.
- Sentence case everywhere. No ALL-CAPS labels, no small label above every heading, no single word colored or italic inside a headline.
- Use `font-variant-numeric: tabular-nums` on any numbers.

## Layout and components

- `.container`: max-width 1180px, side padding 24px (20px under 640px).
- All text is left-aligned, including the hero and the final call to action.
- Section padding: 120px top and bottom on desktop, 72px under 768px. Spacing in multiples of 8px.
- Radius: 6px for buttons and inputs; 12px for panels, the ad unit and photos.
- Breakpoints 640, 768, 1024, 1280. It must work at 375px wide with no horizontal scroll.
- Primary button on dark: Brass 400 background, Spruce 900 text, hover Brass 300. On light: Spruce 800 background, Chalk 50 text, hover Spruce 700. Secondary button: 1px border in the surface's text color. Height 48px, padding 0 24px, label weight 600, sentence case, no arrow characters.
- Focus: 2px outline with 2px offset. Brass 700 on light, Brass 400 on dark. Never remove focus outlines. Text links are underlined.
- Inputs: white background, 1px Ink 600 border, height 48px, a visible label above every field (never placeholder-only). Error messages say what to fix, for example 'Enter a website address such as example.com'.
- Icons: inline SVG, 1.5px stroke, 24px. No emoji icons anywhere.
- Header: 72px; transparent over the hero, solid Spruce 900 after scrolling; text wordmark 'alamincore' with no logo badge.
- Services: three full-width rows separated by `--line` hairlines, each row = name | one-sentence outcome | deliverables list. Stacked on mobile. Not three identical cards. No icons, no button on each row.
- FAQ: native `<details><summary>`.
- Footer: Spruce 900, link columns, stacked on mobile.

## Motion and imagery

- Remove the existing particle animation, the `reveal` and `stagger-children` effects, and all animated counters.
- One load sequence only: hero text, then the ad unit, fade in. 900 ms total, once.
- Everything else moves only in response to the user (accordion open, button press, form success).
- Respect `prefers-reduced-motion`: disable all animation.
- Remove stock background images (hero-bg.jpg, about-bg.jpg) from sections; use flat colors. Do not delete the files yet.
- Founder photo (profile.jpg): 4:5 crop, no filters, radius 12px. Every image gets width, height and descriptive alt text.

## Home page (index.html): section order

Use `hidden` on sections marked HIDDEN, add `[hidden] { display: none !important; }` to style.css, and do not link hidden sections in the navigation.

1. Header: wordmark, links to Services, About, FAQ (only for visible sections), button 'Request a free audit'. Until audit.html exists, point every call to action at `#contact`.
2. Hero (Spruce 800).
   - H1: Google and Meta ads, tracked end to end.
   - Paragraph: I build and run Google Ads and Meta Ads campaigns, set up the conversion tracking behind them, and automate how new leads are followed up.
   - Primary button 'Request a free audit'. Add a 'Message me on WhatsApp' text link only when the user provides the number.
   - Ad unit on the right (stacked below the text on mobile): a white panel, radius 12, 24px padding, flat. It imitates the structure of a search ad written for alamincore: the word Sponsored, the site address, the headline 'Google & Meta Ads Specialist | Free Ad Account Audit' (Bricolage 600, 22px, Spruce 800), the description 'Campaign setup, conversion tracking and lead follow-up automation. Request a free audit.' (Newsreader 16px, Ink 600) and three links 'Services', 'How it works', 'FAQ' in Brass 700. No Google logo and no Google brand colors.
3. Tools: one plain text line, no logos: 'Google Ads, Meta Ads Manager, Google Analytics 4, n8n.' The user must confirm this list.
4. Services: three rows.
   - Google Ads. Campaigns built around searches that already show buying intent. Search and Shopping campaigns; Performance Max and Display; conversion tracking and analytics; keyword research and bid strategy.
   - Meta Ads. Facebook and Instagram campaigns with tested creative and retargeting for people who already visited. Lookalike and custom audiences; A/B creative testing; retargeting and funnel optimization; Instagram and Messenger ads.
   - Automation. Lead capture, follow-up and CRM updates connected, so no inquiry waits for a manual reply. CRM and email automations; lead scoring and nurture sequences; custom API and webhook workflows; n8n workflow automation.
5. Work: HIDDEN. Empty section only.
6. Process: four numbered steps (this is a real sequence).
   1. Audit: review the ad account, website and tracking; list what wastes spend or loses leads.
   2. Plan: agree goals, budget split, campaign structure and the tracking plan.
   3. Launch and test: go live small, test, cut what does not work.
   4. Report and adjust: monthly report with spend, leads and cost per lead; decide what to scale.
7. Results: HIDDEN. Empty section only. (The old counters 150+, 97%, 3x, 12+ are deleted and never come back unless they are real and the user provides them.)
8. About: photo plus the existing About text, rewritten in first person. Delete the lines about 'established enterprises' and 'diverse industries'. Keep the years figure only as the user states it.
9. Testimonials: HIDDEN. Empty section only.
10. FAQ: HIDDEN until the user supplies the answers. Questions: What does the free audit include, and how long does it take? What ad budget do I need to start? Which countries and industries do you work with? How, and how often, do you report results? Who owns the ad accounts and the data? How do you charge?
11. Final call to action (Spruce 800): 'Send me your website and ad account details. I will reply with what to fix first.' plus the button.
12. Contact: keep the existing contact details and form until audit.html exists.
13. Footer (Spruce 900): wordmark, links to visible sections, email, real social links only. Remove every link whose href is `#` (Privacy Policy, Terms of Service, social icons) until the real pages or URLs exist.

## Later tasks (only when the user asks)

- Create audit.html (the only form), thank-you.html, privacy.html, terms.html, 404.html. Set `"cleanUrls": true` in vercel.json so the pages open as /audit, /thank-you and so on.
- audit.html: headline 'Request a free audit'. Fields: name, email, website URL, what to look at (Google Ads / Meta Ads / lead follow-up and automation / not sure), monthly ad budget (range), goal, WhatsApp (optional), plus a hidden honeypot field. Send the form to a webhook URL stored in one constant at the top of script.js (`AUDIT_WEBHOOK_URL`). While the constant is empty, show a clear error message and send nothing.
- thank-you.html: heading 'Audit requested', then what happens next. Fire the conversion events (GA4 `generate_lead`, Meta `Lead`) on this page only, and only after the user provides the IDs.
- Meta tags per page: title up to 60 characters, description up to 155, og:image 1200x630, favicon, sitemap.xml and robots.txt that leave hidden pages out.

## Never do

Gradients, glows, emoji icons, ALL-CAPS labels, small labels above headings, arrows on buttons, identical rounded cards, scroll-reveal animations, hover lift on cards, animated counters, particles, stock photos, invented numbers or claims, placeholder `#` links, text in [EDIT: ...] form on the live page.

## Before you finish any task

- Search style.css for hex colors outside `:root`; there should be none.
- Search all HTML for 'EDIT' and for `href="#"`; there should be none.
- Check the page at 375px width.
- List the changed files and confirm that nothing was pushed to `main`.
