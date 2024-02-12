import './displayItem.css'

function makeDummyItem() {
    const itemInfo: ItemInfo = {
        id: "1234",
        name: "Nice shirt",
        description: "A very nice shirt 10/10",
        weight: 10,
        price: 100,
        currency: "DKK",
        rebateQuantity: 0,
        rebatePercent: 0,
        upsellProductId: "idk",
    };
    const item: Item = {
        id: "1234",
        quantity: 1,
        giftWrap: false,
    }
    const completeItem: CompleteItem = {
        itemInfo: itemInfo,
        item: item,
    }
    return completeItem;
}


function DisplayItem(){
    const item = makeDummyItem();
    return(
        <>
            <div className="displayItem">
                <div className="column">
                    <div className="displayItemName">
                        <b>{item.itemInfo.name}</b>
                    </div>
                    <div>
                        {item.itemInfo.description}
                    </div>
                </div>
                <div className="column">
                    <div className="displayItemQuant">
                        Quantity: {item.item.quantity}
                    </div>
                    <div className="displayItemPrice">
                        {item.itemInfo.price} {item.itemInfo.currency}
                    </div>
                </div>
            </div>
        </>
    )
}

interface CompleteItem {
    itemInfo: ItemInfo;
    item: Item;
}

interface ItemInfo {
    id: string;
    name: string;
    description: string;
    weight: number;
    price: number;
    currency: string;
    rebateQuantity: number;
    rebatePercent: number;
    upsellProductId: string;
}
interface Item{
    id: string;
    quantity: number;
    giftWrap: boolean;
}

export default DisplayItem;