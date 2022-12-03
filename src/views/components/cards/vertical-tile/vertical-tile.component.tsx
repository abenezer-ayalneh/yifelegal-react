import React from "react";
import {Grid, GridProps, Typography} from "@mui/material";
import {VerticalTileContainer, VerticalTileOverlay, VerticalTileTextContainer} from "./vertical-tile.styles";

interface VerticalTileProps {
    tileTitle?: string | null,
    image?: string,
}

const VerticalTile: React.FunctionComponent<VerticalTileProps & GridProps> = (props) => {
    return (
        <Grid item xs={6} sm={5} md={3}>
            <VerticalTileContainer container image={props.image}>
                <VerticalTileOverlay/>
                <VerticalTileTextContainer>
                    <Typography variant={"h2"}  color={"white"}>
                        {props.tileTitle}
                    </Typography>
                </VerticalTileTextContainer>
            </VerticalTileContainer>
        </Grid>
    )
}

export default VerticalTile