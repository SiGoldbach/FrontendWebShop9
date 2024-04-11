import { BasketItemKind } from "../State/BasketState";
import { useBasketDispatchContext } from "../State/Basketcontext";
import { useProductContext } from "../State/Productcontext";
import "../StylingSheets/popup.css"
import { ProductInfo } from "../TSReusedTypes/ItemsAndPrices";

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



    return(<div className="form-popup">
        <p> This is a popupBox</p>
        <p>Upgrade: {props.currentid} to: {upsellProduct.id} </p>
        <button onClick={props.closePopUp}> Close box</button>
        <button onClick={handleUpgrade}> Upgrade</button>
        </div>)
}

