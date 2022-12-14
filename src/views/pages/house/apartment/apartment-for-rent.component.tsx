import {Box, Grid, Stack, Typography} from "@mui/material";
import FormRow from "../../../components/form-row/form-row.component";
import {TextField} from "../../../components/text-field/text-field.component";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import {useParams} from "react-router-dom";
import {DispatcherPageParams} from "../../page-dispatcher/page-dispatcher.component";

const ApartmentForRentPage = () => {
    const {pageName} = useParams<DispatcherPageParams>()
    return (
        <Box>
            {/*Page Title*/}
            <Stack justifyContent={"center"} alignItems={"center"} direction={"column"}>
                <Typography variant={"h1"} style={{textTransform: "capitalize"}}>{pageName?.toString()}</Typography>
                <Typography variant={"subtitle2"} align={"center"}>Please fill the questions below about the item you are requesting</Typography>
            </Stack>
            <Box height={30}></Box>
            {/*Questions*/}
            <Grid container paddingX={2} rowSpacing={2}>
                <FormRow required={true} label={"Sub-City"} xs={12}>
                    <TextField placeholder={"The sub-city of the apartment. E.g: Bole, Yeka"} label={"Sub-City"} size={"small"}/>
                </FormRow>
                <FormRow label={"Special Place Name (if any)"} xs={12}>
                    <TextField placeholder={"Special or local name of the location. E.g: Gerji, Sar bet"} label={"Special Place Name"} size={"small"}/>
                </FormRow>
                <FormRow required={true} label={"Number of Bedroom"} xs={12}>
                    <TextField placeholder={"The number of bedrooms you want the apartment to have"} label={"Number of Bedroom"} size={"small"}/>
                </FormRow>
                <FormRow required={true} label={"Area (in Square Meters)"} xs={12}>
                    <TextField placeholder={"The floor area of the apartment. E.g: 150"} label={"Area (in Square Meters)"} size={"small"}/>
                </FormRow>
                <FormRow required={true} label={"Floor Number"} xs={12}>
                    <TextField placeholder={"On which floor number do you want the apartment to be . E.g: 3"} label={"Floor Number"} size={"small"}/>
                </FormRow>
                <FormRow required={true} label={"Payment Method"} xs={12}>
                    <TextField placeholder={"Which payment method you want to use? In cash or bank transfer?"} label={"Payment Method"} size={"small"}/>
                </FormRow>
                <FormRow xs={12}>
                    <LoadingButton variant={"contained"} color={"primary"} fullWidth onClick={handleSubmit}>Submit</LoadingButton>
                </FormRow>
            </Grid>
        </Box>
    )
}

export default ApartmentForRentPage