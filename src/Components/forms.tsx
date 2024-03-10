import {useState, useEffect} from 'react'

async function getMunicipalities() {
    try {
        const url = `https://api.dataforsyningen.dk/postnumre`;
        const response = await fetch(url);
        const mbResult = await response.json();
        const data = mbResult.map(({ nr: zip, navn: city }) => {
            return { zip, city };
        });
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

function forms() {
    const [municipalities, setMunicipalities] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getMunicipalities();
            setMunicipalities(data);
        }
        fetchData();
    }, []);

    const handleZipChange = (event) => {
        const enteredZip = parseInt(event.target.value);
        const isValidZip = municipalities.some(({ zip }) => zip == enteredZip); //Checks whether the zip exists in the array
        event.target.setCustomValidity(isValidZip ? '' : 'Invalid') //This sets the validity to true if empty or false if not
        if (isValidZip) {
            const municipality = municipalities.find((m) => m.zip == enteredZip); //Gets the municipality (zip+city) of the zip
            if (municipality != null) {     //This should always happen.
                document.getElementById('city').value = municipality.city; //Set the city input
            }
        }
    };

    return <form action="/my-handling-form-page" method="post">
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
}


export default forms