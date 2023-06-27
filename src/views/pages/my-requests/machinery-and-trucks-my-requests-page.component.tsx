import { useParams } from "react-router-dom";
import useFetch from "../../../utils/hooks/use-fetch";
import config from "../../../config";
import { Grid, Typography } from "@mui/material";
import Highlight from "../../components/cards/highlight/highlight.component";
import MachineryAndTrucks from "../../../assets/images/whole-building.jpg";
import { useMemo, useState } from "react";
import FullscreenLoadingAnimation from "../../components/fullscreen-loading-animation/fullscreen-loading-animation";
import {
  RequestDetailType,
  RequestType,
} from "../../../utils/types/request-type";
import moment from "moment";
import CustomModal from "../../components/modal/modal.component";
import FormRow from "../../components/form-row/form-row.component";
import { useTranslation } from "react-i18next";
import EmptyComponent from "../../components/empty/empty.component";
import { DispatcherPageParams } from "../../../utils/types/dispatcher-page-param-types";
const ROOT_URL = import.meta.env.VITE_ROOT_URL;
const MachineryAndTrucksMyRequestsPage = () => {
  const { t } = useTranslation();
  const params = useParams<DispatcherPageParams>();
  const [
    selectedMachineryAndTrucksDetail,
    setSelectedMachineryAndTrucksDetail,
  ] = useState<RequestDetailType[] | null>(null);
  const { responseData, isRequestLoading } = useFetch(
    {
      method: "GET",
      url: ROOT_URL + `request/mine/entity`,
      params: {
        entity: params.entity,
      },
    },
    "fetch-my-whole-building-requests-on-whole-building-my-request-page"
  );

  const myRequests = useMemo<RequestType[]>(
    () => responseData?.data?.myRequests,
    [responseData]
  );

  const handleModalClose = () => setSelectedMachineryAndTrucksDetail(null);

  const handleHighlightClicked = (request: RequestDetailType[]) =>
    setSelectedMachineryAndTrucksDetail(request);

  if (!myRequests) {
    return <FullscreenLoadingAnimation />;
  } else {
    return (
      <>
        <Grid container spacing={2} padding={2}>
          {isRequestLoading ? (
            <FullscreenLoadingAnimation />
          ) : myRequests.length === 0 ? (
            <EmptyComponent />
          ) : (
            myRequests.map((request: RequestType) => (
              <Highlight
                image={MachineryAndTrucks}
                type={"Machinery & Trucks"}
                date={moment(request.created_at)?.format("MMM DD, YYYY")}
                deal={
                  request.detail?.find((detail) => detail.attribute === "deal")
                    ?.value
                }
                location={
                  request.detail?.find(
                    (detail) => detail.attribute === "subCity"
                  )?.value
                }
                category={
                  request.detail?.find(
                    (detail) => detail.attribute === "entityType"
                  )?.value
                }
                onClick={() => handleHighlightClicked(request.detail)}
              />
            ))
          )}
        </Grid>
        {selectedMachineryAndTrucksDetail && (
          <CustomModal
            open={Boolean(selectedMachineryAndTrucksDetail)}
            title={"Request Detail"}
            handleClose={handleModalClose}
          >
            <Grid
              container
              direction="column"
              rowSpacing={1}
              paddingX={{ xs: 1, sm: 2, md: 3, lg: 4 }}
              paddingY={2}
            >
              {selectedMachineryAndTrucksDetail.map((request) => (
                <FormRow label={t(request.attribute) + ":"}>
                  <Typography
                    minWidth={200}
                    sx={{ textTransform: "capitalize" }}
                    variant={"body2"}
                  >
                    {request.value}
                  </Typography>
                </FormRow>
              ))}
            </Grid>
          </CustomModal>
        )}
      </>
    );
  }
};

export default MachineryAndTrucksMyRequestsPage;
