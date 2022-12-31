import {useParams} from "react-router-dom";
import Loadable from "../../components/loader/loadable";
import {lazy} from "react";
import Error404Page from "../error/error-page.compoent";

type MyRequestListPageDispatcherParams = {
    entity: string,
}
const HouseMyRequestsPage = Loadable(lazy(() => import("../my-requests/house-my-requests-page.component")))

const MyRequestListPageDispatcher = (): JSX.Element => {
    const {entity} = useParams<MyRequestListPageDispatcherParams>()

    const chosenPage = (): JSX.Element => {
        switch (entity) {
            case "house":
                return <HouseMyRequestsPage/>
            default:
                return <div>Page coming soon...</div>
        }
    }
    return chosenPage()
}

export default MyRequestListPageDispatcher;