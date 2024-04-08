

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
    upsellProductId: unknown;
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
export interface CustomerInfo {
    firstName: string;
    lastName: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    country: string;
    zipCode: string;
    city: string;
    phoneNumber: string;
    optionalComment: string;
    company: string;
    companyVat: string;
    acceptMarketingEmail: boolean
}

export interface OrderInformation {
    customerInfo: CustomerInfo;
    basket: Basket;
}

