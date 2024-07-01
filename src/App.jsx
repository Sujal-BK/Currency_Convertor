import { useState } from 'react'

import './App.css'
import { CurrencyConvertor } from './CurrencyConvertor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='min-h-screen flex flex-col items-center  '>
        <div className='container'>
        <CurrencyConvertor/>
        </div>
      </div>
    </>
  )
}

export default App
