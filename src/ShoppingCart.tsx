import { useState } from "react";
import './Data/product.json'
import './index.css'
import DisplayItem from "./displayItem.jsx";

function PutItemsInBasket(){
    const items: Item[] = []
    const item1: Item = {
        id: "vitamin-d-90-100",
        quantity: 2,
        giftWrap: true
    }
    const item2: Item = {
        id: "vitamin-c-500-250",
        quantity: 1,
        giftWrap: false
    }
    const item3: Item = {
        id: "vitamin-c-depot-500-250",
        quantity: 7,
        giftWrap: false
    }
    items.push(item1, item2, item3)
    const itemInfos: ItemInfo[] = []
    const iteminfo1:ItemInfo= {
        id: "vitamin-d-90-100",
        name: "D-vitamin",
        price: 116,
        currency: "DKK",
        rebateQuantity: 3,
        rebatePercent: 10,
        upsellProductId: "null"
    }
    const iteminfo2:ItemInfo= {
        id: "vitamin-c-500-250",
        name: "C-vitamin",
        price: 150,
        currency: "DKK",
        rebateQuantity: 2,
        rebatePercent: 25,
        upsellProductId: "vitamin-c-depot-500-250"
    }
    const iteminfo3:ItemInfo= {
        id: "vitamin-c-depot-500-250",
        name: "C-vitamin Depot",
        price: 175,
        currency: "DKK",
        rebateQuantity: 3,
        rebatePercent: 10,
        upsellProductId: "null"
    }
    itemInfos.push(iteminfo1,iteminfo2,iteminfo3);
    const completeItems: CompleteItem[] =[]
    for(let i=0;i<items.length;i++){
        const completeitem :CompleteItem={
            item:items[i],
            itemInfo:itemInfos[i]
            
        }
        completeItems.push(completeitem)

    }
    console.log("Items are getting returned")
    return completeItems



}



function ShoppingCart() {
    //Theese two consts define the state of this component
    const [completeItems, setCompleteItems] = useState(PutItemsInBasket())
    //This method is used to call display item once for each item in the shopping cart ##STYLE HERE## it has to be <li> component
    const itemsToDisplay = completeItems.map(CompleteItemInList =>
        <li key={CompleteItemInList.item.id}>

            <DisplayItem
                id={CompleteItemInList.item.id}
                name={CompleteItemInList.itemInfo.name}
                description={""}
                price={CompleteItemInList.itemInfo.price}
                currency={CompleteItemInList.itemInfo.currency}
                quantity={CompleteItemInList.item.quantity}
                giftWrap={CompleteItemInList.item.giftWrap}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                removeItem={removeItem} />

        </li>
    )
    /**
     * Theese next four function are passed along to display item,
     * with the purpose of chaning state of the shopping basket.
     */
    //Function used for removing an item from the basket
    function removeItem(id: string) {

        // works by creating a new set of items and filtering out the one with matching id
        const tempCurrentItems: CompleteItem[] = completeItems.filter(item => item.item.id !== id);
        
        setCompleteItems(tempCurrentItems)
    }
    //Decrease the amount of a certain item by one 

    function decreaseQuantity(id: string) {
        const currentItems: CompleteItem[] = [...completeItems];
        for (let i = 0; i < currentItems.length; i++) {
            if (completeItems[i].item.id === id) {
                if (completeItems[i].item.quantity === 1) {
                    break;
                }
                currentItems[i].item.quantity--;


            }

        }
        setCompleteItems(currentItems)

    }
    //Increase the amount of a certain item by one 
    function increaseQuantity(id: string) {
        console.log("Trying to increase the amount of items")
        const currentItems: CompleteItem[] = [...completeItems];
        for (let i = 0; i < currentItems.length; i++) {
            if (completeItems[i].item.id === id) {
                currentItems[i].item.quantity++;

            }

        }
        setCompleteItems(currentItems)

    }
    //Change the gift wrap boolean 
    function changeGiftWrap(id: string) {
        const currentItems: CompleteItem[] = [...completeItems];
        for (let i = 0; i < currentItems.length; i++) {
            if (completeItems[i].item.id === id) {
                if (completeItems[i].item.giftWrap === true) {
                    completeItems[i].item.giftWrap = false;
                }
                else {
                    completeItems[i].item.giftWrap = true
                }

            }

        }
        setCompleteItems(currentItems)
        
    }
    function calculateTotalPrice(completeItem:CompleteItem[]) {
        let price: number = 0;
        for (let i = 0; i < completeItem.length; i++) {
            price = price + completeItem[i].itemInfo.price * completeItem[i].item.quantity;
        }
        return price;
    }
    const price :number = calculateTotalPrice(completeItems)

    // Returning the component ##STYLE HERE##
    return (
        <>
            <div className="container">
                <p> Welcom to the page </p>

                <ul>
                    {itemsToDisplay}
                </ul>
                <p> Price is {price}</p>


            </div>

        </>
    )

}
//TSX interfaces used for this component

interface CompleteItem {
    itemInfo: ItemInfo;
    item: Item;
}
//Item fetched directly from server
interface ItemInfo {
    id: string;
    name: string;
    price: number;
    currency: string;
    rebateQuantity: number;
    rebatePercent: number;
    upsellProductId: string;
}
//Item given from as the customer to this page. 
interface Item {
    id: string;
    quantity: number;
    giftWrap: boolean;
}


export default ShoppingCart;