import { ProductInfo, Basket,CustomerInfo,OrderInformation } from "../TSReusedTypes/ItemsAndPrices.js"


//This function is getting all the items that needs to be displayed in the store 
export async function getItems(): Promise<ProductInfo[]>{
    let data: ProductInfo[] =[];

    const URL="https://raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json"
    const response = await fetch(URL);
    const responseAsJson= await response.json();
    data = responseAsJson.map(({ id, name,price,currency,rebateQuantity,rebatePercent,upsellProductId,imageUrl }:
        {id: string, name: string,price: number, currency: string,rebateQuantity:number,rebatePercent:number,upsellProductId:string,imageUrl:string}) => {
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
//This is the function for submitting an order. 
//Its very poorly implemented right now needs to change. 
export async function submitOrder(basket: Basket, customerInfo:CustomerInfo): Promise<unknown>{
    console.log("In the procces of submitting order")
    const orderInfo: OrderInformation ={
        basket,
        customerInfo
    }
    const postOptions: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(orderInfo)
    };
    try {
        const response = await fetch("http://130.225.170.52:10191/order/succes",postOptions)
        
        if(!response.ok){
            throw new Error("Bad response")
        }
        console.log("Response was good");
        const responseInfo: number = await response.json();
        console.log(response.status);
        return responseInfo;

    } catch (error){
        throw new Error("Fetch error: "+ error);
    }

}