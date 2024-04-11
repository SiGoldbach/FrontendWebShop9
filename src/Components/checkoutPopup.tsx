import { BasketItemKind } from "../State/BasketState"
import { useBasketDispatchContext } from "../State/Basketcontext"
import "../StylingSheets/popup.css"
import "../Pages/index.css"


type popuptForUpsellProductprops={
    closePopUp: ()=>void;
} 


export function CheckoutPopUp(props:popuptForUpsellProductprops){
    const basketDispatchercontext= useBasketDispatchContext();

    function handleAndClearBasket(){
        basketDispatchercontext({type: BasketItemKind.ClEARBASKET});
        props.closePopUp
    }
    

    return(
        <div className="form-popup">
            <div>
                <p> Successful transaction </p>
                <img className="product-image"
                    //src={upsellProduct.imageUrl}
                    alt="PlaceholderImage" />
                <p> Order Successful </p>

                <div className="form-button-div">
                    <div className="form-button-div">
                        <button className="add-to-cart-button" onClick={handleAndClearBasket}> Continue</button>
                    </div>
                </div>
            </div>
        </div>
    )
}






