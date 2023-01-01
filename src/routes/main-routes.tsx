import {RouteObject} from "react-router-dom"
import Error404Page from "../views/pages/error/error-page.compoent"
import MainLayout from "../views/layouts/main-layout/main-layout";
import ProtectedRoutes from "../views/layouts/protected-routes/protected-routes.component";
import Loadable from "../views/components/loader/loadable";
import {lazy} from "react";

// Loadable
const HomePage = Loadable(lazy(() => import("../views/pages/home/home-page.component")))
const HousePage = Loadable(lazy(() => import("../views/pages/house/house-page.component")))
const DealPage = Loadable(lazy(() => import("../views/pages/deal/deal.component")))
const PageDispatcher = Loadable(lazy(() => import("../views/pages/page-dispatchers/request-page-dispatcher.component")))
const MyRequestsPage = Loadable(lazy(() => import("../views/pages/my-requests/my-requests-page.component")))
const MyRequestPageDispatcher = Loadable(lazy(() => import("../views/pages/page-dispatchers/my-request-list-page-dispatcher.component")))
const RequestsPage = Loadable(lazy(() => import("../views/pages/requests/requests-page.component")))

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
                    path: ":entity",
                    element: <HousePage/>
                },
                {
                    path: ":entity/:pageName",
                    element: <DealPage/>
                },
                {
                    path: ":entity/:pageName/:dealType",
                    element: <PageDispatcher/>
                },
            ]
        },
        {
            path: "my-requests",
            element: <ProtectedRoutes><MainLayout/></ProtectedRoutes>,
            errorElement: <Error404Page/>,
            children: [
                {
                    path: "",
                    element: <MyRequestsPage/>,
                },
                {
                    path: ":entity",
                    element: <MyRequestPageDispatcher/>,
                },
            ]
        },
        {
            path: "requests",
            element: <ProtectedRoutes><MainLayout/></ProtectedRoutes>,
            errorElement: <Error404Page/>,
            children: [
                {
                    path: "",
                    element: <RequestsPage/>
                },
            ]
        },
    ]
}

export default authRoute