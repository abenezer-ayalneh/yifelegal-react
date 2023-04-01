import {Box, Grid, Stack, Typography} from "@mui/material";
import HorizontalTile from "../../../components/cards/horizontal-tile/horizontal-tile.component";
import VerticalTile from "../../../components/cards/vertical-tile/vertical-tile.component";
import Apartment from "../../../../assets/images/apartment.jpg";
import Villa from "../../../../assets/images/villa.jpg";
import GroundPlus from "../../../../assets/images/ground+.jpg";
import RealEstate from "../../../../assets/images/real-estate.jpg";
import Condominium from "../../../../assets/images/condominium.jpg";
import Other from "../../../../assets/images/other.jpg";
import React from "react";
import {CATEGORIES} from "../../../../utils/const/categories";

const HouseCategoriesPage = () => {
    return (
        <Box>
            {/*Page Title*/}
            <Stack justifyContent={"center"} alignItems={"center"} direction={"column"}>
                <Typography variant={"h1"}>House</Typography>
                <Typography variant={"subtitle2"} align={"center"}>Please choose the sub-category of what you are looking for</Typography>
            </Stack>
            <Box height={30}></Box>
            {/*Tiles*/}
            <Grid container paddingX={{xs: 5, md: 5, lg: 3, xl: 15}} justifyContent={{xs: "left", sm: "center", lg: "left"}} spacing={{xs: 1, sm: 2, md: 3}}>
                <HorizontalTile tileTitle={"Apartment"} image={Apartment} to={`category/${CATEGORIES.APARTMENT}`}/>
                <VerticalTile tileTitle={"Villa"} image={Villa} to={`category/${CATEGORIES.VILLA}`}/>
                <VerticalTile tileTitle={"Ground+"} image={GroundPlus} to={`category/${CATEGORIES.GROUND_PLUS}`}/>
                <VerticalTile tileTitle={"Real Estate"} image={RealEstate} to={`category/${CATEGORIES.REAL_ESTATE}`}/>
                <HorizontalTile tileTitle={"Condominium"} image={Condominium} to={`category/${CATEGORIES.CONDOMINIUM}`}/>
                <VerticalTile tileTitle={"Other"} image={Other} to={`category/${CATEGORIES.OTHER}`}/>
            </Grid>
        </Box>
    )
}

export default HouseCategoriesPage;