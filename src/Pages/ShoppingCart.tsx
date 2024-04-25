import '../Pages/index.css'
import DisplayItem from "../Components/displayItem.js";
import { useNavigate } from 'react-router-dom';
import { useBasketContext } from '../State/Basketcontext.js';
import { useEffect } from 'react';
import { storeBasketInSession } from '../State/SessionStorage.js';




function ShoppingCart() {

  const basket = useBasketContext();
  const navigate = useNavigate();
  
  useEffect(()=>{
    function handeReloadPage(){
      console.log("Logging to session storage");
      storeBasketInSession(basket);
    }
    window.addEventListener("beforeunload",handeReloadPage);

    return ()=>{
      console.log("Removing event listener");
      window.removeEventListener("beforeunload",handeReloadPage);
    };

  },[basket]);




  //GPT generated
  function CheckoutSummary() {
    const originalPrice = basket.totalPrice.priceBeforeRebate;
    const total = basket.totalPrice.priceAfterRebate;
    const discount = originalPrice - total;



    

    const navigateToCheckout = () => {
      if (basket.basketItems.length > 0) {
        navigate('/checkout'); // Use the navigate function
      } else {
        const popup = document.getElementById("basketPopup") as HTMLElement;
        popup.classList.toggle("show");
      }
    };

    return (
        <div className="checkoutContainer">
          <div className="summaryBox">
            <div className="summaryRow">
              <h2>Price:</h2>
              <p>{originalPrice.toFixed(2)}</p>
            </div>
            <div className="summaryRow">
              <h2>Discount:</h2>
              <p>{discount.toFixed(2)}</p>
            </div>
            <div className="line"></div>
            <div className="summaryRow">
              <h2>Total:</h2>
              <p>{total.toFixed(2)}</p>
            </div>
          </div>
          <div className="popup">
            <button type="button" className="checkoutButton" onClick={navigateToCheckout}> Continue to checkout</button>
            <span className="popuptext" id="basketPopup">Warning: Your basket is empty</span>
          </div>
        </div>
    );
  }

  function DisplayItemsInBasket() {
    if (basket.basketItems.length === 0) {
      return (
        <div className='emptyBasket'>
          <p>The shopping cart is empty go back to the store to buy some products </p>
        </div>
      )
    } else {
      return basket.basketItems.map((basketItem, index) =>
        <ul key={basketItem.product_id}>
          <DisplayItem basketItem={basketItem} basketItemPrice={basket.priceList[index]} />
        </ul>
      )
    }
  }

  // Returning the component ##STYLE HERE##
  return (
    <div className="shoppingCartContainer">
      <div className="cartItemsContainer">
        <p>Get an additional 10% discount with any purchase over 300 DKK</p>
        <DisplayItemsInBasket />
      </div>
      <CheckoutSummary />
    </div>
  )
}

export default ShoppingCart;