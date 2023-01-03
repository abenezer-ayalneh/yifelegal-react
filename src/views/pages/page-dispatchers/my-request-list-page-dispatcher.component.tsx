import {useParams} from "react-router-dom";
import Loadable from "../../components/loader/loadable";
import {lazy} from "react";
import Error404Page from "../error/error-page.compoent";
import {DispatcherPageParams} from "../../../utils/types/dispatcher-page-param-types";
import {ENTITIES} from "../../../utils/const/entities";


const HouseMyRequestsPage = Loadable(lazy(() => import("../my-requests/house-my-requests-page.component")))

const MyRequestListPageDispatcher = (): JSX.Element => {
    const {entity} = useParams<DispatcherPageParams>()

    const chosenPage = (): JSX.Element => {
        switch (entity) {
            case ENTITIES.HOUSE:
                return <HouseMyRequestsPage/>
            default:
                return <div>Page coming soon...</div>
        }
    }
    return chosenPage()
}

export default MyRequestListPageDispatcher;