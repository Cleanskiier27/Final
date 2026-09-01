import React, {useRef, useEffect} from 'react'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default function ChartPanel({data = [], onSelectCategory, selectedCategory}){
  const canvasRef = useRef(null)

  useEffect(()=>{
    if(!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')

    // aggregate by month
    const labels = Array.from(new Set(data.map(d=>d.date))).sort()
    const cats = Array.from(new Set(data.map(d=>d.category))).sort()
    const datasets = cats.map((c,i)=>({
      label: c,
      data: labels.map(l => data.filter(d=>d.category===c && d.date===l).reduce((s,x)=>s+x.value,0)),
      borderColor: i===0? '#2563EB' : (i===1? '#F97316' : '#10B981'),
      tension: 0.3
    }))

    const chart = new Chart(ctx, {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive:true,
        plugins:{legend:{position:'top'}},
        onClick: (evt, elements)=>{
          if(elements && elements.length){
            const el = elements[0]
            const datasetIndex = el.datasetIndex
            const label = datasets[datasetIndex].label
            // toggle: clicking selects, clicking same again clears
            if(selectedCategory === label){
              onSelectCategory(null)
            }else{
              onSelectCategory(label)
            }
          }
        }
      }
    })

    return ()=>chart.destroy()
  }, [data])

  // Top-N bar
  const topN = data.reduce((acc, r)=>{ acc[r.category] = (acc[r.category]||0)+r.value; return acc }, {})
  const topList = Object.entries(topN).sort((a,b)=>b[1]-a[1]).slice(0,5)

  // Heatmap simple grid grouped by region
  const regions = Array.from(new Set(data.map(d=>d.region)))
  const regionAgg = regions.map(r=>({region:r, value: data.filter(d=>d.region===r).reduce((s,x)=>s+x.value,0)}))

  return (
    <div>
      <h2 className="text-lg font-medium mb-2">Interactive Charts</h2>
      <p className="text-sm text-gray-500">Click a line series to drill down by category (click again to clear)</p>
      <canvas ref={canvasRef} />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-3 rounded">
          <h4 className="font-medium">Top-N</h4>
          <ol className="list-decimal pl-5 mt-2">
            {topList.map(([k,v])=> <li key={k}>{k} — {v}</li>)}
          </ol>
        </div>
        <div className="bg-gray-50 p-3 rounded col-span-2">
          <h4 className="font-medium">Region heatmap (simple)</h4>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {regionAgg.map(r=> (
              <div key={r.region} className="p-2 rounded text-center" style={{background: `rgba(220,38,38, ${Math.min(0.9, r.value/30)})`}}>
                <div className="font-semibold">{r.region}</div>
                <div className="text-sm">{r.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
