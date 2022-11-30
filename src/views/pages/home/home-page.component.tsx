import React from "react";
import {Box, Grid, Paper} from "@mui/material";
import VerticalTile from "../../components/cards/vertical-tile/vertical-tile.component";
import HorizontalTile from "../../components/cards/horizontal-tile/horizontal-tile.component";

const HomePage = () => {
    return (
        <Box>
            {/**/}
            {/*Tiles*/}
            <Grid container paddingX={{xs:5,sm:7,md:5,lg:5,xl:5}} spacing={3}>
                <HorizontalTile tileTitle={"Title"}/>
                <VerticalTile/>
                <VerticalTile/>
                <VerticalTile/>
                <VerticalTile/>
                <HorizontalTile/>
                <VerticalTile/>
                <HorizontalTile/>
                <VerticalTile/>
            </Grid>
        </Box>
    )
}

export default HomePage