import React, {useEffect, useMemo} from "react";
import {Box, Grid, Stack, Typography} from "@mui/material";
import HorizontalTile from "../../components/cards/horizontal-tile/horizontal-tile.component";
import House from "../../../assets/images/house.jpg";
import VerticalTile from "../../components/cards/vertical-tile/vertical-tile.component";
import Land from "../../../assets/images/land.jpg";
import CommercialBuilding from "../../../assets/images/commercial-building.jpg";
import GuestHouse from "../../../assets/images/guest-house.jpg";
import MachineryAndTrucks from "../../../assets/images/machinery-&-trucks.jpg";
import Car from "../../../assets/images/car.jpg";
import ThreeWheeler from "../../../assets/images/three-wheeler.jpg";
import WholeBuilding from "../../../assets/images/whole-building.jpg";
import useFetch from "../../../utils/hooks/use-fetch";
import config from "../../../config";
import {ENTITIES} from "../../../utils/const/entities";

const MyRequestsPage = () => {
    const {responseData} = useFetch({
        method: "GET",
        url: config.REACT_APP_ROOT_URL + "request/mine",
    }, "fetch-my-requests-on-my-requests-page");

    const myRequests = useMemo(() => responseData?.data?.myRequests?.[0], [responseData])

    return (
        <Box>
            {/*Page Title*/}
            <Stack justifyContent={"center"} alignItems={"center"} direction={"column"}>
                <Typography variant={"h1"}>My Requests</Typography>
                <Typography variant={"subtitle2"} align={"center"}>These are requests you have requested using the application</Typography>
            </Stack>
            <Box height={30}></Box>
            {/*Tiles*/}
            <Grid container paddingX={{xs: 5, md: 5, lg: 3, xl: 15}} justifyContent={{xs: "left", sm: "center", lg: "left"}} spacing={{xs: 1, sm: 2, md: 3}}>
                <HorizontalTile tileTitle={"House"} image={House} to={ENTITIES.HOUSE} subtitle={`# ${myRequests?.houseCount ?? ""}`}/>
                <VerticalTile tileTitle={"Land"} image={Land} to={ENTITIES.LAND} subtitle={`# ${myRequests?.landCount ?? ""}`}/>
                <VerticalTile tileTitle={"Commercial Building"} image={CommercialBuilding} to={ENTITIES.COMMERCIAL_BUILDING} subtitle={`# ${myRequests?.commercialBuildingCount ?? ""}`}/>
                <VerticalTile tileTitle={"Guest House (Furnished)"} image={GuestHouse} to={ENTITIES.GUEST_HOUSE} subtitle={`# ${myRequests?.guestHouseCount ?? ""}`}/>
                <VerticalTile tileTitle={"Machinery & Truck"} image={MachineryAndTrucks} to={ENTITIES.MACHINERY_AND_TRUCKS} subtitle={`# ${myRequests?.machineryAndTruckCount ?? ""}`}/>
                <HorizontalTile tileTitle={"Car"} image={Car} to={ENTITIES.CAR} subtitle={`# ${myRequests?.carCount ?? ""}`}/>
                <HorizontalTile tileTitle={"Three Wheeler"} image={ThreeWheeler} to={ENTITIES.THREE_WHEELER} subtitle={`# ${myRequests?.threeWheelerCount ?? ""}`}/>
                <VerticalTile tileTitle={"Whole Building"} image={WholeBuilding} to={ENTITIES.WHOLE_BUILDING} subtitle={`# ${myRequests?.wholeBuildingCount ?? ""}`}/>
            </Grid>
        </Box>
    )
}

export default MyRequestsPage