import {Box, Grid, Stack, Typography} from "@mui/material";
import HorizontalTile from "../../../components/cards/horizontal-tile/horizontal-tile.component";
import VerticalTile from "../../../components/cards/vertical-tile/vertical-tile.component";
import {CATEGORIES} from "../../../../utils/const/categories";
import Automobile from "../../../../assets/images/automobile.jpg";
import OffRoadCars from "../../../../assets/images/off-road-cars.jpg";
import Machinery from "../../../../assets/images/machinery-&-trucks.jpg";
import React from "react";

const CarCategoriesPage = () => {
    return (
        <Box>
            {/*Page Title*/}
            <Stack justifyContent={"center"} alignItems={"center"} direction={"column"}>
                <Typography variant={"h1"}>Car</Typography>
                <Typography variant={"subtitle2"} align={"center"}>Please choose the sub-category of what you are looking for</Typography>
            </Stack>
            <Box height={30}></Box>
            {/*Tiles*/}
            <Grid container paddingX={{xs: 5, md: 5, lg: 3, xl: 15}} justifyContent={{xs: "left", sm: "center", lg: "left"}} spacing={{xs: 1, sm: 2, md: 3}}>
                <HorizontalTile tileTitle={"Automobile"} image={Automobile} to={`category/${CATEGORIES.AUTOMOBILE}`}/>
                <HorizontalTile tileTitle={"Off Road Cars"} image={OffRoadCars} to={`category/${CATEGORIES.OFF_ROAD_CARS}`}/>
                <HorizontalTile tileTitle={"Machinery"} image={Machinery} to={`category/${CATEGORIES.MACHINERY}`}/>
            </Grid>
        </Box>
    )
}

export default CarCategoriesPage