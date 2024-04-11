import { RouteObject } from "react-router-dom";
import { CheckoutPage } from "./checkoutPage.tsx";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <CheckoutPage />,
  },
  {
    path: "/albums",
    element: <AlbumPicker />,
  },
];