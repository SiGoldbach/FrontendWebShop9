

export interface BasketItem extends ProductInfo{
    quantity: number;
}

export interface ProductInfo{
    id: string;
    name: string;
    price: number;
    currency: string;
    rebateQuantity: number;
    rebatePercent: number;
    upsellProductId: any;
    imageUrl: string

}
export interface Price{
    priceBeforeRebate: number;
    rebatePercentage: number;
    priceAfterRebate: number;

}
export interface Basket {
    basketItems: BasketItem[]
    priceList: Price[]
    totalPrice: Price

    

}

