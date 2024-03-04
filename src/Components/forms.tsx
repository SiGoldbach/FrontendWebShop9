

function identificationForm() {
    return <form action="/my-handling-form-page" method="post">
        <ul>
            <li>
                <label htmlFor="firstName">First name:</label>
                <input type="text" id="firstName" name="user_first_name"/>
            </li>
            <li>
                <label htmlFor="lastName">Last name:</label>
                <input type="text" id="lastName" name="user_last_name"/>
            </li>
            <li>
                <label htmlFor="mail">Email:</label>
                <input type="email" id="mail" name="user_email"/>
            </li>
            <li>
                <label htmlFor="address1">Address line 1:</label>
                <input type="text" id="address1" name="user_address_1"/>
            </li>
            <li>
                <label htmlFor="address2">Address line 2:</label>
                <input type="text" id="address2" name="user_address_2"/>
            </li>
        </ul>
    </form>

}