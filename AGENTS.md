# Repository Guidelines

## Project Structure & Module Organization
- Root HTML pages represent the landing page and service-specific pages (e.g., `index.html`, `lavado-por-kilo.html`, `lavado-de-edredones.html`).
- Global styles live in `css/style.css`; shared scripts are in `js/` (`script.js`, `coverage-map.js`, `social-share.js`).
- Images, logos, and marketing assets are in `assets/`; root-level icons and PWA metadata live alongside `manifest.json` and `browserconfig.xml`.
- SEO-related files include `sitemap.xml`, `robots.txt`, and `SEO-GUIDE.md`.
- `api/` is currently empty and not used by the site.

## Build, Test, and Development Commands
This is a static site with no build step.
- Serve locally: `python3 -m http.server 8080` (then open `http://localhost:8080`).
- If you need to preview a single page, open the HTML file in a browser, but the local server is preferred to validate asset paths.

## Coding Style & Naming Conventions
- Indentation: 4 spaces in HTML, CSS, and JavaScript (match existing formatting).
- Filenames: use lowercase with hyphens for new pages (e.g., `lavado-de-camisas.html`).
- CSS: prefer existing CSS variables in `:root` for colors, spacing, and fonts.
- JavaScript: keep DOM logic in `js/script.js` unless it is clearly a standalone feature.
- There is no formatter or linter configured—keep changes minimal and consistent.

## Testing Guidelines
- No automated tests or test framework are configured.
- Manual checks should include: page load, navigation links, responsive layout, and any updated SEO metadata.

## Commit & Pull Request Guidelines
- Commit messages in history are short, Spanish, and descriptive (e.g., “mejoras”, “pago con tarjeta 7”). Follow that concise style.
- PRs should include a brief summary, list of updated pages, and screenshots for visible UI changes.
- If SEO metadata or schema changes, call that out explicitly in the PR description.

## Configuration Tips
- `./.env.local` exists; only update it when adding local-only configuration and avoid committing secrets.
