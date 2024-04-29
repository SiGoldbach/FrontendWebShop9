import React from 'react';
import { render, screen, fireEvent, RenderOptions } from '@testing-library/react';
import { CheckoutPage } from '../Pages/checkoutPage';

import { describe, expect, it, vi } from 'vitest';
import { BasketContext, BasketDispatchContext } from '../State/Basketcontext';
import { Basket } from '../TSReusedTypes/ReusedTypes'; 


//Mocking of basket interface
const mockBasket: Basket = {
    basketItems: [], 
    priceList: [], 
    totalPrice: {
        priceBeforeRebate: 0,
        priceAfterRebate: 0,
        rebatePercentage: 0, 
    },
};



  const mockDispatch = vi.fn();

interface CustomRenderOptions extends RenderOptions {
    providerProps?: {
      basket?: Basket; 
      dispatch?: React.Dispatch<any>; // Substitute with the correct dispatch type
    };
  }
const renderWithProviders = (
    ui: React.ReactElement,
    { providerProps = {}, ...renderOptions }: CustomRenderOptions = {}
  ) => {
    const basketValue = providerProps.basket || mockBasket;
    const dispatchValue = providerProps.dispatch || mockDispatch;
  
    return render(
      <BasketContext.Provider value={basketValue}>
        <BasketDispatchContext.Provider value={dispatchValue}>
          {ui}
        </BasketDispatchContext.Provider>
      </BasketContext.Provider>,
      renderOptions 
    );
  };

describe('CheckoutPage Component', () => {
    it('renders the first name input field', () => {
        renderWithProviders(<CheckoutPage />);
        const firstNameInput = screen.getByLabelText(/First name\*/i);
        expect(firstNameInput).toBeInTheDocument();
    });

    it('renders the last name input field', () => {
        renderWithProviders(<CheckoutPage />);
        const lastNameInput = screen.getByLabelText(/Last name\*/i);
        expect(lastNameInput).toBeInTheDocument();
    });
    
    it('should have @ in input field', () => {
        renderWithProviders(<CheckoutPage />);
        const emailInput:HTMLInputElement = screen.getByLabelText(/Email\*/i);
        fireEvent.change(emailInput, { target: {value: 'user@example.com'}});
        expect(emailInput.value).toContain( '@');
    });

    // FOLLOWING TEST TO MAKE SURE IT WAS NOT FAKE PASSING
    /*
    it('should fail if the first name field is not required', () => {
        renderWithProviders(<CheckoutPage />);
        const firstNameInput = screen.getByLabelText(/First name\i);
        expect(firstNameInput).not.toBeRequired(); 
    });
    */
      
});
