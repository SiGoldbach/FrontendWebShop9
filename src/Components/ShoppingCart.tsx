import '../Data/product.json'
import '../Pages/index.css'
import DisplayItem from "./displayItem.js";
import { BasketItem, Basket } from "../TSReusedTypes/ItemsAndPrices.js"
import { useNavigate } from 'react-router-dom';


interface shoppinCartProps {
    basket: Basket;
    setBasketItems: (basketItems: BasketItem[]) => void


}


function ShoppingCart(props: shoppinCartProps) {
    const navigate = useNavigate();
    function CheckoutSummary() {
        const originalPrice = props.basket.totalPrice.priceBeforeRebate;
        const total = props.basket.totalPrice.priceAfterRebate;
        const discount = originalPrice - total;
        
        const navigateToCheckout = () => {
            navigate('/checkout'); // Use the navigate function
          };
        return (
            <div className="checkoutContainer">
                <div className="summaryBox">
                    <div className="summaryRow">
                        <h2>Price:</h2>
                        <p>{originalPrice.toFixed(2)}</p>
                    </div>
                    <div className="summaryRow">
                        <h2>Discount:</h2>
                        <p>{discount.toFixed(2)}</p>
                    </div>
                    <div className="line"></div>                
                    <div className="summaryRow">
                        <h2>Total:</h2>
                        <p>{total.toFixed(2)}</p>
                    </div>
                </div>
                <button type="button" className="checkoutButton" onClick={navigateToCheckout}> Continue to checkout </button>
            </div>
        );
    }
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
        <div className="shoppingCartContainer">
            <div className="cartItemsContainer">
                <p>Get an additional 10% discount with any purchase over 300 DKK</p>
                <DisplayItemsInBasket />
            </div>
            <CheckoutSummary />
        </div>
    </>
    )
}

export default ShoppingCart;