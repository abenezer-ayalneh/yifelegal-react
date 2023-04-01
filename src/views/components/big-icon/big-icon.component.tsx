import {Grid, GridProps, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";

type BigIconPropTypes = {
    image: string,
    title: string,
    to: string
}

const BigIcon: React.FunctionComponent<BigIconPropTypes & GridProps> = ({image, title, to, ...rest}) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} sx={{cursor: "pointer"}} {...rest} component={Link} to={to}>
            <Grid container direction={"column"} sx={{boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.25)", borderRadius: "10px"}} paddingX={3}
                  position={"relative"} height={300} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <Grid item width={120}>
                    <img src={image} alt={"button icon"}/>
                </Grid>
                <Grid item position={"absolute"} bottom={20}>
                    <Typography textAlign={"center"}>{title}</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default BigIcon