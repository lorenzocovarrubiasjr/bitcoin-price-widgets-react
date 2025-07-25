import { useState } from 'react'
import './App.css'
import { BitcoinWidget } from './components/BitcoinWidget/BitcoinWidget'
import { BitcoinChip } from './components/BitcoinChip/BitcoinChip'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React Sample Testing App</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="navbar-container">
        <button>Test</button>
        <BitcoinChip />
      </div>

      <BitcoinWidget />
    </>
  )
}

export default App
