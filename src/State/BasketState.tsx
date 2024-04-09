import {Basket,Price, BasketItem, ProductInfo} from "../TSReusedTypes/ItemsAndPrices"

//Enum which describes the different commands the basket reducer should have 
enum BasketItemKind{
    ADDTOBASKET= "ADDTOBASKET",
    INCREASE="INCREASE",
    DECREASE="DECREASE",
    REMOVE="REMOVE"

}
interface changeQunatityAction {
    type: BasketItemKind.INCREASE | BasketItemKind.DECREASE | BasketItemKind.REMOVE;
    id: string;
}
interface addItemToBasketAction{
    type: BasketItemKind.ADDTOBASKET;
    productinfo: ProductInfo;
}


type Action = changeQunatityAction | addItemToBasketAction;



//Function for initialising a basket with defaulf values
export function creasteNewEmptyBasket(): Basket{
    const price: Price={
        priceBeforeRebate: 0,
        rebatePercentage: 0,
        priceAfterRebate: 0
    }
    const basket: Basket={
        basketItems: [],
        priceList: [],
        totalPrice: price

    }
    return basket;

}

export function basketReducer(state: Basket, action: Action):Basket{
    switch (action.type){
        case BasketItemKind.INCREASE:
            return increaseAmount(state,action.id)
        case BasketItemKind.DECREASE:
            return decreaseAmount(state,action.id)
        case BasketItemKind.REMOVE:
            return removeItem(state,action.id)
        case BasketItemKind.ADDTOBASKET:
            return addItemToBasket(state,action.productinfo)
            


        default:
            return state;

    }

}

//Down below are helper functions for the reducer to make the main function less bloated with responsibility 

/**
 * Increases quantity of specific item by 1
 * @param state of the current basket
 * @param id of the item that needs its quantity increased by 1
 * @returns updated state
 */
function increaseAmount(state: Basket, id: string): Basket{
    const tempBasketItems:BasketItem[]  = state.basketItems.map((item) => {
        if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
        }
        else return item;
    });
    return{
        ...state,
        basketItems: tempBasketItems
    }

}
/**
 * Decreases quantity of specific item by 1 cant go under 1
 * @param state of the current basket 
 * @param id of the item that needs its quantity decreased by 1
 */
function decreaseAmount(state: Basket, id: string): Basket{
    const tempBasketItems:BasketItem[]  = state.basketItems.map((item) => {
        if (item.id === id && item.quantity!=1) {
            return { ...item, quantity: item.quantity - 1 };
        }
        else return item;
    });
    return{
        ...state,
        basketItems: tempBasketItems
    }

}

/**
 * 
 * @param state 
 * @param id 
 * @returns 
 */
function removeItem(state: Basket, id: string):Basket{
    const tempBasketItems: BasketItem[] = state.basketItems.filter(item => item.id !== id);

    return{
        ...state,
        basketItems: tempBasketItems
    }

}

function addItemToBasket(state: Basket, product: ProductInfo):Basket{
    const existingItem = state.basketItems.find(item => item.id === product.id);
    let tempBasketItems: BasketItem[]

    if (existingItem) {
       tempBasketItems=state.basketItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      tempBasketItems=([...state.basketItems, { ...product, quantity: 1 }]);
    }
    return{
        ...state,
        basketItems: tempBasketItems
    }
  };








