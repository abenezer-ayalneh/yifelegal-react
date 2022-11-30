import React from "react";
import {Grid, GridProps, Typography} from "@mui/material";
import {HorizontalTileContainer, HorizontalTileOverlay, HorizontalTileTextContainer} from "./horizontal-tile.styles";

const HorizontalTile = ({tileTitle, props}:{tileTitle: string, props: GridProps}) => {
    return (
        <Grid item xs={12} sm={7} md={6} {...props}>
            <HorizontalTileContainer container>
                <HorizontalTileOverlay/>
                <HorizontalTileTextContainer>
                    <Typography variant={"h1"}>
                        {tileTitle}
                    </Typography>
                </HorizontalTileTextContainer>
            </HorizontalTileContainer>
        </Grid>
    )
}

export default HorizontalTile