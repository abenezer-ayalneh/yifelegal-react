import {useParams} from "react-router-dom";
import Loadable from "../loader/loadable";
import {lazy} from "react";
import Error404Page from "../../pages/error/error-page.compoent";
import {DispatcherPageParams} from "../../../utils/types/dispatcher-page-param-types";
import {CATEGORIES} from "../../../utils/const/categories";
import {ENTITIES} from "../../../utils/const/entities";

const HouseApartmentForSalePage = Loadable(lazy(() => import("../../pages/entities/house/apartment/house-apartment-for-sale-page.component")))
const HouseVillaForSalePage = Loadable(lazy(() => import("../../pages/entities/house/villa/house-villa-for-sale-page.component")))
const HouseCondominiumForSalePage = Loadable(lazy(() => import("../../pages/entities/house/condominium/house-condominium-for-sale-page.component")))
const HouseGroundPlusForSalePage = Loadable(lazy(() => import("../../pages/entities/house/ground-plus/house-ground-plus-for-sale-page.component")))
const HouseOtherForSalePage = Loadable(lazy(() => import("../../pages/entities/house/other/house-other-for-sale-page.component")))
const HouseRealEstateForSalePage = Loadable(lazy(() => import("../../pages/entities/house/real-estate/house-real-estate-for-sale-page.component")))
const HouseApartmentForRentPage = Loadable(lazy(() => import("../../pages/entities/house/apartment/house-apartment-for-rent-page.component")))
const HouseVillaForRentPage = Loadable(lazy(() => import("../../pages/entities/house/villa/house-villa-for-rent-page.component")))
const HouseCondominiumForRentPage = Loadable(lazy(() => import("../../pages/entities/house/condominium/house-condominium-for-rent-page.component")))
const HouseGroundPlusForRentPage = Loadable(lazy(() => import("../../pages/entities/house/ground-plus/house-ground-plus-for-rent-page.component")))
const HouseOtherForRentPage = Loadable(lazy(() => import("../../pages/entities/house/other/house-other-for-rent-page.component")))
const HouseRealEstateForRentPage = Loadable(lazy(() => import("../../pages/entities/house/real-estate/house-real-estate-for-rent-page.component")))
const GuestHouseVillaForRentPage = Loadable(lazy(() => import("../../pages/entities/guest-house/villa/guest-house-villa-for-rent-page.component")))
const GuestHouseGroundPlusForRentPage = Loadable(lazy(() => import("../../pages/entities/guest-house/ground-plus/guest-house-ground-plus-for-rent-page.component")))
const GuestHouseOtherForRentPage = Loadable(lazy(() => import("../../pages/entities/guest-house/other/guest-house-other-for-rent-page.component")))
const GuestHouseApartmentForRentPage = Loadable(lazy(() => import("../../pages/entities/guest-house/apartment/guest-house-apartment-for-rent-page.component")))
const GuestHouseHotelApartmentForRentPage = Loadable(lazy(() => import("../../pages/entities/guest-house/hotel-apartment/guest-house-hotel-apartment-for-rent-page.component")))
const GuestHouseCondominiumForRentPage = Loadable(lazy(() => import("../../pages/entities/guest-house/condominium/guest-house-condominium-for-rent-page.component")))
const GuestHouseRealEstateForRentPage = Loadable(lazy(() => import("../../pages/entities/guest-house/real-estate/guest-house-real-estate-for-rent-page.component")))

const DealTypePageDispatcher = (): JSX.Element => {
    const {entity, category, deal} = useParams<DispatcherPageParams>()

    console.log(entity)
    const chosenPage = (): JSX.Element => {
        let chosenPageComponent: JSX.Element = <Error404Page/>

        if (deal === "sale") {
            if (entity === ENTITIES.HOUSE) {
                switch (category) {
                    case CATEGORIES.APARTMENT:
                        chosenPageComponent = <HouseApartmentForSalePage/>
                        break;
                    case CATEGORIES.VILLA:
                        chosenPageComponent = <HouseVillaForSalePage/>
                        break;
                    case CATEGORIES.CONDOMINIUM:
                        chosenPageComponent = <HouseCondominiumForSalePage/>
                        break;
                    case CATEGORIES.GROUND_PLUS:
                        chosenPageComponent = <HouseGroundPlusForSalePage/>
                        break;
                    case CATEGORIES.OTHER:
                        chosenPageComponent = <HouseOtherForSalePage/>
                        break;
                    case CATEGORIES.REAL_ESTATE:
                        chosenPageComponent = <HouseRealEstateForSalePage/>
                        break;
                    case CATEGORIES.ELECTRIC_VEHICLE:
                        chosenPageComponent = <HouseRealEstateForSalePage/>
                        break;
                    default:
                        chosenPageComponent = <Error404Page/>
                        break;
                }
            }
        } else if (deal === "rent") {
            if (entity === ENTITIES.HOUSE) {
                switch (category) {
                    case CATEGORIES.APARTMENT:
                        chosenPageComponent = <HouseApartmentForRentPage/>
                        break;
                    case CATEGORIES.VILLA:
                        chosenPageComponent = <HouseVillaForRentPage/>
                        break;
                    case CATEGORIES.CONDOMINIUM:
                        chosenPageComponent = <HouseCondominiumForRentPage/>
                        break;
                    case CATEGORIES.GROUND_PLUS:
                        chosenPageComponent = <HouseGroundPlusForRentPage/>
                        break;
                    case CATEGORIES.OTHER:
                        chosenPageComponent = <HouseOtherForRentPage/>
                        break;
                    case CATEGORIES.REAL_ESTATE:
                        chosenPageComponent = <HouseRealEstateForRentPage/>
                        break;
                    default:
                        chosenPageComponent = <Error404Page/>
                        break;
                }
            }else if(entity === ENTITIES.GUEST_HOUSE){
                switch (category) {
                    case CATEGORIES.APARTMENT:
                        chosenPageComponent = <GuestHouseApartmentForRentPage/>
                        break;
                    case CATEGORIES.HOTEL_APARTMENT:
                        chosenPageComponent = <GuestHouseHotelApartmentForRentPage/>
                        break;
                    case CATEGORIES.VILLA:
                        chosenPageComponent = <GuestHouseVillaForRentPage/>
                        break;
                    case CATEGORIES.CONDOMINIUM:
                        chosenPageComponent = <GuestHouseCondominiumForRentPage/>
                        break;
                    case CATEGORIES.GROUND_PLUS:
                        chosenPageComponent = <GuestHouseGroundPlusForRentPage/>
                        break;
                    case CATEGORIES.OTHER:
                        chosenPageComponent = <GuestHouseOtherForRentPage/>
                        break;
                    case CATEGORIES.REAL_ESTATE:
                        chosenPageComponent = <GuestHouseRealEstateForRentPage/>
                        break;
                    default:
                        chosenPageComponent = <Error404Page/>
                        break;
                }
            }
        }

        return chosenPageComponent
    }

    return chosenPage()
}

export default DealTypePageDispatcher;