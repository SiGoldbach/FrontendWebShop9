import { RouteObject } from "react-router-dom";
import { CheckoutPage } from "./Checkoutpage";

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