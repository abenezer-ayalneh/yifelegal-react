import {useParams} from "react-router-dom";
import useFetch from "../../../utils/hooks/use-fetch";
import config from "../../../config";
import {Grid, Typography} from "@mui/material";
import Highlight from "../../components/cards/highlight/highlight.component";
import WholeBuilding from "../../../assets/images/whole-building.jpg"
import {useMemo, useState} from "react";
import FullscreenLoadingAnimation from "../../components/fullscreen-loading-animation/fullscreen-loading-animation";
import {RequestDetailType, RequestType} from "../../../utils/types/request-type";
import moment from "moment"
import CustomModal from "../../components/modal/modal.component";
import FormRow from "../../components/form-row/form-row.component";
import {useTranslation} from "react-i18next";
import EmptyComponent from "../../components/empty/empty.component";
import {DispatcherPageParams} from "../../../utils/types/dispatcher-page-param-types";

const WholeBuildingMyRequestsPage = () => {
    const {t} = useTranslation()
    const params = useParams<DispatcherPageParams>()
    const [selectedWholeBuildingDetail, setSelectedWholeBuildingDetail] = useState<RequestDetailType[] | null>(null)
    const {responseData, isRequestLoading} = useFetch({
        method: "GET",
        url: config.REACT_APP_ROOT_URL + `request/mine/entity`,
        params: {
            entity: params.entity
        }
    }, "fetch-my-whole-building-requests-on-whole-building-my-request-page")

    const myRequests = useMemo<RequestType[]>(() => responseData?.data?.myRequests, [responseData])

    const handleModalClose = () => setSelectedWholeBuildingDetail(null)

    const handleHighlightClicked = (request: RequestDetailType[]) => setSelectedWholeBuildingDetail(request)

    if (!myRequests) {
        return <FullscreenLoadingAnimation/>
    } else {
        return (
            <>
                <Grid container spacing={2} padding={2}>
                    {
                        isRequestLoading
                            ? <FullscreenLoadingAnimation/>
                            : (myRequests.length === 0
                                    ? <EmptyComponent/>
                                    : myRequests.map((request: RequestType) => (
                                        <Highlight image={WholeBuilding}
                                                   type={"Whole Building"}
                                                   date={moment(request.created_at)?.format("MMM DD, YYYY")}
                                                   deal={request.detail?.find((detail) => detail.attribute === "deal")?.value}
                                                   location={request.detail?.find((detail) => detail.attribute === "subCity")?.value}
                                                   category={request.detail?.find((detail) => detail.attribute === "entityType")?.value}
                                                   onClick={() => handleHighlightClicked(request.detail)}
                                        />)
                                    )
                            )
                    }
                </Grid>
                {
                    selectedWholeBuildingDetail &&
                    <CustomModal open={Boolean(selectedWholeBuildingDetail)} title={"Request Detail"} handleClose={handleModalClose}>
                        <Grid container direction="column" rowSpacing={1} paddingX={{xs: 1, sm: 2, md: 3, lg: 4}} paddingY={2}>
                            {
                                selectedWholeBuildingDetail.map((request) => (
                                    <FormRow label={t(request.attribute) + ":"}>
                                        <Typography minWidth={200} sx={{textTransform: "capitalize"}}
                                                    variant={"body2"}>{request.value}</Typography>
                                    </FormRow>
                                ))
                            }
                        </Grid>
                    </CustomModal>
                }
            </>
        )
    }
}

export default WholeBuildingMyRequestsPage