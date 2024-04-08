import React, {useState, useEffect} from 'react'

import { Basket,CustomerInfo } from "../TSReusedTypes/ItemsAndPrices.js"
import {submitOrder} from "../Networking/networking.js"


interface Muncipality {
    zip: number,
    city: string
}


async function getMunicipalities(): Promise<Muncipality[]> {
    let data: Muncipality[] =[];
    try {
        const url = `https://api.dataforsyningen.dk/postnumre`;
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

type formsProps = {
    basket: Basket

}


function Forms(props: formsProps) {


    const [customerInfo,setCustomerInfo ] = useState<CustomerInfo>({
        firstName: "",
        lastName: "",
        Email: "",
        adressLine1:"",
        adressLine2:"",
        country: "",
        zipCode: "",
        city: "",
        phoneNumber: 0,
        optionalComment: "",
        company: "",
        companyVat: 0,
        acceptMarketingEmail: true,
        acceptTermsAndCondition: false
    });

    const handleUserInput =(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        const { name, value} = event.target;
        console.log("Changin: "+name+ " to: "+ value)
        setCustomerInfo({
            ...customerInfo,
            [name]: value
        })

        
    }
    const handleChecboxChange =(event: React.ChangeEvent<HTMLInputElement>)=>{
        setCustomerInfo({
            ...customerInfo,
            [event.target.name]: event.target.checked
        })        
    }
    const [municipalities, setMunicipalities] = useState<Muncipality[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getMunicipalities();
            setMunicipalities(data);
        }
        fetchData();
    }, []);

    const handleZipChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredZip = parseInt(event.target.value);
        const isValidZip = municipalities.some(({ zip }) => zip == enteredZip); //Checks whether the zip exists in the array
        event.target.setCustomValidity(isValidZip ? '' : 'Invalid') //This sets the validity to true if empty or false if not
        if (isValidZip) {
            const municipality = municipalities.find((m) => m.zip == enteredZip); //Gets the municipality (zip+city) of the zip
            if (municipality != null) {     //This should always happen.
                const cityInput= document.getElementById('city') as HTMLInputElement | null;
                if (cityInput) {
                    cityInput.value = municipality.city;

                }
                setCustomerInfo({
                    ...customerInfo,
                    zipCode: event.target.value,
                    city: municipality.city
                })  
            }
        }
    };

    return (
        <div className='shoppingCartContainer'>
            <div className="formsContainer">
                <form action="/my-handling-form-page" method="post">
                    <ul>
                        <li>
                            <label htmlFor="firstName">First name:</label>
                            <input type="text" id="firstName" name="firstName" value={customerInfo.firstName} onChange={handleUserInput} required/>
                        </li>
                        <li>
                            <label htmlFor="lastName">Last name:</label>
                            <input type="text" id="lastName" name="lastName" value={customerInfo.lastName} onChange={handleUserInput} required/>
                        </li>
                         <li>
                            <label htmlFor="mail">Email:</label>
                            <input type="email" id="mail" name="Email" value={customerInfo.Email} onChange={handleUserInput} required/>
                        </li>
                        <li>
                            <label htmlFor="address1">Address line 1:</label>
                            <input type="text" id="address1" name="adressLine1" value={customerInfo.adressLine1} onChange={handleUserInput}required/>
                        </li>
                        <li>
                            <label htmlFor="address2">Address line 2:</label>
                            <input type="text" id="address2" name="adressLine2" value={customerInfo.adressLine2} onChange={handleUserInput}/>
                        </li>
                        <li>
                            <label htmlFor="country">Country:</label>
                            <select id="country" name="country" value={customerInfo.country} onChange={handleUserInput}required>
                                <option value="denmark">Danmark</option>
                                <option value="sweden">Sweden</option>
                                <option value="norway">Norway</option>
                                <option value="germany">Germany</option>



                            </select>
                        </li>
                        <li>
                            <label htmlFor="zip">Zip code:</label>
                            <input type="number" id="zip" name="zipCode" value={customerInfo.zipCode} required
                                onChange={handleZipChange}
                            />
                        </li>
                        <li>
                            <label htmlFor="city">City:</label>
                            <input type="text" id="city" name="city" value={customerInfo.city} onChange={handleUserInput} required/>
                        </li>
                        <li>
                            <label htmlFor="phone">Phone number:</label>
                            <input type="number" id="phone" name="phoneNumber" value={customerInfo.phoneNumber} onChange={handleUserInput} required/>
                        </li>
                        <li>
                            <label htmlFor="company">Company:</label>
                            <input type="text" id="company" name="company" value={customerInfo.company} onChange={handleUserInput}/>
                        </li>
                        <li>
                            <label htmlFor="companyVAT">Company VAT:</label>
                            <input type="text" id="companyVAT" name="companyVat" value={customerInfo.companyVat} onChange={handleUserInput}/>
                        </li>
                    </ul>
                </form>
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
                        <input type="checkbox" name="acceptTermsAndCondition" checked={customerInfo.acceptTermsAndCondition} onChange={handleChecboxChange} />
                        I agree to the terms & conditions
                    </label>
                </div>
                <div className="line"></div>                
                </div>
            <button type="submit" className="checkoutButton" onClick={handleSumbitOrder}> Pay </button>
            </div>
        </div>
    </div>
    )

    const isDanishPhoneNumberVaild = (event: React.ChangeEvent<HTMLInputElement>):boolean =>{
        let input =event.target.value;
        let regex = /(?:(?:00|\+)?45)?\d{8}/;
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


    //Function for testing if a dansih phone number is a real number 
    

}


export default Forms