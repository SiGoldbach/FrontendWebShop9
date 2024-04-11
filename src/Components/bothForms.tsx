import React, {useState, useEffect} from 'react'
import { CustomerInfo} from "../TSReusedTypes/ItemsAndPrices.ts";
import "../Pages/ShoppingCart"
import {submitOrder} from "../Networking/networking.ts";
import { useBasketContext } from '../State/Basketcontext.ts';

interface Municipality {
    zip: number,
    city: string
}


async function getMunicipalities(): Promise<Municipality[]> {
    let data: Municipality[] =[];
    try {
        const url :string = `https://api.dataforsyningen.dk/postnumre`;
        const response = await fetch(url);
        const mbResult = await response.json();
        data = mbResult.map(({ nr, navn }:{nr: number, navn: string}) => {
            return { zip: nr, city: navn };
        });
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return data;
    }
}



export function BothForms() {
    const basket = useBasketContext();
    const [customerInfo] = useState<CustomerInfo>({
        firstName: "",
        lastName: "",
        email: "",
        addressLine1:"",
        addressLine2:"",
        country: "",
        zipCode: "",
        city: "",
        phoneNumber: "",
        optionalComment: "",
        company: "",
        companyVat: "",
        acceptMarketingEmail: true,
    });

    const [municipalities, setMunicipalities] = useState<Municipality[]>([]);
    useEffect(() => {
        async function fetchData() {
            const data: Municipality[] = await getMunicipalities();
            setMunicipalities(data);
        }

        fetchData();
    }, []);

    const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const enteredZip: number = parseInt(event.target.value);
        const isValidZip: boolean = municipalities.some(({zip}) => zip == enteredZip); //Checks whether the zip exists in the array
        event.target.setCustomValidity(isValidZip ? '' : 'Zip not found') //setCustomValidity sets the validity to true if the message is empty
        if (isValidZip) {
            const municipality = municipalities.find((m) => m.zip == enteredZip); //Gets the municipality (zip+city) of the zip
            if (municipality != null) {     //This should always happen.
                const cityInput = document.getElementById('city') as HTMLInputElement | null;
                if (cityInput) {
                    cityInput.value = municipality.city;
                }
            }
        }
    };

    const toggleBillingAddress = (): void => {
        const checkBox: HTMLInputElement = document.getElementById("alt-billing-box") as HTMLInputElement;
        const billingAddress: HTMLElement = document.getElementById("billingAddress") as HTMLElement;
        if (checkBox != null && billingAddress != null) {
            if (checkBox.checked) {
                billingAddress.style.display = "block";
            } else {
                billingAddress.style.display = "none";
            }
        }
    }

    const onSubmitClick = () :void => {
        //const form = document.getElementById("forms");
        const firstName :HTMLInputElement = document.getElementById("firstName") as HTMLInputElement;
        customerInfo.firstName = firstName.value
        const lastName = document.getElementById("lastName") as HTMLInputElement;
        customerInfo.lastName = lastName.value
        const email = document.getElementById("mail") as HTMLInputElement;
        customerInfo.email = email.value
        const addressLine1 = document.getElementById("address1") as HTMLInputElement;
        customerInfo.addressLine1 = addressLine1.value
        const addressLine2 = document.getElementById("address2") as HTMLInputElement;
        customerInfo.addressLine2 = addressLine2.value
        const country = document.getElementById("country") as HTMLInputElement;
        customerInfo.country = country.value
        const zipCode = document.getElementById("zip") as HTMLInputElement;
        customerInfo.zipCode = zipCode.value
        const city = document.getElementById("city") as HTMLInputElement;
        customerInfo.city = city.value
        const phoneNumber = document.getElementById("phone") as HTMLInputElement;
        customerInfo.phoneNumber = phoneNumber.value
        const company = document.getElementById("company") as HTMLInputElement;
        customerInfo.company = company.value
        const companyVAT = document.getElementById("companyVAT") as HTMLInputElement;
        customerInfo.companyVat = companyVAT.value
        const acceptMarketingEmail = document.getElementById("billAddress") as HTMLInputElement;
        customerInfo.acceptMarketingEmail = acceptMarketingEmail.checked

        //TODO: Add validition on form items before "submitOrder" call
        console.log("submit")
        submitOrder(basket, customerInfo)
    }


    return <form className="forms">
        <div className="shoppingCartContainer">
            <div className="formsContainer">
                <ul>
                    <li>
                        <label htmlFor="firstName">First name*</label>
                        <input type="text" id="firstName" name="user_first_name" required/>
                    </li>
                    <li>
                        <label htmlFor="lastName">Last name*</label>
                        <input type="text" id="lastName" name="user_last_name" required/>
                    </li>
                    <li>
                        <label htmlFor="mail">Email*</label>
                        <input type="email" id="mail" name="user_email" required/>
                    </li>
                    <li>
                        <label htmlFor="address1">Address line 1*</label>
                        <input type="text" id="address1" name="user_address_1" required/>
                    </li>
                    <li>
                        <label htmlFor="address2">Address line 2</label>
                        <input type="text" id="address2" name="user_address_2"/>
                    </li>
                    <li>
                        <label htmlFor="country">Country*</label>
                        <select id="country" name="user_country" required>
                            <option value="denmark">Danmark</option>
                        </select>
                    </li>
                    <li>
                        <label htmlFor="zip">Zip code*</label>
                        <input type="number" id="zip" name="user_zip" required
                            onChange={handleZipChange}
                        />
                    </li>
                    <li>
                        <label htmlFor="city">City*</label>
                        <input type="text" id="city" name="user_city" required readOnly/>
                    </li>
                    <li>
                        <label htmlFor="phone">Phone number*</label>
                        <input type="text" id="phone" name="user_phone" required pattern="\d{8}"/>
                    </li>
                    <li>
                        <label htmlFor="company">Company</label>
                        <input type="text" id="company" name="company_name"/>
                    </li>
                    <li>
                        <label htmlFor="companyVAT">Company VAT</label>
                        <input type="text" id="companyVAT" name="company_VAT" pattern="\d{8}"/>
                    </li>
                    <li>
                        <label htmlFor="alt-billing-box">Bill to a different address</label>
                        <input type="checkbox" id="alt-billing-box" name="alt_billing_address"
                            onChange={toggleBillingAddress}/>
                    </li>
                    <li id="billingAddress" className="billingAddress">
                        <label htmlFor="billAddress">Billing address</label>
                        <input type="text" id="billAddress" name="bill_address"/>
                    </li>
                </ul>
            </div>
            <div className="paymentContainer">
                <ul>
                    <li>
                        <p>Final Price: {basket.totalPrice.priceAfterRebate}</p>
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
                <ul>
                    <li>
                        <label htmlFor="acceptMarketingEmail">I agree to receive marketing emails</label>
                        <input type="checkbox" id="acceptMarketingEmail" name="acceptMarketingEmail"/>
                    </li>
                    <li>
                        <label htmlFor="acceptTermsAndCondition">I agree to the terms & conditions</label>
                        <input type="checkbox" id="acceptTermsAndCondition" name="acceptTermsAndCondition"/>
                    </li>
                </ul>
                <button type="submit" className="checkoutButton" onClick={onSubmitClick} >Pay</button>
            </div>
        </div>
        
    </form>

}

export default BothForms