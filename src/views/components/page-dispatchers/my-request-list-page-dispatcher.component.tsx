import {useParams} from "react-router-dom";
import Loadable from "../loader/loadable";
import {lazy} from "react";
import Error404Page from "../../pages/error/error-page.compoent";
import {DispatcherPageParams} from "../../../utils/types/dispatcher-page-param-types";
import {ENTITIES} from "../../../utils/const/entities";


const HouseMyRequestsPage = Loadable(lazy(() => import("../../pages/my-requests/house-my-requests-page.component")))
const LandMyRequestsPage = Loadable(lazy(() => import("../../pages/my-requests/land-my-requests-page.component")))
const CommercialBuildingMyRequestsPage = Loadable(lazy(() => import("../../pages/my-requests/commercial-building-my-requests-page.component")))
const GuestHouseMyRequestsPage = Loadable(lazy(() => import("../../pages/my-requests/guest-house-my-requests-page.component")))
const MachineryAndTrucksMyRequestsPage = Loadable(lazy(() => import("../../pages/my-requests/machinery-and-trucks-my-requests-page.component")))
const CarMyRequestsPage = Loadable(lazy(() => import("../../pages/my-requests/car-my-requests-page.component")))
const ThreeWheelerMyRequestsPage = Loadable(lazy(() => import("../../pages/my-requests/three-wheeler-my-requests-page.component")))
const WholeBuildingMyRequestsPage = Loadable(lazy(() => import("../../pages/my-requests/whole-building-my-requests-page.component")))

const MyRequestListPageDispatcher = (): JSX.Element => {
    const {entity} = useParams<DispatcherPageParams>()

    const chosenPage = (): JSX.Element => {
        switch (entity) {
            case ENTITIES.HOUSE:
                return <HouseMyRequestsPage/>
            case ENTITIES.LAND:
                return <LandMyRequestsPage/>
            case ENTITIES.COMMERCIAL_BUILDING:
                return <CommercialBuildingMyRequestsPage/>
            case ENTITIES.GUEST_HOUSE:
                return <GuestHouseMyRequestsPage/>
            case ENTITIES.MACHINERY_AND_TRUCKS:
                return <MachineryAndTrucksMyRequestsPage/>
            case ENTITIES.CAR:
                return <CarMyRequestsPage/>
            case ENTITIES.THREE_WHEELER:
                return <ThreeWheelerMyRequestsPage/>
            case ENTITIES.WHOLE_BUILDING:
                return <WholeBuildingMyRequestsPage/>
            default:
                return <Error404Page/>
        }
    }
    return chosenPage()
}

export default MyRequestListPageDispatcher;