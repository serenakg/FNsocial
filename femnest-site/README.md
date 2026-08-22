# FemNEST website

Static marketing site — plain HTML/CSS/JS, no build step, no framework. Two jobs: grow the waitlist, promote **Femmes, Finances & Freedom**.

## File structure

```
/femnest-site
  index.html                          Home page
  waitlist.html                       Waitlist page
  events.html                         Events listing (add new event cards here)
  event.html                          TEMPLATE — duplicate this per event, don't publish it directly
  event-femmes-finances-freedom.html  Live event page for the flagship event
  /assets
    logo.svg                          Small placeholder icon — used only as the browser favicon for now
    /logos                            Real FemNEST wordmark, in every brand color + layout
    /images                           Drop event/story photos here
  /css
    styles.css                        All styling, brand colors as CSS variables at the top
  /js
    main.js                           Mobile nav, footer year, form handling
  README.md                           This file
```

Open any `.html` file directly in a browser to preview — no server or build step required.

## Editing colors

Open `css/styles.css`, look at the top for the `:root { ... }` block. The five brand colors are there as CSS custom properties:

```css
--color-blue: #295df6;
--color-orange: #ec6a2c;
--color-lavender: #f2cdfc;
--color-green: #deea9e;
--color-cream: #eee7ce;
```

Change a value there and it updates everywhere on the site automatically. Don't change these without checking with Serena first — they're confirmed brand colors, not placeholders.

Green (`--color-green`) is the site's base background color (page background, sticky header, mobile nav dropdown) — cream was used for these originally but was swapped out at Serena's request. Cream is now only used as a text/accent color on the blue sections (footer text, the "What women keep telling us" section), not as a background.

## Editing fonts

Also in `css/styles.css`, same `:root` block:

```css
--font-heading: 'Archivo', 'Montserrat', sans-serif;
--font-body: 'Bitter', Georgia, serif;
```

These are the real confirmed brand fonts — **Archivo** (headings) and **Bitter** (body) — loaded from Google Fonts via the `<link>` tag in every page's `<head>`. (An earlier version of this site used Poppins/Lora as placeholders before the brand fonts were confirmed for web use — that's resolved now.)

To change either font later:
1. Get a Google Fonts / Adobe Fonts link (or `@font-face` files) for the new font.
2. In every `.html` file's `<head>`, replace the Google Fonts `<link>` tag with the new one.
3. In `css/styles.css`, update the two variables above to the new font name(s).

That's the only place font names are referenced — everything else uses `var(--font-heading)` / `var(--font-body)`.

## Logo

The real FemNEST wordmark is in `assets/logos/`, in both layouts and all four brand colors it was supplied in:

- **Horizontal** (wide, single line — used in the site header and footer): `femnest-logo-horizontal-{blue,lavender,orange,white-outline}.png`
- **Stacked** (taller, "Fem" over "NEST" with the wave mark — not currently used on the site, but handy for square placements like social profile pictures or an OG/share image): `femnest-logo-stacked-{blue,lavender,orange,cream}.png`

Currently in use:
- **Header nav**: `femnest-logo-horizontal-blue.png`
- **Footer** (dark background): `femnest-logo-horizontal-white-outline.png`, which reads clearly against the dark footer.
- **Favicon**: still the small placeholder mark at `assets/logo.svg` — none of the supplied files is a square icon-only mark, so the favicon hasn't been swapped yet. If a square icon version of the wave mark gets made, drop it in as `assets/logo.svg` (or update the `<link rel="icon">` tag in each page's `<head>` to point at a new file).

To swap which color/layout shows where, just change the `<img src="...">` path in the header (`<a class="nav__brand">` block) or footer (`<p class="footer-brand">` block) of each HTML file — sizing is controlled by `.nav__brand img` / `.footer-brand img` in `css/styles.css`, so a different file at a different native size will still scale correctly.

## Editing copy

