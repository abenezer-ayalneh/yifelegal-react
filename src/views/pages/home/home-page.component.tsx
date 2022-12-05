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


const HomePage = () => {
    return (
        <Box>
            {/*Page Title*/}
            <Stack justifyContent={"center"} alignItems={"center"} direction={"column"}>
                <Typography variant={"h1"}>What do you need?</Typography>
                <Typography variant={"subtitle2"}>Please choose the category of what you are looking for</Typography>
            </Stack>
            <Box height={30}></Box>
            {/*Tiles*/}
            <Grid container paddingX={{xs: 5, md: 5, lg: 3, xl: 15}} justifyContent={{xs: "left", sm: "center", lg: "left"}} spacing={{xs: 1, sm: 2, md: 3}}>
                <HorizontalTile tileTitle={"House"} image={House}/>
                <VerticalTile tileTitle={"Land"} image={Land}/>
                <VerticalTile tileTitle={"Commercial Building"} image={CommercialBuilding}/>
                <VerticalTile tileTitle={"Guest House (Furnished)"} image={GuestHouse}/>
                <VerticalTile tileTitle={"Machinery & Truck"} image={MachineryAndTrucks}/>
                <HorizontalTile tileTitle={"Car"} image={Car}/>
                <HorizontalTile tileTitle={"Three Wheeler"} image={ThreeWheeler}/>
                <VerticalTile tileTitle={"Whole Building"} image={WholeBuilding}/>
            </Grid>
        </Box>
    )
}

export default HomePage