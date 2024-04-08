import { submitOrder } from "../Networking/networking";


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