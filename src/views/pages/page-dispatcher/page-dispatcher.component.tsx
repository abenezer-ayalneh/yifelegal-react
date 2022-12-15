import {useParams} from "react-router-dom";
import Loadable from "../../components/loader/loadable";
import {lazy} from "react";
import Error404Page from "../error/error-page.compoent";

type DispatcherPageParams = {
    entity: string,
    pageName: string,
    dealType: string,
}
const ApartmentForSalePage = Loadable(lazy(() => import("../house/apartment/apartment-for-sale.component")))
const ApartmentForRentPage = Loadable(lazy(() => import("../house/apartment/apartment-for-rent.component")))

const PageDispatcher = (): JSX.Element => {
    const {pageName, dealType} = useParams<DispatcherPageParams>()

    const chosenPage = (): JSX.Element => {
        if (dealType === "sale") {
            switch (pageName) {
                case "apartment":
                    return <ApartmentForSalePage/>
                default:
                    return <div>Page coming soon...</div>
            }
        } else if (dealType === "rent") {
            switch (pageName) {
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

export default PageDispatcher;
export type {DispatcherPageParams}