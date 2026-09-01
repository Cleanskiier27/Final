import React from 'react'
import Viewer from './components/Viewer'
import ChartPanel from './components/ChartPanel'
import FilterPanel from './components/FilterPanel'
import ScatterMap from './components/ScatterMap'
import { sampleData } from './data/sampleData'
import { useMemo, useState } from 'react'

export default function App(){
  const categories = useMemo(()=> Array.from(new Set(sampleData.map(d=>d.category))), [])
  const [filters, setFilters] = useState({category: 'all', start: '2025-10-01', end: '2026-01-01'})
  const [selectedCategory, setSelectedCategory] = useState(null)

  const filtered = useMemo(()=>{
    return sampleData.filter(d=>{
      if(filters.category !== 'all' && d.category !== filters.category) return false
      if(filters.start && d.date < filters.start) return false
      if(filters.end && d.date > filters.end) return false
      if(selectedCategory && d.category !== selectedCategory) return false
      return true
    })
  }, [filters, selectedCategory])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="p-6 bg-white shadow">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold">SSD Master Dashboard — Demo</h1>
          <p className="text-sm text-gray-500">Demo: interactive charts, content viewer, slides. Replace data source with your xref HTML.</p>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2 bg-white p-4 rounded shadow">
          <ChartPanel data={filtered} onSelectCategory={setSelectedCategory} selectedCategory={selectedCategory} />
          <ScatterMap data={filtered} />
        </section>
        <aside className="bg-white p-4 rounded shadow">
          <FilterPanel filters={filters} setFilters={setFilters} categories={categories} />
          <Viewer />
        </aside>
      </main>
    </div>
  )
}
