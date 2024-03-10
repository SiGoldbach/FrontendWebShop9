import '../Pages/index.css'

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
type MyDisplayItemProps = {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    quantity: number;
    decreaseQuantity: (id: string) => void;
    increaseQuantity: (id: string) => void;
    removeItem: (id: string) => void;

}

function DisplayItem(item: MyDisplayItemProps) {
    //const item = makeDummyItem();
    return (
        <>
            <div className="displayItem">
                <div className="leftColumn">
                    <div className="displayItemName">
                        <b>{item.name}</b>
                    </div>
                    <div>
                        <p> Buy 10 get 10% rebate </p>
                        <p> Other customers bought</p>
                    </div>

                    <div>
                        {item.description}
                    </div>
                </div>
                <div className="rightColumn">
                    <div className="displayItemQuant">
                        <button className="quantityButton" onClick={()=>item.decreaseQuantity(item.id)}>
                            <span style={ item.quantity === 1 ? {color: "#b5b5b5"} : {}}>-</span>
                            </button>
                        {item.quantity}
                        <button className="quantityButton" onClick={()=>item.increaseQuantity(item.id)}>+</button>
                    </div>
                    <button className="removeItemButton" onClick={()=>item.removeItem(item.id)}>X</button>
                    <div className="displayItemPrice">
                        <p>Before Price: {item.price * item.quantity} {item.currency}</p>
                        <p>Price with rebate : 150</p>
                    </div>
                </div>
            </div>
        </>
    )
}


export default DisplayItem;