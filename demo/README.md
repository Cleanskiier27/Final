SSD Master Dashboard — Demo

This demo uses placeholder data and provides:

- A **Content Viewer** area where xref HTML will be rendered when provided
- **Interactive Charts** (Chart.js) with sample time series and top-N
- A starting point for adding a **Reveal.js** slide deck (slides/)

To run locally:

1. cd demo
2. npm install
3. npm run dev

To replace placeholder data:
- Copy your xref HTML into a file (e.g., `data/xref.html`) and update `src/components/Viewer.jsx` to fetch and render the HTML.
