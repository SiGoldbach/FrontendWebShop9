import '../Data/product.json'
import '../Pages/index.css'
import DisplayItem from "./displayItem.js";
import { BasketItem, Basket } from "../TSReusedTypes/ItemsAndPrices.js"


interface MyShoppinCartProps {
    basket: Basket;
    setBasketItems: (basketItems: BasketItem[]) => void


}

function ShoppingCart(props: MyShoppinCartProps) {
    //Theese two consts define the state of this component
    //This method is used to call display item once for each item in the shopping cart ##STYLE HERE## it has to be <li> component
    const itemsToDisplay = props.basket.basketItems.map(basketItem =>
        <ul key={basketItem.id}>

            <DisplayItem
                id={basketItem.id}
                name={basketItem.name}
                description={""}
                price={basketItem.price}
                currency={basketItem.currency}
                quantity={basketItem.quantity}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                removeItem={removeItem} />

        </ul>
    )
    /**
     * Theese next four function are passed along to display item,
     * with the purpose of chaning state of the shopping basket.
     */
    //Function used for removing an item from the basket
    function removeItem(id: string) {

        // works by creating a new set of items and filtering out the one with matching id
        const tempCurrentItems: BasketItem[] = props.basket.basketItems.filter(item => item.id !== id);

        props.setBasketItems(tempCurrentItems)
    }
    //Decrease the amount of a certain item by one 

    function decreaseQuantity(id: string) {
        const currentItems: BasketItem[] = [...props.basket.basketItems];
        for (let i = 0; i < currentItems.length; i++) {
            if (currentItems[i].id === id) {
                if (currentItems[i].quantity === 1) {
                    break;
                }
                currentItems[i].quantity--;


            }

        }
        props.setBasketItems(currentItems)

    }
    //Increase the amount of a certain item by one 
    function increaseQuantity(id: string) {
        console.log("Trying to increase the amount of items")
        const currentItems: BasketItem[] = [...props.basket.basketItems];
        for (let i = 0; i < currentItems.length; i++) {
            if (currentItems[i].id === id) {
                currentItems[i].quantity++;

            }

        }
        props.setBasketItems(currentItems)

    }


    // Returning the component ##STYLE HERE##
    return (
        <>
            <div className="cartItemsContainer">
                <p> Shopping Basket  </p>

                <ul>
                    {itemsToDisplay}
                </ul>
                <p> Price before rebate is: {props.basket.totalPrice.priceBeforeRebate}</p>
                <p> Your price after rebate is: {props.basket.totalPrice.priceAfterRebate} </p>

            </div>




        </>
    )

}



export default ShoppingCart;