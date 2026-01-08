import React, {useRef, useEffect} from 'react'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default function ScatterMap({data=[]}){
  const canvasRef = useRef(null)

  useEffect(()=>{
    if(!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')

    const dataset = data.map(d=>({x: d.lon, y: d.lat, r: Math.sqrt(d.value)*2, label: `${d.category} (${d.region})`}))

    const chart = new Chart(ctx, {
      type: 'bubble',
      data: {
        datasets: [{label: 'Geo points', data: dataset, backgroundColor: 'rgba(37,99,235,0.7)'}]
      },
      options: {
        scales:{x:{title:{display:true,text:'Longitude'}}, y:{title:{display:true,text:'Latitude'}}},
        plugins:{tooltip:{callbacks:{label: (ctx)=> ctx.raw.label}}}
      }
    })

    return ()=>chart.destroy()
  }, [data])

  return (
    <div className="mt-4">
      <h3 className="font-medium mb-2">Geo scatter (lat/lon)</h3>
      <canvas ref={canvasRef} />
    </div>
  )
}
