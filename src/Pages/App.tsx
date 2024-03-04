import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom'
import LandingPage from './LandingPage.tsx'
import ShoppingCart from '../Components/ShoppingCart.tsx'
import {BasketItem, ProductInfo} from '../TSReusedTypes/ItemsAndPrices.ts'
import { useState } from 'react'
import products from '../Data/product.json';

/**
 * 
 * @returns Puts three standard Items in the basket into an array with type BasketItem[]
 */
function PutBasketItemsInBasket(){
  const items: BasketItem[] = []
  const item1: BasketItem = {
      id: "vitamin-d-90-100",
      quantity: 2,
      giftWrap: true
  }
  const item2: BasketItem = {
      id: "vitamin-c-500-250",
      quantity: 1,
      giftWrap: false
  }
  const item3: BasketItem = {
      id: "vitamin-c-depot-500-250",
      quantity: 7,
      giftWrap: false
  }
  items.push(item1, item2, item3)
  return items;
}
/**
 * 
 * @returns All items from the json file into an array with type ProductInfo[]
 */
function insertItemInfos(){
  const iteminfos: ProductInfo[]=[];

  products.forEach((element) => {
    const itemInfo: ProductInfo = {
      id: element.id,
      name: element.name,
      description: element.description,
      weight: element.weight,
      price: element.price,
      currency: element.currency,
      rebatePercent:element.rebatePercent,
      rebateQuantity: element.rebateQuantity,
      upsellProductId: element.upsellProductId
    }
    iteminfos.push(itemInfo)
    
  });
  return iteminfos;
}


/* GPT generated */
function App() {
  const availibleProducts: ProductInfo[] = insertItemInfos();
  const [basketItems,setBasketItems] = useState(PutBasketItemsInBasket())
  const  basketid: string[] = basketItems.map((item)=>item.id);
  const selectedProducts: ProductInfo[] = availibleProducts.filter((item)=>{
    basketid.includes(item.id);
  });



  const [completeItems, setCompleteItems] = useState(PutDefaultItemsInBasket()) 


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
          <Route path="/cart" element={<ShoppingCart completeItems={completeItems} setCompleteItems={setCompleteItems}/>} />
        </Routes>
      </div>
    </Router>
  )
}
interface CompleteItem {
  itemInfo: ProductInfo;
  item: BasketItem;
}
//Item fetched directly from server

//Item given from as the customer to this page. 




export default App