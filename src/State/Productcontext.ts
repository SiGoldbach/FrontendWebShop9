import { createContext, useContext } from "react";
import { ProductInfo } from "../TSReusedTypes/ItemsAndPrices";


export const ProductContext = createContext<ProductInfo[] | undefined>(undefined);

export function useProductContext(){
    const basketContext = useContext(ProductContext);

    if (basketContext===undefined){
        throw new Error("userContext is undefined");
    }

    return basketContext;

}