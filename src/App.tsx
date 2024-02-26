import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import LandingPage from './LandingPage.tsx'
import ShoppingCart from './ShoppingCart.tsx'

/* GPT generated */
function App() {

  return (
    <Router>
      <div className='container'>
        <nav>
          {/* Nav links */}
            <Link to="/">Home</Link> | <Link to="/cart">Cart</Link>
        </nav>

        {/* Define routes */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cart" element={<ShoppingCart />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App