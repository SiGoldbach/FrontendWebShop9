import { Basket } from "../TSReusedTypes/ReusedTypes";
import { createNewEmptyBasket } from "./BasketState";

const basketKey: string="basket";
//This function will save 
export function storeBasketInSession(basket: Basket){
    try{
        console.log("I am storing the basket");
        sessionStorage.setItem(basketKey,JSON.stringify(basket));
    
    }catch(err){
        console.log("It seems like your browser does not support session storage trying to save basket ");


    }
    
}
//The basket should never be null since it is instantiated when rendering app which is akways rendered
//Since it is the parent of the components this should be used ind. 
export function getBasketInSession(): Basket|null{
    //This needs to be surounded by try catch to avoid app crashes due to browsers that are not willing to use session storage
    try{
        const basketAsString = sessionStorage.getItem(basketKey)
        console.log(basketAsString);
        if(basketAsString!=null){
            const basket: Basket = JSON.parse(basketAsString);
            return basket;
    
        }
        else return null;
    }catch(err){
        console.log("It seems like your browser does not support session storage trying to get basket ");
        return null;
    }
    

    
}
//Function that either returns an empty new basket or the stored session basket
export function getBasket():Basket{
    console.log("Trying to receive the basket from localstorage")
    const basket = getBasketInSession(); 
    if(basket!==null){
        return basket;
    }
    else{
        console.log("There is no basket stored in the session");
        return createNewEmptyBasket();
    }

}