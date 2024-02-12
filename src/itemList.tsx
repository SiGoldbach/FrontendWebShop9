import React, { useState } from "react";
import './Data/product.json'




function DisplayItem(item: CompleteItem){
    return(
        <>
        <div>
    
        </div>
        </>

    )
   

}



function ItemList(){
    const [CompleteItem,setCompleteItems] = useState<CompleteItem[]>([]);



    async function fecthCompleteItems(){
        console.log("Trying to fetch items")
        const dataRoute= 'https://raw.githubusercontent.com/larsthorup/checkout-data/main/product.json'
        const response = await fetch(dataRoute)
        const returnedItems = await response.text()
        const parsedItems = JSON.parse(returnedItems);
        console.log(parsedItems)

        
        


    }
    return(
        <>
            <div>
                <p> Hi </p>
                <button onClick={()=>{
                    fecthCompleteItems()
                }}></button>


            </div>

        </>
    )



    






}


interface CompleteItem{
    itemInfo: ItemInfo;
    item: Item;
}

interface ItemInfo {
    id: string;
    name: string;
    description: string;
    weight: number;
    price: number;
    currency: string;
    rebateQuantity: number;
    rebatePercent: number;
    upsellProductId: string;
}
interface Item{
    id: string;
    quantity: number;
    giftWrap: boolean;
}


export default ItemList;