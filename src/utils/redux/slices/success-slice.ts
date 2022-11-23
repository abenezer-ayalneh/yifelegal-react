import {createSlice} from '@reduxjs/toolkit';

interface SuccessStateType{
    type: string | null,
    message: string | null,
}

const initialState: SuccessStateType = {
    type: null,
    message: null
}

const successSlice = createSlice({
    name: 'success',
    initialState: initialState,
    reducers: {
        setSuccess: (state, action) => {
            state.type = action.payload.type;
            state.message = action.payload.message;
        },
        clearSuccess: (state) => {
            state.type = null;
            state.message = null;
        }
    }
})

export const {setSuccess, clearSuccess} = successSlice.actions;
export default successSlice.reducer;