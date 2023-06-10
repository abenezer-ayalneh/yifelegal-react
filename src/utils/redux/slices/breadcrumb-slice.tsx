import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import Typography from "../../theme/typography";
import {Link} from "@mui/material";

interface BreadcrumbSliceType{
    breadcrumb: JSX.Element[] | [] | null,
}
const initialState: BreadcrumbSliceType = {
    breadcrumb: []
}

const breadcrumbSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setBreadCrumbs: (state, action: PayloadAction<JSX.Element[] | [] | null>) => {
            state.breadcrumb = action.payload
        },
    }
})

export const {setBreadCrumbs} = breadcrumbSlice.actions;
export default breadcrumbSlice.reducer;``