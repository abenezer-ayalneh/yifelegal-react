import {RouteObject} from "react-router-dom"
import Error404Page from "../views/pages/error/error-page.compoent"
import MainLayout from "../views/layouts/main-layout/main-layout";
import ProtectedRoutes from "../views/layouts/protected-routes/protected-routes.component";
import Loadable from "../views/components/loader/loadable";
import {lazy} from "react";

// Loadable
const HomePage = Loadable(lazy(() => import("../views/pages/home/home-page.component")))
const EntityPageDispatcher = Loadable(lazy(() => import("../views/components/page-dispatchers/entity-page-dispatcher.component")))
const DealPage = Loadable(lazy(() => import("../views/pages/deal/deal-page.component")))
const DealTypeWithCategoryPageDispatcher = Loadable(lazy(() => import("../views/components/page-dispatchers/deal-type-with-category-page-dispatcher.component")))
const DealTypeWithoutCategoryPageDispatcher = Loadable(lazy(() => import("../views/components/page-dispatchers/deal-type-without-category-page-dispatcher.component")))
const MyRequestsPage = Loadable(lazy(() => import("../views/pages/my-requests/my-requests-page.component")))
const MyRequestPageDispatcher = Loadable(lazy(() => import("../views/components/page-dispatchers/my-request-list-page-dispatcher.component")))
const RequestsPage = Loadable(lazy(() => import("../views/pages/requests/requests-page.component")))
const SettingsPage = Loadable(lazy(() => import("../views/pages/settings/settings-page.component")))
const UsersListPage = Loadable(lazy(() => import("../views/pages/settings/user/users-list.component")))
const RequestForOthersPage = Loadable(lazy(() => import("../views/pages/request-for-others/request-for-others-page.component")))
const RequestForOthersPersonalInformationPage = Loadable(lazy(() => import("../views/pages/request-for-others/personal-information-page/request-for-others-personal-information-page.component")))

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
                    path: "entity/:entity",
                    element: <EntityPageDispatcher/>
                },
                // Requests with category
                {
                    path: "entity/:entity/category/:category",
                    element: <DealPage/>
                },
                {
                    path: "entity/:entity/category/:category/deal/:deal",
                    element: <DealTypeWithCategoryPageDispatcher/>
                },
                // Requests without category
                {
                    path: "entity/:entity/deal/:deal",
                    element: <DealTypeWithoutCategoryPageDispatcher/>
                },
            ]
        },
        {
            path: "request-for-others",
            element: <ProtectedRoutes><MainLayout/></ProtectedRoutes>,
            errorElement: <Error404Page/>,
            children: [
                {
                    path: "",
                    element: <RequestForOthersPage/>
                },
                {
                    path: "entity/:entity",
                    element: <EntityPageDispatcher/>
                },
                // Requests with category
                {
                    path: "entity/:entity/category/:category",
                    element: <DealPage/>
                },
                {
                    path: "entity/:entity/category/:category/deal/:deal",
                    element: <DealTypeWithCategoryPageDispatcher/>
                },
                {
                    path: "entity/:entity/category/:category/deal/:deal/client-info",
                    element: <RequestForOthersPersonalInformationPage/>
                },
                // Requests without category
                {
                    path: "entity/:entity/deal/:deal",
                    element: <DealTypeWithoutCategoryPageDispatcher/>
                },
                {
                    path: "entity/:entity/deal/:deal/client-info",
                    element: <RequestForOthersPersonalInformationPage/>
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
        {
            path: "settings",
            element: <ProtectedRoutes><MainLayout/></ProtectedRoutes>,
            errorElement: <Error404Page/>,
            children: [
                {
                    path: "",
                    element: <SettingsPage/>
                },
                {
                    path: "users",
                    element: <UsersListPage/>
                },
            ]
        },
    ]
}

export default authRoute