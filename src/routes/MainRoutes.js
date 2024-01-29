import { lazy } from "react";
import Loadable from "../components/Loadable";

const Home = Loadable(lazy(() => import("../pages/Home")));

const SingleProduct = Loadable(lazy(() => import("../pages/SingleProduct")));

const Cart = Loadable(lazy(() => import("../pages/Cart")));

const MainRoutes = ([
    

    // path: "/",
    // element: <Home/>,
    // children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/single-product/:id",
            element: <SingleProduct/>
        },
        {
            path: "/cart",
            element: <Cart/>
        }
    ])


export default MainRoutes;