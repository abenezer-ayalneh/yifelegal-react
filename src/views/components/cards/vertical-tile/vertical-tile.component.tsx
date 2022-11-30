import React from "react";
import {Grid, GridProps} from "@mui/material";
import {VerticalTileContainer, VerticalTileOverlay} from "./vertical-tile.styles";

const VerticalTile = (props: GridProps) => {
    return (
        <Grid item xs={12} sm={6} md={3}>
            <VerticalTileContainer container>
                <VerticalTileOverlay/>
                <h1>Hello</h1>
            </VerticalTileContainer>
        </Grid>
    )
}

export default VerticalTile