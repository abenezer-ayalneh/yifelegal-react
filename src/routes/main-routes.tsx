import {RouteObject} from "react-router-dom"
import Error404Page from "../views/pages/error/error-page.compoent"
import MainLayout from "../views/layouts/main-layout/main-layout";
import HomePage from "../views/pages/home/home-page.component";
import ProtectedRoutes from "../views/layouts/protected-routes/protected-routes.component";

const authRoute = (): RouteObject[] => {
    return [
        {
            path: "/",
            element: <ProtectedRoutes><MainLayout/></ProtectedRoutes>,
            errorElement: <Error404Page/>,
            children: [
                {
                    path: "/home",
                    element: <HomePage/>
                }
            ]
        },
    ]
}

export default authRoute