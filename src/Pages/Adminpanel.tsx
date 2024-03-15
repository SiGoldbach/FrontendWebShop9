import React, {useState, useEffect} from 'react'



function Adminpanel() {
    


    return (
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
        </ul>
    </form>
    )
}


export default Adminpanel