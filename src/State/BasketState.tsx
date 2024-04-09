import {Basket,Price, BasketItem, ProductInfo,} from "../TSReusedTypes/ItemsAndPrices"

//Enum which describes the different commands the basket reducer should have 
export enum BasketItemKind{
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


export type Action = changeQunatityAction | addItemToBasketAction;



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
    const tempPriceList: Price[] = calculateItemPrices(tempBasketItems);
    const temptotalPrice:Price = calculateTotalPrice(tempPriceList)
    return{
        ...state,
        basketItems: tempBasketItems,
        priceList: tempPriceList,
        totalPrice: temptotalPrice
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
    const tempPriceList: Price[] = calculateItemPrices(tempBasketItems);
    const temptotalPrice:Price = calculateTotalPrice(tempPriceList)
    return{
        ...state,
        basketItems: tempBasketItems,
        priceList: tempPriceList,
        totalPrice: temptotalPrice
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

    const tempPriceList: Price[] = calculateItemPrices(tempBasketItems);
    const temptotalPrice:Price = calculateTotalPrice(tempPriceList)
    return{
        ...state,
        basketItems: tempBasketItems,
        priceList: tempPriceList,
        totalPrice: temptotalPrice
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
    const tempPriceList: Price[] = calculateItemPrices(tempBasketItems);
    const temptotalPrice:Price = calculateTotalPrice(tempPriceList)
    return{
        ...state,
        basketItems: tempBasketItems,
        priceList: tempPriceList,
        totalPrice: temptotalPrice
    }
  };

function calculateItemPrices(basketItems: BasketItem[]):Price[] {
    const itemPrices: Price[] = []
    basketItems.forEach((item) => {
        if (item.quantity >= item.rebateQuantity) {
        const price: Price = {
          priceBeforeRebate: item.price * item.quantity,
          rebatePercentage: item.rebatePercent,
          priceAfterRebate: (item.price * item.quantity) - ((item.price * item.quantity) * (item.rebatePercent / 100))
  
        };
        itemPrices.push(price)
  
      } else {
        const price: Price = {
          priceBeforeRebate: item.price * item.quantity,
          rebatePercentage: item.rebatePercent,
          priceAfterRebate: (item.price * item.quantity)
  
  
        };
        itemPrices.push(price)
  
      }
  
    });
    return itemPrices;
  
  }
  
  //TODO: Move calculateItemPrices to a price handeling component
  function calculateTotalPrice(itemPrices: Price[]):Price {
    if (itemPrices.length===0){
      const totalPrice: Price = {
        priceBeforeRebate: 0,
        rebatePercentage: 0,
        priceAfterRebate: 0
    
      };
      return totalPrice
    }
    const staticTotalRebateInPercent: number = 10;
    const staticTotalRebateTreshold: number = 300;
    //Calculating price before rebate
    const totalBeforeRebate: number = itemPrices.reduce((acc, curr) => {
      return acc + curr.priceBeforeRebate;
    }, 0);
    //Calculating price with numbers rebate
    const totalAfterAmountRebate: number = itemPrices.reduce((acc, curr) => {
      return acc + curr.priceAfterRebate;
    }, 0);
    let priceAfterRebate = totalAfterAmountRebate;
    if (totalAfterAmountRebate >= staticTotalRebateTreshold) {
      priceAfterRebate -= priceAfterRebate / staticTotalRebateInPercent;
    }
    const totalPrice: Price = {
      priceBeforeRebate: totalBeforeRebate,
      rebatePercentage: staticTotalRebateInPercent,
      priceAfterRebate: priceAfterRebate
  
    };
    return totalPrice;
  }





