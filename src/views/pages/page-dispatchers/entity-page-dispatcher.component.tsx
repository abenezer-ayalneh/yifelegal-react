import {useParams} from "react-router-dom";
import {DispatcherPageParams} from "../../../utils/types/dispatcher-page-param-types";
import HousePage from "../entities/house/house-page.component";
import DealPage from "../deal/deal-page.component";
import {ENTITIES} from "../../../utils/const/entities";

const EntityPageDispatcher = () => {
    const {entity} = useParams<DispatcherPageParams>()
    console.log(entity)

    const chosenPage = (): JSX.Element => {
        switch (entity) {
            case ENTITIES.HOUSE:
                return <HousePage/>
            case ENTITIES.LAND:
                return <DealPage/>
            case ENTITIES.COMMERCIAL_BUILDING:
                return <DealPage remove={"sale"}/>
            default:
                return <div>Page coming soon...</div>
        }
    }

    return chosenPage()
}

export default EntityPageDispatcher