import { BasketItemKind } from "../State/BasketState";
import { useBasketDispatchContext } from "../State/Basketcontext";
import { useProductContext } from "../State/Productcontext";
import "../StylingSheets/popup.css"
import { ProductInfo } from "../TSReusedTypes/ItemsAndPrices";
import "../Pages/index.css"

type popuptForUpsellProductprops={
    closePopUp: ()=>void;
    currentid: string;
    upsellId: any;

} 

export function PopUpForUpsellProduct(props:popuptForUpsellProductprops){
    console.log(props.currentid);
    console.log(props.upsellId);
    const products = useProductContext();
    const basketDispatchercontext= useBasketDispatchContext();
    const upsellProduct:ProductInfo = products.filter((product)=>product.id==props.upsellId)[0]

    function handleUpgrade(){
        basketDispatchercontext({type: BasketItemKind.REPLACEITEMINBASKET,currentItemId: props.currentid,newProduct: upsellProduct});
        props.closePopUp
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
                <button className="add-to-cart-button" onClick={props.closePopUp}> Cancel</button>
            </div>
            <div className="form-button-div">
                <button className="add-to-cart-button" onClick={handleUpgrade}> Upgrade</button>
            </div>
        </div>
        </div>
        
        
        </div>)
}

