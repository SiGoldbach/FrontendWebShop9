import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../Pages/App.tsx'
import './index.css'
import {Navbar} from '../Components/navBar.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Navbar />
  </React.StrictMode>,
)
