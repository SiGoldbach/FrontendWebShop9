import React from "react";



function DisplayItem(item: Item){

}



function ItemList(items:BasketItem[]){
    items.map((item)=>DisplayItem)






}


interface CompleteItem{
    item: Item;
    basketItem: BasketItem;
}

interface Item {
    id: String;
    name: String;
    price: number;
    currency: String;
    rebateQuantity: number;
    rebatePercent: number;
    upsellProductId: string;
}
interface BasketItem{
    id: String;
    quantity: number;
    giftWrap: Boolean;
}


export default ItemList;