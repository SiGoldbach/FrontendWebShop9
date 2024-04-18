import { BasketItemKind } from "../State/BasketState"
import { useBasketDispatchContext } from "../State/Basketcontext"
import "../StylingSheets/popup.css"
import "../Pages/index.css"


type popuptForUpsellProductprops={
    closePopUp: ()=>void;
} 


export function CheckoutPopUp(props:popuptForUpsellProductprops){
    console.log("Checkout Popup was here!")
    const basketDispatchercontext= useBasketDispatchContext();

    function handleAndClearBasket(){
        basketDispatchercontext({type: BasketItemKind.ClEARBASKET});
        props.closePopUp
    }
    

    return(
      <div className="checkout-popup">
        <div className="text_and_image">
          <p> Successful transaction </p>
          <img className="product-image"
            //src={upsellProduct.imageUrl}
            alt="PlaceholderImage" />
          <p> Order Successful </p>

          <div className="continue_button">
            <button className="add-to-cart-button" onClick={handleAndClearBasket}> Continue</button>
          </div>
        </div>
      </div>
    )
}






