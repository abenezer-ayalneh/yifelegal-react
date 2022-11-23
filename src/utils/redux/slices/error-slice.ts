import {createSlice} from '@reduxjs/toolkit';

interface ErrorStateType {
    type: string | null,
    message: string | null,
}

const initialState: ErrorStateType = {
    type: null,
    message: null,
}

const errorSlice = createSlice({
    name: 'error',
    initialState: initialState,
    reducers: {
        setError: (state, action) => {
            state.type = action.payload.type;
            state.message = action.payload.message;
        },
        clearError: (state) => {
            state.type = null;
            state.message = null;
        }
    }
})

export const {setError, clearError} = errorSlice.actions;
export default errorSlice.reducer;