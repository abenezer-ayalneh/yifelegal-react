import {Box, Button, Grid, MenuItem, Stack, Typography} from "@mui/material";
import FormRow from "../../../../components/form-row/form-row.component";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {TextField} from "../../../../components/text-field/text-field.component";
import LoadingButton from "@mui/lab/LoadingButton";
import React, {useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {DispatcherPageParams} from "../../../../../utils/types/dispatcher-page-param-types";
import useSend from "../../../../../utils/hooks/use-send";
import config from "../../../../../config";
import {zodResolver} from "@hookform/resolvers/zod/dist/zod";
import {z} from "zod";

const MachineryForSaleSchema = z.object({
    entity: z.string().min(1, "Can't be empty"),
    category: z.string().min(1, "Can't be empty"),
    deal: z.string().min(1, "Can't be empty"),
    carType: z.string().min(1, "Can't be empty"),
    modelYear: z.string().min(4, "Must be a valid year").refine((value) => !Number.isNaN(parseInt(value)), {message: "Must be number"})
        .refine((value) => parseInt(value) > 1886, {message: "1886 is the minimum"}),
    model: z.string().min(1, "Can't be empty"),
    wheels: z.enum(["Chains", "Tire"], {invalid_type_error: "Should be either Chains or Tire"}),
    condition: z.enum(["Used", "Brand New"], {invalid_type_error: "Should be either Used or Brand New"}),
    usedHours: z.string().min(1, "Must be a valid number").refine((value) => !Number.isNaN(parseInt(value)), {message: "Must be number"})
        .refine((value) => parseInt(value) > 1, {message: "1 is the minimum"}).optional(),
    paymentMethod: z.enum(["In Cash", "With Bank"], {invalid_type_error: "Should be either In Cash or With Bank"}),
    otherDetail: z.string().optional(),
})
type MachineryForSaleType = z.infer<typeof MachineryForSaleSchema>;

const CarMachineryForSale = () => {
    const navigate = useNavigate()
    const {category, deal, entity} = useParams<DispatcherPageParams>()
    const location = useLocation()
    const [isUsed, setIsUsed] = useState<boolean>(false);
    const {sendRequest: storeRequest, isRequestLoading} = useSend({
        method: "POST",
        url: config.REACT_APP_ROOT_URL + "request/store",
    })

    const {
        watch,
        formState: {errors, isSubmitting,},
        handleSubmit,
        control,
    } = useForm<MachineryForSaleType>({
        resolver: zodResolver(MachineryForSaleSchema),
        // reValidateMode: "onChange",
        defaultValues: {
            entity: entity,
            category: category,
            deal: deal,
            carType: "",
            modelYear: "",
            model: "",
            wheels: "Tire",
            condition: "Brand New",
            paymentMethod: "With Bank",
            otherDetail: "",
        },
        mode: "onChange",
        shouldUnregister: true
    });

    const onSubmitHandler: SubmitHandler<MachineryForSaleType> = (values) => {
        console.log(values)
        // storeRequest({
        //     data: values
        // }, true).then((result) => {
        //     if (result.status) {
        //         navigate('/home')
        //     }
        // })
    };

    const onNextHandler: SubmitHandler<MachineryForSaleType> = (values) => {
        navigate("client-info", {state: values})
        // return redirect("client-info",)
    }

    const handleIsUsedToggle = (event: object) => {
        if (event.target.value === 'Used') {
            setIsUsed(true)
        } else {
            setIsUsed(false)
        }
    }

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
                onSubmit={handleSubmit(location && location.pathname.startsWith("/request-for-others") ? onNextHandler : onSubmitHandler)}
            >
                <Grid
                    container
                    paddingX={2}
                    rowSpacing={2}
                >
                    <FormRow required={true} label={"Car Type"} xs={12}>
                        <Controller
                            name={"carType"}
                            control={control}
                            render={({field: {ref, ...field}}) => (
                                <TextField
                                    placeholder={"The type name of the car. E.g: Dozer"}
                                    label={"Car Type"}
                                    inputRef={ref}
                                    error={!!errors.carType}
                                    helperText={errors?.carType?.message}
                                    {...field}                                />
                            )}
                        />
                    </FormRow>
                    <FormRow required={true} label={"Year"} xs={12}>
                        <Controller
                            name={"modelYear"}
                            control={control}
                            render={({field: {ref, ...field}}) => (
                                <TextField
                                    type={"number"}
                                    placeholder={"The year in which the car is made"}
                                    label={"Year"}
                                    size={"small"}
                                    error={!!errors.modelYear}
                                    helperText={errors?.modelYear?.message}
                                    {...field}
                                />
                            )}
                        />
                    </FormRow>
                    <FormRow required={true} label={"Model"} xs={12}>
                        <Controller
                            name={"model"}
                            control={control}
                            render={({field: {ref, ...field}}) => (
                                <TextField
                                    placeholder={"Model name of the car"}
                                    label={"Model"}
                                    size={"small"}
                                    error={!!errors.model}
                                    helperText={errors?.model?.message}
                                    {...field}
                                    defaultValue={''}
                                />
                            )}
                        />
                    </FormRow>
                    <FormRow required={true} label={"Wheels"} xs={12}>
                        <Controller
                            name={"wheels"}
                            control={control}
                            render={({field: {ref, ...field}}) => (
                                <TextField
                                    label={"The type of wheel it uses"}
                                    size={"small"}
                                    error={!!errors.wheels}
                                    helperText={errors?.wheels?.message}
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
                                    <MenuItem style={{fontSize: 14}} value={"Tire"}>Tire</MenuItem>
                                    <MenuItem style={{fontSize: 14}} value={"Chains"}>Chains</MenuItem>
                                </TextField>
                            )}
                        />
                    </FormRow>
                    <FormRow required={true} label={"Condition"} xs={12}>
                        <Controller
                            name={"condition"}
                            control={control}
                            render={({field: {ref, onChange, ...field}}) => {
                                return (
                                    <TextField
                                        label={"Is it Used or Brand New"}
                                        size={"small"}
                                        error={!!errors.condition}
                                        helperText={errors?.condition?.message}
                                        {...field}
                                        select
                                        onChange={(e: any) => {
                                            handleIsUsedToggle(e)
                                            onChange(e);
                                        }}
                                        defaultValue={''}
                                        sx={{
                                            '& .MuiSelect-select': {
                                                fontSize: 14,
                                                padding: '6px 14px',
                                            }
                                        }}
                                    >
                                        <MenuItem style={{fontSize: 14}} value={"Brand New"}>Brand New</MenuItem>
                                        <MenuItem style={{fontSize: 14}} value={"Used"}>Used</MenuItem>
                                    </TextField>
                                )
                            }}
                        />
                    </FormRow>
                    {
                        isUsed && <FormRow required={true} label={"Used Hours"} xs={12}>
                            <Controller
                                name={"usedHours"}
                                control={control}
                                defaultValue={""}
                                render={({field: {ref, ...field}}) => (
                                    <TextField
                                        placeholder={"Number of hours used"}
                                        label={"Hours"}
                                        size={"small"}
                                        error={!!errors.usedHours}
                                        helperText={errors?.usedHours?.message}
                                        {...field}
                                    />
                                )}
                            />
                        </FormRow>
                    }
                    <FormRow required={true} label={"Payment Method"} xs={12}>
                        <Controller
                            name={"paymentMethod"}
                            control={control}
                            render={({field: {ref, ...field}}) => (
                                <TextField
                                    label={"In Cash or with Bank Transfer?"}
                                    size={"small"}
                                    error={!!errors.paymentMethod}
                                    helperText={errors?.paymentMethod?.message}
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
                                    <MenuItem style={{fontSize: 14}} value={"In Cash"}>In Cash</MenuItem>
                                    <MenuItem style={{fontSize: 14}} value={"With Bank"}>With Bank</MenuItem>
                                </TextField>
                            )}
                        />
                    </FormRow>
                    <FormRow label={"Other Details"} xs={12}>
                        <Controller
                            name={"otherDetail"}
                            control={control}
                            render={({field: {ref, ...field}}) => (
                                <TextField
                                    type={"number"}
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

export default CarMachineryForSale