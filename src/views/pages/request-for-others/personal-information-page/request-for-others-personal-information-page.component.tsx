import { Box, Grid, Stack, Typography } from "@mui/material";
import FormRow from "../../../components/form-row/form-row.component";
import { TextField } from "../../../components/text-field/text-field.component";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod";
import { z } from "zod";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DispatcherPageParams } from "../../../../utils/types/dispatcher-page-param-types";
import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import useSend from "../../../../utils/hooks/use-send";
const ROOT_URL = import.meta.env.VITE_ROOT_URL;

const RequestForOthersPersonalInformationSchema = z.object({
  entity: z.string().min(1, "Can't be empty"),
  category: z.string().min(1, "Can't be empty"),
  deal: z.string().min(1, "Can't be empty"),
  requestedFor: z.string().min(1, "Can't be empty"),
  requestedForPhoneNumber: z.string().min(1, "Can't be empty"),
});
type RequestForOthersPersonalInformationType = z.infer<
  typeof RequestForOthersPersonalInformationSchema
>;

const RequestForOthersPersonalInformationPage = () => {
  const { category, deal, entity } = useParams<DispatcherPageParams>();
  const location = useLocation();
  const navigate = useNavigate();
  const { sendRequest: storeRequest, isRequestLoading } = useSend({
    method: "POST",
    url: ROOT_URL + "request/store",
  });

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
  } = useForm<RequestForOthersPersonalInformationType>({
    resolver: zodResolver(RequestForOthersPersonalInformationSchema),
    // reValidateMode: "onChange",
    defaultValues: {
      entity: entity,
      category: category,
      deal: deal,
      requestedFor: "",
      requestedForPhoneNumber: "",
    },
    mode: "onChange",
  });

  const onSubmitHandler: SubmitHandler<
    RequestForOthersPersonalInformationType
  > = (values) => {
    storeRequest(
      {
        data: {
          ...values,
          ...location.state,
        },
      },
      true
    ).then((result) => {
      if (result.status) {
        navigate("/home");
      }
    });
  };

  const onNextHandler: SubmitHandler<
    RequestForOthersPersonalInformationType
  > = (values) => {
    navigate("client-info", { state: values });
    // return redirect("client-info",)
  };

  return (
    <Box>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
      >
        <Typography variant={"h1"} style={{ textTransform: "capitalize" }}>
          Client Information
        </Typography>
        <Typography variant={"subtitle2"} align={"center"}>
          Please fill the questions below about the requesting client
        </Typography>
      </Stack>
      <Box height={30}></Box>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Grid container paddingX={2} rowSpacing={2}>
          <FormRow required={true} label={"Full Name"} xs={12}>
            <Controller
              name={"requestedFor"}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  placeholder={"The customer's full name"}
                  label={"Full Name"}
                  inputRef={ref}
                  error={!!errors.requestedFor}
                  helperText={errors?.requestedFor?.message}
                  {...field}
                />
              )}
            />
          </FormRow>
          <FormRow required={true} label={"Phone Number"} xs={12}>
            <Controller
              name={"requestedForPhoneNumber"}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  placeholder={"The customer's phone number"}
                  label={"Phone Number"}
                  inputRef={ref}
                  error={!!errors.requestedForPhoneNumber}
                  helperText={errors?.requestedForPhoneNumber?.message}
                  {...field}
                />
              )}
            />
          </FormRow>

          <FormRow xs={12}>
            <LoadingButton
              loading={isSubmitting || isRequestLoading}
              variant={"contained"}
              color={"primary"}
              type={"submit"}
              fullWidth
            >
              Submit
            </LoadingButton>
          </FormRow>
        </Grid>
      </form>
    </Box>
  );
};

export default RequestForOthersPersonalInformationPage;
