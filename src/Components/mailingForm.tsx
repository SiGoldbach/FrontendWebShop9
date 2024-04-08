import React, {useState, useEffect} from 'react'

import { Basket,BasketItem,CustomerInfo } from "../TSReusedTypes/ItemsAndPrices.js"
import "../Pages/ShoppingCart"
import {submitOrder} from "../Networking/networking.js"

interface Municipality {
    zip: number,
    city: string
}

interface shoppingCartProps {
    basket: Basket;
    setBasketItems: (basketItems: BasketItem[]) => void
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

export function MailingForm(props: shoppingCartProps) {
    const [municipalities, setMunicipalities] = useState<Municipality[]>([]);

    const [customerInfo,setCustomerInfo ] = useState<CustomerInfo>({
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

    const handleUserInput =(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const { name, value} = event.target;
        console.log("Changin: "+name+ " to: "+ value)
        setCustomerInfo({
            ...customerInfo,
            [name]: value
        })   
    }

    const handleCheckboxChange =(event: React.ChangeEvent<HTMLInputElement>)=>{
        setCustomerInfo({
            ...customerInfo,
            [event.target.name]: event.target.checked
        })
    }

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
        const checkBox :HTMLInputElement = document.getElementById("alt-billing-box") as HTMLInputElement;
        const billingAddress :HTMLElement = document.getElementById("billingAddress") as HTMLElement;
        if(checkBox!=null && billingAddress!=null){
            if (checkBox.checked) {
                billingAddress.style.display = "block";
                console.log("checked")
            } else {
                billingAddress.style.display = "none";
                console.log("not checked")
            }
        }
    
    }

    return <form action="/mailing-form-handling" method="post">
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
                <label htmlFor="billAdress">Billing address</label>
                <input type="text" id="billAdress" name="bill_address"/>
            </li>
        </ul>

        <div className='paymentcontainer'>
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
            </div>
        </div>
        <input type="submit" value="Continue"/>

    </form>
    
    const isDanishPhoneNumberVaild = (event: React.ChangeEvent<HTMLInputElement>):boolean =>{
        const input =event.target.value;
        const regex = /(?:(?:00|\+)?45)?\d{8}/;
        return regex.test(input);

    }

    //Needs to be implemented. This function should handle wether the cutsomer has entered valid data to submit an order. 
    function isSubmitValid(): boolean
    {
        return true;

    }
    async function handleSumbitOrder(){
        console.log("Trying to submit order");
        const orderstatus = await submitOrder(props.basket,customerInfo)
        console.log("Order is proccesed responese: "+ orderstatus)

 
    }
}


export default MailingForm