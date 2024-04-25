import { fireEvent, render, screen } from "@testing-library/react";
import {  describe, expect, it, vi } from "vitest";
import { createMemoryHistory } from "history";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import App from "../Pages/App";
import LandingPage from "../Pages/LandingPage";
import ShoppingCart from "../Pages/ShoppingCart";
import CheckoutPage from "../Pages/checkoutPage";
import Adminpanel from "../Pages/Adminpanel";

//tests are around 50% AI generated



// Mock components for different routes
vi.mock('../Pages/LandingPage', () => {
  return { default: () => <div>This is a landing page</div> };
});

vi.mock("../Pages/ShoppingCart", () => {
    return { default: () => <div>Shopping Cart Page</div> };
});

vi.mock('../Pages/checkoutPage', () => {
    return { default: () => <div>CheckoutPage</div> };

});
  
vi.mock('../Pages/Adminpanel', () => {
    return { default: () => <div>Adminpanel</div> };

});


describe('LandingPage Routing', () => {
    it('renders the landing page heading', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
              <LandingPage products={[]} />
            </MemoryRouter>
        );
    
        expect(screen.getByText('This is a landing page')).toBeInTheDocument();
    });

  // More routing tests to come
});


describe('ShoppingCart Routing', () => {
    it('renders the ShoppingCart page when navigated to', () => {
        render(
            <MemoryRouter initialEntries={['/shopping-cart']}>
                <Routes>
                    <Route path="/shopping-cart" element={<ShoppingCart />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText('Shopping Cart Page')).toBeInTheDocument();
    });
});


describe('CheckoutPage Routing', () => {
    it('renders the Checkout page when navigated to', () => {
        render(
            <MemoryRouter initialEntries={['/checkout']}>
                <Routes>
                    <Route path="/checkout" element={<CheckoutPage />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText('CheckoutPage')).toBeInTheDocument();
    });
});


describe('Adminpanel Routing', () => {
    it('renders the AdminPanel when navigated to', () => {
        render(
            <MemoryRouter initialEntries={['/Adminpanel']}>
                <Routes>
                    <Route path="/adminpanel" element={<Adminpanel />} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText('Adminpanel')).toBeInTheDocument();
    });
});