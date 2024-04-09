import React, { createContext, useContext } from "react";
import { Basket } from "../TSReusedTypes/ItemsAndPrices";
import { Action } from "./BasketState";

export const BasketContext = createContext<Basket | undefined>(undefined);

export const BasketDispatchContext = createContext<React.Dispatch<Action> |undefined>(undefined);

export function useBasketContext(){
    const basketContext = useContext(BasketContext);

    if (basketContext===undefined){
        throw new Error("userContext is undefined");
    }

    return basketContext;

}
export function useBasketDispatchContext(){
    const basketDispatchContext = useContext(BasketDispatchContext);

    if (basketDispatchContext===undefined){
        throw new Error("userContext is undefined");
    }

    return basketDispatchContext;

}