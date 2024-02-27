import './Data/product.json'
import './index.css'
import DisplayItem from "./displayItem.jsx";

function ShoppingCart(props: MyShoppinCartProps) {
    //Theese two consts define the state of this component
    //This method is used to call display item once for each item in the shopping cart ##STYLE HERE## it has to be <li> component
    const itemsToDisplay = props.completeItems.map(CompleteItemInList =>
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
        const tempCurrentItems: CompleteItem[] = props.completeItems.filter(item => item.item.id !== id);
        
        props.setCompleteItems(tempCurrentItems)
    }
    //Decrease the amount of a certain item by one 

    function decreaseQuantity(id: string) {
        const currentItems: CompleteItem[] = [...props.completeItems];
        for (let i = 0; i < currentItems.length; i++) {
            if (currentItems[i].item.id === id) {
                if (currentItems[i].item.quantity === 1) {
                    break;
                }
                currentItems[i].item.quantity--;


            }

        }
        props.setCompleteItems(currentItems)

    }
    //Increase the amount of a certain item by one 
    function increaseQuantity(id: string) {
        console.log("Trying to increase the amount of items")
        const currentItems: CompleteItem[] = [...props.completeItems];
        for (let i = 0; i < currentItems.length; i++) {
            if (currentItems[i].item.id === id) {
                currentItems[i].item.quantity++;

            }

        }
        props.setCompleteItems(currentItems)

    }
    //Change the gift wrap boolean 
    /*function changeGiftWrap(id: string) {
        const currentItems: CompleteItem[] = [...props.completeItems];
        for (let i = 0; i < currentItems.length; i++) {
            if (currentItems[i].item.id === id) {
                if (currentItems[i].item.giftWrap === true) {
                    currentItems[i].item.giftWrap = false;
                }
                else {
                    currentItems[i].item.giftWrap = true
                }

            }

        }
        props.setCompleteItems(currentItems)
        
    }*/
    function calculateTotalPrice(completeItem:CompleteItem[]) {
        let price: number = 0;
        for (let i = 0; i < completeItem.length; i++) {
            price = price + completeItem[i].itemInfo.price * completeItem[i].item.quantity;
        }
        return price;
    }
    const price :number = calculateTotalPrice(props.completeItems)

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
//Making props for the shopping cart here a list of items should be and setCompleteItems
interface MyShoppinCartProps{
    completeItems: CompleteItem[]
    setCompleteItems: (completeItems: CompleteItem[]) => void

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