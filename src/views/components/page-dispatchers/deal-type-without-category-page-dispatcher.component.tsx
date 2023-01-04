import {useParams} from "react-router-dom";
import Loadable from "../loader/loadable";
import {lazy} from "react";
import Error404Page from "../../pages/error/error-page.compoent";
import {DispatcherPageParams} from "../../../utils/types/dispatcher-page-param-types";
import {CATEGORIES} from "../../../utils/const/categories";
import {ENTITIES} from "../../../utils/const/entities";

const LandForSalePage = Loadable(lazy(() => import("../../pages/entities/land/land-for-sale-page.component")))
const LandForRentPage = Loadable(lazy(() => import("../../pages/entities/land/land-for-rent-page.component")))
const CommercialBuildingForRentPage = Loadable(lazy(() => import("../../pages/entities/commercial-building/commercial-building-for-rent-page.component")))
const GuestHouseForRentPage = Loadable(lazy(() => import("../../pages/entities/guest-house/guest-house-categories-page.component")))
const WholeBuildingForRentPage = Loadable(lazy(() => import("../../pages/entities/whole-building/whole-building-for-sale-page.component")))
const WholeBuildingForSalePage = Loadable(lazy(() => import("../../pages/entities/whole-building/whole-building-for-sale-page.component")))
const CarForSalePage = Loadable(lazy(() => import("../../pages/entities/whole-building/whole-building-for-sale-page.component")))

const DealTypeWithoutCategoryPageDispatcher = (): JSX.Element => {
    const {entity, deal} = useParams<DispatcherPageParams>()

    const chosenPage = (): JSX.Element => {
        if (deal === "sale") {
            switch (entity) {
                case ENTITIES.LAND:
                    return <LandForSalePage/>
                case ENTITIES.WHOLE_BUILDING:
                    return <WholeBuildingForSalePage/>
                case ENTITIES.CAR:
                    return <WholeBuildingForSalePage/>
                default:
                    return <Error404Page/>
            }
        } else if (deal === "rent") {
            switch (entity) {
                case ENTITIES.LAND:
                    return <LandForRentPage/>
                case ENTITIES.COMMERCIAL_BUILDING:
                    return <CommercialBuildingForRentPage/>
                case ENTITIES.GUEST_HOUSE:
                    return <GuestHouseForRentPage/>
                case ENTITIES.WHOLE_BUILDING:
                    return <WholeBuildingForRentPage/>
                default:
                    return <Error404Page/>
            }
        } else {
            return <Error404Page/>
        }
    }
    return chosenPage()
}

export default DealTypeWithoutCategoryPageDispatcher;