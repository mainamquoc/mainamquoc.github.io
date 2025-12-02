# mainamquoc.github.io

This repository hosts the static assets for the band-themed site and a small collection of demos.

## Available pages

- **index.html** – the main single-page site for the band layout.
- **chart.html** – an interactive pie chart built with React and Recharts, rendered directly in the browser via CDN scripts.

## Running locally

No build step is required. To view the pages locally:

1. In this folder, start a small static server (Python example):
   ```bash
   python -m http.server 8000
   ```
2. Open your browser to the page you want to view:
   - Band site: <http://localhost:8000/index.html>
   - Interactive chart: <http://localhost:8000/chart.html>

You can also use any other static server (e.g., `npx serve`, `php -S 0.0.0.0:8000`, or your editor's live server extension).
