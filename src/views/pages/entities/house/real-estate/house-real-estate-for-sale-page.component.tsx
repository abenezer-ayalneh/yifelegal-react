import { Button, Box, Grid, MenuItem, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import FormRow from "../../../../components/form-row/form-row.component";
import { TextField } from "../../../../components/text-field/text-field.component";
import LoadingButton from "@mui/lab/LoadingButton";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import config from "../../../../../config";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { DispatcherPageParams } from "../../../../../utils/types/dispatcher-page-param-types";
import useSend from "../../../../../utils/hooks/use-send";
const ROOT_URL = import.meta.env.VITE_ROOT_URL;
// Validation Schema
const ApartmentForSaleSchema = z.object({
  entity: z.string().min(1, "Can't be empty"),
  category: z.string().min(1, "Can't be empty"),
  deal: z.string().min(1, "Can't be empty"),
  subCity: z.string().min(1, "Can't be empty"),
  specialName: z.string().optional(),
  numberOfBedroom: z
    .string()
    .refine((value) => !Number.isNaN(parseInt(value)), {
      message: "Must be number",
    })
    .refine((value) => parseInt(value) >= 0, {
      message: "Zero is the minimum",
    }),
  floorNumber: z.string().refine((value) => !Number.isNaN(parseFloat(value)), {
    message: "Must be number",
  }),
  area: z.string().refine((value) => !Number.isNaN(parseFloat(value)), {
    message: "Must be number",
  }),
  specialRealEstateName: z.string().optional(),
  paymentMethod: z.enum(["In Cash", "With Bank"], {
    invalid_type_error: "Should be either In Cash or With Bank",
  }),
});
type ApartmentForSaleType = z.infer<typeof ApartmentForSaleSchema>;

const ApartmentForSalePage = () => {
  const navigate = useNavigate();
  const { category, deal, entity } = useParams<DispatcherPageParams>();
  const location = useLocation();
  const { sendRequest: storeRequest, isRequestLoading } = useSend({
    method: "POST",
    url: ROOT_URL + "request/store",
  });

  const {
    watch,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    reset,
    handleSubmit,
    control,
  } = useForm<ApartmentForSaleType>({
    resolver: zodResolver(ApartmentForSaleSchema),
    // reValidateMode: "onChange",
    defaultValues: {
      entity: entity,
      category: category,
      deal: deal,
      subCity: "",
      specialName: "",
      specialRealEstateName: "",
      numberOfBedroom: "",
      floorNumber: "",
      area: "",
      paymentMethod: "With Bank",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        entity: entity,
        category: category,
        deal: deal,
        subCity: "",
        specialName: "",
        specialRealEstateName: "",
        numberOfBedroom: "",
        floorNumber: "",
        area: "",
        paymentMethod: "With Bank",
      });
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmitHandler: SubmitHandler<ApartmentForSaleType> = (values) => {
    storeRequest(
      {
        data: values,
      },
      true
    ).then((result) => {
      if (result.status) {
        navigate("/home");
      }
    });
  };

  const onNextHandler: SubmitHandler<ApartmentForSaleType> = (values) => {
    navigate("client-info", { state: values });
    // return redirect("client-info",)
  };

  return (
    <Box>
      {/*Page Title*/}
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
      >
        <Typography variant={"h1"} style={{ textTransform: "capitalize" }}>
          {category?.toString()}
        </Typography>
        <Typography variant={"subtitle2"} align={"center"}>
          Please fill the questions below about the item you are requesting
        </Typography>
      </Stack>
      <Box height={30}></Box>
      {/*Questions*/}
      <form
        onSubmit={handleSubmit(
          location && location.pathname.startsWith("/request-for-others")
            ? onNextHandler
            : onSubmitHandler
        )}
      >
        <Grid container paddingX={2} rowSpacing={2}>
          <FormRow required={true} label={"Sub-City"} xs={12}>
            <Controller
              name={"subCity"}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  placeholder={"The sub-city of the apartment. E.g: Bole, Yeka"}
                  label={"Sub-City"}
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
              render={({ field: { ref, ...field } }) => (
                <TextField
                  placeholder={
                    "Special or local name of the location. E.g: Gerji, Sar bet"
                  }
                  label={"Special Place Name"}
                  size={"small"}
                  error={!!errors.specialName}
                  helperText={errors?.specialName?.message}
                  {...field}
                />
              )}
            />
          </FormRow>
          <FormRow label={"Special Real Estate Name (if any)"} xs={12}>
            <Controller
              name={"specialRealEstateName"}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  placeholder={
                    "Special or local name of the realEstate. E.g: Ayat, Tsehay..."
                  }
                  label={"Special RealEstate Name"}
                  size={"small"}
                  error={!!errors.specialRealEstateName}
                  helperText={errors?.specialRealEstateName?.message}
                  {...field}
                />
              )}
            />
          </FormRow>
          <FormRow required={true} label={"Number of Bedroom"} xs={12}>
            <Controller
              name={"numberOfBedroom"}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  type={"number"}
                  placeholder={
                    "The number of bedrooms you want the apartment to have"
                  }
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
              render={({ field: { ref, ...field } }) => (
                <TextField
                  type={"number"}
                  placeholder={
                    "On which floor number do you want the apartment to be . E.g: 3"
                  }
                  label={"Floor Number"}
                  size={"small"}
                  error={!!errors.floorNumber}
                  helperText={errors?.floorNumber?.message}
                  {...field}
                />
              )}
            />
          </FormRow>
          <FormRow required={true} label={"Area (in Square Meters)"} xs={12}>
            <Controller
              name={"area"}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  type={"number"}
                  placeholder={"The floor area of the apartment. E.g: 150"}
                  label={"Area (in Square Meters)"}
                  size={"small"}
                  error={!!errors.area}
                  helperText={errors?.area?.message}
                  {...field}
                />
              )}
            />
          </FormRow>
          <FormRow required={true} label={"Payment Method"} xs={12}>
            <Controller
              name={"paymentMethod"}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  label={"In Cash or with Bank Transfer?"}
                  size={"small"}
                  error={!!errors.paymentMethod}
                  helperText={errors?.paymentMethod?.message}
                  {...field}
                  select
                  defaultValue={""}
                  sx={{
                    "& .MuiSelect-select": {
                      fontSize: 14,
                      padding: "6px 14px",
                    },
                  }}
                >
                  <MenuItem style={{ fontSize: 14 }} value={"In Cash"}>
                    In Cash
                  </MenuItem>
                  <MenuItem style={{ fontSize: 14 }} value={"With Bank"}>
                    With Bank
                  </MenuItem>
                </TextField>
              )}
            />
          </FormRow>

          <FormRow xs={12}>
            {location && location.pathname.startsWith("/request-for-others") ? (
              <Button
                variant={"contained"}
                color={"primary"}
                type={"submit"}
                fullWidth
              >
                Next
              </Button>
            ) : (
              <LoadingButton
                loading={isSubmitting || isRequestLoading}
                variant={"contained"}
                color={"primary"}
                type={"submit"}
                fullWidth
              >
                Submit
              </LoadingButton>
            )}
          </FormRow>
        </Grid>
      </form>
    </Box>
  );
};

export default ApartmentForSalePage;
