import { fireEvent, render, screen } from "@testing-library/react";
import {  describe, expect, it } from "vitest";
import App from "../Pages/App";
import {getItems} from "../Networking/networking";

//Sleep function generated with chatGPT.
//This is without a doubt the simplest way to solve the problem of a test failing becase of delay
async function sleep(milliseconds: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}

//Walkthrough of the site test
describe(App.name, async () => {
  it("should render", async() => {
    render(<App />);
    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    await sleep(3000);
    



    const fillBasket = screen.getAllByText("Add to cart");
    fireEvent.click(fillBasket[0]);
    fireEvent.click(fillBasket[0]);
    fireEvent.click(fillBasket[0]);
    fireEvent.click(fillBasket[1]);
    fireEvent.click(fillBasket[1]);
    fireEvent.click(fillBasket[1]);
    fireEvent.click(fillBasket[2]);
    fireEvent.click(fillBasket[2]);
    fireEvent.click(fillBasket[2]);
    const goToShoppingCartLink= screen.getByText("Shopping Cart")

    //Going the next page and trying to see if the Price element is there
    fireEvent.click(goToShoppingCartLink);
    expect(screen.getByText("Price:")).toBeInTheDocument();
    //Removing the first element in the shopping cart and making sure the amount of remove buttons get reduced by 1

    const removeItem= screen.getAllByText("Remove")
    console.log(removeItem.length)
    const expectedAmountOfUniqueItems=removeItem.length;
    fireEvent.click(removeItem[0]);
    expect(expectedAmountOfUniqueItems-1==screen.getAllByText("Remove").length)

    
    const increaseItemQuantity= screen.getAllByText("+")[0];
    fireEvent.click(increaseItemQuantity);

    const decreaseItemQuantity= screen.getAllByText("-")[0];
    fireEvent.click(decreaseItemQuantity);

    //Remove remaining Items to get 100% Code coverage here the important thing is that the program still works for now as of 11/03
    const removeItem1= screen.getAllByText("Remove")
    fireEvent.click(removeItem1[0]);
    expect(expectedAmountOfUniqueItems-2==screen.getAllByText("Remove").length)
    const removeItem2= screen.getAllByText("Remove")
    fireEvent.click(removeItem2[0]);
  });
});
//This test is testing the networking of getItems the first test is that the item list is atleast one 
describe("Testing getItemsFuncionality", async ()=>{
  it("Should get the items from the server",async()=>{
    const data = await getItems();
    expect(data.length!=0)
    console.log(data[0])
  })


  
})
