import React, {useRef, useEffect} from 'react'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default function ChartPanel(){
  const canvasRef = useRef(null)

  useEffect(()=>{
    const ctx = canvasRef.current.getContext('2d')
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun'],
        datasets: [
          {label: 'Metric A', data: [12,19,8,22,17,24], borderColor: '#2563EB', tension: 0.3},
          {label: 'Metric B', data: [7,11,14,8,12,9], borderColor: '#F97316', tension: 0.3}
        ]
      },
      options: {responsive:true, plugins:{legend:{position:'top'}}}
    })
    return ()=>chart.destroy()
  }, [])

  return (
    <div>
      <h2 className="text-lg font-medium mb-2">Interactive Charts</h2>
      <canvas ref={canvasRef} />
      <div className="mt-4">
        <h3 className="font-medium">Top-N sample</h3>
        <ul className="list-disc pl-5">
          <li>Item 1 — 24</li>
          <li>Item 2 — 19</li>
          <li>Item 3 — 17</li>
        </ul>
      </div>
    </div>
  )
}
