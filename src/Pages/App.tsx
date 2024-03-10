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
import products from '../Data/product.json';

/**
 * 
 * @returns Puts three standard Items in the basket into an array with type BasketItem[]
 */
function generateBasket(products: ProductInfo[]) {
  const items: BasketItem[] = []
  const item1: BasketItem = {
    quantity: 2,
    id: products[0].id,
    name: products[0].name,
    description: products[0].description,
    weight: products[0].weight,
    price: products[0].price,
    currency: products[0].currency,
    rebatePercent: products[0].rebatePercent,
    rebateQuantity: products[0].rebateQuantity,
    upsellProductId: products[0].upsellProductId
  };

  const item2: BasketItem = {
    quantity: 1,
    id: products[1].id,
    name: products[1].name,
    description: products[1].description,
    weight: products[1].weight,
    price: products[1].price,
    currency: products[1].currency,
    rebatePercent: products[1].rebatePercent,
    rebateQuantity: products[1].rebateQuantity,
    upsellProductId: products[1].upsellProductId
  };

  const item3: BasketItem = {
    quantity: 7,
    id: products[2].id,
    name: products[2].name,
    description: products[2].description,
    weight: products[2].weight,
    price: products[2].price,
    currency: products[2].currency,
    rebatePercent: products[2].rebatePercent,
    rebateQuantity: products[2].rebateQuantity,
    upsellProductId: products[2].upsellProductId
  };
  items.push(item1, item2, item3)
  return items;
}
/**
 * 
 * @returns All items from the json file into an array with type ProductInfo[]
 */
function getAvailibleProducts() {
  const iteminfos: ProductInfo[] = [];

  products.forEach((element) => {
    const itemInfo: ProductInfo = {
      id: element.id,
      name: element.name,
      description: element.description,
      weight: element.weight,
      price: element.price,
      currency: element.currency,
      rebatePercent: element.rebatePercent,
      rebateQuantity: element.rebateQuantity,
      upsellProductId: element.upsellProductId
    }
    iteminfos.push(itemInfo)

  });
  return iteminfos;
}

function calculateItemPrices(basketItems: BasketItem[]) {
  const itemPrices: Price[] = []


  basketItems.forEach((item) => {
    if (item.quantity >= item.rebateQuantity) {
      const price: Price = {
        priceBeforeRebate: item.price * item.quantity,
        rebatePercentage: item.rebatePercent,
        priceAfterRebate: (item.price * item.quantity) / item.rebatePercent

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
  const totalBeforeRebate: number = itemPrices.reduce((acc, curr) => {
    return acc + curr.priceBeforeRebate;
  }, 0);
  var priceAfterRebate = totalBeforeRebate;
  if (totalBeforeRebate >= staticTotalRebateTreshold) {
    priceAfterRebate -= priceAfterRebate/staticTotalRebateInPercent;
  };
  const totalPrice: Price = {
    priceBeforeRebate: totalBeforeRebate,
    rebatePercentage: staticTotalRebateInPercent,
    priceAfterRebate: priceAfterRebate

  };
  return totalPrice;
}


/* GPT generated */
function App() {
  const availibleProducts: ProductInfo[] = getAvailibleProducts();
  const [basketItems, setBasketItems] = useState(generateBasket(availibleProducts))
  const itemPrices: Price[] = calculateItemPrices(basketItems);
  const totalPrice: Price = calculateTotalPrice(itemPrices);
  const basket: Basket={
    basketItems: basketItems,
    priceList: itemPrices,
    totalPrice: totalPrice

  }






  return (
    <Router>
      <div >
        <nav>
          {/* Nav links */}
          <Link to="/">Home</Link> | <Link to="/cart">Shopping Cart</Link>
        </nav>

        {/* Define routes */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cart" element={<ShoppingCart basket={basket} setBasketItems={setBasketItems} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App