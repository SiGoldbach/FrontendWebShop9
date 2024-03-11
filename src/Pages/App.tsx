import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom'
import LandingPage from './LandingPage.tsx'
import ShoppingCart from '../Components/ShoppingCart.tsx'
import { BasketItem, Price, ProductInfo, Basket } from '../TSReusedTypes/ItemsAndPrices.ts'
import { useState } from 'react'
import Forms from '../Components/forms.tsx'

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
          <nav>
            {/* Nav links */}
            <Link to="/">Store</Link> | <Link to="/cart">Shopping Cart </Link>
          </nav>

        {/* Define routes */}
        <Routes>
          <Route path="/" element={<LandingPage onAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<ShoppingCart basket={basket} setBasketItems={setBasketItems} />} />
          <Route path="/checkout" element={<Forms />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App