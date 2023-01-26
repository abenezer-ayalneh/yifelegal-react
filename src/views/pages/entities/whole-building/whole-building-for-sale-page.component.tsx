import {z} from "zod";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {DispatcherPageParams} from "../../../../utils/types/dispatcher-page-param-types";
import useSend from "../../../../utils/hooks/use-send";
import config from "../../../../config";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod/dist/zod";
import {Button, Box, Grid, MenuItem, Stack, Typography} from "@mui/material";
import FormRow from "../../../components/form-row/form-row.component";
import {TextField} from "../../../components/text-field/text-field.component";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";

const WholeBuildingForSaleSchema = z.object({
    entity: z.string().min(1, "Can't be empty"),
    deal: z.string().min(1, "Can't be empty"),
    purpose: z.enum(["Hotel", "Apartment", "Trading", "Mixed Use", "Hotel Apartment", "School", "Other"],
        {invalid_type_error: "Unknown option selected"}),
    subCity: z.string().min(1, "Can't be empty"),
    specialName: z.string().optional(),
    numberOfFloors: z.string().refine((value) => !Number.isNaN(parseInt(value)), {message: "Must be number"})
        .refine((value) => parseInt(value) >= 0, {message: "Zero is the minimum"}),
    otherDetail: z.string().optional(),
})

type WholeBuildingForSaleType = z.infer<typeof WholeBuildingForSaleSchema>

const WholeBuildingForSalePage = () => {
    const navigate = useNavigate()
    const {deal, entity} = useParams<DispatcherPageParams>()
    const {sendRequest: storeRequest, isRequestLoading} = useSend({
        method: "POST",
        url: config.REACT_APP_ROOT_URL + "request/store",
    })

    const {
        formState: {errors, isSubmitting},
        reset,
        handleSubmit,
        control,
    } = useForm<WholeBuildingForSaleType>({
        resolver: zodResolver(WholeBuildingForSaleSchema),
        // reValidateMode: "onChange",
        defaultValues: {
            entity: entity,
            deal: deal,
            purpose: "Hotel",
            subCity: "",
            specialName: "",
            numberOfFloors: "",
            otherDetail: "",
        },
        mode: "onChange"
    });

    const onSubmitHandler: SubmitHandler<WholeBuildingForSaleType> = (values) => {
        storeRequest({
            data: values
        }, true).then((result) => {
            if (result.status) {
                navigate('/home')
            }
        })
    };

    const onNextHandler: SubmitHandler<WholeBuildingForSaleType>  = (values) => {
        navigate("client-info",{state: values})
        // return redirect("client-info",)
    }

    return (
        <Box>
            {/*Page Title*/}
            <Stack justifyContent={"center"} alignItems={"center"} direction={"column"}>
                <Typography variant={"h1"} style={{textTransform: "capitalize"}}>{entity}</Typography>
                <Typography variant={"subtitle2"} align={"center"}>Please fill the questions below about the item you are requesting</Typography>
            </Stack>
            <Box height={30}></Box>
            {/*Questions*/}
            <form
                onSubmit={handleSubmit(location && location.pathname.startsWith("/request-for-others") ? onNextHandler : onSubmitHandler)}
            >
                <Grid
                    container
                    paddingX={2}
                    rowSpacing={2}
                >
                    <FormRow required={true} label={"Purpose"} xs={12}>
                        <Controller
                            name={"purpose"}
                            control={control}
                            render={({field: {ref, ...field}}) => (
                                <TextField
                                    label={"Purpose of Sale"}
                                    size={"small"}
                                    error={!!errors.purpose}
                                    helperText={errors?.purpose?.message}
                                    {...field}
                                    select
                                    defaultValue={''}
                                    sx={{
                                        '& .MuiSelect-select': {
                                            fontSize: 14,
                                            padding: '6px 14px',
                                        }
                                    }}
                                >
                                    <MenuItem style={{fontSize: 14}} value={"Hotel"}>Hotel</MenuItem>
                                    <MenuItem style={{fontSize: 14}} value={"Apartment"}>Apartment</MenuItem>
                                    <MenuItem style={{fontSize: 14}} value={"Trading"}>Trading</MenuItem>
                                    <MenuItem style={{fontSize: 14}} value={"Mixed Use"}>Mixed Use</MenuItem>
                                    <MenuItem style={{fontSize: 14}} value={"Hotel Apartment"}>Hotel Apartment</MenuItem>
                                    <MenuItem style={{fontSize: 14}} value={"School"}>School</MenuItem>
                                </TextField>
                            )}
                        />
                    </FormRow>
                    <FormRow required={true} label={"Sub-City"} xs={12}>
                        <Controller
                            name={"subCity"}
                            control={control}
                            render={({field: {ref, ...field}}) => (
                                <TextField
                                    placeholder={"The sub-city of the apartment. E.g: Bole, Yeka"}
                                    label={"Sub-City"}
                                    inputRef={ref}
                                    error={!!errors.subCity}
                                    helperText={errors?.subCity?.message}
                                    {...field}                                />
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
                    <FormRow required={true} label={"Number of Floors"} xs={12}>
                        <Controller
                            name={"numberOfFloors"}
                            control={control}
                            render={({field: {ref, ...field}}) => (
                                <TextField
                                    type={"number"}
                                    placeholder={"The number of floors you want the house to have"}
                                    label={"Number of Floors"}
                                    size={"small"}
                                    inputRef={ref}
                                    error={!!errors.numberOfFloors}
                                    helperText={errors?.numberOfFloors?.message}
                                    {...field}
                                />
                            )}
                        />
                    </FormRow>
                    <FormRow label={"Other Details"} xs={12}>
                        <Controller
                            name={"otherDetail"}
                            control={control}
                            render={({field: {ref, ...field}}) => (
                                <TextField
                                    type={"text"}
                                    placeholder={"If you have extra needs, please specify them here"}
                                    label={"Other Details"}
                                    size={"small"}
                                    inputRef={ref}
                                    error={!!errors.otherDetail}
                                    helperText={errors?.otherDetail?.message}
                                    multiline={true}
                                    rows={3}
                                    {...field}
                                />
                            )}
                        />
                    </FormRow>

                    <FormRow xs={12}>
                        {
                            location && location.pathname.startsWith("/request-for-others")
                                ? <Button variant={"contained"} color={"primary"} type={"submit"} fullWidth>Next</Button>
                                : <LoadingButton loading={isSubmitting || isRequestLoading} variant={"contained"} color={"primary"} type={"submit"} fullWidth>Submit</LoadingButton>
                        }
                    </FormRow>
                </Grid>
            </form>

        </Box>
    )
}

export default WholeBuildingForSalePage