import {useParams} from "react-router-dom";
import Loadable from "../../components/loader/loadable";
import {lazy} from "react";
import Error404Page from "../error/error-page.compoent";
import {DispatcherPageParams} from "../../../utils/types/dispatcher-page-param-types";

const LandForSalePage = Loadable(lazy(() => import("../entities/land/land-for-sale.component")))
const LandForRentPage = Loadable(lazy(() => import("../entities/land/land-for-rent.component")))

const DealTypePageDispatcher = (): JSX.Element => {
    const {entity, deal} = useParams<DispatcherPageParams>()

    const chosenPage = (): JSX.Element => {
        if (deal === "sale") {
            switch (entity) {
                case "land":
                    return <LandForSalePage/>
                default:
                    return <div>Page coming soon...</div>
            }
        } else if (deal === "rent") {
            switch (entity) {
                case "land":
                    return <LandForRentPage/>
                default:
                    return <div>Page coming soon...</div>
            }
        } else {
            return <Error404Page/>
        }
    }
    return chosenPage()
}

export default DealTypePageDispatcher;