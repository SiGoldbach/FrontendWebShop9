import React, {useState, useEffect} from 'react'
import { CustomerInfo,Municipality} from "../TSReusedTypes/ReusedTypes.ts";
import "./ShoppingCart.tsx"
import {submitOrder} from "../Networking/networking.ts";
import { useBasketContext} from '../State/Basketcontext';
import {getMunicipalities} from "../Networking/networking.ts"


export function CheckoutPage() {
    const basket = useBasketContext();

    const [orderComment, setOrderComment] = useState(() => {
        // Get the comment from sessionStorage if it exists
        const savedComment = sessionStorage.getItem('orderComment');
        return savedComment ?? '';
    });

    // Load comment from sessionStorage when component mounts
    useEffect(() => {
        const savedComment = sessionStorage.getItem('orderComment');
        if (savedComment) {
            setOrderComment(savedComment);
        }
    }, []);

    // Save comment to sessionStorage when it changes
    useEffect(() => {
        sessionStorage.setItem('orderComment', orderComment);
    }, [orderComment]);

    
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

    const [loading, setLoading] = useState<boolean>(false);//Add a submitting message while the form is being submitted to the server
    useEffect(() => {
        const button : HTMLElement|null = document.getElementById("checkoutButton");
        const loader : HTMLElement|null = document.getElementById("loader");
        if (button != null && loader != null) {
            if (loading) {
                //button.textContent = "Submitting";
                loader.style.display = 'inline-block';
                console.log("loading")
            } else {
                //button.textContent = "Pay";
                loader.style.display = 'none';
                console.log("not loading")
            }
        }
    }, [loading]);


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

    
    const [isPopCheckUpOpen,setIsCheckPopupOpen]= useState(false);
    function openCheckoutPopUp(){
        setIsCheckPopupOpen(true);
        console.log("Popupbox is: "+isPopCheckUpOpen);
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

        customerInfo.optionalComment = orderComment;
        submitOrder(basket, customerInfo);
        //TODO: Add validation on form items before "submitOrder" call
        setLoading(true)
        const result = submitOrder(basket, customerInfo)
        result.then(() => {
            console.log("Popup opened")
            openCheckoutPopUp
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
            setLoading(false)
            //Warning at the top: Order failed
        })
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
                        <input type="text" id="phone" name="user_phone" required pattern="\d{8}|\s*\+45\s*\d{2}\s*\d{2}\s*\d{2}\s*\d{2}\s*"/>
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
                    <li>
                        <div className="comment-container">
                            <textarea
                                id="comment"
                                name="comment"
                                className="comment-textarea"
                                value={orderComment}
                                onChange={(e) => setOrderComment(e.target.value)}
                                placeholder="Add a comment to your order (optional)"
                            />
                        </div>
                    </li>
                </ul>
            </div>
            <div className="paymentContainer">
                <ul>
                    <li>
                        <p>Final Price: {basket.totalPrice.priceAfterRebate} DKK</p>
                        <label htmlFor="kortnummer">Kortnummer:</label>
                        <input type="text" id="kortnummer" name="kort_nummer" required
                               pattern="\s*\d{4}\s*\d{4}\s*\d{4}\s*\d{4}\s*"/>
                    </li>
                    <li>
                        <label htmlFor="udloebsdato">MM/YY:</label>
                        <input type="text" id="udloebsdato" name="kort_udloebsdato" required
                               pattern="(0[1-9]|1[0-2])\/([2-9][0-9])"/>
                    </li>
                    <li>
                        <label htmlFor="sikkerhedskode">Sikkerhedskode*:</label>
                        <input type="text" id="sikkerhedskode" name="kort_sikkerhedskode" required pattern="\d{3}"/>
                    </li>
                </ul>
                <ul>
                    <li>
                        <label htmlFor="acceptMarketingEmail">I agree to receive marketing emails</label>
                        <input type="checkbox" id="acceptMarketingEmail" name="acceptMarketingEmail"/>
                    </li>
                    <li>
                        <label htmlFor="acceptTermsAndCondition">I agree to the terms & conditions</label>
                        <input type="checkbox" id="acceptTermsAndCondition" name="acceptTermsAndCondition" required/>
                    </li>
                </ul>
                <button className="checkoutButton" id="checkoutButton" onClick={onSubmitClick}>
                    Pay
                    <div className="loader" id="loader"></div>
                </button>
            </div>
        </div>
    </form>
}


export default CheckoutPage