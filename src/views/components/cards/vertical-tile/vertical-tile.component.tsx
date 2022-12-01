import React from "react";
import {Grid, GridProps, Typography} from "@mui/material";
import {VerticalTileContainer, VerticalTileOverlay, VerticalTileTextContainer} from "./vertical-tile.styles";

interface HorizontalTilePropTypes {
    tileTitle?: string | null,
}

const VerticalTile: React.FunctionComponent<HorizontalTilePropTypes & GridProps> = (props) => {
    return (
        <Grid item xs={6} sm={5} md={3}>
            <VerticalTileContainer container>
                <VerticalTileOverlay/>
                <VerticalTileTextContainer>
                    <Typography variant={"h1"}  color={"white"}>
                        {props.tileTitle}
                    </Typography>
                </VerticalTileTextContainer>
            </VerticalTileContainer>
        </Grid>
    )
}

export default VerticalTile