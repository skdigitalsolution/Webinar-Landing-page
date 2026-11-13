# Webinar-Landing-page

## Local development

Run `npm install` once, then `npm run dev`. Open the URL printed by Vite
(normally `http://localhost:5173/`). Vite serves the source `index.html` and
compiles React automatically.

## Preview the production build

Run `npm run build`, then `npm run preview`. Open the URL printed by Vite
(normally `http://localhost:4173/`).

Serve the contents of `dist` as the server root. Opening `dist/index.html`
through a server rooted at the project directory makes `/assets/...` requests
look in the wrong directory and causes JavaScript/CSS 404 errors. This workspace
configures VS Code Live Server to use `/dist` as its root; restart Live Server
after changing this setting, then open its root URL without `/dist/index.html`.

After rebuilding, reload the page to load the current generated asset filenames.
Do not edit generated files in `dist`; edit `src` and rebuild instead.
