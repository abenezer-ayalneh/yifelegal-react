import {Box, Grid, Stack, Typography} from "@mui/material";
import React, {useEffect, useRef} from "react";
import FormRow from "../../../components/form-row/form-row.component";
import {TextField} from "../../../components/text-field/text-field.component";
import LoadingButton from "@mui/lab/LoadingButton";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import config from "../../../../config";
import {useParams} from "react-router-dom";
import {DispatcherPageParams} from "../../page-dispatcher/page-dispatcher.component";
import useSend from "../../../../utils/hooks/use-send";


// Validation Schema
const ApartmentForSaleSchema = z.object({
    subCity: z.string(),
    specialName: z.string().optional(),
    numberOfBedroom: z.string().refine((value) => !Number.isNaN(parseInt(value)), {
        message: "Must be number"
    }),
    area: z.string().refine((value) => !Number.isNaN(parseFloat(value)), {
        message: "Must be number"
    }),
    floorNumber: z.string().refine((value) => !Number.isNaN(parseFloat(value)), {
        message: "Must be number"
    }),
    paymentMethod: z.enum(["In Cash","With Bank"],{invalid_type_error:"Should be either cash or bank"})
})
type ApartmentForSaleType = z.infer<typeof ApartmentForSaleSchema>;

const ApartmentForSalePage = () => {
    const {pageName, dealType, entity} = useParams<DispatcherPageParams>()
    const subCity = useRef<HTMLInputElement>()
    const specialPlaceNameRef = useRef()
    const numberOfBedroomRef = useRef()
    const areaRef = useRef()
    const floorNumberRef = useRef()
    const paymentMethodRef = useRef()
    const {sendRequest: storeRequest} = useSend({
        method: "POST",
        url: config.REACT_APP_ROOT_URL + "/request/store",
    })

    const {
        register,
        watch,
        formState: {errors, isSubmitSuccessful, isSubmitting},
        reset,
        handleSubmit,
        control
    } = useForm<ApartmentForSaleType>({
        resolver: zodResolver(ApartmentForSaleSchema),
        // reValidateMode: "onChange",
        mode: "onChange"
    });

    useEffect(() => {
        console.log("Successful Submit:" + isSubmitSuccessful)
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    useEffect(() => console.log(errors), [errors])

    const onSubmitHandler: SubmitHandler<ApartmentForSaleType> = (values) => {
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
        <Box>
            {/*Page Title*/}
            <Stack justifyContent={"center"} alignItems={"center"} direction={"column"}>
                <Typography variant={"h1"} style={{textTransform: "capitalize"}}>{pageName?.toString()}</Typography>
                <Typography variant={"subtitle2"} align={"center"}>Please fill the questions below about the item you are requesting</Typography>
            </Stack>
            <Box height={30}></Box>
            {/*Questions*/}
            <form
                onSubmit={handleSubmit(onSubmitHandler)}
            >
                <Grid
                    container
                    paddingX={2}
                    rowSpacing={4}
                >
                    <FormRow required={true} label={"Sub-City"} xs={12}>
                        <Controller
                            name={"subCity"}
                            control={control}
                            render={({field: {ref, ...field}}) => (
                                <TextField
                                    placeholder={"The sub-city of the apartment. E.g: Bole, Yeka"}
                                    label={"Sub-City"}
                                    size={"small"}
                                    inputRef={ref}
                                    error={!!errors.subCity}
                                    helperText={errors?.subCity?.message}
                                    {...field}
                                />
                            )}
                        />
                    </FormRow>
                    <FormRow label={"Special Place Name (if any)"} xs={12}>
                        <Controller
                            name={"specialName"}
                            control={control}
                            render={({field: {ref, ...field}}) => (
                                <TextField
                                    placeholder={"Special or local name of the location. E.g: Gerji, Sar bet"}
                                    label={"Special Place Name"}
                                    size={"small"}
                                    error={!!errors.specialName}
                                    helperText={errors?.specialName?.message}
                                    {...field}
                                />
                            )}
                        />
                    </FormRow>
                    <FormRow required={true} label={"Number of Bedroom"} xs={12}>
                        <Controller
                            name={"numberOfBedroom"}
                            control={control}
                            render={({field: {ref, ...field}}) => (
                                <TextField
                                    type={"number"}
                                    placeholder={"The number of bedrooms you want the apartment to have"}
                                    label={"Number of Bedroom"}
                                    size={"small"}
                                    inputRef={ref}
                                    error={!!errors.numberOfBedroom}
                                    helperText={errors?.numberOfBedroom?.message}
                                    {...field}
                                />
                            )}
                        />
                    </FormRow>
                    <FormRow required={true} label={"Area (in Square Meters)"} xs={12}>
                        <Controller
                            name={"area"}
                            control={control}
                            render={({field: {ref, ...field}}) => (
                                <TextField
                                    type={"number"}
                                    placeholder={"The floor area of the apartment. E.g: 150"}
                                    label={"Area (in Square Meters)"}
                                    size={"small"}
                                    error={!!errors.area}
                                    helperText={errors?.area?.message}
                                    {...field}/>
                            )}
                        />
                    </FormRow>
                    <FormRow required={true} label={"Floor Number"} xs={12}>
                        <Controller
                            name={"floorNumber"}
                            control={control}
                            render={({field: {ref, ...field}}) => (
                                <TextField
                                    type={"number"}
                                    placeholder={"On which floor number do you want the apartment to be . E.g: 3"}
                                    label={"Floor Number"}
                                    size={"small"}
                                    error={!!errors.floorNumber}
                                    helperText={errors?.floorNumber?.message}
                                    {...field}/>
                            )}
                        />
                    </FormRow>
                    <FormRow required={true} label={"Payment Method"} xs={12}>
                        <Controller
                            name={"paymentMethod"}
                            control={control}
                            render={({field: {ref, ...field}}) => (
                                <TextField
                                    placeholder={"Which payment method you want to use? In cash or bank transfer?"}
                                    label={"Payment Method"}
                                    size={"small"}
                                    error={!!errors.paymentMethod}
                                    helperText={errors?.paymentMethod?.message}
                                    {...field}
                                />
                            )}
                        />
                    </FormRow>

                    <FormRow xs={12}>
                        <LoadingButton variant={"contained"} color={"primary"} type={"submit"} fullWidth>Submit</LoadingButton>
                    </FormRow>
                </Grid>
            </form>
            <pre>{JSON.stringify(watch(), null, 2)}</pre>
        </Box>
    )
}

export default ApartmentForSalePage