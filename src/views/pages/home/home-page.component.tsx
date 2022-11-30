import React from "react";
import {Box, Grid, Paper} from "@mui/material";
import VerticalTile from "../../components/cards/vertical-tile/vertical-tile.component";
import HorizontalTile from "../../components/cards/horizontal-tile/horizontal-tile.component";

const HomePage = () => {
    return (
        <Box>

            {/**/}
            <Grid container justifyContent={"center"} paddingX={20} spacing={3}>
                <HorizontalTile/>
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