import { Box, Button, Grid, MenuItem, Stack, Typography } from "@mui/material";
import FormRow from "../../../../components/form-row/form-row.component";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TextField } from "../../../../components/text-field/text-field.component";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DispatcherPageParams } from "../../../../../utils/types/dispatcher-page-param-types";
import useSend from "../../../../../utils/hooks/use-send";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod";
import { z } from "zod";

const ROOT_URL = import.meta.env.VITE_ROOT_URL;

const MachineryForRentSchema = z.object({
  entity: z.string().min(1, "Can't be empty"),
  category: z.string().min(1, "Can't be empty"),
  deal: z.string().min(1, "Can't be empty"),
  carType: z.string().min(1, "Can't be empty"),
  modelYear: z
    .string()
    .min(4, "Must be a valid year")
    .max(4, "Must be a valid year")
    .refine((value) => !Number.isNaN(parseInt(value)), {
      message: "Must be number",
    })
    .refine((value) => parseInt(value) > 1886, {
      message: "1886 is the minimum",
    }),
  location: z.string().min(1, "Can't be empty"),
  wheels: z.enum(["Chains", "Tire"], {
    invalid_type_error: "Should be either Chains or Tire",
  }),
  rentPeriod: z
    .string()
    .refine((value) => !Number.isNaN(parseInt(value)), {
      message: "Must be number",
    })
    .refine((value) => parseInt(value) >= 1, { message: "One is the minimum" }),
  usedHours: z
    .string()
    .min(1, "Must be a valid number")
    .refine((value) => !Number.isNaN(parseInt(value)), {
      message: "Must be number",
    })
    .refine((value) => parseInt(value) > 1, { message: "1 is the minimum" })
    .optional(),
  otherDetail: z.string().optional(),
});
type MachineryForRentType = z.infer<typeof MachineryForRentSchema>;

const CarMachineryForRent = () => {
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
  } = useForm<MachineryForRentType>({
    resolver: zodResolver(MachineryForRentSchema),
    // reValidateMode: "onChange",
    defaultValues: {
      entity: entity,
      category: category,
      deal: deal,
      carType: "",
      modelYear: "",
      location: "",
      wheels: "Tire",
      rentPeriod: "",
      otherDetail: "",
    },
    mode: "onChange",
  });

  const onSubmitHandler: SubmitHandler<MachineryForRentType> = (values) => {
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

  const onNextHandler: SubmitHandler<MachineryForRentType> = (values) => {
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
          <FormRow required={true} label={"Car Type/Name"} xs={12}>
            <Controller
              name={"carType"}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  placeholder={"The type name of the car. E.g: Dozer"}
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
          <FormRow required={true} label={"Wheels"} xs={12}>
            <Controller
              name={"wheels"}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  label={"The type of wheel it uses"}
                  size={"small"}
                  error={!!errors.wheels}
                  helperText={errors?.wheels?.message}
                  {...field}
                  select
                  sx={{
                    "& .MuiSelect-select": {
                      fontSize: 14,
                      padding: "6px 14px",
                    },
                  }}
                >
                  <MenuItem style={{ fontSize: 14 }} value={"Tire"}>
                    Tire
                  </MenuItem>
                  <MenuItem style={{ fontSize: 14 }} value={"Chains"}>
                    Chains
                  </MenuItem>
                </TextField>
              )}
            />
          </FormRow>
          <FormRow required={true} label={"Location"} xs={12}>
            <Controller
              name={"location"}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  placeholder={"Where are you planning to use it"}
                  label={"Location"}
                  size={"small"}
                  error={!!errors.location}
                  helperText={errors?.location?.message}
                  {...field}
                />
              )}
            />
          </FormRow>
          <FormRow required={true} label={"Period of Rent (in days)"} xs={12}>
            <Controller
              name={"rentPeriod"}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  type={"number"}
                  placeholder={"How long you are planning on staying (in days)"}
                  label={"Period of Rent (in days)"}
                  size={"small"}
                  inputRef={ref}
                  error={!!errors.rentPeriod}
                  helperText={errors?.rentPeriod?.message}
                  {...field}
                />
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

export default CarMachineryForRent;
