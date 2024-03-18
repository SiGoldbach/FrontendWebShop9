import { ProductInfo } from "../TSReusedTypes/ItemsAndPrices.js"


//This function is getting all the items that needs to be displayed in the store 
export async function getItems(): Promise<ProductInfo[]>{
    let data: ProductInfo[] =[];

    const URL="https://raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json"
    const response = await fetch(URL);
    const responseAsJson= await response.json();
    data = responseAsJson.map(({ id, name,price,currency,rebateQuantity,rebatePercent,upsellProductId,imageUrl }:
        {id: string, name: string,price: number, currency: string,rebateQuantity:number,rebatePercent:number,upsellProductId:any,imageUrl:string}) => {
        return { id: id,
                 name: name,
                 price: price, 
                 currency: currency, 
                 rebateQuantity: rebateQuantity, 
                 rebatePercent: rebatePercent, 
                 upsellProductId: upsellProductId, 
                 imageUrl: imageUrl };
    });
    return data
}