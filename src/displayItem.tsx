import './displayItem.css'

function makeDummyItem() {
    const item:Item = {
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


function DisplayItem(){
    const item = makeDummyItem();
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
                        Quantity: {item.quantity}
                    </div>
                    <div className="displayItemPrice">
                        {item.price} {item.currency}
                    </div>
                </div>
            </div>
        </>
    )
}
type Item={
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    quantity: number;
    giftWrap: boolean;


}

export default DisplayItem;