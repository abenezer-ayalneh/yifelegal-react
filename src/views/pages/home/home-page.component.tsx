import React from "react";
import {Box, Grid, Stack, Typography} from "@mui/material";
import VerticalTile from "../../components/cards/vertical-tile/vertical-tile.component";
import HorizontalTile from "../../components/cards/horizontal-tile/horizontal-tile.component";
import House from "../../../assets/images/house.jpg"
import Land from "../../../assets/images/land.jpg"
import CommercialBuilding from "../../../assets/images/commercial-building.jpg"
import GuestHouse from "../../../assets/images/guest-house.jpg"
import MachineryAndTrucks from "../../../assets/images/machinery-&-trucks.jpg"
import Car from "../../../assets/images/car.jpg"
import ThreeWheeler from "../../../assets/images/three-wheeler.jpg"
import WholeBuilding from "../../../assets/images/whole-building.jpg"
import {ENTITIES} from "../../../utils/const/entities";


const HomePage = () => {
    return (
        <Box>
            {/*Page Title*/}
            <Stack justifyContent={"center"} alignItems={"center"} direction={"column"}>
                <Typography variant={"h1"}>What do you need?</Typography>
                <Typography variant={"subtitle2"} align={"center"}>Please choose the category of what you are looking for</Typography>
            </Stack>
            <Box height={30}></Box>
            {/*Tiles*/}
            <Grid container paddingX={{xs: 5, md: 5, lg: 3, xl: 15}} justifyContent={{xs: "left", sm: "center", lg: "left"}} spacing={{xs: 1, sm: 2, md: 3}}>
                <HorizontalTile tileTitle={"House"} image={House} to={`/request/entity/${ENTITIES.HOUSE}`}/>
                <VerticalTile tileTitle={"Land"} image={Land} to={`/request/entity/${ENTITIES.LAND}`}/>
                <VerticalTile tileTitle={"Commercial Building"} image={CommercialBuilding} to={`/request/entity/${ENTITIES.COMMERCIAL_BUILDING}`}/>
                <VerticalTile tileTitle={"Guest House (Furnished)"} image={GuestHouse} to={`/request/entity/${ENTITIES.GUEST_HOUSE}`}/>
                {/*<VerticalTile tileTitle={"Machinery & Truck"} image={MachineryAndTrucks} to={`/request/entity/${ENTITIES.MACHINERY_AND_TRUCKS}`}/>*/}
                <HorizontalTile tileTitle={"Car"} image={Car} to={`/request/entity/${ENTITIES.CAR}`}/>
                <VerticalTile tileTitle={"Whole Building"} image={WholeBuilding} to={`/request/entity/${ENTITIES.WHOLE_BUILDING}`}/>
                <HorizontalTile tileTitle={"Three Wheeler"} image={ThreeWheeler} to={`/request/entity/${ENTITIES.THREE_WHEELER}`}/>
            </Grid>
        </Box>
    )
}

export default HomePage