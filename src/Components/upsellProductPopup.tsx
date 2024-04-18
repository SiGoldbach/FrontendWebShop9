import { BasketItemKind } from "../State/BasketState";
import { useBasketDispatchContext } from "../State/Basketcontext";
import { useProductContext } from "../State/Productcontext";
import "../StylingSheets/popup.css"
import { ProductInfo } from "../TSReusedTypes/ReusedTypes";
import "../Pages/index.css"
import {ImageHandler} from"./ImageHanlder"


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
  const upsellProduct:ProductInfo = products.filter((product)=>product.product_id==upsellId)[0]

  function handleUpgrade(){
    basketDispatchercontext({type: BasketItemKind.REPLACEITEMINBASKET,currentItemId: currentid,newProduct: upsellProduct});
    closePopUp
  }
    


  return(
    <div className="form-popup">
      <div>
        <p>{upsellProduct.name} </p>
        <ImageHandler url={upsellProduct.image_url}/>
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
    </div>
  )
}

