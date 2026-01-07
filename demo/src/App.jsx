import React from 'react'
import Viewer from './components/Viewer'
import ChartPanel from './components/ChartPanel'

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="p-6 bg-white shadow">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold">SSD Master Dashboard — Demo</h1>
          <p className="text-sm text-gray-500">Placeholder demo: replace data source with your xref HTML</p>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="md:col-span-2 bg-white p-4 rounded shadow">
          <ChartPanel />
        </section>
        <aside className="bg-white p-4 rounded shadow">
          <Viewer />
        </aside>
      </main>
    </div>
  )
}
