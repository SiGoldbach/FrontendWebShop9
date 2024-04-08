

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
    Email: string;
    adressLine1: string;
    adressLine2: string;
    country: string;
    zipCode: string;
    city: string;
    phoneNumber: number;
    optionalComment: string;
    company: string;
    companyVat: number;
    acceptMarketingEmail: boolean
    acceptTermsAndCondition: boolean
}

export interface OrderInformation {
    customerInfo: CustomerInfo;
    basket: Basket;
}

