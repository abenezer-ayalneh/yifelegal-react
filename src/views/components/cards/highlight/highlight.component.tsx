import {Grid, GridProps, Typography, useTheme} from "@mui/material";
import {HighlightContainer, HighlightImageContainer, HighlightImageOverlay} from "./highlight.styles";

type HighlightPropTypes = {
    image: string,
    type?: string,
    deal: string,
    category?: string,
    location?: string,
    date?: string,
}

const Highlight = ({image, type, category, deal, location, date, ...parentProps}: HighlightPropTypes & GridProps) => {
    const theme = useTheme()
    return (
        <Grid item xs={12} sm={6} md={4} {...parentProps}>
            <HighlightContainer container direction={"row"}>
                <HighlightImageContainer item xs={5} image={image}>
                    <HighlightImageOverlay/>
                </HighlightImageContainer>
                <Grid item xs={7}>
                    <Grid container direction={"column"}>
                        <Grid item height={"150px"} borderRadius={"0 15px 0 0"}>
                            <Grid container spacing={1} padding={2} direction={"column"}>
                                <Grid item>
                                    <Typography sx={{textTransform: "capitalize"}} variant={"body2"}>Request: {type}</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography sx={{textTransform: "capitalize"}} variant={"body2"}>Deal: {deal}</Typography>
                                </Grid>
                                {
                                    category && <Grid item>
                                        <Typography sx={{textTransform: "capitalize"}} variant={"body2"}>Category: {category}</Typography>
                                    </Grid>
                                }
                                {
                                    location && <Grid item>
                                        <Typography sx={{textTransform: "capitalize"}} variant={"body2"}>Location: {location}</Typography>
                                    </Grid>
                                }

                            </Grid>
                        </Grid>
                        <Grid item height={"30px"} borderRadius={"0 0 15px 0"}>
                            <Grid container spacing={1} paddingX={2} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                <Grid item>
                                    <Typography variant={"subtitle1"}>{date}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </HighlightContainer>
        </Grid>
    )
}

export default Highlight