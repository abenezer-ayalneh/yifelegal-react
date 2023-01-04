import {Box, Grid, Stack, Typography} from "@mui/material";
import HorizontalTile from "../../../components/cards/horizontal-tile/horizontal-tile.component";
import Apartment from "../../../../assets/images/apartment.jpg";
import {CATEGORIES} from "../../../../utils/const/categories";
import VerticalTile from "../../../components/cards/vertical-tile/vertical-tile.component";
import Villa from "../../../../assets/images/villa.jpg";
import GroundPlus from "../../../../assets/images/ground+.jpg";
import RealEstate from "../../../../assets/images/real-estate.jpg";
import Condominium from "../../../../assets/images/condominium.jpg";
import Other from "../../../../assets/images/other.jpg";
import React from "react";

const GuestHouseCategoriesPage = () => {
    return (
        <Box>
            {/*Page Title*/}
            <Stack justifyContent={"center"} alignItems={"center"} direction={"column"}>
                <Typography variant={"h1"}>Guest House</Typography>
                <Typography variant={"subtitle2"} align={"center"}>Please choose the sub-category of what you are looking for</Typography>
            </Stack>
            <Box height={30}></Box>
            {/*Tiles*/}
            <Grid container paddingX={{xs: 5, md: 5, lg: 3, xl: 15}} justifyContent={{xs: "left", sm: "center", lg: "left"}} spacing={{xs: 1, sm: 2, md: 3}}>
                <HorizontalTile tileTitle={"Villa"} image={Villa} to={`category/${CATEGORIES.VILLA}/deal/rent`}/>
                <VerticalTile tileTitle={"Ground+"} image={GroundPlus} to={`category/${CATEGORIES.GROUND_PLUS}/deal/rent`}/>
                <VerticalTile tileTitle={"Apartment"} image={Apartment} to={`category/${CATEGORIES.APARTMENT}/deal/rent`}/>
                <VerticalTile tileTitle={"Hotel Apartment"} image={Apartment} to={`category/${CATEGORIES.HOTEL_APARTMENT}/deal/rent`}/>
                <VerticalTile tileTitle={"Real Estate"} image={RealEstate} to={`category/${CATEGORIES.REAL_ESTATE}/deal/rent`}/>
                <HorizontalTile tileTitle={"Condominium"} image={Condominium} to={`category/${CATEGORIES.CONDOMINIUM}/deal/rent`}/>
                <VerticalTile tileTitle={"Other"} image={Other} to={`category/${CATEGORIES.OTHER}/deal/rent`}/>
            </Grid>
        </Box>
    )
}

export default GuestHouseCategoriesPage