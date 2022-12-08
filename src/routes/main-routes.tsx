import {RouteObject} from "react-router-dom"
import Error404Page from "../views/pages/error/error-page.compoent"
import MainLayout from "../views/layouts/main-layout/main-layout";
import ProtectedRoutes from "../views/layouts/protected-routes/protected-routes.component";
import Loadable from "../views/components/loader/loadable";
import {lazy} from "react";

// Loadable
const HomePage = Loadable(lazy(() => import("../views/pages/home/home-page.component")))
const HousePage = Loadable(lazy(() => import("../views/pages/house/house-page.component")))
const authRoute = (): RouteObject[] => {
    return [
        {
            path: "/",
            element: <ProtectedRoutes><MainLayout/></ProtectedRoutes>,
            errorElement: <Error404Page/>,
            children: [
                {
                    path: "home",
                    element: <HomePage/>
                },
            ]
        },
        {
            path: "request",
            element: <ProtectedRoutes><MainLayout/></ProtectedRoutes>,
            errorElement: <Error404Page/>,
            children: [
                {
                    path: "",
                    element: <HomePage/>
                },
                {
                    path: "house",
                    element: <HousePage/>
                },
            ]
        }
    ]
}

export default authRoute