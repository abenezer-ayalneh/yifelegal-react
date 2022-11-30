import React from "react";
import {Grid, GridProps} from "@mui/material";
import {HorizontalTileContainer, HorizontalTileOverlay} from "./horizontal-tile.styles";

const HorizontalTile = (props: GridProps) => {
    return (
        <Grid item xs={12} md={6}>
            <HorizontalTileContainer container>
                <HorizontalTileOverlay/>
                <h1>Hello</h1>
            </HorizontalTileContainer>
        </Grid>
    )
}

export default HorizontalTile