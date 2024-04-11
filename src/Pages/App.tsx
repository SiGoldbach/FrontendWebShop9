import {BrowserRouter as Router, Routes, Route, Link,} from 'react-router-dom'
import {  ProductInfo  } from '../TSReusedTypes/ItemsAndPrices.ts'
import { useEffect, useReducer, useState } from 'react'
import { getItems } from '../Networking/networking.ts'
//import {CheckoutPage} from "./Checkoutpage.tsx"

import LandingPage from './LandingPage.tsx'
import ShoppingCart from './ShoppingCart.tsx'
import Adminpanel from './Adminpanel.tsx'
import CheckoutPage from "./checkoutPage.tsx";
import { basketReducer, createNewEmptyBasket } from '../State/BasketState.tsx'
import { BasketContext, BasketDispatchContext } from '../State/Basketcontext.ts'
import { ProductContext } from '../State/Productcontext.ts'



function App():JSX.Element {
  const [productInfos, setProductInfos] = useState<ProductInfo[]>([])
  useEffect(() => {
    async function fetchData() {
        const data = await getItems();
        setProductInfos(data)
    }
    fetchData();
}, []);

  const [state,dispatch]= useReducer(basketReducer,createNewEmptyBasket()); 
  return (
    
    /* router is gpt generated */
      <Router>
        <div className="page-container" >
          <BasketContext.Provider value={state}>
            <BasketDispatchContext.Provider value={dispatch}>
              <ProductContext.Provider value={productInfos}>
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
                <Route path="/" element={<LandingPage/>} />
                <Route path="/cart" element={<ShoppingCart/>} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/admin" element={<Adminpanel />} />
                <Route path="/bothForms" element={<CheckoutPage />} />
              </Routes>
              </ProductContext.Provider>
          </BasketDispatchContext.Provider>
        </BasketContext.Provider>
      </div>
    </Router>
  )
}

export default App