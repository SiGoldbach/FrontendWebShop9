import './displayItem.css'

/*function makeDummyItem() {
    const item: MyDisplayItemProps = {
        id: "vitamin-d-90-100",
        name: "vitamin",
        description: "hej",
        price: 20,
        currency: "DKK",
        quantity: 5,
        giftWrap: true,
    };
    return item;
}
*/

function DisplayItem(item: MyDisplayItemProps) {
    //const item = makeDummyItem();
    return (
        <>
            <div className="displayItem">
                <div className="column">
                    <div className="displayItemName">
                        <b>{item.name}</b>
                    </div>
                    <div>
                        {item.description}
                    </div>
                </div>
                <div className="column">
                    <div className="displayItemQuant">
                        <button className="quantityButton" onClick={()=>item.decreaseQuantity(item.id)}>-</button>
                        {item.quantity}
                        <button className="quantityButton" onClick={()=>item.increaseQuantity(item.id)}>+</button>
                    </div>
                    <div className="displayItemPrice">
                        {item.price * item.quantity} {item.currency}
                    </div>
                </div>
            </div>
        </>
    )
}
type MyDisplayItemProps = {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    quantity: number;
    giftWrap: boolean;
    decreaseQuantity: (id: string) => void;
    increaseQuantity: (id: string) => void;

}

export default DisplayItem;