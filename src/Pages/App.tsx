import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom'
import LandingPage from './LandingPage.tsx'
import ShoppingCart from './ShoppingCart.tsx'
import { BasketItem, Price, ProductInfo, Basket } from '../TSReusedTypes/ItemsAndPrices.ts'
import { useEffect, useState } from 'react'
import Adminpanel from './Adminpanel.tsx'
import { getItems } from '../Networking/networking.ts'
import {CheckoutPage} from "./Checkoutpage.tsx"

/**
 * 
 * @returns Puts three standard Items in the basket into an array with type BasketItem[]
 */

/**
 * 
 * @returns All items from the json file into an array with type ProductInfo[]
 */


function calculateItemPrices(basketItems: BasketItem[]) {
  const itemPrices: Price[] = []


  basketItems.forEach((item) => {
    if (item.quantity >= item.rebateQuantity) {
      const price: Price = {
        priceBeforeRebate: item.price * item.quantity,
        rebatePercentage: item.rebatePercent,
        priceAfterRebate: (item.price * item.quantity) - ((item.price * item.quantity) * (item.rebatePercent / 100))

      };
      itemPrices.push(price)

    } else {
      const price: Price = {
        priceBeforeRebate: item.price * item.quantity,
        rebatePercentage: item.rebatePercent,
        priceAfterRebate: (item.price * item.quantity)


      };
      itemPrices.push(price)

    }

  });
  return itemPrices;

}
function calculateTotalPrice(itemPrices: Price[]) {
  if (itemPrices.length===0){
    const totalPrice: Price = {
      priceBeforeRebate: 0,
      rebatePercentage: 0,
      priceAfterRebate: 0
  
    };
    return totalPrice
  }
  const staticTotalRebateInPercent: number = 10;
  const staticTotalRebateTreshold: number = 300;
  //Calculating price before rebate
  const totalBeforeRebate: number = itemPrices.reduce((acc, curr) => {
    return acc + curr.priceBeforeRebate;
  }, 0);
  //Calculating price with numbers rebate
  const totalAfterAmountRebate: number = itemPrices.reduce((acc, curr) => {
    return acc + curr.priceAfterRebate;
  }, 0);
  var priceAfterRebate = totalAfterAmountRebate;
  if (totalAfterAmountRebate >= staticTotalRebateTreshold) {
    priceAfterRebate -= priceAfterRebate / staticTotalRebateInPercent;
  };
  const totalPrice: Price = {
    priceBeforeRebate: totalBeforeRebate,
    rebatePercentage: staticTotalRebateInPercent,
    priceAfterRebate: priceAfterRebate

  };
  return totalPrice;
}


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

  const [basketItems, setBasketItems] = useState<BasketItem[]>([])
  const itemPrices: Price[] = calculateItemPrices(basketItems);
  const totalPrice: Price = calculateTotalPrice(itemPrices);
  const basket: Basket = {
    basketItems: basketItems,
    priceList: itemPrices,
    totalPrice: totalPrice
  }
  
  const handleAddToCart = (product: ProductInfo) => {
    const existingItem = basketItems.find(item => item.id === product.id);

    if (existingItem) {
      setBasketItems(basketItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setBasketItems([...basketItems, { ...product, quantity: 1 }]);
    }
  };

  

  return (
    
      <Router>
        <div >
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
          <Route path="/" element={<LandingPage onAddToCart={handleAddToCart} products={productInfos} />} />
          <Route path="/cart" element={<ShoppingCart basket={basket} setBasketItems={setBasketItems} />} />
          <Route path="/checkout" element={<CheckoutPage basket={basket} />} />
          <Route path="/admin" element={<Adminpanel />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App