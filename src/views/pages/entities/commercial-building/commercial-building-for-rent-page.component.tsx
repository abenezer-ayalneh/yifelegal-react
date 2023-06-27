import { z } from "zod";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { DispatcherPageParams } from "../../../../utils/types/dispatcher-page-param-types";
import useSend from "../../../../utils/hooks/use-send";
import config from "../../../../config";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Box, Grid, MenuItem, Stack, Typography } from "@mui/material";
import FormRow from "../../../components/form-row/form-row.component";
import { TextField } from "../../../components/text-field/text-field.component";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
const ROOT_URL = import.meta.env.VITE_ROOT_URL;

const CommercialBuildingForRentSchema = z.object({
  entity: z.string().min(1, "Can't be empty"),
  deal: z.string().min(1, "Can't be empty"),
  purpose: z.enum(
    [
      "Hotel",
      "Cafe",
      "Cafe and Restaurant",
      "Supermarket",
      "Hypermarket",
      "Shop",
      "Office",
      "Gym",
      "Club",
      "Religious Institute",
      "School",
      "Storage Room",
      "Other",
    ],
    { invalid_type_error: "Unknown option selected" }
  ),
  subCity: z.string().min(1, "Can't be empty"),
  specialName: z.string().optional(),
  otherDetail: z.string().optional(),
});

type CommercialBuildingForRentType = z.infer<
  typeof CommercialBuildingForRentSchema
>;

const CommercialBuildingForRent = () => {
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
  } = useForm<CommercialBuildingForRentType>({
    resolver: zodResolver(CommercialBuildingForRentSchema),
    // reValidateMode: "onChange",
    defaultValues: {
      entity: entity,
      deal: deal,
      purpose: "Hotel",
      subCity: "",
      specialName: "",
      otherDetail: "",
    },
    mode: "onChange",
  });

  const onSubmitHandler: SubmitHandler<CommercialBuildingForRentType> = (
    values
  ) => {
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

  const onNextHandler: SubmitHandler<CommercialBuildingForRentType> = (
    values
  ) => {
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
          <FormRow required={true} label={"Purpose"} xs={12}>
            <Controller
              name={"purpose"}
              control={control}
              render={({ field: { ref, ...field } }) => (
                <TextField
                  label={"Purpose of Rental"}
                  size={"small"}
                  error={!!errors.purpose}
                  helperText={errors?.purpose?.message}
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
                  <MenuItem style={{ fontSize: 14 }} value={"Hotel"}>
                    Hotel
                  </MenuItem>
                  <MenuItem style={{ fontSize: 14 }} value={"Cafe"}>
                    Cafe
                  </MenuItem>
                  <MenuItem
                    style={{ fontSize: 14 }}
                    value={"Cafe and Restaurant"}
                  >
                    Cafe and Restaurant
                  </MenuItem>
                  <MenuItem style={{ fontSize: 14 }} value={"Supermarket"}>
                    Supermarket
                  </MenuItem>
                  <MenuItem style={{ fontSize: 14 }} value={"Hypermarket"}>
                    Hypermarket
                  </MenuItem>
                  <MenuItem style={{ fontSize: 14 }} value={"Shop"}>
                    Shop
                  </MenuItem>
                  <MenuItem style={{ fontSize: 14 }} value={"Office"}>
                    Office
                  </MenuItem>
                  <MenuItem style={{ fontSize: 14 }} value={"Gym"}>
                    Gym
                  </MenuItem>
                  <MenuItem style={{ fontSize: 14 }} value={"Club"}>
                    Club
                  </MenuItem>
                  <MenuItem
                    style={{ fontSize: 14 }}
                    value={"Religious Institute"}
                  >
                    Religious Institute
                  </MenuItem>
                  <MenuItem style={{ fontSize: 14 }} value={"School"}>
                    School
                  </MenuItem>
                  <MenuItem style={{ fontSize: 14 }} value={"Storage Room"}>
                    Storage Room
                  </MenuItem>
                  <MenuItem style={{ fontSize: 14 }} value={"Other"}>
                    Other
                  </MenuItem>
                </TextField>
              )}
            />
          </FormRow>
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

export default CommercialBuildingForRent;
