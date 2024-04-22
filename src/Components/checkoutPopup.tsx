import { BasketItemKind } from "../State/BasketState"
import { useBasketDispatchContext } from "../State/Basketcontext"
import { useNavigate } from 'react-router-dom';
import "../StylingSheets/popup.css"
import "../Pages/index.css"


type popuptForUpsellProductprops={
  closePopUp: ()=>void;
} 


export function CheckoutPopUp(props:popuptForUpsellProductprops){
  //console.log("Checkout Popup was here!")
  const basketDispatchercontext= useBasketDispatchContext();
  const navigate = useNavigate();
  const navigateToStore = () => {
    basketDispatchercontext({type: BasketItemKind.ClEARBASKET});
    navigate('/store'); // Use the navigate function
  };

  return(
    <div className="form-popup">
      <div className="text_and_image">
        <button className="exit-button" onClick={props.closePopUp}> X</button>
        <p> Successful transaction </p>
        <img className="product-image"
          //src={upsellProduct.imageUrl}
          alt="Product Image" />
        <p> Order Successful </p>

        <div className="continue_button">
          <button className="add-to-cart-button" onClick={navigateToStore}> Continue</button>
        </div>
      </div>
    </div>
  )
}






