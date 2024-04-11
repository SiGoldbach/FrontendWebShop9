/*
import React, {useState} from 'react'
import { MailingForm } from "../Components/mailingForm.js"
import { Basket,BasketItem, CustomerInfo} from "../TSReusedTypes/ItemsAndPrices.js"

type formsProps = {
    basket: Basket

}


export function CheckoutPage(props: formsProps) {


    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        firstName: "",
        lastName: "",
        email: "",
        addressLine1: "",
        addressLine2: "",
        country: "",
        zipCode: "",
        city: "",
        phoneNumber: "",
        optionalComment: "",
        company: "",
        companyVat: "",
        acceptMarketingEmail: true,
    });

    const handleChecboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerInfo({
            ...customerInfo,
            [event.target.name]: event.target.checked
        })
    }
    return (
        <div className='shoppingCartContainer'>
            <div className="formsContainer">
                <MailingForm basket={props.basket} setBasketItems={function(basketItems: BasketItem[]): void {
                    throw new Error('Function not implemented.')
                } } />
            </div>
            <div className="paymentContainer">
                <div>
                    <form action="/my-handling-payment-page" method="post">
                        <ul>
                            <li>
                                <p>Total {props.basket.totalPrice.priceAfterRebate}</p>
                                <label htmlFor="kortnummer">Kortnummer:</label>
                                <input type="text" id="kortnummer" name="kort_nummer"/>
                            </li>
                            <li>
                                <label htmlFor="udloebsdato">MM/YY:</label>
                                <input type="text" id="udloebsdato" name="kort_udloebsdato"/>
                            </li>
                            <li>
                                <label htmlFor="sikkerhedskode">Sikkerhedskode*:</label>
                                <input type="text" id="sikkerhedskode" name="kort_sikkerhedskode"/>
                            </li>
                        </ul>
                    </form>
                    <div className="checkboxBox">
                        <div className="CheckBox">
                            <label>
                                <input type="checkbox" name="acceptMarketingEmail" checked={customerInfo.acceptMarketingEmail} onChange={handleChecboxChange}/>
                                I agree to receive marketing emails
                            </label>
                        </div>
                        <div className="CheckBox">
                            <label>
                                <input type="checkbox" name="acceptTermsAndCondition" onChange={handleChecboxChange} />
                                I agree to the terms & conditions
                            </label>
                        </div>
                        <div className="line"></div>
                    </div>
                    <button type="submit" className="checkoutButton" > Pay </button>
                </div>
            </div>
        </div>
    )

    //Function for testing if a dansih phone number is a real number 
    

}*/