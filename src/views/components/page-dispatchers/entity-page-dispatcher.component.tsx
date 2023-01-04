import {useParams} from "react-router-dom";
import {DispatcherPageParams} from "../../../utils/types/dispatcher-page-param-types";
import HouseCategoriesPage from "../../pages/entities/house/house-categories-page.component";
import DealPage from "../../pages/deal/deal-page.component";
import {ENTITIES} from "../../../utils/const/entities";
import Error404Page from "../../pages/error/error-page.compoent";
import GuestHouseCategoriesPage from "../../pages/entities/guest-house/guest-house-categories-page.component";

const EntityPageDispatcher = () => {
    const {entity} = useParams<DispatcherPageParams>()
    console.log(entity)

    const chosenPage = (): JSX.Element => {
        switch (entity) {
            case ENTITIES.HOUSE:
                return <HouseCategoriesPage/>
            case ENTITIES.LAND:
            case ENTITIES.WHOLE_BUILDING:
                return <DealPage/>
            case ENTITIES.COMMERCIAL_BUILDING:
                return <DealPage remove={"sale"}/>
            case ENTITIES.GUEST_HOUSE:
                return <GuestHouseCategoriesPage/>
            default:
                return <Error404Page/>
        }
    }

    return chosenPage()
}

export default EntityPageDispatcher