Every page is a single self-contained `.html` file with plain text and HTML tags — no templating, no CMS. Open the file, find the text, edit it, save. Section boundaries are marked with HTML comments like `<!-- ================= HERO ================= -->` to make it easy to find your place.

## Waitlist: current setup and how to change it

**Current default: linking out to the existing live waitlist at [campsite.bio/femnest](https://campsite.bio/femnest)**, which already has 50+ people on it. This was the default called for in the brief ("no reason to run two waitlists in parallel") since no explicit instruction was given to replace it. This shows up as a "Join the Waitlist" button on the home page and on `waitlist.html` that opens campsite.bio/femnest in a new tab.

**To confirm:** check with Serena whether this should stay as-is, or whether the native form (commented out in `waitlist.html`) should replace it.

**If you decide to switch to a native form on this site instead:**
1. Pick a form service — [Formspree](https://formspree.io), a Google Form, or Mailchimp's embeddable form all work with no backend.
2. Create the form there and copy the endpoint URL it gives you.
3. In `waitlist.html`, delete the `.external-waitlist` block and un-comment the native form block right below it (marked `NATIVE FORM ALTERNATIVE` in the file).
4. Replace `REPLACE_WITH_REAL_ENDPOINT` in the form's `action` attribute with your real endpoint.
5. Do the same on `index.html`'s waitlist section, and on the event page(s) if you want RSVPs to go to the same place.
6. In `js/main.js`, the `initNativeForms()` function currently only shows an inline "you're in" confirmation — it doesn't send data anywhere by itself. If your form service needs JS (Formspree's plain `<form action>` doesn't, most others don't either), follow the `TODO` comment in that function.

## Adding a new event

1. Duplicate `event.html` (the template) and rename it, e.g. `event-spring-mixer.html`. Don't duplicate `event-femmes-finances-freedom.html` — that one already has real content baked in.
2. Fill in every `[PLACEHOLDER]` in the new file: event name, date/time, location (mark as "to be announced" if not confirmed — don't invent a venue), description, what-to-expect, and the RSVP button text/link.
3. Add a new `<article class="event-card">` to `events.html`, matching the shape of the existing cards. Each card is a "ticket stub": a `.ticket-date` block (month + day, shown as the colored square on the left) followed by `.event-card__body` with the rest of the details. Set `data-reveal` on the `<article>` too, so it fades in on scroll like the others.
4. Once the event has happened, either remove its card or change it to a "past event" recap: swap the badge to `event-card__badge--past`, drop the RSVP button, keep the copy as a short recap. The `.ticket-date` block automatically turns grey instead of orange for any card that isn't `.event-card--featured`, so a past-event card gets that muted look for free. (The Galentine's Day launch card that used to demonstrate this was removed from `events.html` at Serena's request — recreate one in this shape if a past-event example is needed again.)

## Visual design system

The site follows a "contemporary fintech meets lifestyle brand" direction — think confident color, soft depth, a little playful motion — built entirely from the five brand colors plus CSS, no extra images:

- **Blobs**: large blurred circles (`.blob`, colored `.blob--blue` / `.blob--orange` / `.blob--green`) placed behind hero-style sections for a soft gradient-mesh backdrop. Add a couple of `<div class="blob blob--COLOR" aria-hidden="true"></div>` as the first children of any section with `position: relative; overflow: hidden` to reuse this.
- **Tilted sections**: `.section--tilt` (used on "Why now" and "Community first") clips the section into a diagonal band instead of a flat rectangle, for visual rhythm between sections.
- **Scroll reveal**: any element with the `data-reveal` attribute fades/slides in as it scrolls into view (handled by `initScrollReveal()` in `js/main.js`, respects `prefers-reduced-motion`). Add the attribute to a section header, card, or block to include it.
- **Gradient text / stat numbers**: `.text-gradient` and `.stat-card__number` render text with a blue-to-orange gradient fill (`background-clip: text`) instead of a flat color, for a punchier "big number" feel.
- **Highlight squiggle**: wrap a key phrase in `<span class="highlight">...</span>` to underline it with a soft orange marker-style highlight (used in the hero headline).
- **Avatar stack**: `.avatar-stack` with a few `.avatar-stack__item` spans (colored circles with initials) — a "social proof" row with no real photos needed, used in the hero.
- **Ticket-stub event cards**: see "Adding a new event" above.
- **Count-up stat numbers**: each `.stat-card__number` carries a `data-value` attribute holding its real value (e.g. `data-value="29%"`). `animateStatNumber()` in `js/main.js` counts it up from 0 the moment its card scrolls into view. The visible text in the HTML is already the correct final value, so nothing breaks with JS disabled or under `prefers-reduced-motion` (which skips the animation outright).
- **Parallax blobs**: `initParallax()` in `js/main.js` gives the `.blob` decorations a light vertical drift on scroll. Skipped under `prefers-reduced-motion`.
- **Community voices marquee**: see "Community voices" below.

All of this is additive CSS/JS — no build step, same file structure as before.

## Photography & imagery

- **Founder photo**: real photo in place. `assets/images/serena-gasparini.jpg` is a cropped/resized (440×550, ~4:5) version of the photo Serena supplied, shown via `.founder-panel__photo` in the "Why FemNEST exists" section (redesigned into a lavender panel with photo + caption on one side, kicker/quote/body copy on the other — see `.founder-panel` in `css/styles.css`). Crop is framed on her upper body/face rather than the full original environmental shot, so she reads clearly at the card's display size (~260px wide).
  - **To swap in a different photo later**: replace `assets/images/serena-gasparini.jpg` with the new file (same name, or update the `src` in `index.html`), ideally pre-cropped to roughly 4:5 and no wider than ~900px — no build step exists to resize images automatically.
  - There's no "photo coming soon" placeholder pattern in the CSS anymore (it was removed once the real photo landed) — if a future photo slot needs one before an image exists, look at how `.founder-panel__photo` is styled and build a similar placeholder box from scratch.

(An earlier version of this homepage also had an abstract SVG hero illustration next to the headline — removed at Serena's request. The hero is text/gradient-blobs only now.)

- **Community gallery**: real photos from FemNEST's launch event now live in `assets/images/event/`, shown in a `.community-gallery` grid in the "Community first" section of `index.html`. Serena supplied 16 photos from the event; 6 were selected for variety (a candid conversation, an embrace, a panel moment, the room applauding, a quieter reflection moment, and Serena speaking) rather than using all of them, each resized to a 1200px-max-dimension JPEG. The grid uses `object-fit: cover` on a fixed aspect ratio, so any new photo added the same way will slot in cleanly regardless of its original orientation.
  - **To add or swap a gallery photo**: drop a resized JPEG (long edge ~1200px keeps file size reasonable — there's no build step to do this automatically) into `assets/images/event/`, then add or edit an `<img>` line inside `.community-gallery` in `index.html`. Write real, specific alt text for each (what's happening in the shot), not a generic placeholder.
  - Only photos of people who were visibly comfortable being photographed at a public event were used; none show private information beyond a visible first-name badge. If any attendee ever asks for a photo to come down, remove that `<img>` line and its file.

## Community voices

The "What women keep telling us" section (blue band, between the photo gallery and the waitlist CTA) is a two-row scrolling marquee of ten real, anonymized quotes pulled from FemNEST's community research (survey/feedback responses). They are deliberately **not** presented as attributed customer testimonials — there's no name, avatar, or "member since" line attached to any of them, because we don't have permission to publish identifying information alongside them. They're framed honestly as proof of the gap FemNEST addresses, not endorsements.

**How it works**: two `.voices-track` rows scroll in opposite directions via a pure-CSS animation (`js` isn't involved at all). Each row's content is duplicated back-to-back (`.voices-track__set`, the second copy marked `aria-hidden="true"`) so the loop is seamless at exactly -50% translation — if you add or remove a quote, update **both** copies in that row identically, or the loop will jump. Hovering a row pauses it (so it's readable), and the whole thing collapses to a static, non-scrolling wrapped list under `prefers-reduced-motion` (see the media query near the bottom of `css/styles.css`) — no JS needed for that either.

Within each quote, one key phrase is wrapped in `<span class="highlight">...</span>` — the same soft-marker highlight used in the hero headline — as a lightweight visual "highlight of words" rather than styling the whole sentence.

**To add, edit, or remove a quote**:
1. Find the matching `.voice-pill` paragraph in **both** `.voices-track__set` copies within the same `.voices-track` (the visible one and the `aria-hidden="true"` duplicate right after it).
2. Edit, add, or delete the `<p class="voice-pill">` line in both places identically.
3. Keep quotes real and anonymized — don't invent one, and don't attach a name/photo to one unless that person has explicitly agreed to be identified.
4. If a quote runs long, it's fine to trim it down to its punchiest sentence or clause (as was done for several of the ten currently live) as long as the trimmed version doesn't change its meaning — treat it like a pull-quote, not a paraphrase.

## Deploying

This is a static site — any of these work with zero configuration:

- **Netlify**: drag-and-drop the `femnest-site` folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or connect the Git repo and set the publish directory to `femnest-site`.
- **Vercel**: `vercel` CLI from inside `femnest-site`, or import the repo and set the root directory to `femnest-site`.
- **GitHub Pages**: push this folder to a repo and enable Pages, pointing at the branch/folder containing `index.html`.

No build command is needed — there's nothing to compile.

## Open items — flagged, not guessed

These were deliberately left as placeholders or defaults rather than invented. Confirm with Serena before treating any of them as final:

- **Waitlist tool**: defaulted to linking out to campsite.bio/femnest (see "Waitlist" section above). Confirm this is right, or switch to a native form.
- **Venue for Femmes, Finances & Freedom (31 Oct 2026)**: not yet booked — shown honestly as "Venue: to be announced" on `events.html` and the event page. Update once confirmed.
- **Founder photo**: real photo now in place (see "Photography & imagery" above) — resolved.
- **Community voices**: real, anonymized quotes now in place (see "Community voices" above) — resolved. No names/photos are attached to them by design.
- **Logo**: the real FemNEST wordmark is now in use (see "Logo" section above) — this one's resolved. Only the browser favicon is still a placeholder, pending a square icon-only mark.
- **Fonts**: real brand fonts (Archivo/Bitter) now live via Google Fonts — resolved. See "Editing fonts" above.
- **Statistics on the homepage ("Why now" section)**: re-verified via live search on 22 August 2026 before publishing, per the brief's instruction — now resolved to four confirmed, cited figures:
  - **"Europe: women hold 77% of the wealth men do"** — CONFIRMED. Traced to WTW (Willis Towers Watson)'s 2022 Global Gender Wealth Equity Report, produced with the World Economic Forum: the average Wealth Equity Index across the 14 European countries studied is 0.77 (women on track to accumulate 77% of men's wealth by retirement). Reinstated on the site with this citation.
  - **"Cyprus women retire with 38.2% less wealth than men"** — traced, but NOT a Cyprus statistic. The 38.2% figure appears to originate from unrelated US research (UC Berkeley Labor Center: 38.2% of *private pension wealth* in the US is held by women — a different metric, for a different country). No Cyprus-specific source produced this number at any point during verification; it looks like a mix-up in an earlier draft. Replaced on the site with Cyprus's own real, current, and more striking figure: a 29% gender pension gap for 65+ (Eurostat, 2024) — worse than the 24.5% EU average, which is also shown alongside it for contrast.
  - The World Bank Global Findex figure (~700 million unbanked women) held up under re-verification and is used as-is, cited to Global Findex 2025.
  - **No further action needed** on these four — all are now live-sourced and cited on the page itself.
