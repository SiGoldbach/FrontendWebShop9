import { useState } from 'react';
import '../Pages/index.css';
import { BasketItemKind } from '../State/BasketState';
import { useBasketContext, useBasketDispatchContext } from '../State/Basketcontext';
import { BasketItem, Price, ProductInfo } from '../TSReusedTypes/ReusedTypes';
import { PopUpForUpsellProduct } from './upsellProductPopup';
import { ImageHandler } from './ImageHanlder';
import { useProductContext } from '../State/Productcontext';


type displayItemProps = {
  basketItem: BasketItem;
  basketItemPrice: Price;
}


function DisplayItem({basketItem,basketItemPrice}: displayItemProps) {
  const basket = useBasketContext();
  const products = useProductContext();
  const basketDispatcher = useBasketDispatchContext();
  const [isPopUpOpen,setIsPopupOpen]= useState(false);

  function closePopUp(){
    setIsPopupOpen(false);
  }
  function openPopUp(){
    setIsPopupOpen(true);
    console.log("Popupbox is: "+isPopUpOpen);
  }


  function DiscountHelper() {
    if (basketItemPrice.priceBeforeRebate === basketItemPrice.priceAfterRebate)
      return (<>  </>)
    else {
      return (<>
        <p>Subtotal: {basketItemPrice.priceBeforeRebate} {basketItem.currency}</p>
        <p>Disount: {(basketItemPrice.priceBeforeRebate - basketItemPrice.priceAfterRebate).toFixed(2)}</p>
        </>
      )
    }
  }


  function PremiumHelper() {
    if (basketItem.upsellProductId && basket.basketItems.map(product=> product.product_id).indexOf(basketItem.upsellProductId)===-1) {
      const premiumItem:ProductInfo= products.filter((product)=>product.product_id===basketItem.upsellProductId)[0];

      return (<>
        <p> Upgrade to the premium version: </p>
        <button className="upgradeButton" onClick={openPopUp}>{premiumItem.name}</button>
      </>)
    } else {
      return (<>  </>)
    }
  }


  type rebateInformationHelperprops={
    rebatePercent: number|null;
    rebateQuantity: number|null;
  }
  function RebateInformationHelper(props: rebateInformationHelperprops) {
    if (props.rebatePercent!==null && props.rebateQuantity!==null && props.rebatePercent !== 0 && props.rebateQuantity !== 0){
      const rebateQ: number = props.rebateQuantity  
      const rebateP: number = props.rebatePercent
      console.log(rebateP);
      console.log(rebateQ);
      return (<p> Buy {rebateQ} get {rebateP}% rebate </p>)
    }

    if (props.rebatePercent === 0 || props.rebatePercent===null) {
      return (<>  </>)
    }else {
      return (<>  </>)
    }
  }



  return (
    <div className="displayItem">
    {isPopUpOpen && <PopUpForUpsellProduct closePopUp={closePopUp} currentid={basketItem.product_id} upsellId={basketItem.upsellProductId} />}

      <div className="leftColumn">
        <div>
          <b className='displayItemName'>{basketItem.name}</b>
        </div>
        <div>
          <ImageHandler url={basketItem.image_url}/>                       
        </div>
        <div>
          <div className="displaySingleItemPrice">
            {basketItem.price} {basketItem.currency} {"/ stk"}
          </div>
          <RebateInformationHelper rebatePercent={basketItem.discount_percent} rebateQuantity={basketItem.discount_amount}/>
          <PremiumHelper />
        </div>
      </div>
      <div className="rightColumn">
        <div className="displayItemQuant">
          <button className="quantityButton" aria-label="Decrease quantity"
            onClick={() => basketDispatcher({type: BasketItemKind.DECREASE,id: basketItem.product_id})}>
            <span style={basketItem.quantity === 1 ? { color: "#b5b5b5" } : {}}>-</span>
          </button>
          <p title="item quantity">{basketItem.quantity}</p>
          <button className="quantityButton" aria-label="Increase quantity"
            onClick={() => basketDispatcher({type: BasketItemKind.INCREASE,id: basketItem.product_id})}>
            +
          </button>
        </div>
        <button className="removeItemButton" aria-label="Remove item from basket"
          onClick={() => basketDispatcher({type: BasketItemKind.REMOVE,id: basketItem.product_id})}>Remove
        </button>
        <div className="displayItemPrice">
          <p>Per item:  {basketItem.price} {basketItem.currency}</p>
          <DiscountHelper />
          <p>Total : {basketItemPrice.priceAfterRebate} {basketItem.currency}</p>
        </div>
      </div>
    </div>
  )
}

export default DisplayItem;