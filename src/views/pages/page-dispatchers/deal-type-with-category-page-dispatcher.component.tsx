import {useParams} from "react-router-dom";
import Loadable from "../../components/loader/loadable";
import {lazy} from "react";
import Error404Page from "../error/error-page.compoent";
import {DispatcherPageParams} from "../../../utils/types/dispatcher-page-param-types";

const ApartmentForSalePage = Loadable(lazy(() => import("../entities/house/apartment/apartment-for-sale.component")))
const VillaForSalePage = Loadable(lazy(() => import("../entities/house/villa/villa-for-sale.component")))
const CondominiumForSalePage = Loadable(lazy(() => import("../entities/house/condominium/condominium-for-sale.component")))
const GroundPlusForSalePage = Loadable(lazy(() => import("../entities/house/ground-plus/ground-plus-for-sale.component")))
const OtherForSalePage = Loadable(lazy(() => import("../entities/house/other/other-for-sale.component")))
const RealEstateForSalePage = Loadable(lazy(() => import("../entities/house/real-estate/real-estate-for-sale.component")))
const ApartmentForRentPage = Loadable(lazy(() => import("../entities/house/apartment/apartment-for-rent.component")))
const VillaForRentPage = Loadable(lazy(() => import("../entities/house/villa/villa-for-rent.component")))
const CondominiumForRentPage = Loadable(lazy(() => import("../entities/house/condominium/condominium-for-rent.component")))
const GroundPlusForRentPage = Loadable(lazy(() => import("../entities/house/ground-plus/ground-plus-for-rent.component")))
const OtherForRentPage = Loadable(lazy(() => import("../entities/house/other/other-for-rent.component")))
const RealEstateForRentPage = Loadable(lazy(() => import("../entities/house/real-estate/real-estate-for-rent.component")))

const DealTypePageDispatcher = (): JSX.Element => {
    const {category, deal} = useParams<DispatcherPageParams>()

    const chosenPage = (): JSX.Element => {
        if (deal === "sale") {
            switch (category) {
                case "apartment":
                    return <ApartmentForSalePage/>
                case "villa":
                    return <VillaForSalePage/>
                case "condominium":
                    return <CondominiumForSalePage/>
                case "ground+":
                    return <GroundPlusForSalePage/>
                case "other":
                    return <OtherForSalePage/>
                case "real-estate":
                    return <RealEstateForSalePage/>
                default:
                    return <Error404Page/>
            }
        } else if (deal === "rent") {
            switch (category) {
                case "apartment":
                    return <ApartmentForRentPage/>
                case "villa":
                    return <VillaForRentPage/>
                case "condominium":
                    return <CondominiumForRentPage/>
                case "ground+":
                    return <GroundPlusForRentPage/>
                case "other":
                    return <OtherForRentPage/>
                case "real-estate":
                    return <RealEstateForRentPage/>
                default:
                    return <Error404Page/>
            }
        } else {
            return <Error404Page/>
        }
    }
    return chosenPage()
}

export default DealTypePageDispatcher;