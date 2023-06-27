import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
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
const VillaForRentSchema = z.object({
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
});
type VillaForRentType = z.infer<typeof VillaForRentSchema>;

const VillaForRentPage = () => {
  const navigate = useNavigate();
  const { category, deal, entity } = useParams<DispatcherPageParams>();
  const location = useLocation();
  const { sendRequest: storeRequest, isRequestLoading } = useSend({
    method: "POST",
    url: ROOT_URL + "request/store",
  });

  const {
    formState: { errors, isSubmitting },
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
    },
    mode: "onChange",
  });

  const onSubmitHandler: SubmitHandler<VillaForRentType> = (values) => {
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

  const onNextHandler: SubmitHandler<VillaForRentType> = (values) => {
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
                  placeholder={"The sub-city of the villa. E.g: Bole, Yeka"}
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
          <FormRow required={true} label={"Number of Bedroom"} xs={12}>
            <Controller
              name={"numberOfBedroom"}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  type={"number"}
                  placeholder={
                    "The number of bedrooms you want the villa to have"
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

export default VillaForRentPage;
