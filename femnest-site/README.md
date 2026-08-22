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

## Editing fonts

Also in `css/styles.css`, same `:root` block:

```css
--font-heading: 'Poppins', 'Archivo', 'Montserrat', sans-serif;
--font-body: 'Lora', 'Bitter', Georgia, serif;
```

Right now the site uses **Poppins** (headings) and **Lora** (body) from Google Fonts, as stand-ins for the real brand fonts — **Archivo or Montserrat** (headings) and **Bitter** (body) — until those are licensed for web use.

To switch to the real fonts once they're ready:
1. Get web font files or a Google Fonts / Adobe Fonts link for Archivo/Montserrat and Bitter.
2. In every `.html` file's `<head>`, replace the Google Fonts `<link>` tags (the ones loading Poppins/Lora) with the new font's link or `@font-face` code.
3. In `css/styles.css`, change the two variables above to the real font names.

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
3. Add a new `<article class="event-card">` to `events.html`, matching the shape of the existing cards, linking to your new file.
4. Once the event has happened, you can either remove its card or change it to match the "past event" style (see the Galentine's Day card in `events.html` for the pattern: swap the badge to `event-card__badge--past`, drop the RSVP button, keep it as a short recap).

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
- **Logo**: the real FemNEST wordmark is now in use (see "Logo" section above) — this one's resolved. Only the browser favicon is still a placeholder, pending a square icon-only mark.
- **Fonts**: currently Poppins/Lora as Google Fonts stand-ins for Archivo/Montserrat + Bitter, pending web licensing. See "Editing fonts" above.
- **Statistics on the homepage ("Why now" section)**: these were re-verified via live search on 22 August 2026 before publishing, per the brief's instruction. Two figures from the original brief could **not** be re-confirmed against a current source and were replaced:
  - "Cyprus women retire with 38.2% less wealth than men" — no current source found for this exact figure. Replaced with the directly-sourced 2024 Eurostat figure: Cyprus's gender pension gap for 65+ is 29%.
  - "Europe: women hold 77% of the wealth men do" — this figure traces back to a global *pay* gap statistic (women earn ~77% of men's pay for equal work), not a wealth-gap figure; no wealth-specific source matched it. Replaced with the EU-wide 2024 Eurostat pension gap (24.5%) alongside the Cyprus figure.
  - The World Bank Global Findex figure (~700 million unbanked women) and the general shape of the gender pension gap claim both held up under re-verification and are used as-is, cited to Global Findex 2025 / Eurostat 2024.
  - **Action needed**: confirm whether the original 38.2% and 77% figures come from a specific report Serena has access to (in which case cite it properly and reinstate them) — otherwise the current Eurostat/World Bank figures are the honest, fundable-looking option that could be verified live.
