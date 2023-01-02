import {Box, Grid, Stack, Typography} from "@mui/material";
import React from "react";
import FormRow from "../../../../components/form-row/form-row.component";
import {TextField} from "../../../../components/text-field/text-field.component";
import LoadingButton from "@mui/lab/LoadingButton";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import config from "../../../../../config";
import {useNavigate, useParams} from "react-router-dom";
import {DispatcherPageParams} from "../../../../../utils/types/dispatcher-page-param-types";
import useSend from "../../../../../utils/hooks/use-send";

// Validation Schema
const VillaForRentSchema = z.object({
    entity: z.string().min(1, "Can't be empty"),
    category: z.string().min(1, "Can't be empty"),
    deal: z.string().min(1, "Can't be empty"),
    subCity: z.string().min(1, "Can't be empty"),
    specialName: z.string().optional(),
    numberOfBedroom: z.string().refine((value) => !Number.isNaN(parseInt(value)), {message: "Must be number"})
        .refine((value) => parseInt(value) >= 0, {message: "Zero is the minimum"}),
    floorNumber: z.string().refine((value) => !Number.isNaN(parseFloat(value)), {
        message: "Must be number"
    }),
})
type VillaForRentType = z.infer<typeof VillaForRentSchema>;

const VillaForRentPage = () => {
    const navigate = useNavigate()
    const {category, deal, entity} = useParams<DispatcherPageParams>()
    const {sendRequest: storeRequest, isRequestLoading} = useSend({
        method: "POST",
        url: config.REACT_APP_ROOT_URL + "request/store",
    })

    const {
        watch,
        formState: {errors, isSubmitSuccessful, isSubmitting},
        reset,
        handleSubmit,
        control,
    } = useForm<VillaForRentType>({
        resolver: zodResolver(VillaForRentSchema),
        // reValidateMode: "onChange",
        defaultValues: {
            entity: entity,
            category: category,
            deal: deal,
            subCity: "",
            specialName: "",
            numberOfBedroom: "",
            floorNumber: "",
        },
        mode: "onChange"
    });

    const onSubmitHandler: SubmitHandler<VillaForRentType> = (values) => {
        storeRequest({
            data: values
        }, true).then((result) => {
            if (result.status) {
                // navigate('/home')
                reset({
                    entity: entity,
                    category: category,
                    deal: deal,
                    subCity: "",
                    specialName: "",
                    numberOfBedroom: "",
                    floorNumber: "",
                });
            }
        })
    };

    return (
        <Box>
            {/*Page Title*/}
            <Stack justifyContent={"center"} alignItems={"center"} direction={"column"}>
                <Typography variant={"h1"} style={{textTransform: "capitalize"}}>{category?.toString()}</Typography>
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
                    rowSpacing={2}
                >
                    <FormRow required={true} label={"Sub-City"} xs={12}>
                        <Controller
                            name={"subCity"}
                            control={control}
                            render={({field: {ref, ...field}}) => (
                                <TextField
                                    placeholder={"The sub-city of the villa. E.g: Bole, Yeka"}
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
                    <FormRow required={true} label={"Number of Bedroom"} xs={12}>
                        <Controller
                            name={"numberOfBedroom"}
                            control={control}
                            render={({field: {ref, ...field}}) => (
                                <TextField
                                    type={"number"}
                                    placeholder={"The number of bedrooms you want the villa to have"}
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

                    <FormRow xs={12}>
                        <LoadingButton loading={isSubmitting || isRequestLoading} variant={"contained"} color={"primary"} type={"submit"} fullWidth>Submit</LoadingButton>
                    </FormRow>
                </Grid>
            </form>

        </Box>
    )
}

export default VillaForRentPage