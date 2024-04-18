

export interface BasketItem extends ProductInfo{
    quantity: number;
}

export interface ProductInfo{
    product_id: string;
    name: string;
    price: number;
    currency: string;
    discount_amount: number | null;
    discount_percent: number | null;
    upsellProductId: string | null;
    image_url: string | null;

}
export interface Price{
    priceBeforeRebate: number;
    rebatePercentage: number| null;
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

export interface Municipality {
    zip: number,
    city: string
}

