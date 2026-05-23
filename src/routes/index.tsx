import { createBrowserRouter } from "react-router";
import App from "../App";
import RouteLayout from "./layout";

export const routes = createBrowserRouter([
     {
          element: <RouteLayout/>,
          children: [
               { path: "/", element: <App/> },
          ]
     }
]);