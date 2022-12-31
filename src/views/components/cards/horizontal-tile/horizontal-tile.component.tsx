import React from "react";
import {Grid, GridProps, Typography, Box} from "@mui/material";
import {HorizontalTileContainer, HorizontalTileOverlay, HorizontalTileTextContainer} from "./horizontal-tile.styles";
import {Link} from "react-router-dom";

interface HorizontalTilePropTypes{
    tileTitle?: string | null,
    subtitle?: string | null,
    image?: string,
    to: string,
}
const HorizontalTile: React.FunctionComponent<HorizontalTilePropTypes & GridProps> = (props) => {
    return (
        <Grid item xs={12} sm={7} md={6} component={Link} to={props.to}>
            <HorizontalTileContainer container image={props.image}>
                <HorizontalTileOverlay/>
                <HorizontalTileTextContainer>
                    <Typography variant={"h3"} color={"white"}>
                        {props.subtitle}
                    </Typography>
                    <Typography variant={"h1"} color={"white"}>
                        {props.tileTitle}
                    </Typography>
                </HorizontalTileTextContainer>
            </HorizontalTileContainer>
        </Grid>
    )
}

export default HorizontalTile