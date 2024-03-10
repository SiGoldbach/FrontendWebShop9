import '../Pages/index.css'
import {BasketItem,Price} from '../TSReusedTypes/ItemsAndPrices'


type displayItemProps = {
    basketItem: BasketItem;
    basketItemPrice: Price;
    decreaseQuantity: (id: string) => void;
    increaseQuantity: (id: string) => void;
    removeItem: (id: string) => void;

};

function DisplayItem(props: displayItemProps) {
    return (
        <>


            <div className="displayItem">
                <div className="leftColumn">
                    <div>
                        <b className='displayItemName'>{props.basketItem.name}</b>
                    </div>
                    <div>
                        <img src="https://via.placeholder.com/150" alt="PlaceholderImage" />
                    </div>
                    <div>
                        <div className="displaySingleItemPrice">
                            {props.basketItem.price} {props.basketItem.currency} {"/ stk"}
                        </div>
                        <p> Buy {props.basketItem.rebateQuantity} get {props.basketItem.rebatePercent}% rebate </p>
                        <p> Get the premium version: <br></br> {props.basketItem.upsellProductId}</p>
                    </div>
                </div>
                <div className="rightColumn">
                    <div className="displayItemQuant">
                        <button className="quantityButton" onClick={() => props.decreaseQuantity(props.basketItem.id)}>
                            <span style={props.basketItem.quantity === 1 ? { color: "#b5b5b5" } : {}}>-</span>
                        </button>
                        {props.basketItem.quantity}
                        <button className="quantityButton" onClick={() => props.increaseQuantity(props.basketItem.id)}>+</button>
                    </div>
                    <button className="removeItemButton" onClick={() => props.removeItem(props.basketItem.id)}>Remove</button>
                    <div className="displayItemPrice">
                        <p>Price before rebate: {props.basketItemPrice.priceBeforeRebate} {props.basketItem.currency}</p>
                        <p>Your price : {props.basketItemPrice.priceAfterRebate} {props.basketItem.currency}</p>
                    </div>
                </div>
            </div>
        </>
    )
}


export default DisplayItem;