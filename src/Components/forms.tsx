import React, {useState, useEffect} from 'react'

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

function Forms() {
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
            }
        }
    };

    return (<>
        <div className='shoppingCartContainer'>
            <div className="formsContainer">
                <form action="/my-handling-form-page" method="post">
                    <ul>
                        <li>
                            <label htmlFor="firstName">First name:</label>
                            <input type="text" id="firstName" name="user_first_name" required/>
                        </li>
                        <li>
                            <label htmlFor="lastName">Last name:</label>
                            <input type="text" id="lastName" name="user_last_name" required/>
                        </li>
                         <li>
                            <label htmlFor="mail">Email:</label>
                            <input type="email" id="mail" name="user_email" required/>
                        </li>
                        <li>
                            <label htmlFor="address1">Address line 1:</label>
                            <input type="text" id="address1" name="user_address_1" required/>
                        </li>
                        <li>
                            <label htmlFor="address2">Address line 2:</label>
                            <input type="text" id="address2" name="user_address_2"/>
                        </li>
                        <li>
                            <label htmlFor="country">Country:</label>
                            <select id="country" name="user_country" required>
                                <option value="denmark">Danmark</option>
                            </select>
                        </li>
                        <li>
                            <label htmlFor="zip">Zip code:</label>
                            <input type="number" id="zip" name="user_zip" required
                                onChange={handleZipChange}
                            />
                        </li>
                        <li>
                            <label htmlFor="city">City:</label>
                            <input type="text" id="city" name="user_city" required/>
                        </li>
                        <li>
                            <label htmlFor="phone">Phone number:</label>
                            <input type="text" id="phone" name="user_phone"/>
                        </li>
                        <li>
                            <label htmlFor="company">Company:</label>
                            <input type="text" id="company" name="company_name"/>
                        </li>
                        <li>
                            <label htmlFor="companyVAT">Company VAT:</label>
                            <input type="text" id="companyVAT" name="company_VAT"/>
                        </li>
                    </ul>
                </form>
            </div>
            <div className="paymentContainer">
                <div>
                    <form action="/my-handling-payment-page" method="post">
                        <ul>
                            <li>
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
                            <p>ToDo CheckBox for marketing emails</p>
                        </div>
                        <div className="CheckBox">
                            <p>ToDo CheckBox for the terms & conditions</p>
                        </div>
                        <div className="line"></div>                
                    </div>
                    <button type="button" className="orderButton"> Place Order </button>
                </div>
            </div>
        </div>
    </>
    )
}


export default Forms