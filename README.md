# Sakshi Birthday Website

A premium multi-page static birthday website with a password gate, Home, Gallery, Messages, and Surprise pages.

## Open locally

Open `index.html` in a browser, or serve the folder with any static server.

Default password: `ask to sakshi`

## Customize

- Change the password in `scripts/config.js`.
- Replace photos in `assets/images/` and update the `image` paths inside `scripts/config.js`.
- Edit compliments, song names, credits, and external embed URLs in `scripts/config.js`.
- Do not place copyrighted songs in `assets/music/`; use legal embeds or credit links instead.

## Deploy

### GitHub Pages

1. Push this folder to a GitHub repository.
2. In repository settings, enable Pages.
3. Select the branch and root folder that contains `index.html`.

### Netlify

1. Drag this folder into Netlify Drop, or connect the repository.
2. Build command: leave empty.
3. Publish directory: the folder containing `index.html`.

### Vercel

1. Import the repository.
2. Framework preset: Other.
3. Build command: leave empty.
4. Output directory: leave empty or set to the folder containing `index.html`.
