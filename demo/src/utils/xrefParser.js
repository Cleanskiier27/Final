// Small helper: parse tables and sections from xref HTML string using DOMParser
export function parseXrefFromHtml(htmlString){
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')

  // Extract all tables into arrays
  const tables = Array.from(doc.querySelectorAll('table')).map(table=>{
    const headers = Array.from(table.querySelectorAll('thead th')).map(th=>th.textContent.trim())
    const rows = Array.from(table.querySelectorAll('tbody tr')).map(tr=>Array.from(tr.querySelectorAll('td')).map(td=>td.textContent.trim()))
    return {headers, rows}
  })

  // Extract divs with class 'xref' or 'xref-contents'
  const xrefs = Array.from(doc.querySelectorAll('.xref, .xref-contents')).map(el=>el.innerHTML)

  return {tables, xrefs, title: doc.querySelector('title')?.textContent}
}
