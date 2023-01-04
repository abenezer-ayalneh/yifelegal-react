import {useParams} from "react-router-dom";
import Loadable from "../loader/loadable";
import {lazy} from "react";
import Error404Page from "../../pages/error/error-page.compoent";
import {DispatcherPageParams} from "../../../utils/types/dispatcher-page-param-types";
import {ENTITIES} from "../../../utils/const/entities";


const HouseMyRequestsPage = Loadable(lazy(() => import("../../pages/my-requests/house-my-requests-page.component")))

const MyRequestListPageDispatcher = (): JSX.Element => {
    const {entity} = useParams<DispatcherPageParams>()

    const chosenPage = (): JSX.Element => {
        switch (entity) {
            case ENTITIES.HOUSE:
                return <HouseMyRequestsPage/>
            default:
                return <Error404Page/>
        }
    }
    return chosenPage()
}

export default MyRequestListPageDispatcher;