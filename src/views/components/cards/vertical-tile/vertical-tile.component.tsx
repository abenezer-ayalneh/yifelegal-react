import React from "react";
import {Grid, GridProps, Typography} from "@mui/material";
import {VerticalTileContainer, VerticalTileOverlay, VerticalTileTextContainer} from "./vertical-tile.styles";
import {Link} from "react-router-dom";

interface VerticalTileProps {
    tileTitle?: string | null,
    image?: string,
    to:string,
}

const VerticalTile: React.FunctionComponent<VerticalTileProps & GridProps> = (props) => {
    return (
        <Grid item xs={12} sm={6} md={3} component={Link} to={props.to}>
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