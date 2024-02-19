import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './ShoppingCart.tsx'
import ShoppingCart from './ShoppingCart.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <ShoppingCart/>
    </>
  )
}

export default App
