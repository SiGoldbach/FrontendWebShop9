

export interface BasketItem{
    id: string;
    quantity: number;
    giftWrap: boolean;
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
    prceAfterRebate: number;

}

