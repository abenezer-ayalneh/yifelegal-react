import {RouteObject} from "react-router-dom"
import Error404Page from "../views/pages/error/error-page.compoent"
import MainLayout from "../views/layouts/main-layout/main-layout";

const authRoute = (): RouteObject[] => {
    return [
        {
            path:"/",
            element:<MainLayout/>,
            errorElement: <Error404Page/>,
            children:[
                {
                    path:"/dashboard",
                    element: <div><h1>Hello</h1></div>
                }
            ]
        },
    ]
}

export default authRoute