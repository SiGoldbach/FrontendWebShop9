import { useState } from 'react';
import '../Pages/index.css';
import { BasketItemKind } from '../State/BasketState';
import { useBasketDispatchContext } from '../State/Basketcontext';
import { BasketItem, Price } from '../TSReusedTypes/ItemsAndPrices';
import { PopUpForUpsellProduct } from './upsellProductPopup';


type displayItemProps = {
    basketItem: BasketItem;
    basketItemPrice: Price;


};

function DisplayItem(props: displayItemProps) {
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
        if (props.basketItemPrice.priceBeforeRebate === props.basketItemPrice.priceAfterRebate)
            return (<>
            </>
            )
        else {
            return (<>
                <p>Subtotal: {props.basketItemPrice.priceBeforeRebate} {props.basketItem.currency}</p>
                <p>Disount: {(props.basketItemPrice.priceBeforeRebate - props.basketItemPrice.priceAfterRebate).toFixed(2)}</p>
            </>
            )
        }
    }
    function PremiumHelper() {
        if (props.basketItem.upsellProductId) {
            return (<>
                <p> Upgrade to the premium version: </p>
                <button onClick={openPopUp}>{props.basketItem.upsellProductId.toString()}</button>
            </>)
        } else {
            return (<>
            </>)
        }


    }
    function RebateInformationHelper() {
        if (props.basketItem.rebatePercent === 0) {
            return (<>
            </>)
        }
        else {
            return (
            <p> Buy {props.basketItem.rebateQuantity} get {props.basketItem.rebatePercent}% rebate </p>
            )
        }
    }
    function ImageErrorHandler(event: React.SyntheticEvent<HTMLImageElement, Event>){
        const targetEvent = event.target as HTMLImageElement;
        targetEvent.src="https://via.placeholder.com/150";
        

    }

    return (
        <>


            <div className="displayItem">
            {isPopUpOpen && <PopUpForUpsellProduct closePopUp={closePopUp} />}

                <div className="leftColumn">
                    <div>
                        <b className='displayItemName'>{props.basketItem.name}</b>
                    </div>
                    <div>
                        <img className="product-image"
                             src={props.basketItem.imageUrl}
                             alt="PlaceholderImage" 
                             onError={ImageErrorHandler}/>
                             
                    </div>
                    <div>
                        <div className="displaySingleItemPrice">
                            {props.basketItem.price} {props.basketItem.currency} {"/ stk"}
                        </div>
                        <RebateInformationHelper/>
                        <PremiumHelper />
                    </div>
                </div>
                <div className="rightColumn">
                    <div className="displayItemQuant">
                        <button className="quantityButton" onClick={() => basketDispatcher({type: BasketItemKind.DECREASE,id: props.basketItem.id})}>
                            <span style={props.basketItem.quantity === 1 ? { color: "#b5b5b5" } : {}}>-</span>
                        </button>
                        {props.basketItem.quantity}
                        <button className="quantityButton" onClick={() => basketDispatcher({type: BasketItemKind.INCREASE,id: props.basketItem.id})}>+</button>
                    </div>
                    <button className="removeItemButton" onClick={() => basketDispatcher({type: BasketItemKind.REMOVE,id: props.basketItem.id})}>Remove</button>
                    <div className="displayItemPrice">
                        <p>Per item:  {props.basketItem.price} {props.basketItem.currency}</p>
                        <DiscountHelper />
                        <p>Total : {props.basketItemPrice.priceAfterRebate} {props.basketItem.currency}</p>
                    </div>
                </div>
            </div>
        </>
    )
}


export default DisplayItem;