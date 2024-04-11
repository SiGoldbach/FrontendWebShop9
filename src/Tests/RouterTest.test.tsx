import { fireEvent, render, screen } from "@testing-library/react";
import {  describe, expect, it, vi } from "vitest";
import { createMemoryHistory } from "history";
import { MemoryRouter, Route } from "react-router-dom";
import App from "../Pages/App";
import LandingPage from "../Pages/LandingPage";

//tests are around 50% AI generated



// Mock components for different routes
vi.mock('../Pages/LandingPage', () => {
  return { default: () => <div>This is a landing page</div> };
});

describe('Routing', () => {
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
