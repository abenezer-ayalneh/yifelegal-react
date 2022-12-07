import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UserModelType{
    id: number,
    name: string,
    phone_number: string,
    email?: string,
    role_id: number,
    remember_token?: string,
    created_by: number,
    updated_by: number,
    created_at?: Date,
    updated_at?: Date,
    deleted_by?: number,
    deleted_at?: Date,
}

export interface UserStateType {
    name?: null | string,
    email?: null | string,
    phoneNumber?: null | string,
    user?: null | UserModelType
}

const initialState: UserStateType = {
    name: null,
    email: null,
    phoneNumber: null,
}
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setName: (state, action: PayloadAction<UserStateType>) => {
            state.name = action.payload.name
        },
        setEmail: (state, action: PayloadAction<UserStateType>) => {
            state.email = action.payload.email
        },
        setPhoneNumber: (state, action: PayloadAction<UserStateType>) => {
            state.phoneNumber = action.payload.phoneNumber
        },
        setUser: (state, action:PayloadAction<UserStateType>) => {
            state.user = action.payload.user
        },
        clearUser: (state) => {
            state.user = null
            state.name = null
            state.email = null
            state.phoneNumber = null
        },
    }
})

export const {setName, setEmail, setPhoneNumber,setUser,clearUser} = userSlice.actions;
export default userSlice.reducer;