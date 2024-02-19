import './displayItem.css'

function makeDummyItem() {
    const item:MyDisplayItemProps = {
    id: "vitamin-d-90-100",
    name: "vitamin",
    description: "hej",
    price: 20,
    currency: "DKK",
    quantity: 5,
    giftWrap: true
    };
    return item;
}


function DisplayItem(item:MyDisplayItemProps){
    //const item = makeDummyItem();
    return(
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
                        <button className="quantityButton">-</button>
                        {item.quantity}
                        <button className="quantityButton">+</button>
                    </div>
                    <div className="displayItemPrice">
                        {item.price} {item.currency}
                    </div>
                </div>
            </div>
        </>
    )
}
type MyDisplayItemProps={
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    quantity: number;
    giftWrap: boolean;


}

export default DisplayItem;