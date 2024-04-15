import { BasketItemKind } from "../State/BasketState";
import { useBasketDispatchContext } from "../State/Basketcontext";
import { useProductContext } from "../State/Productcontext";
import "../StylingSheets/popup.css"
import { ProductInfo } from "../TSReusedTypes/ReusedTypes";
import "../Pages/index.css"


type popuptForUpsellProductprops={
    closePopUp: ()=>void;
    currentid: string;
    upsellId: string | null;

} 


export function PopUpForUpsellProduct({closePopUp,currentid,upsellId}:popuptForUpsellProductprops){
    console.log(currentid);
    console.log(upsellId);
    const products = useProductContext();
    const basketDispatchercontext= useBasketDispatchContext();
    const upsellProduct:ProductInfo = products.filter((product)=>product.id==upsellId)[0]

    function handleUpgrade(){
        basketDispatchercontext({type: BasketItemKind.REPLACEITEMINBASKET,currentItemId: currentid,newProduct: upsellProduct});
        closePopUp
    }
    function ImageErrorHandler(event: React.SyntheticEvent<HTMLImageElement, Event>){
        const targetEvent = event.target as HTMLImageElement;
        targetEvent.src="https://via.placeholder.com/150";
        

    }


    return(<div className="form-popup">
        <div>
        <p>{upsellProduct.id} </p>
        <img className="product-image"
                             src={upsellProduct.imageUrl}
                             alt="PlaceholderImage" 
                             onError={ImageErrorHandler}/>
        <p> Do you want to upgrade? </p>
        <p> Price: {upsellProduct.price} {upsellProduct.currency}</p>

        <div className="form-button-div">
            <div className="form-button-div">
                <button className="add-to-cart-button" onClick={closePopUp}> Cancel</button>
            </div>
            <div className="form-button-div">
                <button className="add-to-cart-button" onClick={handleUpgrade}> Upgrade</button>
            </div>
        </div>
        </div>
        </div>)
}

