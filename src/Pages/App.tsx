import {BrowserRouter as Router, Routes, Route, Link,} from 'react-router-dom'
import {  ProductInfo  } from '../TSReusedTypes/ReusedTypes.ts'
import { useEffect, useReducer, useState } from 'react'
import { getItems } from '../Networking/networking.ts'
//import {CheckoutPage} from "./Checkoutpage.tsx"

import LandingPage from './LandingPage.tsx'
import ShoppingCart from './ShoppingCart.tsx'
import CheckoutPage from "./checkoutPage.tsx";
import { basketReducer, calculateItemPrices, calculateTotalPrice } from '../State/BasketState.tsx'
import { BasketContext, BasketDispatchContext } from '../State/Basketcontext.ts'
import { ProductContext } from '../State/Productcontext.ts'
import { getBasket } from '../State/SessionStorage.ts'


function App():JSX.Element {
  const [productInfos, setProductInfos] = useState<ProductInfo[]>([])
  useEffect(() => {
    async function fetchData() {
        const data = await getItems();
        setProductInfos(data)
    }
    fetchData();
  }, []);

  const [state,dispatch]= useReducer(basketReducer,getBasket());
  state.priceList=calculateItemPrices(state.basketItems);
  state.totalPrice=calculateTotalPrice(state.priceList); 
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
                  </nav>
                </div>
              {/* Define routes */}
              <Routes>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/store" element={<LandingPage/>} />
                <Route path="/cart" element={<ShoppingCart/>} />
                <Route path="/checkout" element={<CheckoutPage />} />
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