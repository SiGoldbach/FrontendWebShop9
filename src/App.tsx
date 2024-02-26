import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom'
import LandingPage from './LandingPage.tsx'
import ShoppingCart from './ShoppingCart.tsx'
import { useState } from 'react'
function PutDefaultItemsInBasket(){
  const items: Item[] = []
  const item1: Item = {
      id: "vitamin-d-90-100",
      quantity: 2,
      giftWrap: true
  }
  const item2: Item = {
      id: "vitamin-c-500-250",
      quantity: 1,
      giftWrap: false
  }
  const item3: Item = {
      id: "vitamin-c-depot-500-250",
      quantity: 7,
      giftWrap: false
  }
  items.push(item1, item2, item3)
  const itemInfos: ItemInfo[] = []
  const iteminfo1:ItemInfo= {
      id: "vitamin-d-90-100",
      name: "D-vitamin",
      price: 116,
      currency: "DKK",
      rebateQuantity: 3,
      rebatePercent: 10,
      upsellProductId: "null"
  }
  const iteminfo2:ItemInfo= {
      id: "vitamin-c-500-250",
      name: "C-vitamin",
      price: 150,
      currency: "DKK",
      rebateQuantity: 2,
      rebatePercent: 25,
      upsellProductId: "vitamin-c-depot-500-250"
  }
  const iteminfo3:ItemInfo= {
      id: "vitamin-c-depot-500-250",
      name: "C-vitamin Depot",
      price: 175,
      currency: "DKK",
      rebateQuantity: 3,
      rebatePercent: 10,
      upsellProductId: "null"
  }
  itemInfos.push(iteminfo1,iteminfo2,iteminfo3);
  const completeItems: CompleteItem[] =[]
  for(let i=0;i<items.length;i++){
      const completeitem :CompleteItem={
          item:items[i],
          itemInfo:itemInfos[i]
          
      }
      completeItems.push(completeitem)

  }
  console.log("Items are getting returned")
  return completeItems

}
/* GPT generated */
function App() {

  const [completeItems, setCompleteItems] = useState(PutDefaultItemsInBasket())

  return (
    <Router>
      <div>
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
  itemInfo: ItemInfo;
  item: Item;
}
//Item fetched directly from server
interface ItemInfo {
  id: string;
  name: string;
  price: number;
  currency: string;
  rebateQuantity: number;
  rebatePercent: number;
  upsellProductId: string;
}
//Item given from as the customer to this page. 
interface Item {
  id: string;
  quantity: number;
  giftWrap: boolean;
}



export default App