import { RouteObject } from "react-router-dom";
import { BothForms } from "../Components/bothForms";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <BothForms />,
  },
  {
    path: "/albums",
    element: <AlbumPicker />,
  },
];