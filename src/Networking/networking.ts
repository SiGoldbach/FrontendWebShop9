import { ProductInfo, Basket,CustomerInfo,OrderInformation, Municipality } from "../TSReusedTypes/ReusedTypes.js"


//This function is getting all the items that needs to be displayed in the store. 
export async function getItems(): Promise<ProductInfo[]>{
  const URL="http://130.225.170.52:10191/productinfo"
  const response = await fetch(URL);
  const responseAsJson = await response.json();
  console.log(responseAsJson[0]);
  const data:ProductInfo[] = responseAsJson.map(({ product_id, name, price, currency, discount_amount, discount_percent, upsell_id,image_url }:
    {product_id: number, name: string, price: number, currency: string, discount_amount: number| null, discount_percent: number| null, upsell_id: number| null,image_url: string}) => {
    return { product_id: product_id.toString(),
      name: name,
      price: price,
      currency: currency,
      discount_amount: discount_amount,
      discount_percent: discount_percent,
      upsellProductId: upsell_id?.toString(),
      image_url: image_url };
  });
  console.log(data[0]);

  //console.log(responseAsJson[7]);
  return data;
}
//This is the function for submitting an order. 
//Its very poorly implemented right now needs to change. 
//Template built by chat GPT. I mostly needed help with building the postoptions
export async function submitOrder(basket: Basket, customerInfo:CustomerInfo): Promise<number>{
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
  }

  console.log("Submitting order to server")
  try {
    const response = await fetch("http://130.225.170.52:10191/order",postOptions)
        
    if(!response.ok){ console.log("Bad response") }
    console.log("Response was good");
    console.log(response)
    return response.status;
  } catch (error){
    throw new Error("Fetch error: "+ error);
  }
}

export async function getMunicipalities(): Promise<Municipality[]> {
  let data: Municipality[] =[];
  try {
    const url :string = `https://api.dataforsyningen.dk/postnumre`;
    const response = await fetch(url);
    const mbResult = await response.json();
    data = mbResult.map(({ nr, navn }:{nr: number, navn: string}) => {
      return { zip: nr, city: navn };
    });
      return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return data;
  }
}