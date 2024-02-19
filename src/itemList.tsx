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
    const [CompleteItem,setCompleteItems] = useState(Array<CompleteItem>)
//Making a temporary array with input items 
    const currentItemList: Array<Item> = []
    const item1: Item = {
        id: "vitamin-d-90-100",
        quantity: 2,
        giftWrap: true
    }
    const item2: Item = {
        id: "vitamin-c-500-250",
        quantity: 1,
        giftWrap: false
    }
    const item3: Item ={
        id: "vitamin-c-depot-500-250",
        quantity: 7,
        giftWrap: false
    }
    currentItemList.push(item1,item2,item3)
    console.log(currentItemList)
// This function is a temprorary solution when the backend is up and running the https request will go there. 
    async function fecthCompleteItems(){
        console.log("Trying to fetch items")
        const response = await fetch('https://raw.githubusercontent.com/larsthorup/checkout-data/main/product.json')
        const returnedItems = await response.text()
        const parsedItems = JSON.parse(returnedItems)
        const chosenItems:Array<CompleteItem> = []
        console.log(parsedItems.length)
        console.log(currentItemList.length)
        for(let i=0;i<parsedItems.length;i++){
            for(let j=0;j<currentItemList.length;j++){
                console.log("in loop iteration: ", j)
                if(parsedItems[i].id===currentItemList[j].id){
                    const completeItem: CompleteItem ={
                        itemInfo: parsedItems[i],
                        item: currentItemList[j]
                    }
                    chosenItems.push(completeItem)
                    setCompleteItems(chosenItems)

                }
            }
        }
        console.log("the chosen items are: ", chosenItems)


        
        


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