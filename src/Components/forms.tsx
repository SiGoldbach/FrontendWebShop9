

function forms() {
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
                <input type="number"  id="zip" name="user_zip" min="1000" max="9999" required/> 
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