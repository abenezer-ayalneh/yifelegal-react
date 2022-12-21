import {createSlice} from '@reduxjs/toolkit';

interface CustomizationStateTypes {
    fontFamily: string | undefined,
}

const initialState: CustomizationStateTypes = {
    fontFamily: "Nyala, Public Sans, sans-serif",
}

const customizationSlice = createSlice({
    name: 'customization',
    initialState: initialState,
    reducers: {
        setFontFamily: (state, action) => {
            state.fontFamily = action.payload.fontFamily;
        },
    }
})

export const {setFontFamily} = customizationSlice.actions;
export default customizationSlice.reducer;