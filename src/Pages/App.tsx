import {BrowserRouter as Router, Routes, Route, Link,} from 'react-router-dom'
import {  ProductInfo  } from '../TSReusedTypes/ItemsAndPrices.ts'
import { useEffect, useReducer, useState } from 'react'
import { getItems } from '../Networking/networking.ts'
//import {CheckoutPage} from "./Checkoutpage.tsx"

import LandingPage from './LandingPage.tsx'
import ShoppingCart from './ShoppingCart.tsx'
import Adminpanel from './Adminpanel.tsx'
import BothForms from "../Components/bothForms.tsx";
import { basketReducer, creasteNewEmptyBasket } from '../State/BasketState.tsx'
import { BasketContext, BasketDispatchContext } from '../State/Basketcontext.ts'


/* GPT generated */
function App():JSX.Element {
  const [productInfos, setProductInfos] = useState<ProductInfo[]>([])
  useEffect(() => {
    async function fetchData() {
        const data = await getItems();
        setProductInfos(data)
    }
    fetchData();
}, []);

  const [state,dispatch]= useReducer(basketReducer,creasteNewEmptyBasket()); 
  return (
    
      <Router>
        <div >
          <BasketContext.Provider value={state}>
            <BasketDispatchContext.Provider value={dispatch}>
              <div className="navContainer">
                <nav>
                  {/* Nav links */}
                  <Link to="/" className="navLink">Store</Link>
                  <Link to="/cart" className="navLink">Shopping Cart </Link>
                  <Link to="/admin" className="navLink">Admin Panel </Link>
                </nav>
              </div>
            {/* Define routes */}
            <Routes>
              <Route path="/" element={<LandingPage products={productInfos} />} />
              <Route path="/cart" element={<ShoppingCart/>} />
              <Route path="/checkout" element={<BothForms />} />
              <Route path="/admin" element={<Adminpanel />} />
              <Route path="/bothForms" element={<BothForms />} />
            </Routes>
          </BasketDispatchContext.Provider>
        </BasketContext.Provider>
      </div>
    </Router>
  )
}

export default App