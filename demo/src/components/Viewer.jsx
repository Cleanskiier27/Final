import React from 'react'

export default function Viewer(){
  return (
    <div>
      <h2 className="text-lg font-medium mb-2">Content Viewer</h2>
      <div className="prose max-w-none">
        <p>This will render extracted xref HTML content. For the demo we show placeholder content. Upload your file to replace this section.</p>
        <details>
          <summary>Sample Xref excerpt</summary>
          <pre className="text-xs bg-gray-100 p-2 rounded mt-2">&lt;div class="xref"&gt;...&lt;/div&gt;</pre>
        </details>
      </div>
    </div>
  )
}
