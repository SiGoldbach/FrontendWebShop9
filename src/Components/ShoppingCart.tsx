import '../Data/product.json'
import '../Pages/index.css'
import DisplayItem from "./displayItem.js";
import { BasketItem, Basket } from "../TSReusedTypes/ItemsAndPrices.js"


interface MyShoppinCartProps {
    basket: Basket;
    setBasketItems: (basketItems: BasketItem[]) => void


}


function ShoppingCart(props: MyShoppinCartProps) {
    function DisplayItemsInBasket() {
        if (props.basket.basketItems.length === 0) {
            return (
                <div className='emptyBasket'>
                    <p>The shopping cart is empty go back to the store to buy some products </p>
                </div>
            )
        }
        else {
            return props.basket.basketItems.map((basketItem, index) =>
                <ul key={basketItem.id}>

                    <DisplayItem
                        basketItem={basketItem}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                        removeItem={removeItem}
                        basketItemPrice={props.basket.priceList[index]} />

                </ul>)
        }


    };

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
        props.setBasketItems([...props.basket.basketItems].map((item) => {
            if (item.id === id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        }))

    }
    //Increase the amount of a certain item by one 
    function increaseQuantity(id: string) {
        props.setBasketItems([...props.basket.basketItems].map((item) => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        }))
    }
    // Returning the component ##STYLE HERE##
    return (<>
        <div className="cartItemsContainer">
            <p> Shopping Basket  </p>


            <DisplayItemsInBasket />

            <p> Price before rebate is: {props.basket.totalPrice.priceBeforeRebate}</p>
            <p> Your price after rebate is: {props.basket.totalPrice.priceAfterRebate} </p>

        </div>
    </>
    )
}

export default ShoppingCart;