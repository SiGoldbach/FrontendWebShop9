

export interface BasketItem extends ProductInfo{
    quantity: number;
}

export interface ProductInfo{
    id: string;
    name: string;
    description: string;
    weight: number;
    price: number;
    currency: string;
    rebateQuantity: number;
    rebatePercent: number;
    upsellProductId: any;

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

