import { useState } from 'react';
import '../Pages/index.css';
import { BasketItemKind } from '../State/BasketState';
import { useBasketContext, useBasketDispatchContext } from '../State/Basketcontext';
import { BasketItem, Price } from '../TSReusedTypes/ReusedTypes';
import { PopUpForUpsellProduct } from './upsellProductPopup';
import { ImageHandler } from './ImageHanlder';


type displayItemProps = {
    basketItem: BasketItem;
    basketItemPrice: Price;
}


function DisplayItem({basketItem,basketItemPrice}: displayItemProps) {
    const basket = useBasketContext();
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
            return (<>
            </>
            )
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
            return (<>
                <p> Upgrade to the premium version: </p>
                <button onClick={openPopUp}>{basketItem.upsellProductId.toString()}</button>
            </>)
        } else {
            return (<>
            </>)
        }
    }


    function RebateInformationHelper() {
        if (basketItem.rebatePercent === 0) {
            return (<>
            </>)
        }
        else {
            return (
            <p> Buy {basketItem.rebateQuantity} get {basketItem.rebatePercent}% rebate </p>
            )
        }
    }



    return (
        <>
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
                        <RebateInformationHelper/>
                        <PremiumHelper />
                    </div>
                </div>
                <div className="rightColumn">
                    <div className="displayItemQuant">
                        <button className="quantityButton" onClick={() => basketDispatcher({type: BasketItemKind.DECREASE,id: basketItem.product_id})}>
                            <span style={basketItem.quantity === 1 ? { color: "#b5b5b5" } : {}}>-</span>
                        </button>
                        {basketItem.quantity}
                        <button className="quantityButton" onClick={() => basketDispatcher({type: BasketItemKind.INCREASE,id: basketItem.product_id})}>+</button>
                    </div>
                    <button className="removeItemButton" onClick={() => basketDispatcher({type: BasketItemKind.REMOVE,id: basketItem.product_id})}>Remove</button>
                    <div className="displayItemPrice">
                        <p>Per item:  {basketItem.price} {basketItem.currency}</p>
                        <DiscountHelper />
                        <p>Total : {basketItemPrice.priceAfterRebate} {basketItem.currency}</p>
                    </div>
                </div>
            </div>
        </>
    )
}


export default DisplayItem;