import { fireEvent, render, screen } from "@testing-library/react";
import { assert, describe, expect, it } from "vitest";
import App from "../Pages/App";


//Walkthrough of the site test
describe(App.name, () => {
  it("should render", () => {
    render(<App />);
    expect(screen.getByText("Shopping Cart")).toBeInTheDocument();

    const goToShoppingCartLink= screen.getByText("Shopping Cart")

    //Going the next page and trying to see if the Price element is there
    fireEvent.click(goToShoppingCartLink);
    expect(screen.getByText("Price:")).toBeInTheDocument();
    //Removing the first element in the shopping cart and making sure the amount of remove buttons get reduced by 1

    const removeItem= screen.getAllByText("Remove")
    console.log(removeItem.length)
    const expectedAmountOfUniqueItems=removeItem.length;
    fireEvent.click(removeItem[0]);
    assert(expectedAmountOfUniqueItems-1==screen.getAllByText("Remove").length)

    
    const increaseItemQuantity= screen.getAllByText("+")[0];
    fireEvent.click(increaseItemQuantity);

    const decreaseItemQuantity= screen.getAllByText("-")[0];
    fireEvent.click(decreaseItemQuantity);

    //Remove remaining Items to get 100% Code coverage here the important thing is that the program still works for now as of 11/03
    const removeItem1= screen.getAllByText("Remove")
    fireEvent.click(removeItem1[0]);
    assert(expectedAmountOfUniqueItems-2==screen.getAllByText("Remove").length)
    const removeItem2= screen.getAllByText("Remove")
    fireEvent.click(removeItem2[0]);




    









  });
});
