import '../Pages/index.css'
import { BasketItem, Price } from '../TSReusedTypes/ItemsAndPrices'


type displayItemProps = {
    basketItem: BasketItem;
    basketItemPrice: Price;
    decreaseQuantity: (id: string) => void;
    increaseQuantity: (id: string) => void;
    removeItem: (id: string) => void;

};

function DisplayItem(props: displayItemProps) {


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
                <p> Upgrade to the premium version: <br></br> {props.basketItem.upsellProductId.toString()}</p>
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
                        <button className="quantityButton" onClick={() => props.decreaseQuantity(props.basketItem.id)}>
                            <span style={props.basketItem.quantity === 1 ? { color: "#b5b5b5" } : {}}>-</span>
                        </button>
                        {props.basketItem.quantity}
                        <button className="quantityButton" onClick={() => props.increaseQuantity(props.basketItem.id)}>+</button>
                    </div>
                    <button className="removeItemButton" onClick={() => props.removeItem(props.basketItem.id)}>Remove</button>
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