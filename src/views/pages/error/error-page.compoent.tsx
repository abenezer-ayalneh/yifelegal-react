import {Link, useRouteError} from "react-router-dom"
import {Button, Grid, Paper, Typography} from "@mui/material"
import Error404 from "../../../assets/images/404 Image.svg"

export default function Error404Page() {
    const error = useRouteError() as { status: number, statusText: string }
    // console.error(error)

    return (
        <Paper>
            <Grid container height="100vh" width="100vw" direction="row" justifyContent="center" alignItems="center">
                {
                    error?.status === 404
                        ?
                        <Grid width={{xs:300,sm:450,md:500}} container rowSpacing={3}>
                            <Grid item xs={12}>
                                <Typography variant="h2" align="center">Sorry! page not found!</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align="center" variant="body1">Sorry, we couldn't find the page you’re looking for.
                                    Perhaps you’ve mistyped the URL? Be sure to check your spelling
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <img src={Error404} alt="404 error image"/>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container justifyContent={"center"} alignItems={"center"}>
                                    <Grid item xs={3}>
                                        <Button variant={"contained"} fullWidth component={Link} to={"/"}>
                                            Go Home
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        : <Grid container justifyContent="center" alignItems="center" direction="column">
                            <Grid item xs={12}>
                                <Typography>Error!! {error?.status}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>{error?.statusText}</Typography>
                            </Grid>
                        </Grid>

                }
            </Grid>
        </Paper>
    )
}