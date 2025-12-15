import { useEffect } from 'react'
import { GridStack } from 'gridstack'
import 'gridstack/dist/gridstack.min.css'

export default function App() {
  useEffect(() => {
    GridStack.init({
      column: 8,
      cellHeight: 80,
      float: true,
    })
  }, [])

  return (
    <div>
      <h2>HAADE UI Builder</h2>
      <div className="grid-stack">
        <div className="grid-stack-item" gs-x="0" gs-y="0" gs-w="2" gs-h="1">
          <div className="grid-stack-item-content">Widget</div>
        </div>
      </div>
    </div>
  )
}
