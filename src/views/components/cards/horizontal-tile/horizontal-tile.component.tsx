import React from "react";
import {Grid, GridProps, Typography} from "@mui/material";
import {HorizontalTileContainer, HorizontalTileOverlay, HorizontalTileTextContainer} from "./horizontal-tile.styles";

interface HorizontalTilePropTypes{
    tileTitle?: string | null,
}
const HorizontalTile: React.FunctionComponent<HorizontalTilePropTypes & GridProps> = (props) => {
    return (
        <Grid item xs={12} sm={7} md={6}>
            <HorizontalTileContainer container>
                <HorizontalTileOverlay/>
                <HorizontalTileTextContainer>
                    <Typography variant={"h1"} color={"white"}>
                        {props.tileTitle}
                    </Typography>
                </HorizontalTileTextContainer>
            </HorizontalTileContainer>
        </Grid>
    )
}

export default HorizontalTile