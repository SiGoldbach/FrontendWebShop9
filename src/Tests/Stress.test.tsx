import { fireEvent, render, screen } from "@testing-library/react";
import {  describe, expect, it } from "vitest";
import App from "../Pages/App";

//This is stress test to see if what happens if the all the buttons are getting pressed a lot. 
async function sleep(milliseconds: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}

describe("StressTest", async ()=>{
  it("should render", async() => {
    render(<App />);
    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
    await sleep(4000);
    const fillBasket = screen.getAllByText("Add to cart");
    for(let i=0;i<1000;i++){
      fireEvent.click(fillBasket[0]);
      fireEvent.click(fillBasket[2]);
      fireEvent.click(fillBasket[3]);
      fireEvent.click(fillBasket[4]);
      fireEvent.click(fillBasket[5]);
      fireEvent.click(fillBasket[6]);
      fireEvent.click(fillBasket[7]);
      fireEvent.click(fillBasket[8]);
      fireEvent.click(fillBasket[9]);
    }
    const goToShoppingCartLink= screen.getByText("Shopping Cart")

    //Going the next page and trying to see if the Price element is there
    fireEvent.click(goToShoppingCartLink);
    expect(screen.getByText("Price:")).toBeInTheDocument();

    const removeItem= screen.getAllByText("Remove")
    console.log(removeItem.length)
    const expectedAmountOfUniqueItems=removeItem.length;
    fireEvent.click(removeItem[0]);
    expect(expectedAmountOfUniqueItems-1==screen.getAllByText("Remove").length)
    
  })
})