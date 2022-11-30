import {RouteObject} from "react-router-dom"
import LoginPage from "../views/pages/login/login-page.component"
import Error404Page from "../views/pages/error/error-page.compoent"
import OTPPage from "../views/pages/otp/otp-page.component";
import {PersonalInformationPage} from "../views/pages/personal-information/personal-information-page.component";
import HomePage from "../views/pages/home/home-page.component";

const authRoute = (): RouteObject[] => {
    return [
        {
            path:"/",
            element:<LoginPage/>,
            errorElement: <Error404Page/>
        },
        {
            path: "login",
            element: <LoginPage/>,
        },
        {
            path: "otp-confirmation",
            element: <OTPPage/>,
        },
        {
            path: "personal-information",
            element: <PersonalInformationPage/>,
        },
    ]
}

export default authRoute