import {Grid, Typography} from "@mui/material";

type BigIconPropTypes = {
    image: string,
    title: string
}

const BigIcon = ({image, title}: BigIconPropTypes) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} height={300}>
            <Grid container direction={"column"} sx={{boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.25)",borderRadius: "10px"}}
                  position={"relative"} height={300} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <Grid item width={120}>
                    <img src={image} alt={"button icon"}/>
                </Grid>
                <Grid item position={"absolute"} bottom={20}>
                    <Typography variant={"body1"}>{title}</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default BigIcon