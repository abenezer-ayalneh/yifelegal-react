import { Box, Button, Grid, MenuItem, Stack, Typography } from "@mui/material";
import FormRow from "../../../../components/form-row/form-row.component";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TextField } from "../../../../components/text-field/text-field.component";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DispatcherPageParams } from "../../../../../utils/types/dispatcher-page-param-types";
import useSend from "../../../../../utils/hooks/use-send";
import config from "../../../../../config";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod";
import { z } from "zod";
const ROOT_URL = import.meta.env.VITE_ROOT_URL;

const OffRoadForSaleSchema = z.object({
  entity: z.string().min(1, "Can't be empty"),
  category: z.string().min(1, "Can't be empty"),
  deal: z.string().min(1, "Can't be empty"),
  carType: z.string().min(1, "Can't be empty"),
  modelYear: z
    .string()
    .min(4, "Must be a valid year")
    .refine((value) => !Number.isNaN(parseInt(value)), {
      message: "Must be number",
    })
    .refine((value) => parseInt(value) > 1886, {
      message: "1886 is the minimum",
    }),
  plateCondition: z.enum(["With Plate Number", "Without Plate Number"], {
    invalid_type_error:
      "Should be either With Plate Number or Without Plate Number",
  }),
  gear: z.enum(["Manual", "Automatic"], {
    invalid_type_error: "Should be either Manual or Automatic",
  }),
  fuel: z.enum(["Benzene", "Diesel", "Electric"], {
    invalid_type_error: "Should be either Benzene, Diesel or Electric",
  }),
  paymentMethod: z.enum(["In Cash", "With Bank"], {
    invalid_type_error: "Should be either In Cash or With Bank",
  }),
  otherDetail: z.string().optional(),
});
type OffRoadForSaleType = z.infer<typeof OffRoadForSaleSchema>;

const CarOffRoadForSale = () => {
  const navigate = useNavigate();
  const { category, deal, entity } = useParams<DispatcherPageParams>();
  const location = useLocation();
  const { sendRequest: storeRequest, isRequestLoading } = useSend({
    method: "POST",
    url: ROOT_URL + "request/store",
  });

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
  } = useForm<OffRoadForSaleType>({
    resolver: zodResolver(OffRoadForSaleSchema),
    // reValidateMode: "onChange",
    defaultValues: {
      entity: entity,
      category: category,
      deal: deal,
      carType: "",
      modelYear: "",
      plateCondition: "With Plate Number",
      gear: "Manual",
      fuel: "Benzene",
      paymentMethod: "With Bank",
      otherDetail: "",
    },
    mode: "onChange",
  });

  const onSubmitHandler: SubmitHandler<OffRoadForSaleType> = (values) => {
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

  const onNextHandler: SubmitHandler<OffRoadForSaleType> = (values) => {
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
          <FormRow required={true} label={"Car Type"} xs={12}>
            <Controller
              name={"carType"}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  placeholder={
                    "The type/model name of the car. E.g: F-150, Hilux"
                  }
                  label={"Car Type"}
                  inputRef={ref}
                  error={!!errors.carType}
                  helperText={errors?.carType?.message}
                  {...field}
                />
              )}
            />
          </FormRow>
          <FormRow required={true} label={"Year"} xs={12}>
            <Controller
              name={"modelYear"}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
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
          <FormRow required={true} label={"Plate"} xs={12}>
            <Controller
              name={"plateCondition"}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  label={"Should the car have a plate or not"}
                  size={"small"}
                  error={!!errors.plateCondition}
                  helperText={errors?.plateCondition?.message}
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
                  <MenuItem
                    style={{ fontSize: 14 }}
                    value={"With Plate Number"}
                  >
                    With Plate Number
                  </MenuItem>
                  <MenuItem
                    style={{ fontSize: 14 }}
                    value={"Without Plate Number"}
                  >
                    Without Plate Number
                  </MenuItem>
                </TextField>
              )}
            />
          </FormRow>
          <FormRow required={true} label={"Gear"} xs={12}>
            <Controller
              name={"gear"}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  label={"Should it be Manual or Automatic"}
                  size={"small"}
                  error={!!errors.gear}
                  helperText={errors?.gear?.message}
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
                  <MenuItem style={{ fontSize: 14 }} value={"Manual"}>
                    Manual
                  </MenuItem>
                  <MenuItem style={{ fontSize: 14 }} value={"Automatic"}>
                    Automatic
                  </MenuItem>
                </TextField>
              )}
            />
          </FormRow>
          <FormRow required={true} label={"Fuel"} xs={12}>
            <Controller
              name={"fuel"}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  label={"Should it be Benzene, Diesel or Electric"}
                  size={"small"}
                  error={!!errors.fuel}
                  helperText={errors?.fuel?.message}
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
                  <MenuItem style={{ fontSize: 14 }} value={"Benzene"}>
                    Benzene
                  </MenuItem>
                  <MenuItem style={{ fontSize: 14 }} value={"Diesel"}>
                    Diesel
                  </MenuItem>
                  <MenuItem style={{ fontSize: 14 }} value={"Electric"}>
                    Electric
                  </MenuItem>
                </TextField>
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
          <FormRow label={"Other Details"} xs={12}>
            <Controller
              name={"otherDetail"}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  type={"number"}
                  placeholder={
                    "If you have extra needs, please specify them here"
                  }
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

export default CarOffRoadForSale;
