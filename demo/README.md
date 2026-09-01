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

Parsing xref HTML (example)

- The demo includes a parser utility at `src/utils/xrefParser.js` which exposes `parseXrefFromHtml(htmlString)`.
- Example (browser console or component):

```js
fetch('/data/xref.html').then(r=>r.text()).then(html=>{
  const parsed = parseXrefFromHtml(html)
  console.log(parsed.tables, parsed.xrefs)
})
```

Slides

- A Reveal.js slide deck is available at `demo/slides/index.html` and served by Vite (open /slides/index.html in dev server).
