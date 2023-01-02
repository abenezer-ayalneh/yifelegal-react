import {useParams} from "react-router-dom";
import {DispatcherPageParams} from "../../../utils/types/dispatcher-page-param-types";
import HousePage from "../entities/house/house-page.component";
import DealPage from "../deal/deal-page.component";

const EntityPageDispatcher = () => {
    const {entity} = useParams<DispatcherPageParams>()

    const chosenPage = (): JSX.Element => {
        switch (entity) {
            case "house":
                return <HousePage/>
            case "land":
                return <DealPage/>
            default:
                return <div>Page coming soon...</div>
        }
    }

    return chosenPage()
}

export default EntityPageDispatcher