import {useParams} from "react-router-dom";
import Loadable from "../../components/loader/loadable";
import {lazy} from "react";
import Error404Page from "../error/error-page.compoent";
import {DispatcherPageParams} from "../../../utils/types/dispatcher-page-param-types";

const ApartmentForSalePage = Loadable(lazy(() => import("../entities/house/apartment/apartment-for-sale.component")))
const ApartmentForRentPage = Loadable(lazy(() => import("../entities/house/apartment/apartment-for-rent.component")))

const DealTypePageDispatcher = (): JSX.Element => {
    const {category, deal} = useParams<DispatcherPageParams>()

    const chosenPage = (): JSX.Element => {
        if (deal === "sale") {
            switch (category) {
                case "apartment":
                    return <ApartmentForSalePage/>
                default:
                    return <div>Page coming soon...</div>
            }
        } else if (deal === "rent") {
            switch (category) {
                case "apartment":
                    return <ApartmentForRentPage/>
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