import { useState } from "react";
import './Data/product.json'
import './index.css'
import DisplayItem from "./displayItem.jsx";



function ShoppingCart() {
    //Theese two consts define the state of this component
    const [TotalPrice, setTotalPrice] = useState(0)
    const [completeItem, setCompleteItems] = useState(Array<CompleteItem>)
    //This method is used to call display item once for each item in the shopping cart ##STYLE HERE## it has to be <li> component
    const itemsToDisplay = completeItem.map(CompleteItemInList =>
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
    //Function for calculating the total price of the shopping cart 
    function calculateTotalPrice() {
        let price: number = 0;
        console.log("Calculating total price")
        for (let i = 0; i < completeItem.length; i++) {
            price = price + completeItem[i].itemInfo.price * completeItem[i].item.quantity;
        }
        setTotalPrice(price)
    }
    //Making the shopping cart 
    const currentItemList: Item[] = []
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
    currentItemList.push(item1, item2, item3)
    //console.log(currentItemList)
    // This function is a temprorary solution when the backend is up and running the https request will go there. 
    async function fecthCompleteItems() {
        //console.log("Trying to fetch items")
        const response = await fetch('https://raw.githubusercontent.com/larsthorup/checkout-data/main/product.json')
        const returnedItems = await response.text()
        const parsedItems: ItemInfo[] = JSON.parse(returnedItems)
        const chosenItems: CompleteItem[] = []
        //console.log(parsedItems.length)
        //console.log(currentItemList.length)
        for (let i = 0; i < parsedItems.length; i++) {
            for (let j = 0; j < currentItemList.length; j++) {
                //console.log("in loop iteration: ", j)
                if (parsedItems[i].id === currentItemList[j].id) {
                    const completeItem: CompleteItem = {
                        itemInfo: parsedItems[i],
                        item: currentItemList[j]
                    }
                    chosenItems.push(completeItem)

                }
            }
        }
        setCompleteItems(chosenItems)
        //console.log("the chosen items are: ", chosenItems)
        //console.log(CompleteItem)
        console.log("The items in complete items are: ", completeItem)
        console.log(completeItem[0].item.id, " should be the same ", completeItem[0].itemInfo.id)
    }
    /**
     * Theese next four function are passed along to display item,
     * with the purpose of chaning state of the shopping basket.
     */
    //Function used for removing an item from the basket
    function removeItem(id: string) {

        // works by creating a new set of items and filtering out the one with matching id
        const tempCurrentItems: CompleteItem[] = completeItem.filter(item => item.item.id !== id);
        
        setCompleteItems(tempCurrentItems)
        calculateTotalPrice()
    }
    //Decrease the amount of a certain item by one 

    function decreaseQuantity(id: string) {
        const currentItems: CompleteItem[] = completeItem;
        for (let i = 0; i < currentItems.length; i++) {
            if (completeItem[i].item.id === id) {
                if (completeItem[i].item.quantity === 1) {
                    break;
                }
                currentItems[i].item.quantity--;


            }

        }
        setCompleteItems(currentItems)
        calculateTotalPrice()

    }
    //Increase the amount of a certain item by one 
    function increaseQuantity(id: string) {
        const currentItems: CompleteItem[] = completeItem;
        for (let i = 0; i < currentItems.length; i++) {
            if (completeItem[i].item.id === id) {
                currentItems[i].item.quantity++;

            }

        }
        setCompleteItems(currentItems)
        calculateTotalPrice()


    }
    //Change the gift wrap boolean 
    function chageGiftWrap(id: string) {
        const currentItems: CompleteItem[] = completeItem;
        for (let i = 0; i < currentItems.length; i++) {
            if (completeItem[i].item.id === id) {
                if (completeItem[i].item.giftWrap === true) {
                    completeItem[i].item.giftWrap = false;
                }
                else {
                    completeItem[i].item.giftWrap = true
                }

            }

        }
        setCompleteItems(currentItems)
        calculateTotalPrice()
    }

    // Returning the component ##STYLE HERE##
    return (
        <>
            <div className="container">
                <p> Welcom to the page </p>
                <button onClick={() => {
                    fecthCompleteItems().then(() => calculateTotalPrice())
                }
                }>Show cart</button>
                <ul>
                    {itemsToDisplay}
                </ul>
                <p> Total price: {TotalPrice}</p>


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