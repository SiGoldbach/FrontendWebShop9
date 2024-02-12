import React from "react";



function DisplayItem(item: CompleteItem){
    return(
        <>
        <div>
    
        </div>
        </>

    )
   

}



function ItemList(items: Item[]){
    return(
        <><div>


        </div>

        </>
    )
    






}


interface CompleteItem{
    itemInfor: ItemInfo;
    item: Item;
}

interface ItemInfo {
    id: String;
    name: String;
    description: String;
    weight: number;
    price: number;
    currency: String;
    rebateQuantity: number;
    rebatePercent: number;
    upsellProductId: string;
}
interface Item{
    id: String;
    quantity: number;
    giftWrap: Boolean;
}


export default ItemList;