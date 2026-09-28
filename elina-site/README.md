# Elina · Website

A simple five-page website. Plain HTML, CSS and a little JavaScript.
No framework, no build step, nothing to install.

## What is in the folder

| File | What it is |
|---|---|
| `index.html` | Home |
| `services.html` | How can I help |
| `csr.html` | CSR |
| `collabs.html` | Collabs |
| `contact.html` | Contact us |
| `styles.css` | All the design: colours, fonts, spacing |
| `main.js` | Mobile menu, sticky header, gentle scroll fade-in |
| `favicon.svg` | The small icon in the browser tab |
| `elina.jpg` | Photo used on the Home page |

## How to edit text

1. Open the page in any text editor (VS Code, TextEdit in plain-text mode, Notepad).
2. Find the words you want to change. All text is in the HTML files.
3. Change only the words between the tags. For example, in
   `<p>I reply within two working days.</p>` change only the sentence.
4. Save and refresh the page in your browser to check it.

Tips:

- Words wrapped in `<em>...</em>` show in italic, in the heading font. Use them for one or two emphasis words.
- The header and footer are repeated on every page. If you change a menu item or the email, change it on **all five pages**.
- Comments that look like `<!-- ... -->` are notes for you. They do not show on the site.
- House style: British English, and no em dashes. Use commas, full stops or colons.

## How to change colours or fonts

Open `styles.css`. The first block, `:root`, lists every colour.
Change a colour there and it updates everywhere.

`--terracotta` is the action colour. `--terracotta-ink` is a slightly deeper version
used for buttons and link text, so the text stays readable (WCAG AA contrast).

## How to swap in the real form ID

The Contact and Collabs forms use [Formspree](https://formspree.io), which emails you each message.

1. Create a free Formspree account and make a new form.
2. Copy the form ID. It looks like `abcdwxyz`.
3. In `contact.html` and `collabs.html`, find:
   `action="https://formspree.io/f/YOUR_FORM_ID"`
4. Replace `YOUR_FORM_ID` with your ID. Save.
5. Send yourself a test message from the live site and confirm it in Formspree.

You can use one form ID for both pages, or two separate ones.

## How to replace the email address

Search every file for `[Add email]` and replace it with the real address.
On links it appears twice on one line: `href="mailto:[Add email]">[Add email]`. Replace both.

## How to deploy on Netlify

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop) and log in (free).
2. Drag the whole `elina-site` folder onto the page.
3. Netlify gives you a live web address in a few seconds.
4. To update the site later: open your site in Netlify, go to **Deploys**, and drag the folder in again.
5. To use your own domain: **Domain management** in Netlify, then follow the steps.

Once the site has its final address, replace `[Add site URL]` in the `og:url` line
near the top of each page, and change `og:image` to the full address of the photo
(for example `https://yourdomain.com/elina.jpg`) so link previews show the picture.

## Placeholders still to fill in

| Placeholder | Where |
|---|---|
| `[Add email]` | Footer on all five pages, and the Direct details block on `contact.html` |
| `[Add LinkedIn]` and `[Add LinkedIn URL]` | `contact.html`, Direct details (optional, delete the line if not needed) |
| `YOUR_FORM_ID` | `contact.html` and `collabs.html` form `action` |
| `[Add testimonial]` | `index.html`, the "Why me" section |
| `[Add CSR project or photo]` | `csr.html`, the volunteer background section |
| `[Add partner]` (x6) | `collabs.html`, Trusted partners grid |
| `[Add site URL]` | `og:url` line in the head of all five pages |
| `og:image` full URL | Head of all five pages, once the site is live |
