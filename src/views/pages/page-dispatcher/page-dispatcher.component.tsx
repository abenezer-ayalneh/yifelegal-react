import {useParams} from "react-router-dom";
import Loadable from "../../components/loader/loadable";
import {lazy} from "react";

type DispatcherPageParams = {
    pageName: string,
    dealType: string,
}
const ApartmentForSalePage = Loadable(lazy(() => import("../house/apartment/apartment-for-sale.component")))
const ApartmentForRentPage = Loadable(lazy(() => import("../house/apartment/apartment-for-rent.component")))

const PageDispatcher = (): JSX.Element => {
    const {pageName, dealType} = useParams<DispatcherPageParams>()

    const chosenPage = (): JSX.Element => {
        if(dealType === "forSale"){
            switch (pageName) {
                case "apartment":
                    return <ApartmentForSalePage/>
                default:
                    return <div>Page coming soon...</div>
            }
        }else{
            switch (pageName) {
                case "apartment":
                return <ApartmentForRentPage/>
                default:
                    return <div>Page coming soon...</div>
            }
        }
    }
    return chosenPage()
}

export default PageDispatcher;
export type {DispatcherPageParams}