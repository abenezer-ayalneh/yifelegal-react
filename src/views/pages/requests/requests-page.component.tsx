import {useTranslation} from "react-i18next";
import {useMemo, useState} from "react";
import {RequestDetailType, RequestType} from "../../../utils/types/request-type";
import useFetch from "../../../utils/hooks/use-fetch";
import config from "../../../config";
import FullscreenLoadingAnimation from "../../components/fullscreen-loading-animation/fullscreen-loading-animation";
import {Grid, Typography} from "@mui/material";
import EmptyComponent from "../../components/empty/empty.component";
import Highlight from "../../components/cards/highlight/highlight.component";
import moment from "moment/moment";
import CustomModal from "../../components/modal/modal.component";
import FormRow from "../../components/form-row/form-row.component";
import House from "../../../assets/images/house.jpg";
import useSend from "../../../utils/hooks/use-send";
import {LoadingButton} from "@mui/lab";

const RequestsPage = () => {
    const {t} = useTranslation()
    const [selectedRequestDetail, setSelectedRequestDetail] = useState<RequestDetailType[] | null>(null)
    const {responseData, isRequestLoading} = useFetch({
        method: "GET",
        url: config.REACT_APP_ROOT_URL + `request`,
    }, "fetch-my-house-requests-on-house-my-request-page")

    const {sendRequest: pay, isRequestLoading: isPaymentBeingProcessed} = useSend({
        method: "POST",
        url: config.REACT_APP_ROOT_URL + 'payment/pay'
    })

    const requests = useMemo<RequestType[]>(() => responseData?.data?.requests, [responseData])

    const handleModalClose = () => setSelectedRequestDetail(null)

    const handleHighlightClicked = (request: RequestDetailType[]) => setSelectedRequestDetail(request)

    const handleGetPhoneNumber = () => {
        pay().then((response) => console.log(response));
    }

    if (!requests) {
        return <FullscreenLoadingAnimation/>
    } else {
        return (
            <>
                <Grid container spacing={2} padding={2}>
                    {
                        isRequestLoading
                            ? <FullscreenLoadingAnimation/>
                            : (requests.length === 0
                                    ? <EmptyComponent/>
                                    : requests.map((request: RequestType) => (
                                        <Highlight image={House}
                                                   deal={request.detail?.find((detail) => detail.attribute === "deal")?.value}
                                                   type={request.detail?.find((detail) => detail.attribute === "entity")?.value}
                                                   date={moment(request.created_at)?.format("MMM DD, YYYY")}
                                                   location={request.detail?.find((detail) => detail.attribute === "subCity")?.value}
                                                   category={request.detail?.find((detail) => detail.attribute === "entityType")?.value}
                                                   onClick={() => handleHighlightClicked(request.detail)}
                                        />)
                                    )
                            )
                    }
                </Grid>
                {
                    selectedRequestDetail &&
                    <CustomModal open={Boolean(selectedRequestDetail)} title={"Request Detail"} handleClose={handleModalClose}
                                 buttons={[
                                     <LoadingButton loading={isPaymentBeingProcessed} variant={"contained"} color={"primary"} fullWidth
                                                    onClick={handleGetPhoneNumber}>Get Phone Number</LoadingButton>
                                 ]}
                    >
                        <Grid container direction="column" rowSpacing={1} paddingX={{xs: 1, sm: 2, md: 3, lg: 4}} paddingY={2}>
                            {
                                selectedRequestDetail.map((request) => (
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

export default RequestsPage