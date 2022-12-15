import {Box, Grid, Stack, Typography} from "@mui/material";
import React, {useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import {DispatcherPageParams} from "../../page-dispatcher/page-dispatcher.component";
import FormRow from "../../../components/form-row/form-row.component";
import {TextField} from "../../../components/text-field/text-field.component";
import LoadingButton from "@mui/lab/LoadingButton";
import useSend from "../../../../utils/hooks/use-send";
import config from "../../../../config";
import {object, string, TypeOf} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const ApartmentForSalePage = () => {
    const {pageName, dealType, entity} = useParams<DispatcherPageParams>()
    const subCityRef = useRef()
    const specialPlaceNameRef = useRef()
    const numberOfBedroomRef = useRef()
    const areaRef = useRef()
    const floorNumberRef = useRef()
    const paymentMethodRef = useRef()
    const {sendRequest: storeRequest} = useSend({
        method: "POST",
        url: config.REACT_APP_ROOT_URL + "/request/store",
    })
    const registerSchema = object({
        subCity: string().min(1,"Sub-city field can't be empty")

    })
    type RegisterInput = TypeOf<typeof registerSchema>;

    const {
        register,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
        console.log(values);
    };

    // const handleSubmit = () => {
    //     let requestData = {
    //         entity: entity,
    //         entityType: pageName,
    //         deal: dealType
    //     }
    //
    //     console.log(requestData)

    // }
    return (
        <Box >
            {/*Page Title*/}
            <Stack justifyContent={"center"} alignItems={"center"} direction={"column"}>
                <Typography variant={"h1"} style={{textTransform: "capitalize"}}>{pageName?.toString()}</Typography>
                <Typography variant={"subtitle2"} align={"center"}>Please fill the questions below about the item you are requesting</Typography>
            </Stack>
            <Box height={30}></Box>
            {/*Questions*/}
            <Box
                component='form'
                noValidate
                autoComplete='off'
                onSubmit={handleSubmit(onSubmitHandler)}
            >
                <Grid container paddingX={2} rowSpacing={2}>
                    <FormRow required={true} label={"Sub-City"} xs={12}>
                        <TextField placeholder={"The sub-city of the apartment. E.g: Bole, Yeka"} label={"Sub-City"} size={"small"} {...register('subCity')}/>
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
                        <LoadingButton variant={"contained"} color={"primary"} fullWidth>Submit</LoadingButton>
                    </FormRow>
                </Grid>
            </Box>
        </Box>
    )
}

export default ApartmentForSalePage