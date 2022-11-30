import {RouteObject} from "react-router-dom"
import Error404Page from "../views/pages/error/error-page.compoent"
import MainLayout from "../views/layouts/main-layout/main-layout";
import HomePage from "../views/pages/home/home-page.component";

const authRoute = (): RouteObject[] => {
    return [
        {
            path:"/",
            element:<MainLayout/>,
            errorElement: <Error404Page/>,
            children:[
                {
                    path:"/home",
                    element: <HomePage/>
                }
            ]
        },
    ]
}

export default authRoute