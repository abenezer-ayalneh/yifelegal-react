import { Button, Box, Grid, MenuItem, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import FormRow from "../../../components/form-row/form-row.component";
import { TextField } from "../../../components/text-field/text-field.component";
import LoadingButton from "@mui/lab/LoadingButton";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import config from "../../../../config";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { DispatcherPageParams } from "../../../../utils/types/dispatcher-page-param-types";
import useSend from "../../../../utils/hooks/use-send";
const ROOT_URL = import.meta.env.VITE_ROOT_URL;
// Validation Schema
const ThreeWheelerForSaleSchema = z.object({
  entity: z.string().min(1, "Can't be empty"),
  deal: z.string().min(1, "Can't be empty"),
  threeWheelerModelName: z.string().min(1, "Can't be empty"),
  condition: z.enum(["New", "Used"], {
    invalid_type_error: "Should be either New or Used",
  }),
  otherDetail: z.string().optional(),
});
type ThreeWheelerForSaleType = z.infer<typeof ThreeWheelerForSaleSchema>;

const ThreeWheelerForSalePage = () => {
  const navigate = useNavigate();
  const { deal, entity } = useParams<DispatcherPageParams>();
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
  } = useForm<ThreeWheelerForSaleType>({
    resolver: zodResolver(ThreeWheelerForSaleSchema),
    defaultValues: {
      entity: entity,
      deal: deal,
      threeWheelerModelName: "",
      condition: "New",
      otherDetail: "",
    },
    mode: "onChange",
  });

  const onSubmitHandler: SubmitHandler<ThreeWheelerForSaleType> = (values) => {
    storeRequest(
      {
        data: values,
      },
      true
    ).then((result) => {
      if (result?.status) {
        navigate("/home");
      }
    });
  };

  const onNextHandler: SubmitHandler<ThreeWheelerForSaleType> = (values) => {
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
          {entity}
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
          <FormRow required={true} label={"Model Name"} xs={12}>
            <Controller
              name={"threeWheelerModelName"}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  placeholder={
                    "The model name of the Three Wheeler. E.g: Bajaj, RE"
                  }
                  label={"Model Name"}
                  inputRef={ref}
                  error={!!errors.threeWheelerModelName}
                  helperText={errors?.threeWheelerModelName?.message}
                  {...field}
                />
              )}
            />
          </FormRow>
          <FormRow required={true} label={"Condition"} xs={12}>
            <Controller
              name={"condition"}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  placeholder={"Condition of the Three Wheeler"}
                  label={"Condition"}
                  size={"small"}
                  error={!!errors.condition}
                  helperText={errors?.condition?.message}
                  {...field}
                  select
                  sx={{
                    "& .MuiSelect-select": {
                      fontSize: 14,
                      padding: "6px 14px",
                    },
                  }}
                >
                  <MenuItem style={{ fontSize: 14 }} value={"New"}>
                    New
                  </MenuItem>
                  <MenuItem style={{ fontSize: 14 }} value={"Used"}>
                    Used
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

export default ThreeWheelerForSalePage;
