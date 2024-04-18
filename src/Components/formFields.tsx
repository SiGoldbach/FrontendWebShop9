const formFields = [
  {
    label: "First Name*",
    type: "text",
    id: "firstName",
    name: "user_first_name",
    required: true,
    pattern: null,
    readonly: false,
    onChange: null
  },
  {
    label: "Last Name*",
    type: "text",
    id: "lastName",
    name:"user_last_name",
    required: true,
    pattern: null,
    readonly: false,
    onChange: null
  },
  {
    label: "Email*",
    type: "email",
    id: "mail",
    name: "user_email",
    required: true,
    pattern: null,
    readonly: false,
    onChange: null
  },
  {
    label: "Address line 1*",
    type: "text",
    id: "address1",
    name: "user_address_1",
    required: true,
    pattern: null,
    readonly: false,
    onChange: null
  },
  {
    label: "Address line 2",
    type: "text",
    id: "address2",
    name: "user_address_2",
    required: false,
    pattern: null,
    readonly: false,
    onChange: null
  },
  {
    label: "Country*",
    type: "select",
    id: "country",
    name: "user_country",
    required: true,
    options: [{ value: "denmark", text: "Denmark"}],
    pattern: null,
    readonly: true,
    onChange: null
  },
  {
    label: "Zip code*",
    type: "number",
    id: "zip",
    name: "user_zip",
    required: true,
    pattern: null,
    readonly: false,
    onChange: null /* {handleZipChange} */
  }, 
  {
    label: "City*",
    type: "text",
    id: "city",
    name: "user_city",
    required: true,
    pattern: null,
    readonly: true,
    onChange: null
  },
  {
    label: "Phone Number*",
    type: "text",
    id: "phone",
    name: "user_phone",
    required: true,
    pattern: "\d{8}",
    readonly: false,
    onChange: null
  },
  {
    label: "Company",
    type: "text",
    id: "company",
    name: "company_name",
    required: false,
    pattern: null,
    readonly: false,
    onChange: null
  },
  {
    label: "Company VAT",
    type: "text",
    id: "companyVAT",
    name: "company_VAT",
    required: false,
    pattern: "\d{8}",
    readonly: false,
    onChange: null 
  },
  {
    label: "Bill to a different address",
    type: "checkbox",
    id: "alt-billing-box",
    name: "alt_billing_address",
    required: false,
    pattern: null,
    readonly: false,
    onChange: null
  },
  {
    label: "Card Number:",
    type: "text",
    id: "kortnummer",
    name: "kort_nummer",
    required: true,
    pattern: null, /* TODO: fix */
    readonly: false,
    onChange: null
  },
  {
    label: "MM/YY",
    type: "text",
    id: "udloebsdato",
    name: "kort_udloebsdato",
    required: true,
    pattern: null, /* TODO: fix */
    readonly: false,
    onChange: null
  },
  {
    label: "Security code*",
    type: "text",
    id: "sikkerhedskode",
    name: "kort_sikkerhedskode",
    required: true,
    pattern: null, /* TODO: Fix */
    readonly: false,
    onChange: null
  },
  {
    label: "I agree to recieve marketing emails",
    type: "checkbox",
    id: "acceptMarketingEmail",
    name: "acceptMarketingEmail",
    required: false,
    pattern: null,
    readonly: false,
    onChange: null
  },
  {
    label: "I agree to the terms & conditions",
    type: "checkbox",
    id: "acceptTermsAndConditions",
    name: "acceptTermsAndConditions",
    required: false,
    pattern: null,
    readonly: false,
    onChange: null
  },
]