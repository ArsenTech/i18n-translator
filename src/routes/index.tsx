import { createBrowserRouter } from "react-router";
import MainPage from "../pages/main"
import RouteLayout from "./layout";

export const routes = createBrowserRouter([
     {
          element: <RouteLayout/>,
          children: [
               { path: "/", element: <MainPage/> },
          ]
     }
]);