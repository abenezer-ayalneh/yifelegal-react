import React from "react";
import {Box, Breadcrumbs, Grid, Link, Stack, Typography} from "@mui/material";
import VerticalTile from "../../components/cards/vertical-tile/vertical-tile.component";
import HorizontalTile from "../../components/cards/horizontal-tile/horizontal-tile.component";
import {IconArrowsRight, IconArrowsUpRight, IconChevronRight} from "@tabler/icons";


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
            <Grid container paddingX={{xs: 5, md: 5, lg: 3, xl: 15}} justifyContent={{xs:"center",lg:"left"}} spacing={{xs: 1, sm: 2, md: 3, xl: 4}}>
                <HorizontalTile tileTitle={"House"}/>
                <VerticalTile tileTitle={"Land"}/>
                <VerticalTile tileTitle={"Commercial Building"}/>
                <VerticalTile tileTitle={"Guest House (Furnished)"}/>
                <VerticalTile tileTitle={"Machinery & Truck"}/>
                <HorizontalTile tileTitle={"Car"}/>
                <HorizontalTile tileTitle={"Three Wheeler"}/>
                <VerticalTile tileTitle={"Whole Building"}/>
            </Grid>
        </Box>
    )
}

export default HomePage