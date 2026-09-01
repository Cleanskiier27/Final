import React from 'react'

export default function FilterPanel({filters, setFilters, categories}){
  const onCategoryChange = (e)=> setFilters({...filters, category: e.target.value})
  const onDateStart = (e)=> setFilters({...filters, start: e.target.value})
  const onDateEnd = (e)=> setFilters({...filters, end: e.target.value})

  return (
    <div className="mb-4">
      <h3 className="font-medium mb-2">Filters</h3>
      <div className="space-y-2">
        <div>
          <label className="block text-sm">Category</label>
          <select value={filters.category} onChange={onCategoryChange} className="mt-1 block w-full rounded border-gray-200 p-2">
            <option value="all">All</option>
            {categories.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm">Start</label>
          <input type="date" value={filters.start} onChange={onDateStart} className="mt-1 block w-full rounded border-gray-200 p-2" />
        </div>
        <div>
          <label className="block text-sm">End</label>
          <input type="date" value={filters.end} onChange={onDateEnd} className="mt-1 block w-full rounded border-gray-200 p-2" />
        </div>
      </div>
    </div>
  )
}
