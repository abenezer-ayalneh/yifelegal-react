import React from "react";
import {Box, Grid, Stack, Typography} from "@mui/material";
import HorizontalTile from "../../components/cards/horizontal-tile/horizontal-tile.component";
import ForSale from "../../../assets/images/for-sale.jpg";
import ForRent from "../../../assets/images/for-rent.jpg";
import {useParams} from "react-router-dom";

type DealPageParams  = {
    pageName: string,
}

const Deal = () => {
    const {pageName} = useParams<DealPageParams>()
    return (
        <Box>
            {/*Page Title*/}
            <Stack justifyContent={"center"} alignItems={"center"} direction={"column"}>
                <Typography variant={"h1"} style={{textTransform:"capitalize"}}>{pageName?.toString()}</Typography>
                <Typography variant={"subtitle2"} align={"center"}>Please choose what type of deal you are looking for</Typography>
            </Stack>
            <Box height={30}></Box>
            {/*Tiles*/}
            <Grid container paddingX={{xs: 5, md: 5, lg: 3, xl: 15}} justifyContent={{xs: "left", sm: "center", lg: "left"}} spacing={{xs: 1, sm: 2, md: 3}}>
                <HorizontalTile tileTitle={"For Sale"} image={ForSale} to={"forSale"}/>
                <HorizontalTile tileTitle={"For Rent"} image={ForRent} to={"forRent"}/>
            </Grid>
        </Box>
    )
}

export default Deal